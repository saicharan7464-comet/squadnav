# 🚗 SquadNav — Group Convoy Navigation Hub

SquadNav is a real-time group convoy navigation web application featuring real road geometry, live ETA computation, alternative routes, nearby petrol bunk detection, and an interactive AI Road Trip Copilot.

---

## ✨ Features

- **🛣️ Real Road Routing (OSRM)**: Precise highway and road geometries (curves, turns, intersections) instead of straight lines.
- **🔀 Alternative Routes**: Displays both the primary fastest route and alternative highway/bypass corridors with one-click interactive switching.
- **⏱️ Google Maps-Style Navigation HUD**: Floating telemetry card displaying live ETA, total kilometers, predicted arrival clock, and highway corridors.
- **⛽ Live Highway Petrol Bunks**: Automatically detects real gas stations (HP, Bharat Petroleum, IndianOil, Shell) along the highway corridor with distance markers and one-click "Set as Convoy Pit Stop".
- **🚗 Turn-by-Turn Convoy Movement**: Simulates realistic group vehicle travel following sequential road waypoints with staggered car spacing and live speed telemetry.
- **🤖 Squad AI Road Trip Copilot**: Generates instant convoy briefings, road trip tips, and local highway food/dhaba recommendations powered by Google Gemini AI.
- **🗺️ Watermark-Free Multi-Layer Basemaps**: Toggle seamlessly between Clean OpenStreetMap, Esri Highway Navigation, and High-Resolution Satellite imagery.

---

## 🚀 Getting Started

### Repository
🔗 **[https://github.com/saicharan7464-comet/squadnav](https://github.com/saicharan7464-comet/squadnav)**

### Prerequisites
- Any modern web browser (Chrome, Edge, Firefox, Safari).
- (Optional) A local HTTP server such as Python:

```bash
git clone https://github.com/saicharan7464-comet/squadnav.git
cd squadnav
python -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, Modern JavaScript (ES6+)
- **Mapping**: Leaflet.js
- **Basemaps**: OpenStreetMap & Esri (World Street Map & World Imagery)
- **Routing Engine**: Open Source Routing Machine (OSRM Driving API)
- **Geocoding & Places**: Nominatim OpenStreetMap API
- **AI Copilot**: Google Gemini Generative Language API
