import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)"],
        heading: ["var(--font-heading)"],
      },
      colors: {
        primary: "#FFF9F2",
        secondary: "#4CAF50",
        accent: "#E2725B",
      },
    },
  },
  plugins: [],
};
export default config;