/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      white: "#f5f1ea",
      pink: "#f9a3aa",
      red: "#f5576c",
      green: "#004953",
      blue: "0f282f",
      black: "070d0d",
    },
    fontFamily: {
      sans: ["Familjen Grotesk", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
