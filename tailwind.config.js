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
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#8B4513",
          "primary-focus": "#723A0F",
          "secondary": "#CD853F",
          "accent": "#DEB887",
          "neutral": "#F5DEB3",
          "base-100": "#FFF8DC",
          "base-200": "#F5E6CB",
          "base-300": "#E6D5B8",
          "base-content": "#4A3728",
          "info": "#87CEEB",
          "success": "#98FB98",
          "warning": "#FFD700",
          "error": "#CD5C5C",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
  },
}
