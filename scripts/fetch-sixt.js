#!/usr/bin/env node
/**
 * Sixt Premium Car Finder
 * Strategy: Scrape ALL cars from betafunnel, keep only high-price ones
 * 
 * KEY INSIGHT: The fleet slider only shows 4-5 cars.
 * The betafunnel (booking page) shows ALL 20-30 cars per station.
 * We need to extract the branch ID from the fleet slider,
 * then load the betafunnel to get the full fleet.
 * 
 * IMPORTANT: Pick a random date 3-6 months in the future when scraping.
 */

const fs = require('fs');
const path = require('path');
const stations = require('./stations-list');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Price threshold for "premium" cars (in USD)
const PREMIUM_PRICE_THRESHOLD = 150;

// Default scrape date: 4 months in the future, random day
function getDefaultScrapeDate() {
  const d = new Date();
  d.setMonth(d.getMonth() + 4);
  d.setDate(Math.floor(Math.random() * 28) + 1);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

function extractPrice(text) {
  const match = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
  return match ? parseInt(match[1], 10) : null;
}

function isGuaranteed(text) {
  return text.includes('Guaranteed model') && !text.includes('or similar');
}

function extractBrand(name) {
  const brands = [
    ['Mercedes-AMG', 'mercedes-amg'], ['Mercedes-Benz', 'mercedes-benz'], ['Mercedes', 'mercedes'],
    ['Porsche', 'porsche'], ['Ferrari', 'ferrari'], ['Lamborghini', 'lamborghini'],
    ['McLaren', 'mclaren'], ['Aston Martin', 'aston martin'],
    ['Bentley', 'bentley'], ['Rolls-Royce', 'rolls-royce'], ['Maserati', 'maserati'],
    ['Chevrolet', 'chevrolet'], ['Ford', 'ford'], ['BMW', 'bmw'], ['Audi', 'audi'],
    ['Tesla', 'tesla'], ['Dodge', 'dodge'], ['Jaguar', 'jaguar'], ['Land Rover', 'land rover'],
    ['Volvo', 'volvo'], ['Infiniti', 'infiniti'], ['Lexus', 'lexus'], ['Cadillac', 'cadillac'],
    ['MB', 'mb ']
  ];
  const lower = name.toLowerCase();
  for (const [brand, search] of brands) {
    if (lower.includes(search)) return brand;
  }
  return 'Other';
}

function generateScrapeScript(station) {
  const pickupDate = getDefaultScrapeDate().replace(/-/g, '');
  const returnDate = new Date(new Date(getDefaultScrapeDate()).getTime() + 3 * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0].replace(/-/g, '');
  
  return `
// === ${station.name} (${station.id}) ===
// Step 1: Visit station page to get branch ID
// https://www.sixt.com/car-rental/${station.slug}/
const link = document.querySelector('a[href*="betafunnel"]');
const href = link ? link.getAttribute('href') : '';
const branchMatch = href.match(/BRANCH:(\\d+)/);
const branchId = branchMatch ? branchMatch[1] : null;
console.log('Branch ID:', branchId);

// Step 2: Visit betafunnel (wait 8 seconds)
// https://www.sixt.com/betafunnel/#/offerlist?uci=${branchId}&uda=${pickupDate}&rda=${returnDate}&pickupTime=10:00&returnTime=10:00

// Step 3: Extract premium cars
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\\s+/g, ' ');
    const priceMatch = text.match(/\\\$(\\d+(?:\\.\\d+)?)\\s*\\/\\s*day/);
    if (!priceMatch) return;
    const priceNum = parseInt(priceMatch[1], 10);
    if (priceNum < ${PREMIUM_PRICE_THRESHOLD}) return;
    const priceStr = '$' + priceMatch[1] + '/day';
    const guaranteed = text.includes('Guaranteed model');
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim() : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr, priceNum, guaranteed });
  });
  return cars;
})()
`;
}

function filterPremiumCars(cars) {
  return cars
    .filter(c => c.priceNum && c.priceNum >= PREMIUM_PRICE_THRESHOLD)
    .sort((a, b) => b.priceNum - a.priceNum);
}

function main() {
  console.log('🚗 Sixt Premium Car Finder');
  console.log(`Strategy: Betafunnel scrape, price >= $${PREMIUM_PRICE_THRESHOLD}/day`);
  console.log(`Stations: ${stations.length}\n`);

  const scrapeScripts = stations.map(s => ({
    station: s,
    script: generateScrapeScript(s)
  }));

  const outputDir = path.join(__dirname, '..', 'scripts', 'generated');
  fs.mkdirSync(outputDir, { recursive: true });

  const batchScript = scrapeScripts.map(({ station, script }) =>
    `\n// === ${station.name} (${station.id}) ===\n${script}`
  ).join('\n');

  fs.writeFileSync(path.join(outputDir, 'scrape-batch.js'), batchScript);

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(DATA_DIR, 'stations.json'),
    JSON.stringify(stations.map(s => ({ ...s, hasExotics: false, exoticCount: 0 })), null, 2)
  );
  fs.writeFileSync(path.join(DATA_DIR, 'exotics.json'), JSON.stringify([], null, 2));

  console.log(`✅ Generated scrape scripts for ${stations.length} stations`);
  console.log(`   Output: scripts/generated/scrape-batch.js`);
  console.log(`\nTo scrape:`);
  console.log(`   1. Visit station page, extract branch ID from betafunnel link`);
  console.log(`   2. Visit betafunnel URL with branch ID + future dates`);
  console.log(`   3. Run extraction JS in console`);
  console.log(`   4. Save results to data/exotics.json`);
}

module.exports = {
  stations,
  PREMIUM_PRICE_THRESHOLD,
  extractPrice,
  isGuaranteed,
  filterPremiumCars,
  extractBrand,
  generateScrapeScript
};

if (require.main === module) {
  main();
}
