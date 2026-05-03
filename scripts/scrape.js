#!/usr/bin/env node
/**
 * Sixt Guaranteed Model Scraper
 * Extracts ONLY guaranteed-model cars from betafunnel
 * 
 * Usage: node scripts/scrape.js
 * Output: data/guaranteed.json
 */

const fs = require('fs');
const path = require('path');
const stations = require('./stations-list');

const DATA_DIR = path.join(__dirname, '..', 'data');
const OUTPUT_FILE = path.join(DATA_DIR, 'guaranteed.json');
const STATIONS_FILE = path.join(DATA_DIR, 'stations.json');

// Scrape a single station via browser automation
// This script generates the JS to run in browser console
function generateExtractScript(station) {
  const pickupDate = getFutureDate(4);
  const returnDate = getFutureDate(4, 3); // +3 days
  
  return `
// === ${station.name} ===
// Step 1: Visit: https://www.sixt.com/car-rental/${station.slug}/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=${pickupDate}&rda=${returnDate}&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
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
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\\\$(\\d+(?:\\.\\d+)?)\\s*\\/\\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()
`;
}

function getFutureDate(monthsAhead, daysAdd = 0) {
  const d = new Date();
  d.setMonth(d.getMonth() + monthsAhead);
  d.setDate(d.getDate() + daysAdd);
  return d.toISOString().split('T')[0].replace(/-/g, '');
}

function main() {
  console.log('🚗 Sixt Guaranteed Model Scraper');
  console.log(`Stations: ${stations.length}\n`);
  
  // Generate scrape scripts for all stations
  const scripts = stations.map(s => ({
    station: s,
    script: generateExtractScript(s)
  }));
  
  // Save batch script
  const outDir = path.join(__dirname, 'generated');
  fs.mkdirSync(outDir, { recursive: true });
  
  const batch = scripts.map(({station, script}) => 
    `\n// === ${station.name} (${station.id}) ===\n${script}`
  ).join('\n');
  
  fs.writeFileSync(path.join(outDir, 'scrape-guaranteed.js'), batch);
  
  // Init empty data files
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(OUTPUT_FILE)) {
    fs.writeFileSync(OUTPUT_FILE, '[]');
  }
  
  // Reset station counts
  const stationData = stations.map(s => ({...s, guaranteedCount: 0, lastScraped: null}));
  fs.writeFileSync(STATIONS_FILE, JSON.stringify(stationData, null, 2));
  
  console.log('✅ Generated scrape scripts');
  console.log('   Output: scripts/generated/scrape-guaranteed.js');
  console.log('\nTo scrape:');
  console.log('   1. Open browser console on each station page');
  console.log('   2. Run extraction JS');
  console.log('   3. Save results to data/guaranteed.json');
}

// Export for use by automation
module.exports = { generateExtractScript, getFutureDate, stations };

if (require.main === module) {
  main();
}
