<<<<<<< HEAD
# SafeConnect

SafeConnect is a mobile app built with Expo (React Native) that helps users find safer routes, manage emergency contacts, and trigger an SOS that shares your live location via SMS. It also supports a BLE (Bluetooth Low Energy) wearable to trigger SOS hands-free.

## What this project is

- Safer routing: Analyzes Google Directions routes against risk zones and computes a safety score. The best route is highlighted and ranked.
- Feedback loop: Users can provide route feedback to improve future safety scoring.
- Contacts: Firestore-backed CRUD for emergency contacts, with local caching to work offline.
- SOS: Long-press SOS button (10s) triggers vibration/audio and sends location via SMS.
- Android auto-SMS: On Android, SOS can send SMS silently (with permission) to all contacts.
- BLE: Listens for a signal from an ESP32 wearable to trigger SOS.

## Tech stack

- Expo + React Native (Expo Router, NativeWind/Tailwind)
- Firebase Firestore (contacts, feedback)
- Google Directions/Geocoding APIs
- BLE via `react-native-ble-plx` (requires custom dev build)
- SMS via `expo-sms` and cross-platform `react-native-sms`

## Folder structure (key paths)

```
app/                     # Screens (Expo Router)
components/              # Reusable UI components
services/                # Data/services: routes, geocoding, feedback, SOS, BLE
utils/                   # Helpers: safety algorithm, auth, validation, contacts storage
contexts/                # React Contexts (Auth)
hooks/                   # Custom hooks (location, debounce)
constants/               # App constants (themes, map styles, firebase)
types/                   # Shared TypeScript types and d.ts shims
firebase/                # Firestore rules/indexes and setup docs
__tests__/               # Unit/integration tests
```

## Key services and functions

### SOS flows

- `services/sosService.ts`
  - `buildSosMessage(coords, customPrefix?)`: Build a message with Google Maps link.
  - `sendSosToContacts(coords, customPrefix?)`: Open SMS composer with recipients and message (cross-platform).

- `services/smsAutoService.ts` (Android-only)
  - `canAutoSendSms()`: Check/request SEND_SMS permission.
  - `sendSosSms(coords, prefix?)`: Open native SMS composer with pre-filled message for emergency contacts; returns completion status.

### Routing and maps

- `services/safeRoutesService.ts`: Fetch routes, compute safety, sort/rank.
- `services/directionsService.ts`: Build directions requests and format helpers.
- `services/geocodingService.ts`: Places/suggestions helpers and status.
- `utils/safeRouting.ts`: Core safety algorithm utilities:
  - `calculateDistance`, `isPointInRiskZone`, `calculateProximityFactor`
  - `decodePolyline`, `sampleRouteCoordinates`
  - `analyzeRouteRisks`, `calculateRiskPenalty`, `calculateSafetyScore`
  - `enhanceRouteWithSafety`, `rankRoutesBySafety`
  - `getRouteColor`, `getRouteStrokeWidth`, `generateSafetySummary`

### Contacts

- `services/contactsService.ts`:
  - `listContacts(uid?)`: Fetch user contacts.
  - `subscribeToContacts(callback, uid?)`: Real-time updates with unsubscribe.
  - `addContact(input, uid?)`: Create a contact.
  - `updateContact(id, input, uid?)`: Update a contact.
  - `deleteContact(id, uid?)`: Delete a contact.
- `utils/contactsStorage.ts`: App-facing store with Firestore sync + AsyncStorage cache.

### BLE

- `services/bleService.ts`: Scan/connect/monitor characteristic; triggers `onTrigger` when wearable sends a signal.

## Important screens

- `app/(tabs)/index.tsx`: Dashboard screen; shows map, handles SOS trigger, starts BLE listener.
- `app/(tabs)/contacts.tsx`: Contacts tab (list, search, delete, add flow).
- `app/add-contact.tsx` and `app/edit-contact.tsx`: Contact create/update screens.
- `app/(tabs)/profile.tsx`: Profile tab (device status, settings).

## Setup and development

1. Install dependencies
2. Set environment variables (Google Maps API key)
3. Configure Firebase (see `firebase/SETUP.md`)
4. Run app

### Environment

- Add `GOOGLE_MAPS_API_KEY` to your environment (e.g., `.env` used by `app.config.js`).

### Firebase

- Follow `firebase/SETUP.md` to initialize Firestore.
- Ensure rules/indexes are deployed (`firebase/firestore.rules`, `firebase/firestore.indexes.json`).

