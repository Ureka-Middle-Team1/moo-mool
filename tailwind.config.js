/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kkubulim: ['"kkubulim"', "Helvetica", "sans-serif"],
      },
      transformOrigin: {
        "center-center": "center center",
      },
      rotate: {
        y180: "rotateY(180deg)",
      },
      perspective: {
        1000: "1000px",
      },
    },
  },
  plugins: [],
};
