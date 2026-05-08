import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#0c0c0d",
          soft: "#1a1a1c",
          muted: "#6b6b70",
          dim: "#9a9a9f",
        },
        paper: {
          DEFAULT: "#fafaf6",
          warm: "#f5f4ee",
          card: "#ffffff",
        },
        rule: "#e6e3da",
        accent: {
          DEFAULT: "#b85c2a",
          soft: "#f3e7da",
        },
      },
      maxWidth: {
        prose: "680px",
        column: "740px",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.21, 0.62, 0.34, 1) both",
        blink: "blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
