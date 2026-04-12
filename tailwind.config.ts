import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-tertiary-container": "#663a47",
        "surface-container-low": "#f2f4f5",
        "inverse-primary": "#b6d4fb",
        "on-surface-variant": "#5a6062",
        outline: "#767c7e",
        "secondary-container": "#cde5ff",
        "surface-container-high": "#e5e9eb",
        secondary: "#31638a",
        "on-primary": "#f7f9ff",
        primary: "#436182",
        surface: "#f8f9fa",
        "surface-container-highest": "#dee3e5",
        tertiary: "#81525f",
        "outline-variant": "#aeb3b5",
        "on-surface": "#2e3335",
        "surface-variant": "#dee3e5",
        "surface-container-lowest": "#ffffff",
        "primary-container": "#b6d4fb",
        "tertiary-container": "#fec1d0",
        "on-secondary-container": "#20567c",
        "on-primary-container": "#2b4969",
        "surface-container": "#ebeef0",
        "surface-bright": "#f8f9fa",
        "secondary-dim": "#22577e",
        "primary-dim": "#375576",
      },
      fontFamily: {
        headline: ["var(--font-plus-jakarta-sans)"],
        body: ["var(--font-manrope)"],
        label: ["var(--font-manrope)"],
      },
    },
  },
  plugins: [],
};

export default config;
