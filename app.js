/**
 * Sixt Exotic Finder - MagicUI Inspired Frontend
 * Particle effects, scroll reveals, glass morphism
 */

let stations = [];
let exotics = [];
let map = null;
let markers = [];

// Particle system
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let width, height;
  const particles = [];
  const PARTICLE_COUNT = 60;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.size = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
      this.hue = Math.random() > 0.5 ? 270 : 45; // purple or amber
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.05 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// Scroll reveal
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Counter animation
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const startVal = 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + (target - startVal) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Initialize app
async function init() {
  initParticles();

  try {
    const cacheBust = '?v=' + Date.now();
    const [stationsRes, exoticsRes] = await Promise.all([
      fetch('data/stations.json' + cacheBust),
      fetch('data/exotics.json' + cacheBust)
    ]);

    stations = await stationsRes.json();
    exotics = await exoticsRes.json();

    updateStats();
    populateFilters();
    initMap();
    renderList();
    setupEventListeners();
    initScrollReveal();
  } catch (e) {
    console.error('Failed to load data:', e);
    showError('Failed to load station data.');
  }
}

function updateStats() {
  const stats = {
    stations: stations.length,
    exotics: stations.filter(s => s.hasExotics).length,
    cars: exotics.length,
    guaranteed: exotics.filter(e => e.guaranteed).length
  };

  animateCounter(document.getElementById('stat-stations'), stats.stations);
  animateCounter(document.getElementById('stat-exotics'), stats.exotics);
  animateCounter(document.getElementById('stat-cars'), stats.cars);
  animateCounter(document.getElementById('stat-guaranteed'), stats.guaranteed);

  if (stations.length > 0 && stations[0].lastChecked) {
    document.getElementById('stat-lastupdate').textContent = stations[0].lastChecked;
  }
}

function populateFilters() {
  const countrySelect = document.getElementById('filter-country');
  const brandSelect = document.getElementById('filter-brand');

  const countries = [...new Set(stations.map(s => s.country))].sort();
  countries.forEach(c => {
    const option = document.createElement('option');
    option.value = c;
    option.textContent = getCountryName(c);
    countrySelect.appendChild(option);
  });

  const brands = [...new Set(exotics.map(e => e.brand))].sort();
  brands.forEach(b => {
    const option = document.createElement('option');
    option.value = b;
    option.textContent = b;
    brandSelect.appendChild(option);
  });
}

function getCountryName(code) {
  const map = {
    'SE': 'Sweden', 'FR': 'France', 'DE': 'Germany', 'CH': 'Switzerland',
    'AE': 'UAE', 'GB': 'UK', 'IT': 'Italy', 'ES': 'Spain',
    'NL': 'Netherlands', 'AT': 'Austria', 'US': 'USA'
  };
  return map[code] || code;
}

function getFilteredData() {
  const country = document.getElementById('filter-country').value;
  const brand = document.getElementById('filter-brand').value;
  const guaranteedOnly = document.getElementById('filter-guaranteed').checked;
  const search = document.getElementById('search-input').value.toLowerCase();

  let filteredExotics = exotics;

  if (country) {
    const stationIds = stations.filter(s => s.country === country).map(s => s.id);
    filteredExotics = filteredExotics.filter(e => stationIds.includes(e.stationId));
  }

  if (brand) {
    filteredExotics = filteredExotics.filter(e => e.brand === brand);
  }

  if (guaranteedOnly) {
    filteredExotics = filteredExotics.filter(e => e.guaranteed);
  }

  if (search) {
    filteredExotics = filteredExotics.filter(e =>
      e.model.toLowerCase().includes(search) ||
      e.stationName.toLowerCase().includes(search) ||
      (e.city && e.city.toLowerCase().includes(search))
    );
  }

  const stationIdsWithExotics = [...new Set(filteredExotics.map(e => e.stationId))];
  const filteredStations = stations.map(s => ({
    ...s,
    hasExotics: stationIdsWithExotics.includes(s.id),
    exoticCount: filteredExotics.filter(e => e.stationId === s.id).length
  }));

  return { stations: filteredStations, exotics: filteredExotics };
}

