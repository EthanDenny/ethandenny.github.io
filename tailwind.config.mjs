/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    colors: {
      white: "#f6f4f1",
      black: "#0a0d0f",
      orange: "#e84a2e",
    },
    fontFamily: {
      sans: ["Verdana", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
