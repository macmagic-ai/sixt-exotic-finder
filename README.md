# 🏎️ Sixt Exotic Finder

> Discover guaranteed exotic and supercar rentals at Sixt stations worldwide.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?style=flat-square&logo=github)](https://macmagic-ai.github.io/sixt-exotic-finder/)
[![Weekly Updates](https://img.shields.io/badge/Updates-Weekly%20(Sundays)-blue?style=flat-square&logo=clockify)](.github/workflows/weekly-update.yml)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[🌐 Live Site](https://macmagic-ai.github.io/sixt-exotic-finder/) · [📋 Source](https://github.com/macmagic-ai/sixt-exotic-finder)

---

## What is this?

Sixt Exotic Finder is an **open-source, community-driven tool** that maps Sixt rental stations worldwide and identifies which locations offer **guaranteed exotic/supercar models** (not just "or similar" category cars).

Planning a trip to test drive a Porsche 911, Ferrari, or Lamborghini? This helps you find the right station.

### Features

- 🗺️ **Interactive Map** — Dark-themed Leaflet map showing all stations. Green = has exotics, Gray = no exotics found.
- 📋 **List View** — Browse stations and their exotic car inventory with guaranteed model indicators.
- 🔍 **Smart Filters** — Filter by country, brand, or show only guaranteed models.
- 🔒 **Guaranteed Badge** — Cars marked "guaranteed" are the exact model (not "or similar").
- 🔄 **Weekly Auto-Updates** — GitHub Actions runs every Sunday to refresh the data.
- 📱 **Mobile Responsive** — Works great on phones for on-the-go planning.

## How it works

1. **Data Collection** (`scripts/fetch-sixt.js`): Scrapes Sixt station pages for fleet information, looking for exotic car models.
2. **Filtering**: Only keeps cars from exotic brands (Porsche, Ferrari, Lamborghini, McLaren, Aston Martin, Bentley, Rolls-Royce, Maserati, AMG GT, Corvette, etc.) and filters out economy/luxury sedans.
3. **Static Site**: Pure HTML/JS app reads the JSON data files — no backend needed.
4. **GitHub Pages**: Hosted for free, updated automatically.

## Tech Stack

- **Frontend**: Vanilla HTML5 + Tailwind CSS (CDN) + Leaflet.js
- **Data**: Static JSON files (`data/stations.json`, `data/exotics.json`)
- **Scraper**: Node.js (no external dependencies)
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

## Updating Data Manually

```bash
# Run the fetch script
node scripts/fetch-sixt.js

# Commit and push
git add data/
git commit -m "data: manual update"
git push
```

## API Research

See [`docs/api-research.md`](docs/api-research.md) for our ongoing research into Sixt's internal APIs and data structures.

## Contributing

Contributions welcome! Areas where help is needed:

- 🕵️ **Better API discovery** — Finding Sixt's internal offer/fleet APIs for more accurate data
- 🌍 **More stations** — Adding city center locations and more airports
- 🎨 **UI improvements** — Better car images, station details, pricing info
- 🧪 **Testing** — Verifying exotic car availability at stations

### Adding a Station

Edit `scripts/stations-list.js` and add a new station object:

```javascript
{
  id: "CODE01",           // Unique ID
  name: "Station Name",   // Full station name
  city: "City",           // City name
  country: "CC",          // 2-letter country code
  iata: "XXX",            // Airport code (optional)
  lat: 00.0000,           // Latitude
  lng: 00.0000            // Longitude
}
```

## Disclaimer

This project is **not affiliated with Sixt SE**. It's an independent, open-source tool built by car enthusiasts for car enthusiasts. Data accuracy depends on Sixt's public website. Always verify availability directly on [sixt.com](https://www.sixt.com) before booking.

## License

MIT — see [LICENSE](LICENSE)

---

<p align="center">
  <sub>Built with 🏎️ by <a href="https://github.com/macmagic-ai">MacMagic AI</a></sub>
</p>
