# 🚗 SquadNav — Mobile-First Real-Time Group Convoy Navigation

**Live App**: [https://squadnav.vercel.app/](https://squadnav.vercel.app/)  
**Repository**: [https://github.com/saicharan7464-comet/squadnav](https://github.com/saicharan7464-comet/squadnav)

SquadNav is a mobile-first real-time group navigation and convoy tracking web application, modeled on the core map experience of Google Maps, designed specifically for groups of friends traveling together to the same destination.

---

## 🌟 Key Features

1. **📍 Real Phone GPS & Live Tracking**:
   - High-accuracy continuous location tracking via the browser Geolocation API (`watchPosition`).
   - Pulsing 📍 "My Location" marker with accuracy halo circle and auto-centering.
   - Clean permission workflow with clear explanations and troubleshooting if permission was previously blocked.

2. **🛣️ Real Map & Independent Multi-Vehicle Routing**:
   - Supports 🚗 **Car**, 🏍️ **Bike / Two-Wheeler**, 🚆 **Transit**, and 🚶 **Walking**.
   - **Different Vehicles = Different Routes**: Each member's route, distance, and ETA are calculated independently from their own current GPS location to the shared destination with their selected vehicle speed and restrictions.
   - **Alternative Routes**: Displays Fastest and Alternative corridors with distance and duration choices.
   - **Hybrid Routing**: Uses Google Maps Platform (Directions / Places Autocomplete) when configured, and falls back to real OpenStreetMap + OSRM road geometry when running without API keys so the app never breaks.

3. **👑 Create Squad & Unique Invite Links**:
   - Host chooses destination, selects vehicle, and clicks **"👑 Create Squad"**.
   - Generates a unique squad ID (e.g. `squad_7x9k2m`) and shareable link (`https://squadnav.vercel.app/?squad=squad_7x9k2m`).
   - Native **Web Share API** (`navigator.share`) triggers WhatsApp, Telegram, SMS, or Instagram directly from mobile, with a one-click "Copy Link" fallback.

4. **🎉 Friend Join Flow**:
   - When a friend opens the invite link on their phone, they see: *"You've been invited to join the Squad"*, destination details, and host name.
   - Friend enters their name, selects their vehicle (e.g. Bike while host is in Car), grants GPS permission, and taps **"Join Squad"**.
   - The shared destination is automatically loaded without recreating it manually.

5. **⚡ Real-Time Location Synchronization**:
   - Integrated with **Firebase Realtime Database** for sub-second internet-wide synchronization across all devices.
   - Built-in **BroadcastChannel / Peer Sync** fallback for instant local multi-device and multi-tab testing without mandatory initial keys.
   - **Battery & Quota Conservation**: Throttles location updates so writes only occur when moving > 15 meters or after 8 seconds of driving.
   - **Privacy Controls**: "Stop Sharing Location" button pauses live GPS broadcasting immediately while keeping the member in the squad.

6. **📊 Convoy Status & "Who is Behind?" Analytics**:
   - Live roster displays each person's vehicle, remaining road distance, and ETA.
   - Intelligent convoy analyzer:
     - 🟢 *"Convoy in Sync"* (close formation)
     - ⚠️ *"Rahul is 18 min behind average"*
     - ⚠️ *"Arjun is 12 km behind Sai"*
     - ⚠️ *"Last seen 3m ago"* (detects network drops and keeps last known GPS on map)
   - Arrival detection (< 150m from destination): updates status to **✅ Arrived**, displays a toast (*"🎉 Rahul has arrived at Goa!"*), and shows a live arrival counter (*"3/5 members arrived"*).

7. **📍 "Let's Meet Here" Regrouping & Stop Polls**:
   - Any member can tap a point or POI along the route and propose a meeting point (*"Sri Sai Dhaba"*).
   - All squad members receive an on-screen prompt with **[Accept]** and **[Reject]** buttons. When accepted, it pins a luminous regroup marker on all members' maps and adds it to the convoy stops.
   - Discover highway stops (Gas, Food & Dhabas, Hotels, Hospitals, Rest Areas) and trigger instant squad polls: *"Should we stop here? 👍 Yes / 👎 No"*.

8. **🔄 Turn-by-Turn Navigation & Dynamic Rerouting**:
   - **"▶ Start Navigation"** switches into an immersive driving UI with next maneuver banners, speed gauge, and arrival clock.
   - Continuously measures distance to the route polyline; if the driver deviates > 100 meters, displays *"🔄 Rerouting..."* and automatically recalculates.

9. **📜 Trip History**:
   - Records completed journeys with destination, date, member count, total distance, duration, and stops made.
   - Reopen and inspect past routes on the map anytime.
   - Option to clear history for privacy.

10. **📱 Mobile-First PWA & Offline Support**:
    - Bottom navigation bar: `[ 🗺️ Map | 👥 Squad | 📜 History ]`.
    - PWA Web App Manifest (`manifest.json`) and Service Worker (`sw.js`) allowing home screen installation on iOS and Android.
    - Offline detector displays an unobtrusive banner (*"🔴 Offline - Showing last known squad state"*) and resumes syncing as soon as connection is restored.

---

## 🛠️ Required APIs & Services

SquadNav is designed to work immediately out of the box with open data, while allowing premium cloud integrations:

| Service | Purpose | Required? | Fallback |
|---------|---------|-----------|----------|
| **Firebase Realtime Database** | Multi-device live GPS synchronization | Recommended for cross-network mobile convoy | Built-in BroadcastChannel Peer Sync |
| **Google Maps Platform** | Traffic-aware directions & Places Autocomplete | Optional | OpenStreetMap + OSRM Road Routing + Nominatim |
| **Google Gemini AI** | AI Copilot Road Trip Briefings & highway tips | Optional (Already configured in `config.js`) | Local road trip heuristics |

---

## ⚙️ Configuration Guide

### 1. In-App Configuration (Easiest)
Open SquadNav on your phone or desktop, tap the **"⚙️ Settings"** pill in the top header, and enter:
- **Google Maps API Key**: Enables Google Places Autocomplete and traffic routes.
- **Firebase Database URL & API Key**: Enables real-time synchronization between phones across different networks.
- **Gemini AI Key**: Powers the interactive AI Copilot.

Settings are saved directly in your browser's `localStorage` and persist across reloads.

### 2. Static File Configuration (`config.js`)
You can also configure credentials by copying `config.example.js` to `config.js`:

```javascript
window.SQUADNAV_CONFIG = {
  GEMINI_API_KEY: "YOUR_GEMINI_API_KEY",
  GOOGLE_MAPS_API_KEY: "YOUR_GOOGLE_MAPS_KEY",
  FIREBASE_CONFIG: {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
  }
};
```

---

## 🔧 Step-by-Step Backend Setup

### How to Configure Firebase Realtime Database
1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add project**.
2. Go to **Build > Realtime Database** and click **Create Database**.
3. Choose a location (e.g. `United States` or `Singapore`) and select **Start in test mode** (allows read/write during testing).
4. Copy your Database URL (e.g. `https://squadnav-convoy-default-rtdb.firebaseio.com`).
5. Go to **Project Settings** (gear icon) > **General** > **Your apps**, click the web icon (`</>`), and copy your `apiKey` and `databaseURL`.
6. Paste them into SquadNav's **Settings** modal or into `config.js`.

### How to Configure Google Maps Platform
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and navigate to **APIs & Services > Library**.
3. Enable:
   - **Maps JavaScript API**
   - **Places API (New)**
   - **Routes API** (or Directions API)
4. Go to **APIs & Services > Credentials** and click **Create Credentials > API Key**.
5. Restrict the API key to your domain (e.g., `squadnav.vercel.app/*` and `localhost:*`).
6. Paste the key into SquadNav's **Settings** modal.

---

## 🚀 Running Locally

You can run SquadNav locally with any static web server:

```bash
# Clone the repository
git clone https://github.com/saicharan7464-comet/squadnav.git
cd squadnav

# Run using Python 3
python -m http.server 3000

# OR run using Node's npx serve
npx serve .
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel

SquadNav is a pure client-side static web application with zero build step dependencies:

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Update SquadNav"
   git push origin main
   ```
2. Import the repository into [Vercel](https://vercel.com/new).
3. Framework Preset: **Other** (Root directory `./`).
4. Click **Deploy**. Vercel will deploy the site in ~10 seconds.

---

## 📱 Two-Phone Convoy Testing Checklist

Follow this checklist to test the full live convoy scenario with two phones:

- [ ] **Phone A (Host)**:
  1. Open [https://squadnav.vercel.app/](https://squadnav.vercel.app/) in Mobile Safari or Chrome.
  2. Tap **Allow Location** when prompted. Verify the pulsing 📍 blue dot appears at your GPS coordinates.
  3. In the search box, search for a destination (e.g. *"Goa, India"* or *"Warangal"*).
  4. Tap the destination. Verify real road distance, ETA, and alternative routes appear.
  5. Select 🏍️ **Bike** as your travel mode.
  6. Tap **"👑 Create Squad"**. Enter your name (e.g. *"Sai"*).
  7. Tap **"🔗 Share Squad"** and send the invite link via WhatsApp to Phone B.

- [ ] **Phone B (Friend)**:
  1. Tap the shared invite link on WhatsApp.
  2. When the invite modal appears (*"You're Invited to Join a Squad"*), verify the destination (*"Goa"*) and host name (*"Sai"*) are pre-filled.
  3. Enter name (e.g. *"Rahul"*), select 🚗 **Car** as the vehicle, and tap **"Join Squad"**.
  4. Tap **Allow Location**.

- [ ] **Real-Time Verification**:
  1. Verify Phone A shows Rahul's 🚗 car marker and Phone B shows Sai's 🏍️ bike marker simultaneously.
  2. Verify Sai and Rahul have independent ETAs and distances (reflecting Bike vs Car routes).
  3. On Phone A, tap **"📍 Meet Here"** and propose a regroup stop (*"Sri Sai Dhaba"*).
  4. Verify Phone B receives the proposal prompt and tap **"✅ Accept"**.
  5. Check that the regroup marker appears on both phones.
  6. Test privacy: on Phone B, tap **"Sharing On"** to pause sharing, verify Phone A shows *"⚠️ Rahul • Last seen just now"*.
  7. Tap **"▶ Start Navigation"** and drive or simulate movement to verify turn-by-turn guidance and dynamic rerouting.
