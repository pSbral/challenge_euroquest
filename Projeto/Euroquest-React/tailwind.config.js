/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        'blue-quest': '#0A1C32',
        'blue-quest-hover': '#182E49',
        'lightblue-quest': '#3478F4',
        'lightblue-quest-hover': '#064BCA',
      },
    },
  },
  plugins: [],
}

