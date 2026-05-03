# 🏎️ Sixt Exotic Finder

> Discover exotic and supercar rentals at Sixt stations worldwide. Built with MagicUI-inspired design.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?style=flat-square&logo=github)](https://macmagic-ai.github.io/sixt-exotic-finder/)
[![Weekly Updates](https://img.shields.io/badge/Updates-Weekly%20(Sundays)-blue?style=flat-square&logo=clockify)](.github/workflows/weekly-update.yml)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[🌐 Live Site](https://macmagic-ai.github.io/sixt-exotic-finder/) · [📋 Source](https://github.com/macmagic-ai/sixt-exotic-finder)

---

## What is this?

Sixt Exotic Finder maps Sixt rental stations worldwide and identifies which locations offer exotic/supercar models. Planning a trip to test drive a Porsche 911, Ferrari, or Lamborghini? This helps you find the right station.

### Features

- 🗺️ **Interactive Map** — Dark-themed Leaflet map. Green = has exotics, Gray = no exotics found.
- 📋 **List View** — Browse stations and their exotic car inventory.
- 🔍 **Smart Filters** — Filter by country, brand, or show only guaranteed models.
- 🔒 **Guaranteed Badge** — Cars marked "guaranteed" are the exact model (not "or similar").
- ✨ **MagicUI Design** — Particle effects, glass morphism, scroll animations, gradient glows.
- 🔄 **Weekly Auto-Updates** — GitHub Actions runs every Sunday to refresh data.
- 📱 **Mobile Responsive** — Works great on phones for on-the-go planning.

## Design System

Inspired by [MagicUI](https://magicui.design) — a UI library for design engineers:
- **Animated gradient mesh** background
- **Particle system** with connection lines
- **Glass morphism cards** with gradient borders
- **Glow buttons** with animated shadows
- **Scroll reveal** animations
- **Counter animations** for stats
- **Shimmer effects** for loading states

## How it works

1. **Data Collection** (`scripts/fetch-sixt-v2.js`): Scrapes Sixt station page-data JSON for fleet information.
2. **Filtering**: Only keeps cars from exotic brands (Porsche, Ferrari, Lamborghini, McLaren, Aston Martin, Bentley, Rolls-Royce, Maserati, AMG GT, Corvette, etc.).
3. **Static Site**: Pure HTML/JS app reads JSON data files — no backend needed.
4. **GitHub Pages**: Hosted for free, updated automatically.

## Tech Stack

- **Frontend**: Vanilla HTML5 + Tailwind CSS (CDN) + Leaflet.js + Canvas API
- **Design**: MagicUI-inspired (glass morphism, particles, animations)
- **Data**: Static JSON files (`data/stations.json`, `data/exotics.json`)
- **Scraper**: Node.js (no external dependencies for fetcher)
- **CI/CD**: GitHub Actions (weekly cron + manual trigger)
- **Hosting**: GitHub Pages

## Running Locally

```bash
# Clone the repo
git clone https://github.com/macmagic-ai/sixt-exotic-finder.git
cd sixt-exotic-finder

# Serve locally (any static file server works)
python3 -m http.server 8000
# OR
npx serve .

# Open http://localhost:8000
```

## Updating Data

```bash
# Run the fetcher
node scripts/fetch-sixt-v2.js

# Commit and push
git add data/
git commit -m "data: update"
git push
```

## API Research

See [`docs/api-research.md`](docs/api-research.md) for ongoing research into Sixt's internal APIs.

**Current findings:**
- Sixt station pages expose `page-data-{hash}.json` with fleet slider data
- The booking funnel (`/betafunnel/`) uses `zen_offer_matrix_id` parameters
- Cloudflare protects the offerlist API — requires real browser or authenticated access
- Fleet slider on station pages shows 3-4 category samples, not full fleet

## Data Sources

The app uses multiple data strategies:
1. **Automated scraping** — page-data JSON from Sixt station pages (limited to fleetslider samples)
2. **Community contributions** — Users can submit verified sightings
3. **Manual verification** — Key stations verified by browsing sixt.com

## Contributing

Contributions welcome!

### Adding a Station

Edit `scripts/stations-list.js` and add:

```javascript
{
  id: "CODE01",
  name: "Station Name",
  city: "City",
  country: "CC",
  iata: "XXX",
  lat: 00.0000,
  lng: 00.0000
}
```

### Submitting Car Data

Open a PR with updates to `data/exotics.json`:

```json
{
  "stationId": "ARN01",
  "stationName": "Stockholm Arlanda Airport",
  "model": "Porsche 911 Carrera",
  "brand": "Porsche",
  "category": "Sports Car",
  "guaranteed": true,
  "firstSeen": "2026-05-03",
  "lastSeen": "2026-05-03"
}
```

## Disclaimer

This project is **not affiliated with Sixt SE**. It's an independent, open-source tool built by car enthusiasts. Data accuracy depends on Sixt's public website. Always verify availability directly on [sixt.com](https://www.sixt.com) before booking.

## License

MIT — see [LICENSE](LICENSE)

---

<p align="center">
  <sub>Built with 🏎️ by <a href="https://github.com/macmagic-ai">MacMagic AI</a></sub>
</p>