function initMap() {
  map = L.map('map', { zoomControl: false, attributionControl: false }).setView([48.5, 10], 4);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);
  updateMapMarkers();
}

function updateMapMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const { stations: filteredStations } = getFilteredData();

  filteredStations.forEach(station => {
    const hasExotics = station.hasExotics;

    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="${hasExotics ? 'marker-exotic pulse-glow' : 'marker-none'} w-4 h-4"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    const marker = L.marker([station.lat, station.lng], { icon }).addTo(map);

    const stationExotics = exotics.filter(e => e.stationId === station.id);
    const popupContent = `
      <div class="min-w-[220px]">
        <h3 class="font-bold text-lg mb-1 text-white">${station.name}</h3>
        <p class="text-sm text-white/50 mb-3">${station.city}, ${getCountryName(station.country)}</p>
        ${hasExotics
          ? `<div class="space-y-1.5">
              <p class="text-emerald-400 font-semibold text-sm">${stationExotics.length} exotic car${stationExotics.length > 1 ? 's' : ''}</p>
              ${stationExotics.slice(0, 3).map(e =>
                `<div class="text-sm flex items-center gap-1.5 text-white/80">
                  ${e.guaranteed ? '<span class="text-pink-400">🔒</span>' : ''}
                  ${e.model}
                </div>`
              ).join('')}
              ${stationExotics.length > 3 ? `<p class="text-xs text-white/30 mt-1">+${stationExotics.length - 3} more</p>` : ''}
             </div>`
          : '<p class="text-gray-400 text-sm">No exotic cars found</p>'
        }
      </div>
    `;

    marker.bindPopup(popupContent);
    markers.push(marker);
  });
}

