# Sixt Premium Car Finder

Find guaranteed-model and high-price premium car rentals at Sixt airports worldwide.

## Strategy

Instead of trying to match exotic car names (which Sixt obscures), we track cars that meet **either** criteria:

1. **Guaranteed model** — Sixt promises the exact car shown
2. **Price >= $200/day** — Premium pricing indicates luxury tier

This catches more premium cars than name-matching alone.

## Coverage

**60+ airports** across all continents:
- Europe: 29 stations
- North America: 18 stations  
- Asia: 9 stations
- Middle East: 4 stations
- South America: 6 stations
- Africa: 4 stations
- Oceania: 3 stations

## Scraping Method

Sixt's fleet data is rendered client-side. The JSON endpoint only shows 4 economy cars.

**Working approach:**
1. Navigate to `sixt.com/car-rental/<country>/<city>/<station>/`
2. Extract from rendered DOM: `document.querySelectorAll('a[href*="betafunnel"]')`
3. Each link contains: car name, category, price, guaranteed status
4. Car images are at Sixt's CDN: `fileadmin2/files/global/sideview/user_upload/fleet/png/`

## Data Files

- `data/stations.json` — Airport list with coordinates
- `data/exotics.json` — Premium cars (guaranteed OR $200+/day)

## Live Site

https://macmagic-ai.github.io/sixt-exotic-finder/

## Repo

https://github.com/macmagic-ai/sixt-exotic-finder
