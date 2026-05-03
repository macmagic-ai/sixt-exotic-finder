# Sixt Guaranteed Model Finder — Implementation Plan

## Goal
Build a clean, focused site that shows ONLY guaranteed-model cars at Sixt stations worldwide, with a map showing density per station.

## Current Problems
1. Data is mixed (old scrapes included non-guaranteed cars)
2. No map to visualize guaranteed car density
3. Scraper scripts are scattered and inconsistent
4. No proper data pipeline

## Phase 1: Clean Data Architecture

### New Data Schema
```json
// data/stations.json — 60+ airports
{
  "id": "ARN01",
  "name": "Stockholm Arlanda Airport",
  "city": "Stockholm",
  "country": "SE",
  "lat": 59.6519,
  "lng": 17.9186,
  "slug": "sweden/stockholm/stockholm-arlanda-airport",
  "guaranteedCount": 2,
  "lastScraped": "2026-05-03"
}

// data/guaranteed.json — ONLY guaranteed models
{
  "stationId": "ARN01",
  "stationName": "Stockholm Arlanda Airport",
  "model": "Mercedes-Benz AMG GT",
  "brand": "Mercedes-Benz",
  "category": "Coupe",
  "price": "$657/day",
  "imageUrl": "...",
  "firstSeen": "2026-05-03",
  "lastSeen": "2026-05-03"
}
```

## Phase 2: Scraper Pipeline

### Single Script: `scripts/scrape.js`
```
Input: stations-list.js (60 airports)
Process:
  For each station:
    1. Visit station page
    2. Extract branch ID from betafunnel link
    3. Visit betafunnel with future date (4 months out)
    4. Extract cars where text includes "Guaranteed model"
    5. Save to data/guaranteed.json
Output: Clean guaranteed-only dataset
```

### Scrape Strategy
- **Date**: Random weekday 4 months future
- **Duration**: 3 days
- **Filter**: `text.includes('Guaranteed model') && !text.includes('or similar')`
- **Rate limit**: 3 seconds between stations
- **Timeout**: 15 seconds per station

## Phase 3: Frontend

### Layout
```
┌─────────────────────────────────────┐
│  Header: Sixt Guaranteed Finder     │
├─────────────────────────────────────┤
│  Stats: Stations | With Cars | Cars │
├─────────────────────────────────────┤
│  Filters: Country | Brand | Search  │
├─────────────────────────────────────┤
│                                     │
│  MAP (Leaflet)                      │
│  - Circle markers sized by count   │
│  - Green = has guaranteed           │
│  - Gray = none found                │
│  - Click = popup with car list      │
│                                     │
├─────────────────────────────────────┤
│  Car Grid (below map)               │
│  - Cards with image, model, price   │
│  - Station location                 │
│  - Sortable by price                │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
```

### Map Features
- Dark theme (CartoDB Dark Matter)
- Circle markers: radius = sqrt(count) * 5
- Color: green gradient based on count
- Popup: station name + list of guaranteed cars
- Click car card → flyTo station on map

## Phase 4: Implementation Order

1. **Clean data/** — empty exotics.json, reset stations.json counts
2. **Build scraper** — single `scripts/scrape.js` with betafunnel extraction
3. **Test scraper** — run on 5 stations, verify output
4. **Batch scrape** — all 60 stations (will take ~5 min with delays)
5. **Build map** — add Leaflet back, circle markers
6. **Build car grid** — cards with images, sort by price
7. **Connect map + grid** — click interactions
8. **Deploy** — push to GitHub Pages

## Phase 5: Data Refresh

- Weekly cron: re-scrape all stations
- GitHub Action: auto-commit + deploy
- Alert if station that had cars now has none (sold out)

## File Structure
```
sixt-exotic-finder/
├── data/
│   ├── stations.json       # 60 airports
│   └── guaranteed.json     # Only guaranteed models
├── scripts/
│   ├── stations-list.js    # Airport definitions
│   └── scrape.js           # Single scraper script
├── index.html              # Frontend
├── app.js                  # UI logic + map
└── .github/
    └── workflows/
        └── scrape.yml      # Weekly auto-scrape
```

## Next Steps
1. I'll build the scraper
2. Run it on all 60 stations
3. Rebuild the frontend with map
4. Deploy
