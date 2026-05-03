#!/usr/bin/env node
/**
 * Browser-based scraper using OpenClaw's browser tool
 * This script generates a sequence of browser commands to scrape all stations
 */

const STATIONS = [
  { id: 'ARN01', name: 'Stockholm Arlanda Airport', slug: 'sweden/stockholm/stockholm-arlanda-airport', done: true },
  { id: 'NCE01', name: 'Nice Airport', slug: 'france/nice/nice-airport', done: true },
  { id: 'FRA01', name: 'Frankfurt Airport', slug: 'germany/frankfurt/frankfurt-airport' },
  { id: 'MUC01', name: 'Munich Airport', slug: 'germany/munich/munich-airport', done: true },
  { id: 'ZRH01', name: 'Zurich Airport', slug: 'switzerland/zurich/zurich-airport' },
  { id: 'GVA01', name: 'Geneva Airport', slug: 'switzerland/geneva/geneva-airport' },
  { id: 'DXB01', name: 'Dubai Int. Airport Terminal 3', slug: 'united-arab-emirates/dubai/dubai-int-airport-terminal-3', done: true },
  { id: 'LHR01', name: 'London Heathrow Airport', slug: 'united-kingdom/london/london-heathrow-airport' },
  { id: 'CDG01', name: 'Paris CDG Airport', slug: 'france/roissy/paris-cdg-airport' },
  { id: 'MXP01', name: 'Milan Malpensa Airport T1', slug: 'italy/milan/milan-ap-malpensa-t1' },
  { id: 'FCO01', name: 'Rome Fiumicino Airport', slug: 'italy/rome/rome-fiumicino-airport' },
  { id: 'BCN01', name: 'Barcelona Airport', slug: 'spain/barcelona/barcelona-airport' },
  { id: 'MAD01', name: 'Madrid Barajas Airport', slug: 'spain/madrid/madrid-barajas-airport' },
  { id: 'AMS01', name: 'Amsterdam Schiphol Airport', slug: 'netherlands/amsterdam/amsterdam-schiphol-airport' },
  { id: 'VIE01', name: 'Vienna Airport', slug: 'austria/vienna/vienna-airport' },
  { id: 'LAX01', name: 'Los Angeles Airport', slug: 'usa/los-angeles/los-angeles-airport', done: true },
  { id: 'MIA01', name: 'Miami Airport', slug: 'usa/miami-fl/miami-international-airport', done: true },
  { id: 'JFK01', name: 'New York JFK Airport', slug: 'usa/new-york/jfk-airport' },
  { id: 'LAS01', name: 'Las Vegas Airport', slug: 'usa/las-vegas/las-vegas-airport' },
  { id: 'SFO01', name: 'San Francisco Airport', slug: 'usa/san-francisco/san-francisco-airport' }
];

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

// Manual data from already-scraped stations
const existingData = [
  { stationId: 'ARN01', stationName: 'Stockholm Arlanda Airport', model: 'Mercedes-Benz AMG GT', brand: 'Mercedes-Benz', category: 'Coupe', guaranteed: true, price: '$657/day' },
  { stationId: 'NCE01', stationName: 'Nice Airport', model: 'BMW Z4 Roadster', brand: 'BMW', category: 'Convertible', guaranteed: false, price: '$191/day' },
  { stationId: 'NCE01', stationName: 'Nice Airport', model: 'BMW 8 Series Gran Coupe', brand: 'BMW', category: 'Gran Coupe', guaranteed: false, price: '$468/day' },
  { stationId: 'MUC01', stationName: 'Munich Airport', model: 'Mercedes-Benz CLE', brand: 'Mercedes-Benz', category: 'Convertible', guaranteed: false, price: '$265/day' },
  { stationId: 'DXB01', stationName: 'Dubai Int. Airport Terminal 3', model: 'Mercedes-AMG SL 55 V8 BITURBO 4MATIC+', brand: 'Mercedes-AMG', category: 'Convertible', guaranteed: true, price: '$868/day' },
  { stationId: 'LAX01', stationName: 'Los Angeles Airport', model: 'Ford Mustang Convertible', brand: 'Ford', category: 'Convertible', guaranteed: false, price: '$102/day' },
  { stationId: 'MIA01', stationName: 'Miami Airport', model: 'Ford Mustang Convertible', brand: 'Ford', category: 'Convertible', guaranteed: false, price: '$76/day' },
  { stationId: 'MIA01', stationName: 'Miami Airport', model: 'BMW 4 Series Coupe', brand: 'BMW', category: 'Coupe', guaranteed: false, price: '$128/day' }
];

// TODO: Scrape remaining stations
// This script is designed to be run manually via browser tool
// For each remaining station, navigate to the URL and run the extraction JS

const remainingStations = STATIONS.filter(s => !s.done);
console.log('Remaining stations to scrape:');
remainingStations.forEach(s => console.log(`  - ${s.name} (${s.slug})`));

console.log('\nExtraction JS to run in browser console:');
console.log(`
(() => {
  const links = document.querySelectorAll('a[href*="betafunnel"]');
  const cars = [];
  links.forEach(link => {
    const heading = link.querySelector('h3');
    if (heading) {
      const text = link.textContent.trim().replace(/\\s+/g, ' ');
      const guaranteed = text.includes('Guaranteed model');
      const orSimilar = text.includes('or similar');
      const catMatch = text.match(/\\|\\s*([^from]+)\\s*from/i);
      const category = catMatch ? catMatch[1].trim() : 'Car';
      const priceMatch = text.match(/from\\s*([\\d$.,]+)\\s*\\/\\s*day/i);
      const price = priceMatch ? '\\$' + priceMatch[1] + '/day' : null;
      cars.push({
        heading: heading.textContent.trim(),
        category,
        price,
        guaranteed: guaranteed && !orSimilar,
        isExotic: [${EXOTIC_KEYWORDS.map(k => `'${k}'`).join(',')}].some(k => heading.textContent.toLowerCase().includes(k))
      });
    }
  });
  return cars.filter(c => c.isExotic);
})()
`);
