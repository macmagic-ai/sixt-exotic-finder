#!/usr/bin/env node
/**
 * Sixt Exotic Car Fetcher
 * 
 * Scrapes Sixt station pages for guaranteed exotic/supercar models.
 * Uses page-data JSON from station pages to extract fleet information.
 * 
 * Research notes (see docs/api-research.md):
 * - Sixt station pages: /car-rental/{country}/{city}/{station-slug}/
 * - Page-data JSON: /car-rental/.../page-data-{hash}.json
 * - Fleet slider in page-data shows category cars ("or similar")
 * - Guaranteed models may appear in fleet guide or offerlist API
 * - Offerlist funnel: /betafunnel/#/offerlist?ctyp={type}&uci={stationId}&uda={date}&rda={date}
 */

const fs = require('fs');
const path = require('path');
const stations = require('./stations-list');

const DATA_DIR = path.join(__dirname, '..', 'data');
const EXOTIC_BRANDS = [
  'porsche', 'ferrari', 'lamborghini', 'mclaren', 'aston martin',
  'bentley', 'rolls-royce', 'maserati', 'corvette', 'mustang gt',
  'dodge challenger', 'hellcat', 'bmw m8', 'audi r8', 'mercedes-amg gt',
  'mercedes g-class', 'tesla model s', 'ford mustang', 'chevrolet corvette'
];

// Keywords that indicate a non-exotic car to filter out
const NORMAL_CAR_KEYWORDS = [
  'vw ', 'volkswagen', 'toyota', 'nissan', 'hyundai', 'kia', 'skoda',
  'seat', 'peugeot', 'citroen', 'renault', 'fiat', 'opel', 'vauxhall',
  'ford fiesta', 'ford focus', 'honda', 'mazda', 'subaru', 'suzuki',
  'bmw 1', 'bmw 2', 'bmw 3', 'bmw 5', 'bmw x1', 'bmw x3', 'bmw x5',
  'mercedes a-', 'mercedes b-', 'mercedes c-', 'mercedes e-', 'mercedes gla',
  'mercedes glc', 'mercedes gle', 'audi a1', 'audi a3', 'audi a4', 'audi a5',
  'audi a6', 'audi q2', 'audi q3', 'audi q5', 'audi q7',
  'golf', 'polo', 'passat', 'tiguan', 't-roc', 'yaris', 'corolla', 'camry',
  'versa', 'sentra', 'altima', 'elantra', 'i30', 'octavia', 'fabia',
  'leon', 'ibiza', '208', '308', 'c3', 'c4', 'clio', 'megane', 'corsa',
  'astra', '500', 'panda', 'swift', 'jazz', 'civic'
];

function isExotic(carName) {
  const lower = carName.toLowerCase();
  
  // Must match an exotic brand
  const isExoticBrand = EXOTIC_BRANDS.some(b => lower.includes(b.toLowerCase()));
  if (!isExoticBrand) return false;
  
  // Must NOT be a normal car variant
  const isNormal = NORMAL_CAR_KEYWORDS.some(k => lower.includes(k.toLowerCase()));
  if (isNormal) return false;
  
  return true;
}

function isGuaranteedModel(carName, subheading) {
  const text = `${carName} ${subheading || ''}`.toLowerCase();
  return text.includes('guaranteed') && !text.includes('or similar');
}

async function fetchWithTimeout(url, options = {}, timeout = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

async function fetchStationPageData(station) {
  // Try to fetch the station page and extract page-data JSON URL
  const stationUrl = `https://www.sixt.com/car-rental/${slugifyCountry(station.country)}/${slugifyCity(station.city)}/${slugifyStation(station.name)}/`;
  
  try {
    const res = await fetchWithTimeout(stationUrl);
    if (!res.ok) return null;
    
    const html = await res.text();
    
    // Extract page-data JSON URL
    const pageDataMatch = html.match(/page-data-([a-f0-9]+)-([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2})\.json/);
    if (!pageDataMatch) {
      console.log(`  No page-data found for ${station.name}`);
      return null;
    }
    
    const pageDataUrl = `${stationUrl}page-data-${pageDataMatch[1]}-${pageDataMatch[2]}.json`;
    
    const pdRes = await fetchWithTimeout(pageDataUrl);
    if (!pdRes.ok) return null;
    
    const pd = await pdRes.json();
    return pd;
  } catch (e) {
    console.log(`  Error fetching ${station.name}: ${e.message}`);
    return null;
  }
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
  return city.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function slugifyStation(name) {
  return name.toLowerCase()
    .replace(/airport/g, 'airport')
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

async function main() {
  console.log('🚗 Sixt Exotic Car Fetcher');
  console.log(`Checking ${stations.length} stations...\n`);
  
  const results = {
    lastUpdated: new Date().toISOString(),
    stations: [],
    exotics: []
  };
  
  for (const station of stations) {
    console.log(`📍 ${station.name}`);
    
    const pageData = await fetchStationPageData(station);
    
    const stationResult = {
      ...station,
      hasExotics: false,
      lastChecked: new Date().toISOString().split('T')[0]
    };
    
    if (pageData) {
      const offers = pageData?.data?.pageSpecificConfiguration?.fleetslider?.offers || [];
      
      for (const offer of offers) {
        const carName = offer.heading || '';
        const subheading = offer.subheading || '';
        
        if (isExotic(carName)) {
          const guaranteed = isGuaranteedModel(carName, subheading);
          
          results.exotics.push({
            stationId: station.id,
            stationName: station.name,
            model: carName,
            brand: extractBrand(carName),
            category: extractCategory(subheading),
            guaranteed: guaranteed,
            imageUrl: offer.sources?.[0]?.src || null,
            firstSeen: new Date().toISOString().split('T')[0],
            lastSeen: new Date().toISOString().split('T')[0]
          });
          
          stationResult.hasExotics = true;
          console.log(`  ✅ ${carName}${guaranteed ? ' (GUARANTEED)' : ''}`);
        }
      }
      
      if (!stationResult.hasExotics) {
        console.log(`  ⚪ No exotics found`);
      }
    } else {
      console.log(`  ❌ Could not fetch data`);
    }
    
    results.stations.push(stationResult);
    
    // Rate limiting
    await new Promise(r => setTimeout(r, 1000));
  }
  
  // Save results
  fs.writeFileSync(path.join(DATA_DIR, 'stations.json'), JSON.stringify(results.stations, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'exotics.json'), JSON.stringify(results.exotics, null, 2));
  
  console.log(`\n✅ Done!`);
  console.log(`   Stations checked: ${results.stations.length}`);
  console.log(`   Stations with exotics: ${results.stations.filter(s => s.hasExotics).length}`);
  console.log(`   Total exotic cars found: ${results.exotics.length}`);
  console.log(`   Guaranteed models: ${results.exotics.filter(e => e.guaranteed).length}`);
}

function extractBrand(carName) {
  const brands = ['Porsche', 'Ferrari', 'Lamborghini', 'McLaren', 'Aston Martin', 
    'Bentley', 'Rolls-Royce', 'Maserati', 'Chevrolet', 'Ford', 'BMW', 'Audi', 
    'Mercedes-Benz', 'Mercedes-AMG', 'Tesla', 'Dodge'];
  
  for (const brand of brands) {
    if (carName.toLowerCase().includes(brand.toLowerCase())) return brand;
  }
  return 'Other';
}

function extractCategory(subheading) {
  if (!subheading) return 'Unknown';
  const parts = subheading.split('|').map(s => s.trim());
  return parts[parts.length - 1] || 'Unknown';
}

main().catch(console.error);