### BLE

- Requires a custom dev build (Expo Go doesn’t include BLE native module).
- Android permissions in `app.config.js` include Bluetooth and `SEND_SMS`.

### SMS

- Cross-platform: `expo-sms` opens composer (user must send).
- Cross-platform SMS: `react-native-sms` opens native SMS composer with pre-filled recipients and message.

## How the SOS trigger works

- Long-press SOS for 10 seconds → strong haptics + audible cue.
- If Android: try silent send first; show confirmation on success.
- If silent send fails or on iOS: open SMS composer with location link.
- BLE listener can trigger the same handler.

## Coding guidelines for contributors

- Use TypeScript and add JSDoc for functions (parameters, returns, side effects).
- Prefer small, pure utilities in `utils/`; encapsulate external APIs in `services/`.
- Keep UI components presentational; wire business logic in screens and services.
- Handle permissions and platform differences explicitly (Android/iOS).

## Testing

- Unit tests live in `__tests__/`; use `jest` to run.
- Add tests for pure functions in `utils/` and services where possible.

## Troubleshooting

- BLE not working in Expo Go → build a dev client.
- SMS permission denied (Android) → app will fall back to composer; grant `SEND_SMS` and retry.
- Google Maps API errors → check `GOOGLE_MAPS_API_KEY` and billing.

---

This README is meant to help junior and intern developers quickly understand the architecture, navigate the folders, and find the right functions and services to extend.
# 🛡️ **SafeConnect - Intelligent Safe Routes**
## **Community-Driven Safety Navigation System**

[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51.0.28-purple.svg)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange.svg)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)

---

## 🎯 **Project Overview**

SafeConnect is a **complete feedback-driven safe routes system** that learns from user experiences to provide increasingly accurate route safety assessments. The system uses **route-specific feedback** and **intelligent scoring algorithms** to recommend the safest paths between any two locations.

### **� Key Features**

- ✅ **Route-Specific Feedback System**: Unique persistent IDs for each route
- ✅ **Intelligent Safety Scoring**: 2-layer algorithm (risk zones + user feedback)  
- ✅ **Real-Time Learning**: System adapts immediately to new user feedback
- ✅ **Firebase Integration**: Optimized Firestore queries with smart caching
- ✅ **Performance Optimized**: Sub-second route calculations with intelligent caching
- ✅ **Community-Driven**: Safety assessments improve with community input

---

## 🏗️ **Technical Architecture**

### **Core Technologies**
- **Frontend**: React Native + Expo + TypeScript
- **Backend**: Firebase Firestore + Cloud Functions
- **Maps**: Google Maps API + Directions API
- **State Management**: React Context + Local Storage
- **Testing**: Jest + React Native Testing Library

### **Key Services**
```typescript
SafeRoutesService     // Route calculation & scoring
FeedbackService       // User feedback processing  
RiskZoneService      // Dynamic risk zone management
GeocodingService     // Location search & geocoding
```

---

## 📊 **How It Works**

### **1. Unique Route Identification**
```typescript
// Each route gets a persistent ID based on characteristics
"Kuliyapitiya → Colombo" generates:
├─ route_1f9b58b4 (A1 Highway)
├─ route_70b65df4 (A3 + E03 Highway)  
└─ route_6e16d47e (B322 + E03 Highway)
```

### **2. Advanced Safety Scoring**
```typescript
Final Score = Base(100) - RiskZonePenalties + FeedbackBonuses

Example Calculation:
├─ Base Score: 100 points
├─ Poor Lighting Zone: -30 points
├─ User Feedback (5-star safety): +20 points
└─ Final Score: 90/100 (HIGH safety level) ✅
```

### **3. Real-Time Updates**
```typescript
User submits feedback → Clears caches → Next calculation uses fresh data
```

---

## 🚀 **Quick Start**

### **1. Installation**
```bash
# Clone the repository
git clone <your-repo-url>
cd SafeConnect

# Install dependencies
npm install
```

### **2. Environment Setup**
Create `.env.local` file:
```env
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### **3. Start Development**
```bash
# Start the Expo development server
npx expo start

