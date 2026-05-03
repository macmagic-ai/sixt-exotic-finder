/**
 * Sixt Exotic Finder - Frontend App
 */

let stations = [];
let exotics = [];
let map = null;
let markers = [];

// Initialize
async function init() {
  try {
    const [stationsRes, exoticsRes] = await Promise.all([
      fetch('data/stations.json'),
      fetch('data/exotics.json')
    ]);
    
    stations = await stationsRes.json();
    exotics = await exoticsRes.json();
    
    updateStats();
    populateFilters();
    initMap();
    renderList();
    setupEventListeners();
  } catch (e) {
    console.error('Failed to load data:', e);
    showError('Failed to load station data. Please try again later.');
  }
}

function updateStats() {
  document.getElementById('stat-stations').textContent = stations.length;
  document.getElementById('stat-exotics').textContent = stations.filter(s => s.hasExotics).length;
  document.getElementById('stat-cars').textContent = exotics.length;
  document.getElementById('stat-guaranteed').textContent = exotics.filter(e => e.guaranteed).length;
  
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
      e.city?.toLowerCase().includes(search)
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
  map = L.map('map', {
    zoomControl: false,
    attributionControl: false
  }).setView([48.0, 10.0], 4);
  
  // Dark theme tiles
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);
  
  // Custom zoom control
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  
  updateMapMarkers();
}

function updateMapMarkers() {
  // Clear existing markers
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  
  const { stations: filteredStations } = getFilteredData();
  
  filteredStations.forEach(station => {
    const hasExotics = station.hasExotics;
    
    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="${hasExotics ? 'marker-exotic' : 'marker-none'} w-4 h-4"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
    
    const marker = L.marker([station.lat, station.lng], { icon })
      .addTo(map);
    
    const stationExotics = exotics.filter(e => e.stationId === station.id);
    const popupContent = `
      <div class="min-w-[200px]">
        <h3 class="font-bold text-lg mb-1">${station.name}</h3>
        <p class="text-sm text-white/60 mb-2">${station.city}, ${getCountryName(station.country)}</p>
        ${hasExotics 
          ? `<div class="space-y-1">
              <p class="text-emerald-400 font-medium text-sm">${stationExotics.length} exotic car${stationExotics.length > 1 ? 's' : ''}</p>
              ${stationExotics.slice(0, 3).map(e => 
                `<div class="text-sm flex items-center gap-1">
                  ${e.guaranteed ? '🔒' : ''} ${e.model}
                </div>`
              ).join('')}
              ${stationExotics.length > 3 ? `<p class="text-xs text-white/40">+${stationExotics.length - 3} more</p>` : ''}
             </div>`
          : '<p class="text-gray-400 text-sm">No exotic cars at this station</p>'
        }
      </div>
    `;
    
    marker.bindPopup(popupContent);
    markers.push(marker);
  });
}

