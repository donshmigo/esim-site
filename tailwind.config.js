/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'romio-black': '#0D0D0D',
        'snow-white': '#FFFFFF',
        'signal-blue': '#242323',
        'dark-theme': '#242323',
        'dark-theme-hover': '#3a3939',
        'dark-theme-light': '#4a4a4a',
        'steel-gray': '#F5F7FA',
        'cool-slate': '#1A1A1A',
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif'],
      },
      maxWidth: {
        '7xl': '80rem',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
} 