import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* every token resolves from a CSS variable, so the whole
           palette swaps instantly between light and dark */
        page: "rgb(var(--c-page) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        raise: "rgb(var(--c-raise) / <alpha-value>)",
        content: "rgb(var(--c-content) / <alpha-value>)",
        mute: "rgb(var(--c-mute) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        gold: "rgb(var(--c-gold) / <alpha-value>)",
        goldsoft: "rgb(var(--c-gold-soft) / <alpha-value>)",
        navy: "rgb(var(--c-navy) / <alpha-value>)",
        champagne: "rgb(var(--c-champagne) / <alpha-value>)",
        sky: "rgb(var(--c-sky) / <alpha-value>)",
        teal: "rgb(var(--c-teal) / <alpha-value>)",
        coral: "rgb(var(--c-coral) / <alpha-value>)",
        violet: "rgb(var(--c-violet) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "28px",
        "5xl": "34px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin-slow 26s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
