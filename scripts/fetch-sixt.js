#!/usr/bin/env node
/**
 * Sixt Premium Car Finder
 * Strategy: Find guaranteed models OR high-price cars (premium indicator)
 * Uses browser DOM extraction for reliable data
 */

const fs = require('fs');
const path = require('path');
const stations = require('./stations-list');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Price threshold for "premium" cars (in USD)
const PREMIUM_PRICE_THRESHOLD = 200;

function extractPrice(text) {
  // Extract numeric price from "from $XXX.XX / day" text
  const match = text.match(/from\s*\$?(\d+(?:[.,]\d+)?)\s*\/\s*day/i);
  if (!match) return null;
  // Handle both "from 652$36" and "from $652.36" formats
  const priceStr = match[1].replace(',', '');
  return parseInt(priceStr, 10);
}

function isGuaranteed(text) {
  return text.includes('Guaranteed model') && !text.includes('or similar');
}

function extractCategory(text) {
  const catMatch = text.match(/\|\s*([^from]+)\s*from/i);
  return catMatch ? catMatch[1].trim() : 'Car';
}

function extractBrand(name) {
  const brands = [
    ['Mercedes-AMG', 'mercedes-amg'], ['Mercedes-Benz', 'mercedes-benz'], ['Mercedes', 'mercedes'],
    ['Porsche', 'porsche'], ['Ferrari', 'ferrari'], ['Lamborghini', 'lamborghini'],
    ['McLaren', 'mclaren'], ['Aston Martin', 'aston martin'],
    ['Bentley', 'bentley'], ['Rolls-Royce', 'rolls-royce'], ['Maserati', 'maserati'],
    ['Chevrolet', 'chevrolet'], ['Ford', 'ford'], ['BMW', 'bmw'], ['Audi', 'audi'],
    ['Tesla', 'tesla'], ['Dodge', 'dodge'], ['Jaguar', 'jaguar'], ['Land Rover', 'land rover'],
    ['Volvo', 'volvo'], ['Infiniti', 'infiniti'], ['Lexus', 'lexus'], ['Cadillac', 'cadillac']
  ];
  const lower = name.toLowerCase();
  for (const [brand, search] of brands) {
    if (lower.includes(search)) return brand;
  }
  return 'Other';
}

/**
 * Scrape a station using the browser tool
 * This is designed to be run via the browser automation
 */
function generateScrapeScript(station) {
  const url = `https://www.sixt.com/car-rental/${station.slug}/`;
  return `
// Navigate to: ${url}
// Then run:
(() => {
  const links = document.querySelectorAll('a[href*="betafunnel"]');
  const cars = [];
  links.forEach(link => {
    const heading = link.querySelector('h3');
    const img = link.querySelector('img[src*="fleet/png"]');
    if (heading) {
      const text = link.textContent.trim().replace(/\\s+/g, ' ');
      const guaranteed = text.includes('Guaranteed model') && !text.includes('or similar');
      const catMatch = text.match(/\\|\\s*([^from]+)\\s*from/i);
      const category = catMatch ? catMatch[1].trim() : 'Car';
      const priceMatch = text.match(/from\\s*([\\d$.,]+)\\s*\\/\\s*day/i);
      const price = priceMatch ? '$' + priceMatch[1] + '/day' : null;
      const priceNum = priceMatch ? parseInt(priceMatch[1].replace(/[^\\d]/g, '')) : 0;
      cars.push({
        model: heading.textContent.trim(),
        category,
        price,
        priceNum,
        guaranteed,
        imageUrl: img ? img.src : null
      });
    }
  });
  return cars;
})()
`;
}

/**
 * Filter cars: keep if guaranteed OR price >= threshold
 */
function filterPremiumCars(cars) {
  return cars.filter(c => {
    if (c.guaranteed) return true;
    if (c.priceNum && c.priceNum >= PREMIUM_PRICE_THRESHOLD) return true;
    return false;
  });
}

/**
 * Main entry point - generates scrape instructions for all stations
 */
function main() {
  console.log('🚗 Sixt Premium Car Finder');
  console.log(`Strategy: Guaranteed models OR price >= $${PREMIUM_PRICE_THRESHOLD}/day`);
  console.log(`Stations to check: ${stations.length}\n`);

  // Generate scrape scripts for all stations
  const scrapeScripts = stations.map(s => ({
    station: s,
    script: generateScrapeScript(s)
  }));

  // Save scrape scripts
  const outputDir = path.join(__dirname, '..', 'scripts', 'generated');
  fs.mkdirSync(outputDir, { recursive: true });

  // Save as a single batch script
  const batchScript = scrapeScripts.map(({ station, script }) =>
    `\n// === ${station.name} (${station.id}) ===\n${script}`
  ).join('\n');

  fs.writeFileSync(path.join(outputDir, 'scrape-batch.js'), batchScript);

  // Save stations as JSON for the app
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(DATA_DIR, 'stations.json'),
    JSON.stringify(stations.map(s => ({ ...s, hasExotics: false, exoticCount: 0 })), null, 2)
  );

  // Save empty exotics template
  fs.writeFileSync(
    path.join(DATA_DIR, 'exotics.json'),
    JSON.stringify([], null, 2)
  );

  console.log(`✅ Generated scrape scripts for ${stations.length} stations`);
  console.log(`   Output: scripts/generated/scrape-batch.js`);
  console.log(`\nTo scrape:`);
  console.log(`   1. Open a browser tab for each station URL`);
  console.log(`   2. Run the extraction JS in the console`);
  console.log(`   3. Filter results: keep guaranteed OR price >= $${PREMIUM_PRICE_THRESHOLD}`);
  console.log(`   4. Save to data/exotics.json`);
}

// Export for use by other scripts
module.exports = {
  stations,
  PREMIUM_PRICE_THRESHOLD,
  extractPrice,
  isGuaranteed,
  filterPremiumCars,
  extractBrand,
  extractCategory,
  generateScrapeScript
};

if (require.main === module) {
  main();
}
