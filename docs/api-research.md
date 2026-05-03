# Sixt API Research Notes

> Ongoing documentation of Sixt's internal APIs and data structures for extracting guaranteed exotic car models.

## Known Endpoints

### Station Pages
- **URL Pattern**: `https://www.sixt.com/car-rental/{country}/{city}/{station-slug}/`
- **Example**: `https://www.sixt.com/car-rental/sweden/stockholm/stockholm-arlanda-airport/`

### Page-Data JSON
- **Pattern**: `{station-url}/page-data-{hash}-{timestamp}.json`
- **Example**: `https://www.sixt.com/car-rental/sweden/stockholm/stockholm-arlanda-airport/page-data-1ae0e400edc49ef042e71cfd3b86ccc677bad279-2026-05-02T06:20:04.json`
- **Content**: Contains `data.pageSpecificConfiguration.fleetslider.offers` array with category cars

#### Page-Data Structure
```json
{
  "data": {
    "pageSpecificConfiguration": {
      "fleetslider": {
        "offers": [
          {
            "heading": "VW T-Roc",
            "subheading": "or similar | SUV",
            "cta": "Book Now",
            "href": "/betafunnel/#/offerlist?ctyp=suv&uci=5564&uda=20260509&rda=20260513",
            "sources": [{ "width": 1050, "src": "/fileadmin2/.../vw-t-roc.png" }]
          }
        ]
      },
      "rentsearch": {
        "stationId": 5564
      }
    }
  }
}
```

### Booking Funnel (Beta)
- **URL Pattern**: `/betafunnel/#/offerlist?ctyp={type}&uci={stationId}&uda={pickup}&rda={return}`
- **Example**: `/betafunnel/#/offerlist?ctyp=suv&uci=5564&uda=20260509&rda=20260513`

### GraphQL Endpoint
- **URL**: `https://www.sixt.com/graphql/` (POST)
- **Status**: Returns "Method Not Allowed" for introspection — requires authenticated queries

### Fleet Guide
- **URL**: `https://www.sixt.com/fleet/fleet-guide/`
- **Notes**: Shows US fleet with some "guaranteed" models (e.g., "Mercedes G-Class (guaranteed)")
- **Limitation**: Not station-specific, appears to be US-only

## Key Findings

### "Guaranteed" vs "Or Similar"
- Most Sixt cars are "or similar" (category-based)
- **Guaranteed models** are rare and typically premium/exotic cars at select stations
- The fleet guide marks some models as "(guaranteed)" but this is US-centric
- We need to find where Sixt exposes guaranteed models per station

### Station ID Mapping
- Each station has a numeric `stationId` (e.g., Stockholm Arlanda = 5564)
- Found in `pageSpecificConfiguration.rentsearch.stationId`

### Date Format
- YYYYMMDD format used in funnel URLs
- Future dates (30-60 days out) work for checking general availability

## Unsolved Questions

1. **Where does Sixt expose guaranteed models per station?**
   - The fleet slider only shows "or similar" category cars
   - Need to find the offerlist API or fleet API that returns guaranteed flags

2. **Is there a public REST API for offers?**
   - `/api/` returns 404
   - `/rest/` returns 404
   - `/json/` returns 404
   - Likely behind auth or using different paths

3. **Can we access the offerlist API directly?**
   - The betafunnel is a React SPA — it likely calls an internal API
   - Need to inspect network requests when loading the offerlist

## Next Research Steps

1. **Browser Network Inspection**
   - Load betafunnel with a station + dates
   - Capture XHR/fetch requests using browser dev tools
   - Look for JSON endpoints returning offer data with guaranteed flags

2. **JS Bundle Analysis**
   - Download betafunnel JS chunks
   - Search for API endpoint URLs and GraphQL queries

3. **Sixt Developer Portal**
   - `https://developers.sixt.com/` exists but requires login
   - Has RENT, SHARE, Ride, and Sixt+ APIs
   - May have fleet/offer endpoints

4. **Alternative: Fleet Category Pages**
   - Sixt has fleet pages per brand: `/fleet/bmw-rental/`, `/fleet/mercedes-benz-rental/`
   - These may contain station-specific fleet data or links to guaranteed models

## Tools Used

- `curl` for endpoint probing
- `web_fetch` for page content extraction
- `grep` for pattern matching in HTML/JS
- Browser dev tools (planned for network inspection)

## Research Date
- Started: 2026-05-03
- Last updated: 2026-05-03
