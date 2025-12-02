/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // BACKGROUND: Keep deep dark blue/slate for high contrast
        primary: "#0f172a", // slate-900

        // NEW BRAND COLORS (From Logo)
        brand: "#38bdf8",   // sky-400 (The bright blue in the hair)
        secondary: "#c084fc", // purple-400 (The purple accents)
        
        // FUNCTIONAL SAFETY COLORS (Keep these for semantics)
        safe: "#10b981",    // emerald-500 (Keep for "Safe Route" lines)
        danger: "#f43f5e",  // rose-500 (Keep for SOS)
        
        // UI ELEMENTS
        card: "#1e293b",    // slate-800 (Card background)
        muted: "#94a3b8",   // slate-400 (Subtitles)
      },
    },
  },
  plugins: [],
}