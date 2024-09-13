// Make sure your build tool supports ES module syntax in the configuration file
const flowbite = require("flowbite-react/tailwind");


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/Components/**/*.{html,js,jsx,ts,tsx}",
    "./index.html",      
    flowbite.content() // Spread the content array from flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
