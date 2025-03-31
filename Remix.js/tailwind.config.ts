import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Bebas Neue"', "sans-serif"],
        roboto: ['"Roboto"', "sans-serif"],
        ubuntu: ['"Ubuntu"', "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
        robotoMono: ['"Roboto Mono"', "monospace"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        accent: "#1f3044",
      },
    },
  },
  plugins: [],
} satisfies Config;
