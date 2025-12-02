import "dotenv/config";
export default {
  expo: {
    name: "SafeConnect",
    slug: "SafeConnect",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "safeconnect",
    userInterfaceStyle: "automatic",
    extra: {
      eas: {
        projectId: "49f266f4-ba54-4925-9a39-e38575e8fa15",
      },
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSBluetoothAlwaysUsageDescription:
          "SafeConnect uses Bluetooth to connect to your safety wearable for hands-free SOS triggering.",
      },
    },
    android: {
      permissions: [
        "android.permission.BLUETOOTH",
        "android.permission.BLUETOOTH_ADMIN",
        "android.permission.BLUETOOTH_CONNECT",
        "android.permission.BLUETOOTH_SCAN",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.SEND_SMS",
        "android.permission.READ_SMS"
      ],
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.anonymous.SafeConnect",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "react-native-ble-plx",
        {
          isBackgroundEnabled: true,
          modes: ["peripheral", "central"],
          bluetoothAlwaysPermission:
            "Allow SafeConnect to connect to your wristband.",
        },
      ],
      "expo-location",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/SafeConnect_Logo.png",
          imageWidth: 120,
          resizeMode: "contain",
          backgroundColor: "#0f172a",
          dark: {
            backgroundColor: "#0f172a",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
