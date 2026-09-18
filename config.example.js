// SquadNav Configuration Template
// Copy this file to config.js and add your API credentials.
// All keys can also be entered directly in the SquadNav web interface under "⚙️ Cloud & API Settings".
window.SQUADNAV_CONFIG = {
  // 1. Google Gemini AI Key (for AI Copilot Road Trip Assistant)
  GEMINI_API_KEY: "YOUR_GEMINI_API_KEY_HERE",

  // 2. Google Maps Platform API Key (Optional: for Google Places Autocomplete & Traffic Routes)
  GOOGLE_MAPS_API_KEY: "YOUR_GOOGLE_MAPS_API_KEY_HERE",

  // 3. Firebase Configuration (for Multi-Device Real-Time Group GPS Sync)
  FIREBASE_CONFIG: {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
