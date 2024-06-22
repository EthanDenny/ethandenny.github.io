/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    colors: {
      white: "#f6f4f1",
      grey: "#e2e4e7",
      black: "#0a0d0f",
      blue: "#0a2538",
      orange: "#e84a2e",
      tan: "#e2cc9c",
    },
    fontFamily: {
      sans: ["Verdana", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
