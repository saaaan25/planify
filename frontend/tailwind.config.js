/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        purple_1: '#cab9ed',
        purple_2: '#b597f1',
        purple_3: '#5f44a5',
        purple_4: '#2e098f',
        purple_5: '#2c156d',
        black_1: "#231e2a",
        grey_1: "#f2f2f2"
      },
      fontFamily: {
        sans: ['Comfortaa', 'sans-serif'],
        frankfurter: ['Frankfurter', 'sans-serif']
      },
    },
  },
  plugins: [],
}