# Or run on specific platform
npx expo start --android
npx expo start --ios
```

---

## 📱 **Core Screens**

### **Dashboard** (`app/(tabs)/index.tsx`)
- Interactive map with route visualization
- Real-time safety scoring display
- Route selection and feedback submission

### **Profile** (`app/(tabs)/profile.tsx`)
- User preferences and settings
- Safety statistics and history

### **Contacts** (`app/(tabs)/contacts.tsx`)
- Emergency contacts management
- Quick access safety features

### **Emergency Directory** (`app/(tabs)/emergency-directory.tsx`)
- Local emergency services
- Quick dial functionality

---

## 🧪 **Testing**

```bash
# Run all tests
npm test

# Run specific test suites
npm test -- --testNamePattern="SafeRoutes"
npm test -- --testNamePattern="Feedback"

# Run with coverage
npm test -- --coverage
```

### **Test Coverage**
- ✅ Route calculation algorithms
- ✅ Feedback processing logic
- ✅ Firebase integration
- ✅ Component rendering
- ✅ User interaction flows

---

## 🗄️ **Firebase Structure**

### **Collections**

#### **`riskZones`** - Dynamic risk areas
```json
{
  "coordinates": { "latitude": 6.9271, "longitude": 79.8612 },
  "radius": 200,
  "severity": "MEDIUM",
  "type": "POOR_LIGHTING",
  "description": "Route route_6e16d47e: Users report safety concerns",
  "reportCount": 5,
  "isActive": true,
  "lastUpdated": "timestamp"
}
```

#### **`routeFeedbacks`** - User experiences  
```json
{
  "routeId": "route_6e16d47e",
  "userId": "current-user",
  "safetyRating": 5,
  "lightingRating": 4,
  "tags": ["FELT_SAFE", "WELL_LIT"],
  "location": { "latitude": 6.9271, "longitude": 79.8612 },
  "timestamp": "timestamp"
}
```

---

## 🔧 **API Integration**

### **Google Maps APIs**
- **Directions API**: Multi-route fetching with alternatives
- **Geocoding API**: Address to coordinate conversion  
- **Places API**: Location search and autocomplete

### **Firebase Services**
- **Firestore**: Real-time database for risk zones and feedback
- **Functions**: Server-side processing (optional)
- **Analytics**: Usage tracking and insights

---

## 📈 **Performance Features**

### **Smart Caching**
- Risk zones: 5-minute cache
- Feedback data: 2-minute cache
- Route calculations: Always fresh

### **Optimized Queries**
- Simple Firestore filters to avoid complex indexes
- Efficient batch operations for data processing
- Graceful fallbacks for offline scenarios

---

## 🛠️ **Development Workflow**

### **Code Structure**
```
├── app/                 # Expo Router screens
├── components/          # Reusable UI components  
├── services/           # Business logic & API integrations
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── constants/          # App configuration & theming
└── __tests__/          # Test suites
```

### **Key Commands**
```bash
# Development
npx expo start          # Start development server
npx expo start --clear  # Clear cache and restart

# Testing  
npm test               # Run test suite
npx tsc --noEmit       # TypeScript type checking

# Building
npx expo build         # Production build
npx eas build          # EAS Build service
```

---

## 📋 **Deployment**

### **Development Builds**
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure build profiles  
eas build:configure

# Create development builds
eas build --profile development --platform android
eas build --profile development --platform ios
```

### **Production Deployment**
```bash
# Production builds
eas build --profile production --platform all

# Submit to stores
eas submit --platform android
eas submit --platform ios
```

---

## 📚 **Documentation**

- **[Complete Implementation Guide](COMPLETE_IMPLEMENTATION_GUIDE.md)** - Comprehensive technical overview
- **[Firebase Setup Guide](firebase/SETUP.md)** - Database configuration
- **[Safe Routes Development](docs/safe-routs-development-guide.md)** - Algorithm details
- **[Component Documentation](components/README.md)** - UI component guide

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`  
5. Submit a pull request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎯 **Project Status: COMPLETE** ✅

The SafeConnect feedback-driven safe routes system is **fully implemented** and **production ready**. The system successfully provides route-specific safety assessments that improve through community feedback, creating a truly intelligent navigation experience.

### **Key Achievements**
- ✅ Route-specific feedback system with persistent unique IDs
- ✅ Advanced 2-layer safety scoring algorithm  
- ✅ Real-time cache management for immediate updates
- ✅ Firebase integration with optimized performance
- ✅ Comprehensive error handling and graceful fallbacks

**Ready for deployment and real-world usage!** 🚀

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
=======
# FYP
our final year project, safe connect mobile app with wristband
>>>>>>> f8bc5e5ad3ccbab06e1b2a4636a1b00363834123
