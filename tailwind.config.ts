import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080711",
        foreground: "#F8FAFC",
        surface: {
          DEFAULT: "#0F0E1E",
          card: "#121124",
          muted: "#181530",
          elevated: "#1D193B",
          border: "#262248",
          hover: "#2A2552",
        },
        brand: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#A855F7",
          600: "#8B5CF6", // Electric Violet
          700: "#7C3AED", // Primary Purple
          800: "#6D28D9",
          900: "#581C87",
        },
        nta: {
          answered: "#10B981",         // Emerald green
          notAnswered: "#EF4444",      // Red
          notVisited: "#332F52",       // Slate purple
          markedReview: "#8B5CF6",     // Purple
          answeredReview: "#A855F7",   // Neon purple
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
