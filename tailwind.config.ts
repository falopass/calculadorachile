import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        chilean: {
          blue: "#1E3A8A",
          red: "#DC2626",
        },
        offwhite: "#F8FAFC",
        charcoal: "#1E293B",
      },
      fontFamily: {
        heading: ["var(--font-syne)"],
        body: ["var(--font-dm-sans)"],
        drama: ["var(--font-playfair)"],
        mono: ["var(--font-jetbrains)"],
      },
      borderRadius: {
        card: "1.5rem",
        pill: "2rem",
        "3xl": "2.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