function renderList() {
  const { stations: filteredStations, exotics: filteredExotics } = getFilteredData();

  // Stations grid
  const stationsGrid = document.getElementById('stations-grid');
  const stationsWithExotics = filteredStations.filter(s => s.hasExotics);
  document.getElementById('stations-count').textContent = `(${stationsWithExotics.length})`;

  if (stationsWithExotics.length === 0) {
    stationsGrid.innerHTML = `
      <div class="col-span-full text-center py-16">
        <div class="text-6xl mb-4 opacity-50">🔍</div>
        <p class="text-white/40 text-lg">No exotic cars match your filters</p>
        <p class="text-white/20 text-sm mt-2">Try adjusting your search criteria</p>
      </div>
    `;
  } else {
    stationsGrid.innerHTML = stationsWithExotics.map((station, i) => {
      const stationExotics = filteredExotics.filter(e => e.stationId === station.id);
      const delay = i * 50;
      return `
        <div class="magic-card p-5 reveal" style="transition-delay: ${delay}ms">
          <div class="flex items-start justify-between mb-3">
            <div>
              <h3 class="font-bold text-lg text-white">${station.name}</h3>
              <p class="text-sm text-white/40">${station.city}, ${getCountryName(station.country)}</p>
            </div>
            <span class="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              ${stationExotics.length} car${stationExotics.length > 1 ? 's' : ''}
            </span>
          </div>
          <div class="space-y-2">
            ${stationExotics.map(e => `
              <div class="flex items-center gap-2 text-sm py-1.5 px-3 rounded-lg bg-white/5">
                ${e.guaranteed ? '<span class="text-pink-400 text-base" title="Guaranteed Model">🔒</span>' : '<span class="w-4"></span>'}
                <span class="${e.guaranteed ? 'text-pink-200 font-medium' : 'text-white/70'}">${e.model}</span>
                <span class="text-xs text-white/30 ml-auto">${e.price || e.category}</span>
              </div>
            `).join('')}
          </div>
          ${station.iata ? `
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span class="text-white/30">✈️ ${station.iata}</span>
              <a href="https://www.sixt.com/car-rental/${slugifyCountry(station.country)}/${slugifyCity(station.city)}/${slugifyStation(station.name)}/"
                 target="_blank" class="text-purple-400 hover:text-purple-300 transition-colors">Book on Sixt →</a>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Trigger reveal animation
    setTimeout(() => document.querySelectorAll('#stations-grid .reveal').forEach(el => el.classList.add('visible')), 100);
  }

  // Cars grid
  document.getElementById('cars-count').textContent = `(${filteredExotics.length})`;
  const carsGrid = document.getElementById('cars-grid');

  carsGrid.innerHTML = filteredExotics.map((e, i) => {
    const delay = i * 30;
    return `
      <div class="magic-card overflow-hidden group reveal" style="transition-delay: ${delay}ms">
        <div class="car-image-bg aspect-[4/3] flex items-center justify-center relative">
          ${e.imageUrl
            ? `<img src="https://www.sixt.com${e.imageUrl}" alt="${e.model}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10">`
            : `<div class="text-7xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 relative z-10">🏎️</div>`
          }
          ${e.guaranteed
            ? `<div class="absolute top-3 right-3 px-3 py-1 rounded-xl bg-pink-500/80 text-white text-xs font-bold backdrop-blur-sm z-20 border border-pink-400/30">GUARANTEED</div>`
            : ''
          }
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div class="p-5 relative z-10">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-bold text-purple-400 uppercase tracking-wider">${e.brand}</span>
            <span class="w-1 h-1 rounded-full bg-white/20"></span>
            <span class="text-xs text-white/40">${e.category}</span>
          </div>
          <h4 class="font-bold text-white text-lg mb-2 group-hover:text-gradient transition-colors">${e.model}</h4>
          ${e.price ? `<div class="text-sm text-amber-400 font-semibold mb-2">${e.price}</div>` : ''}
          <div class="flex items-center justify-between">
            <span class="text-xs text-white/40 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              ${e.stationName}
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  setTimeout(() => document.querySelectorAll('#cars-grid .reveal').forEach(el => el.classList.add('visible')), 100);
}

function setupEventListeners() {
  // View toggle
  document.getElementById('view-map').addEventListener('click', () => {
    document.getElementById('map-view').classList.remove('hidden');
    document.getElementById('list-view').classList.add('hidden');
    document.getElementById('view-map').classList.add('active');
    document.getElementById('view-list').classList.remove('active');
    setTimeout(() => map.invalidateSize(), 100);
  });

  document.getElementById('view-list').addEventListener('click', () => {
    document.getElementById('map-view').classList.add('hidden');
    document.getElementById('list-view').classList.remove('hidden');
    document.getElementById('view-list').classList.add('active');
    document.getElementById('view-map').classList.remove('active');
  });

  // Filters
  ['filter-country', 'filter-brand', 'filter-guaranteed'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
      updateMapMarkers();
      renderList();
    });
  });

  document.getElementById('search-input').addEventListener('input', () => {
    updateMapMarkers();
    renderList();
  });

  // Contribute link
  document.getElementById('contribute-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Coming soon: Submit verified exotic car sightings at Sixt stations!\n\nFor now, open a PR on GitHub with your findings.');
  });
}

function showError(msg) {
  document.body.innerHTML = `
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="text-6xl mb-4">⚠️</div>
        <p class="text-white/50">${msg}</p>
      </div>
    </div>
  `;
}

function slugifyCountry(code) {
  const map = {
    'SE': 'sweden', 'FR': 'france', 'DE': 'germany', 'CH': 'switzerland',
    'AE': 'united-arab-emirates', 'GB': 'united-kingdom', 'IT': 'italy',
    'ES': 'spain', 'NL': 'netherlands', 'AT': 'austria', 'US': 'usa'
  };
  return map[code] || code.toLowerCase();
}

function slugifyCity(city) {
  return city.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
}

function slugifyStation(name) {
  return name.toLowerCase()
    .replace(/airport/g, 'airport')
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Start
init();
