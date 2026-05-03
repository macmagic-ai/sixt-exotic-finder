#!/usr/bin/env node
/**
 * Sixt Exotic Car Scraper
 * Uses Playwright with stealth to extract real fleet data from Sixt.com
 * Run: node scripts/scraper.js
 */

const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth');

// Enable stealth
chromium.use(stealth());

const STATIONS = [
  { id: 'ARN01', name: 'Stockholm Arlanda Airport', slug: 'sweden/stockholm/stockholm-arlanda-airport' },
  { id: 'NCE01', name: 'Nice Airport', slug: 'france/nice/nice-airport' },
  { id: 'FRA01', name: 'Frankfurt Airport', slug: 'germany/frankfurt/frankfurt-airport' },
  { id: 'MUC01', name: 'Munich Airport', slug: 'germany/munich/munich-airport' },
  { id: 'ZRH01', name: 'Zurich Airport', slug: 'switzerland/zurich/zurich-airport' },
  { id: 'GVA01', name: 'Geneva Airport', slug: 'switzerland/geneva/geneva-airport' },
  { id: 'DXB01', name: 'Dubai Int. Airport Terminal 3', slug: 'united-arab-emirates/dubai/dubai-int-airport-terminal-3' },
  { id: 'LHR01', name: 'London Heathrow Airport', slug: 'united-kingdom/london/london-heathrow-airport' },
  { id: 'CDG01', name: 'Paris CDG Airport', slug: 'france/roissy/paris-cdg-airport' },
  { id: 'MXP01', name: 'Milan Malpensa Airport T1', slug: 'italy/milan/milan-ap-malpensa-t1' },
  { id: 'FCO01', name: 'Rome Fiumicino Airport', slug: 'italy/rome/rome-fiumicino-airport' },
  { id: 'BCN01', name: 'Barcelona Airport', slug: 'spain/barcelona/barcelona-airport' },
  { id: 'MAD01', name: 'Madrid Barajas Airport', slug: 'spain/madrid/madrid-barajas-airport' },
  { id: 'AMS01', name: 'Amsterdam Schiphol Airport', slug: 'netherlands/amsterdam/amsterdam-schiphol-airport' },
  { id: 'VIE01', name: 'Vienna Airport', slug: 'austria/vienna/vienna-airport' },
  { id: 'LAX01', name: 'Los Angeles Airport', slug: 'usa/los-angeles/los-angeles-airport' },
  { id: 'MIA01', name: 'Miami Airport', slug: 'usa/miami-fl/miami-international-airport' },
  { id: 'JFK01', name: 'New York JFK Airport', slug: 'usa/new-york/jfk-airport' },
  { id: 'LAS01', name: 'Las Vegas Airport', slug: 'usa/las-vegas/las-vegas-airport' },
  { id: 'SFO01', name: 'San Francisco Airport', slug: 'usa/san-francisco/san-francisco-airport' }
];

// Keywords for exotic car detection
const EXOTIC_KEYWORDS = [
  'porsche', 'ferrari', 'lamborghini', 'mclaren', 'aston martin',
  'bentley', 'rolls-royce', 'maserati', 'corvette', 'mustang',
  'challenger', 'hellcat', 'bmw m8', 'bmw z4', 'bmw 8 series', 'bmw 4 series',
  'bmw 2 series', 'audi r8', 'audi rs', 'mercedes-amg', 'mercedes g-class',
  'amg gt', 'tesla model s', 'tesla roadster', 'camaro', 'sl 55'
];

function isExotic(name) {
  const lower = name.toLowerCase();
  return EXOTIC_KEYWORDS.some(k => lower.includes(k.toLowerCase()));
}

