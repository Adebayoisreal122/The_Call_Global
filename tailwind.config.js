/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Crimson Pro"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        gold: { 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' },
        navy: { 500: '#1e2a5e', 600: '#162050', 700: '#0e1640', 800: '#080e2d', 900: '#04091a' },
      },
    },
  },
  plugins: [],
}
