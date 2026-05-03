/**
 * Sixt Guaranteed Model Finder
 * Shows guaranteed-model cars with map visualization
 */

let stations = [];
let guaranteed = [];
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
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.size = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
      this.hue = Math.random() > 0.5 ? 270 : 45;
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
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Counter animation
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Map
function initMap() {
  map = L.map('map', { zoomControl: false, attributionControl: false }).setView([30, 10], 2);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd', maxZoom: 19
  }).addTo(map);
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  updateMapMarkers();
}

function updateMapMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const { stations: filteredStations } = getFilteredData();

  filteredStations.forEach(station => {
    const count = station.guaranteedCount || 0;
    if (count === 0) {
      // Small gray dot for stations without guaranteed cars
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="width:8px;height:8px;background:rgba(255,255,255,0.2);border-radius:50%;"></div>`,
        iconSize: [8, 8], iconAnchor: [4, 4]
      });
      const marker = L.marker([station.lat, station.lng], { icon }).addTo(map);
      marker.bindPopup(`<div style="color:white;"><b>${station.name}</b><br/>No guaranteed models</div>`);
      markers.push(marker);
      return;
    }

    // Circle marker sized by count
    const radius = Math.sqrt(count) * 8 + 5;
    const color = count >= 5 ? '#10b981' : count >= 2 ? '#f59e0b' : '#8b5cf6';
    
    const circle = L.circleMarker([station.lat, station.lng], {
      radius: radius,
      fillColor: color,
      color: color,
      weight: 2,
      opacity: 0.8,
      fillOpacity: 0.6
    }).addTo(map);

    const stationCars = guaranteed.filter(g => g.stationId === station.id);
    const popupContent = `
      <div style="min-width:200px;color:white;">
        <h3 style="font-weight:bold;margin-bottom:4px;">${station.name}</h3>
        <p style="color:#aaa;font-size:12px;margin-bottom:8px;">${count} guaranteed model${count > 1 ? 's' : ''}</p>
        ${stationCars.slice(0, 5).map(c => `
          <div style="font-size:13px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
            ${c.model}
          </div>
        `).join('')}
        ${stationCars.length > 5 ? `<p style="color:#666;font-size:11px;margin-top:4px;">+${stationCars.length - 5} more</p>` : ''}
      </div>
    `;
    circle.bindPopup(popupContent);
    markers.push(circle);
  });
}

// Data loading
async function init() {
  initParticles();

  try {
    const cacheBust = '?v=' + Date.now();
    const [stationsRes, guaranteedRes] = await Promise.all([
      fetch('data/stations.json' + cacheBust),
      fetch('data/guaranteed.json' + cacheBust)
    ]);

    stations = await stationsRes.json();
    guaranteed = await guaranteedRes.json();

    updateStats();
    populateFilters();
    initMap();
    renderCars();
    setupEventListeners();
    initScrollReveal();
  } catch (e) {
    console.error('Failed to load data:', e);
    showError('Failed to load data.');
  }
}

function updateStats() {
  const stats = {
    stations: stations.length,
    withCars: stations.filter(s => s.guaranteedCount > 0).length,
    cars: guaranteed.length
  };

  animateCounter(document.getElementById('stat-stations'), stats.stations);
  animateCounter(document.getElementById('stat-exotics'), stats.withCars);
  animateCounter(document.getElementById('stat-cars'), stats.cars);

  const lastUpdate = guaranteed.length > 0 ? guaranteed[0].lastSeen : '-';
  document.getElementById('stat-lastupdate').textContent = lastUpdate;
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

  const brands = [...new Set(guaranteed.map(e => e.brand))].sort();
  brands.forEach(b => {
    const option = document.createElement('option');
    option.value = b;
    option.textContent = b;
    brandSelect.appendChild(option);
  });
}

function getFilteredData() {
  const country = document.getElementById('filter-country').value;
  const brand = document.getElementById('filter-brand').value;
  const search = document.getElementById('search-input').value.toLowerCase();

  let filteredGuaranteed = guaranteed;

  if (country) {
    const stationIds = stations.filter(s => s.country === country).map(s => s.id);
    filteredGuaranteed = filteredGuaranteed.filter(g => stationIds.includes(g.stationId));
  }

  if (brand) {
    filteredGuaranteed = filteredGuaranteed.filter(g => g.brand === brand);
  }

  if (search) {
    filteredGuaranteed = filteredGuaranteed.filter(g =>
      g.model.toLowerCase().includes(search) ||
      g.stationName.toLowerCase().includes(search)
    );
  }

  const stationIdsWithCars = [...new Set(filteredGuaranteed.map(g => g.stationId))];
  const filteredStations = stations.map(s => ({
    ...s,
    guaranteedCount: filteredGuaranteed.filter(g => g.stationId === s.id).length
  }));

  return { stations: filteredStations, guaranteed: filteredGuaranteed };
}

function renderCars() {
  const { guaranteed: filteredGuaranteed } = getFilteredData();

  document.getElementById('cars-count').textContent = `(${filteredGuaranteed.length})`;
  const carsGrid = document.getElementById('cars-grid');

  if (filteredGuaranteed.length === 0) {
    carsGrid.innerHTML = `
      <div class="col-span-full text-center py-16">
        <div class="text-4xl font-bold mb-4 opacity-30">NO RESULTS</div>
        <p class="text-white/40 text-lg">No guaranteed models match your filters</p>
      </div>
    `;
    return;
  }

  carsGrid.innerHTML = filteredGuaranteed.map((g, i) => {
    const delay = i * 30;
    const station = stations.find(s => s.id === g.stationId);
    return `
      <div class="magic-card overflow-hidden group reveal" style="transition-delay: ${delay}ms" data-station-id="${g.stationId}">
        <div class="car-image-bg aspect-[4/3] flex items-center justify-center relative">
          ${g.imageUrl
            ? `<img src="${g.imageUrl}" alt="${g.model}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10">`
            : `<div class="text-4xl font-bold opacity-10 group-hover:opacity-20 transition-opacity duration-500 relative z-10 tracking-widest">SIXT</div>`
          }
          <div class="absolute top-3 right-3 px-3 py-1 rounded-xl bg-pink-500/80 text-white text-xs font-bold backdrop-blur-sm z-20 border border-pink-400/30">GUARANTEED</div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div class="p-5 relative z-10">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-bold text-purple-400 uppercase tracking-wider">${g.brand}</span>
            <span class="w-1 h-1 rounded-full bg-white/20"></span>
            <span class="text-xs text-white/40">${g.category}</span>
          </div>
          <h4 class="font-bold text-white text-lg mb-2 group-hover:text-gradient transition-colors">${g.model}</h4>
          ${g.price ? `<div class="text-sm text-amber-400 font-semibold mb-3">${g.price}</div>` : ''}
          <div class="flex items-center gap-2 text-xs text-white/40 cursor-pointer hover:text-white/60 transition-colors" onclick="flyToStation('${g.stationId}')">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            ${g.stationName}${station && station.iata ? ` (${station.iata})` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  setTimeout(() => document.querySelectorAll('#cars-grid .reveal').forEach(el => el.classList.add('visible')), 100);
}

function flyToStation(stationId) {
  const station = stations.find(s => s.id === stationId);
  if (station && map) {
    map.flyTo([station.lat, station.lng], 10, { duration: 1.5 });
  }
}

function setupEventListeners() {
  ['filter-country', 'filter-brand'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        updateMapMarkers();
        renderCars();
      });
    }
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      updateMapMarkers();
      renderCars();
    });
  }
}

