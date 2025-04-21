/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
  './src/**/*.{html,ts}',
  './node_modules/flowbite/**/*.js'
  ],
  theme: {
  extend: {
  colors: {
  primary: {
  "50": "hashtag#eff6ff",
  "100": "hashtag#dbeafe",
  "200": "hashtag#bfdbfe",
  "300": "hashtag#93c5fd",
  "400": "hashtag#60a5fa",
  "500": "hashtag#3b82f6",
  "600": "hashtag#2563eb",
  "700": "hashtag#1d4ed8",
  "800": "hashtag#1e40af",
  "900": "hashtag#1e3a8a",
  "950": "#172554"
  }
  },
  fontFamily: {
  body: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif']
  }
  }
  },
  plugins: [
  require('flowbite/plugin'),
  require('@tailwindcss/container-queries'),
  require('@tailwindcss/typography')
  ]
 };