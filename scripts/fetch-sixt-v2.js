#!/usr/bin/env node
/**
 * Sixt Exotic Car Fetcher v2
 * Uses Sixt's page-data JSON endpoint to extract real fleet data.
 * Page-data is server-rendered and accessible without Cloudflare blocks.
 */

const fs = require('fs');
const path = require('path');
const stations = require('./stations-list');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Exotic car detection
const EXOTIC_BRANDS = [
  'porsche', 'ferrari', 'lamborghini', 'mclaren', 'aston martin',
  'bentley', 'rolls-royce', 'maserati', 'chevrolet corvette', 'ford mustang',
  'dodge challenger', 'bmw m8', 'audi r8', 'mercedes-amg gt', 'mercedes g-class',
  'tesla model s', 'tesla roadster'
];

const NORMAL_KEYWORDS = [
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
  const hasExoticBrand = EXOTIC_BRANDS.some(b => lower.includes(b.toLowerCase()));
  if (!hasExoticBrand) return false;
  const isNormal = NORMAL_KEYWORDS.some(k => lower.includes(k.toLowerCase()));
  return !isNormal;
}

function extractBrand(name) {
  const brands = ['Porsche', 'Ferrari', 'Lamborghini', 'McLaren', 'Aston Martin',
    'Bentley', 'Rolls-Royce', 'Maserati', 'Chevrolet', 'Ford', 'BMW', 'Audi',
    'Mercedes-Benz', 'Mercedes-AMG', 'Mercedes', 'Tesla', 'Dodge'];
  for (const b of brands) {
    if (name.toLowerCase().includes(b.toLowerCase())) return b;
  }
  return 'Other';
}

function extractCategory(subheading) {
  if (!subheading) return 'Unknown';
  const parts = subheading.split('|').map(s => s.trim());
  return parts[parts.length - 1] || 'Unknown';
}

function isGuaranteed(heading, subheading) {
  const text = `${heading} ${subheading || ''}`.toLowerCase();
  return text.includes('guaranteed') && !text.includes('or similar');
}

async function fetchWithTimeout(url, timeout = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      'Accept': 'application/json'
    }});
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

async function fetchStationFleet(station) {
  const stationUrl = `https://www.sixt.com/car-rental/${station.slug}/`;

  try {
    // Step 1: Get station page HTML to find page-data URL
    const htmlRes = await fetchWithTimeout(stationUrl);
    if (!htmlRes.ok) {
      console.log(`  ❌ HTTP ${htmlRes.status} for ${station.name}`);
      return [];
    }

    const html = await htmlRes.text();

    // Extract page-data JSON URL
    const pageDataMatch = html.match(/page-data-([a-f0-9]+)-([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2})\.json/);
    if (!pageDataMatch) {
      console.log(`  ⚠️ No page-data found`);
      return [];
    }

    const pageDataUrl = `${stationUrl}page-data-${pageDataMatch[1]}-${pageDataMatch[2]}.json`;

    // Step 2: Fetch page-data JSON
    const pdRes = await fetchWithTimeout(pageDataUrl);
    if (!pdRes.ok) {
      console.log(`  ❌ Page-data HTTP ${pdRes.status}`);
      return [];
    }

    const pd = await pdRes.json();
    const offers = pd?.data?.pageSpecificConfiguration?.fleetslider?.offers || [];

    const cars = [];
    for (const offer of offers) {
      const heading = offer.heading || '';
      const subheading = offer.subheading || '';
      // Sixt puts the actual model in subheading (e.g., "or similar | FORD MUSTANG CONVERTIBLE")
      const carName = subheading.replace(/^or similar\s*\|\s*/, '').trim() || heading;

      if (isExotic(carName)) {
        cars.push({
          stationId: station.id,
          stationName: station.name,
          model: carName,
          brand: extractBrand(carName),
          category: extractCategory(subheading),
          guaranteed: isGuaranteed(heading, subheading),
          imageUrl: offer.sources?.[0]?.src || null,
          sixtUrl: offer.href ? `https://www.sixt.com${offer.href}` : null,
          firstSeen: new Date().toISOString().split('T')[0],
          lastSeen: new Date().toISOString().split('T')[0]
        });
      }
    }

    return cars;

  } catch (e) {
    console.log(`  ❌ Error: ${e.message}`);
    return [];
  }
}

async function main() {
  console.log('🚗 Sixt Exotic Car Fetcher v2');
  console.log(`Checking ${stations.length} stations...\n`);

  const results = {
    lastUpdated: new Date().toISOString(),
    stations: [],
    exotics: []
  };

  for (const station of stations) {
    console.log(`📍 ${station.name}`);
    const cars = await fetchStationFleet(station);

    const stationResult = {
      ...station,
      hasExotics: cars.length > 0,
      exoticCount: cars.length,
      lastChecked: new Date().toISOString().split('T')[0]
    };

    if (cars.length > 0) {
      cars.forEach(c => {
        console.log(`  ✅ ${c.model}${c.guaranteed ? ' (GUARANTEED)' : ''}`);
      });
      results.exotics.push(...cars);
    } else {
      console.log(`  ⚪ No exotics found`);
    }

    results.stations.push(stationResult);

    // Rate limiting - be nice to Sixt
    await new Promise(r => setTimeout(r, 1500));
  }

  // Save results
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, 'stations.json'), JSON.stringify(results.stations, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'exotics.json'), JSON.stringify(results.exotics, null, 2));

  console.log(`\n✅ Done!`);
  console.log(`   Stations: ${results.stations.length}`);
  console.log(`   With exotics: ${results.stations.filter(s => s.hasExotics).length}`);
  console.log(`   Total cars: ${results.exotics.length}`);
  console.log(`   Guaranteed: ${results.exotics.filter(e => e.guaranteed).length}`);
}

main().catch(console.error);