function showError(msg) {
  document.body.innerHTML = `
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="text-2xl font-bold mb-4 opacity-50">ERROR</div>
        <p class="text-white/50">${msg}</p>
      </div>
    </div>
  `;
}

function getCountryName(code) {
  const map = {
    'SE': 'Sweden', 'FR': 'France', 'DE': 'Germany', 'CH': 'Switzerland',
    'AE': 'UAE', 'GB': 'UK', 'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands',
    'AT': 'Austria', 'US': 'USA', 'NO': 'Norway', 'DK': 'Denmark', 'FI': 'Finland',
    'PT': 'Portugal', 'GR': 'Greece', 'TR': 'Turkey', 'CZ': 'Czech Republic',
    'PL': 'Poland', 'HU': 'Hungary', 'QA': 'Qatar', 'IL': 'Israel', 'SG': 'Singapore',
    'TH': 'Thailand', 'HK': 'Hong Kong', 'JP': 'Japan', 'KR': 'South Korea',
    'MY': 'Malaysia', 'PH': 'Philippines', 'ID': 'Indonesia', 'CA': 'Canada',
    'BR': 'Brazil', 'AR': 'Argentina', 'CL': 'Chile', 'CO': 'Colombia', 'MX': 'Mexico',
    'ZA': 'South Africa', 'EG': 'Egypt', 'MA': 'Morocco', 'AU': 'Australia', 'NZ': 'New Zealand'
  };
  return map[code] || code;
}

// Start
init();