function renderList() {
  const { stations: filteredStations, exotics: filteredExotics } = getFilteredData();
  
  // Render stations grid
  const stationsGrid = document.getElementById('stations-grid');
  const stationsWithExotics = filteredStations.filter(s => s.hasExotics);
  
  if (stationsWithExotics.length === 0) {
    stationsGrid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="text-6xl mb-4">🔍</div>
        <p class="text-white/50">No exotic cars match your filters</p>
      </div>
    `;
  } else {
    stationsGrid.innerHTML = stationsWithExotics.map(station => {
      const stationExotics = filteredExotics.filter(e => e.stationId === station.id);
      return `
        <div class="glass-card rounded-2xl p-5">
          <div class="flex items-start justify-between mb-3">
            <div>
              <h3 class="font-bold text-lg">${station.name}</h3>
              <p class="text-sm text-white/50">${station.city}, ${getCountryName(station.country)}</p>
            </div>
            <span class="px-2 py-1 rounded-lg text-xs font-medium bg-emerald-500/20 text-emerald-400">
              ${stationExotics.length} car${stationExotics.length > 1 ? 's' : ''}
            </span>
          </div>
          <div class="space-y-2">
            ${stationExotics.map(e => `
              <div class="flex items-center gap-2 text-sm">
                ${e.guaranteed ? '<span class="text-pink-400" title="Guaranteed Model">🔒</span>' : ''}
                <span class="${e.guaranteed ? 'text-pink-300' : 'text-white/80'}">${e.model}</span>
                <span class="text-xs text-white/40 ml-auto">${e.category}</span>
              </div>
            `).join('')}
          </div>
          ${station.iata ? `
            <div class="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-white/40">
              <span>✈️ ${station.iata}</span>
              <span>·</span>
              <a href="https://www.sixt.com/car-rental/${slugifyCountry(station.country)}/${slugifyCity(station.city)}/${slugifyStation(station.name)}/" 
                 target="_blank" class="hover:text-white/70 transition-colors">Book on Sixt →</a>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }
  
  // Render cars grid
  document.getElementById('cars-count').textContent = `(${filteredExotics.length})`;
  const carsGrid = document.getElementById('cars-grid');
  
  carsGrid.innerHTML = filteredExotics.map(e => `
    <div class="glass-card rounded-2xl overflow-hidden group">
      <div class="aspect-[4/3] bg-gradient-to-br from-purple-900/50 to-gray-900/50 flex items-center justify-center relative overflow-hidden">
        ${e.imageUrl 
          ? `<img src="https://www.sixt.com${e.imageUrl}" alt="${e.model}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">`
          : `<div class="text-6xl opacity-30">🏎️</div>`
        }
        ${e.guaranteed 
          ? `<div class="absolute top-2 right-2 px-2 py-1 rounded-lg bg-pink-500/80 text-white text-xs font-bold backdrop-blur-sm">GUARANTEED</div>`
          : ''
        }
      </div>
      <div class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-medium text-purple-400">${e.brand}</span>
          <span class="text-xs text-white/30">·</span>
          <span class="text-xs text-white/40">${e.category}</span>
        </div>
        <h4 class="font-bold text-white mb-2">${e.model}</h4>
        <div class="flex items-center justify-between text-xs">
          <span class="text-white/50 flex items-center gap-1">
            📍 ${e.stationName}
          </span>
        </div>
      </div>
    </div>
  `).join('');
}

function setupEventListeners() {
  // View toggle
  document.getElementById('view-map').addEventListener('click', () => {
    document.getElementById('map-view').classList.remove('hidden');
    document.getElementById('list-view').classList.add('hidden');
    document.getElementById('view-map').classList.add('bg-white/20', 'text-white');
    document.getElementById('view-map').classList.remove('text-white/70');
    document.getElementById('view-list').classList.remove('bg-white/20', 'text-white');
    document.getElementById('view-list').classList.add('text-white/70');
    setTimeout(() => map.invalidateSize(), 100);
  });
  
  document.getElementById('view-list').addEventListener('click', () => {
    document.getElementById('map-view').classList.add('hidden');
    document.getElementById('list-view').classList.remove('hidden');
    document.getElementById('view-list').classList.add('bg-white/20', 'text-white');
    document.getElementById('view-list').classList.remove('text-white/70');
    document.getElementById('view-map').classList.remove('bg-white/20', 'text-white');
    document.getElementById('view-map').classList.add('text-white/70');
  });
  
  // Filters
  ['filter-country', 'filter-brand', 'filter-guaranteed', 'search-input'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
      updateMapMarkers();
      renderList();
    });
    if (id === 'search-input') {
      document.getElementById(id).addEventListener('input', () => {
        updateMapMarkers();
        renderList();
      });
    }
  });
}

function showError(msg) {
  document.body.innerHTML = `
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="text-6xl mb-4">⚠️</div>
        <p class="text-white/70">${msg}</p>
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
