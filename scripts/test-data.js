#!/usr/bin/env node
/**
 * Data Quality Test Suite
 * Validates scraped data for plausibility and completeness.
 * Run: node scripts/test-data.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Load data
function loadData() {
  try {
    const stations = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'stations.json')));
    const exotics = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'exotics.json')));
    return { stations, exotics };
  } catch (e) {
    console.error(`FAIL: Could not load data files: ${e.message}`);
    process.exit(1);
  }
}

// Test results accumulator
const results = { pass: 0, fail: 0, warnings: 0 };

function pass(msg) {
  results.pass++;
  console.log(`  PASS: ${msg}`);
}

function fail(msg) {
  results.fail++;
  console.log(`  FAIL: ${msg}`);
}

function warn(msg) {
  results.warnings++;
  console.log(`  WARN: ${msg}`);
}

// --- Tests ---

function testStructure({ stations, exotics }) {
  console.log('\n--- Structure Tests ---');

  // Stations must be array
  if (Array.isArray(stations) && stations.length > 0) {
    pass(`Stations is array with ${stations.length} entries`);
  } else {
    fail(`Stations missing or empty`);
  }

  // Exotics must be array
  if (Array.isArray(exotics)) {
    pass(`Exotics is array with ${exotics.length} entries`);
  } else {
    fail(`Exotics missing or not an array`);
  }

  // Every station must have required fields
  const requiredStationFields = ['id', 'name', 'city', 'country', 'lat', 'lng'];
  stations.forEach(s => {
    requiredStationFields.forEach(f => {
      if (s[f] === undefined || s[f] === null) {
        fail(`Station ${s.id || 'UNKNOWN'} missing field: ${f}`);
      }
    });
  });

  // Every exotic must have required fields
  const requiredExoticFields = ['stationId', 'model', 'brand', 'price', 'guaranteed'];
  exotics.forEach((e, i) => {
    requiredExoticFields.forEach(f => {
      if (e[f] === undefined || e[f] === null || e[f] === '') {
        fail(`Exotic #${i} (${e.model || 'unknown'}) missing field: ${f}`);
      }
    });
  });
}

function testReferentialIntegrity({ stations, exotics }) {
  console.log('\n--- Referential Integrity ---');

  const stationIds = new Set(stations.map(s => s.id));

  exotics.forEach((e, i) => {
    if (!stationIds.has(e.stationId)) {
      fail(`Exotic #${i} references unknown station: ${e.stationId}`);
    }
  });

  // Every exotic's stationId must exist
  const orphanCount = exotics.filter(e => !stationIds.has(e.stationId)).length;
  if (orphanCount === 0) {
    pass('All exotics reference valid stations');
  }

  // Station hasExotics flag must match data
  stations.forEach(s => {
    const hasCars = exotics.some(e => e.stationId === s.id);
    if (s.hasExotics !== hasCars) {
      fail(`Station ${s.id} hasExotics=${s.hasExotics} but data says ${hasCars}`);
    }
  });
  pass('Station hasExotics flags match data');
}

function testPricePlausibility({ exotics }) {
  console.log('\n--- Price Plausibility ---');

  exotics.forEach((e, i) => {
    const priceMatch = e.price.match(/\$(\d+)/);
    if (!priceMatch) {
      fail(`Exotic #${i} (${e.model}): unparseable price: ${e.price}`);
      return;
    }
    const priceNum = parseInt(priceMatch[1], 10);

    // No car should be $0
    if (priceNum === 0) {
      fail(`${e.model} at ${e.stationName}: price is $0`);
    }

    // No car should be over $5000/day (likely data error)
    if (priceNum > 5000) {
      fail(`${e.model} at ${e.stationName}: price $${priceNum} seems unrealistic (> $5000)`);
    }

    // Premium cars should be > $100/day
    if (priceNum < 50) {
      warn(`${e.model} at ${e.stationName}: price $${priceNum} seems low for premium tier`);
    }
  });

  const allPrices = exotics.map(e => {
    const m = e.price.match(/\$(\d+)/);
    return m ? parseInt(m[1]) : 0;
  }).filter(p => p > 0);

  if (allPrices.length > 0) {
    const avg = Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length);
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    pass(`Price range: $${min} - $${max} (avg $${avg})`);
  }
}

function testBigAirports({ stations, exotics }) {
  console.log('\n--- Big Airport Plausibility ---');

  // Define major hubs that SHOULD have premium cars
  // These are airports where Sixt typically stocks premium fleet
  const majorHubs = [
    'DXB01', // Dubai
    'FRA01', // Frankfurt
    'MUC01', // Munich
    'JFK01', // New York JFK
    'LAX01', // Los Angeles
    'LHR01', // London Heathrow
    'CDG01', // Paris CDG
    'AMS01', // Amsterdam
    'SIN01', // Singapore
    'ZRH01', // Zurich
    'GVA01', // Geneva
    'AUH01', // Abu Dhabi
    'DOH01', // Doha
    'SFO01', // San Francisco
    'MIA01', // Miami
    'LAS01', // Las Vegas
    'ORD01', // Chicago
    'DFW01', // Dallas
    'SEA01', // Seattle
    'ATL01', // Atlanta
    'BOS01', // Boston
    'GRU01', // Sao Paulo
    'JNB01', // Johannesburg
    'SYD01', // Sydney
    'HKG01', // Hong Kong
    'NRT01', // Tokyo Narita
    'ICN01', // Seoul
  ];

  // Hubs that were scraped but have NO cars are suspicious
  const hubsWithoutCars = [];
  majorHubs.forEach(id => {
    const station = stations.find(s => s.id === id);
    if (!station) return; // Not in our list yet

    const hasCars = exotics.some(e => e.stationId === id);
    if (!hasCars) {
      hubsWithoutCars.push(station.name);
    }
  });

  if (hubsWithoutCars.length > 0) {
    warn(`Major hubs without premium cars: ${hubsWithoutCars.join(', ')}`);
    warn('This may be correct (no premium fleet) or indicate incomplete scraping');
  } else {
    pass('All major hubs have premium cars');
  }

  // Hubs that DO have cars should have at least one guaranteed OR price >= $200
  const hubsWithCars = majorHubs.filter(id => exotics.some(e => e.stationId === id));
  const wellStockedHubs = hubsWithCars.filter(id => {
    return exotics.some(e => {
      if (e.stationId !== id) return false;
      if (e.guaranteed) return true;
      const m = e.price.match(/\$(\d+)/);
      return m && parseInt(m[1]) >= 200;
    });
  });

  pass(`${wellStockedHubs.length}/${hubsWithCars.length} hubs with cars have guaranteed/$200+ models`);
}

function testDuplicateDetection({ exotics }) {
  console.log('\n--- Duplicate Detection ---');

  const seen = new Map();
  const duplicates = [];

  exotics.forEach((e, i) => {
    const key = `${e.stationId}|${e.model}`;
    if (seen.has(key)) {
      duplicates.push({ model: e.model, station: e.stationName, indices: [seen.get(key), i] });
    } else {
      seen.set(key, i);
    }
  });

  if (duplicates.length === 0) {
    pass('No duplicate car/station combinations');
  } else {
    duplicates.forEach(d => {
      fail(`Duplicate: ${d.model} at ${d.station} (indices ${d.indices.join(', ')})`);
    });
  }
}

function testGuaranteedCars({ exotics }) {
  console.log('\n--- Guaranteed Car Quality ---');

  const guaranteed = exotics.filter(e => e.guaranteed);

  if (guaranteed.length === 0) {
    warn('No guaranteed models found — premium fleet may be missing');
    return;
  }

  pass(`${guaranteed.length} guaranteed models found`);

  // Guaranteed cars should generally be expensive
  guaranteed.forEach(e => {
    const m = e.price.match(/\$(\d+)/);
    const price = m ? parseInt(m[1]) : 0;
    if (price < 200) {
      warn(`Guaranteed model ${e.model} at ${e.stationName} is only $${price}/day — verify if correct`);
    }
  });
}

// --- Main ---

function main() {
  console.log('======================================');
  console.log('  Sixt Premium Car Data Quality Test');
  console.log('======================================');

  const data = loadData();

  testStructure(data);
  testReferentialIntegrity(data);
  testPricePlausibility(data);
  testBigAirports(data);
  testDuplicateDetection(data);
  testGuaranteedCars(data);

  console.log('\n======================================');
  console.log(`  Results: ${results.pass} passed, ${results.fail} failed, ${results.warnings} warnings`);
  console.log('======================================');

  if (results.fail > 0) {
    console.log('\nSome tests FAILED. Review errors above.');
    process.exit(1);
  } else if (results.warnings > 0) {
    console.log('\nAll tests passed with warnings.');
    process.exit(0);
  } else {
    console.log('\nAll tests PASSED!');
    process.exit(0);
  }
}

main();