function extractBrand(name) {
  const brands = [
    ['Mercedes-AMG', 'mercedes-amg'], ['Mercedes-Benz', 'mercedes-benz'], ['Mercedes', 'mercedes'],
    ['Porsche', 'porsche'], ['Ferrari', 'ferrari'], ['Lamborghini', 'lamborghini'],
    ['McLaren', 'mclaren'], ['Aston Martin', 'aston martin'],
    ['Bentley', 'bentley'], ['Rolls-Royce', 'rolls-royce'], ['Maserati', 'maserati'],
    ['Chevrolet', 'chevrolet'], ['Ford', 'ford'], ['BMW', 'bmw'], ['Audi', 'audi'],
    ['Tesla', 'tesla'], ['Dodge', 'dodge']
  ];
  const lower = name.toLowerCase();
  for (const [brand, search] of brands) {
    if (lower.includes(search)) return brand;
  }
  return 'Other';
}

async function scrapeStation(page, station) {
  const url = `https://www.sixt.com/car-rental/${station.slug}/`;
  console.log(`\n📍 ${station.name}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000); // Wait for fleet slider to load

    // Extract fleet data from DOM
    const cars = await page.evaluate(() => {
      const links = document.querySelectorAll('a[href*="betafunnel"]');
      const result = [];
      links.forEach(link => {
        const heading = link.querySelector('h3');
        if (heading) {
          const text = link.textContent.trim().replace(/\s+/g, ' ');
          const guaranteed = text.includes('Guaranteed model');
          const orSimilar = text.includes('or similar');
          // Extract category (text after "|" before price)
          const catMatch = text.match(/\|\s*([^from]+)\s*from/i);
          const category = catMatch ? catMatch[1].trim() : 'Car';
          // Extract price
          const priceMatch = text.match(/from\s*([\d$.,]+)\s*\/\s*day/i);
          const price = priceMatch ? `$${priceMatch[1]}/day` : null;
          result.push({
            heading: heading.textContent.trim(),
            category,
            price,
            guaranteed: guaranteed && !orSimilar
          });
        }
      });
      return result;
    });

    const exotics = cars.filter(c => isExotic(c.heading));

    if (exotics.length > 0) {
      console.log(`  ✅ Found ${exotics.length} exotic(s):`);
      exotics.forEach(e => {
        const lock = e.guaranteed ? '🔒' : '  ';
        console.log(`     ${lock} ${e.heading} | ${e.category} | ${e.price || 'N/A'}`);
      });
    } else {
      console.log(`  ⚪ No exotics found (${cars.length} cars checked)`);
    }

    return exotics.map(e => ({
      stationId: station.id,
      stationName: station.name,
      model: e.heading,
      brand: extractBrand(e.heading),
      category: e.category,
      guaranteed: e.guaranteed,
      price: e.price,
      imageUrl: null,
      firstSeen: new Date().toISOString().split('T')[0],
      lastSeen: new Date().toISOString().split('T')[0]
    }));

  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
    return [];
  }
}

async function main() {
  console.log('🚗 Sixt Exotic Car Scraper\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const allExotics = [];

  for (const station of STATIONS) {
    const exotics = await scrapeStation(page, station);
    allExotics.push(...exotics);
    await page.waitForTimeout(2000); // Be nice to Sixt
  }

  await browser.close();

  // Save results
  const fs = require('fs');
  const path = require('path');

  fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'exotics.json'),
    JSON.stringify(allExotics, null, 2)
  );

  // Update stations
  const stationsPath = path.join(__dirname, '..', 'data', 'stations.json');
  const stations = JSON.parse(fs.readFileSync(stationsPath));
  const stationIdsWithExotics = new Set(allExotics.map(e => e.stationId));
  stations.forEach(s => {
    s.hasExotics = stationIdsWithExotics.has(s.id);
    s.exoticCount = allExotics.filter(e => e.stationId === s.id).length;
  });
  fs.writeFileSync(stationsPath, JSON.stringify(stations, null, 2));

  console.log(`\n✅ Done!`);
  console.log(`   Stations checked: ${STATIONS.length}`);
  console.log(`   With exotics: ${stationIdsWithExotics.size}`);
  console.log(`   Total exotic cars: ${allExotics.length}`);
  console.log(`   Guaranteed: ${allExotics.filter(e => e.guaranteed).length}`);
}

main().catch(console.error);
