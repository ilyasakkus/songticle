/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        vintage: {
          primary: "#8B4513",    // Saddle Brown
          secondary: "#CD853F",  // Peru
          accent: "#DEB887",     // Burlywood
          neutral: "#F5DEB3",    // Wheat
          base: "#FFF8DC",       // Cornsilk
          info: "#87CEEB",       // Sky Blue
          success: "#98FB98",    // Pale Green
          warning: "#FFD700",    // Gold
          error: "#CD5C5C",      // Indian Red
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        vintage: {
          "primary": "#8B4513",
          "secondary": "#CD853F",
          "accent": "#DEB887",
          "neutral": "#F5DEB3",
          "base-100": "#FFF8DC",
          "info": "#87CEEB",
          "success": "#98FB98",
          "warning": "#FFD700",
          "error": "#CD5C5C",
        },
      },
    ],
  },
}
