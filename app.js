/**
 * Sixt Exotic Finder - MagicUI Inspired Frontend
 * Particle effects, scroll reveals, glass morphism
 */

let stations = [];
let exotics = [];

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
    renderCars();
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
    withCars: stations.filter(s => s.hasExotics).length,
    cars: exotics.length,
    guaranteed: exotics.filter(e => e.guaranteed).length,
    premium: exotics.filter(e => e.priceNum >= 200).length
  };

  animateCounter(document.getElementById('stat-stations'), stats.stations);
  animateCounter(document.getElementById('stat-exotics'), stats.withCars);
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
  const minPrice = parseInt(document.getElementById('filter-price').value) || 0;
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

  if (minPrice > 0) {
    filteredExotics = filteredExotics.filter(e => {
      const priceMatch = e.price.match(/\$(\d+)/);
      return priceMatch && parseInt(priceMatch[1]) >= minPrice;
    });
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

function renderCars() {
  const { exotics: filteredExotics } = getFilteredData();

  document.getElementById('cars-count').textContent = `(${filteredExotics.length})`;
  const carsGrid = document.getElementById('cars-grid');

  if (filteredExotics.length === 0) {
    carsGrid.innerHTML = `
      <div class="col-span-full text-center py-16">
        <div class="text-4xl font-bold mb-4 opacity-30">NO RESULTS</div>
        <p class="text-white/40 text-lg">No exotic cars match your filters</p>
        <p class="text-white/20 text-sm mt-2">Try adjusting your search criteria</p>
      </div>
    `;
    return;
  }

  carsGrid.innerHTML = filteredExotics.map((e, i) => {
    const delay = i * 30;
    const station = stations.find(s => s.id === e.stationId);
    return `
      <div class="magic-card overflow-hidden group reveal" style="transition-delay: ${delay}ms">
        <div class="car-image-bg aspect-[4/3] flex items-center justify-center relative">
          ${e.imageUrl
            ? `<img src="${e.imageUrl.startsWith('http') ? e.imageUrl : 'https://www.sixt.com' + e.imageUrl}" alt="${e.model}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10">`
            : `<div class="text-4xl font-bold opacity-10 group-hover:opacity-20 transition-opacity duration-500 relative z-10 tracking-widest">SIXT</div>`
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
          ${e.price ? `<div class="text-sm text-amber-400 font-semibold mb-3">${e.price}</div>` : ''}
          <div class="flex items-center gap-2 text-xs text-white/40">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            ${e.stationName}${station && station.iata ? ` (${station.iata})` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  setTimeout(() => document.querySelectorAll('#cars-grid .reveal').forEach(el => el.classList.add('visible')), 100);
}

function setupEventListeners() {
  // Filters
  ['filter-country', 'filter-brand', 'filter-guaranteed', 'filter-price'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', () => {
        renderCars();
      });
    }
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
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
