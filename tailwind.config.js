/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Defines 'font-roboto' utility class
        roboto: ['"Roboto"', 'sans-serif'],
        // Sets 'Nunito Sans' as the default sans-serif font for the project
        sans: ['"Nunito Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};