
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Medical theme colors
        "medical-bg": {
          DEFAULT: "#FFFFFF", // Changed to white for light theme base
          secondary: "#F0F4F8", // Light grayish blue
          tertiary: "#E2E8F0",   // Lighter gray
        },
        "medical-primary": { // Horalix Primary Blue
          DEFAULT: "#2A7FFF", 
          hover: "#1A6FFF", // Darker shade for hover
        },
        "medical-accent": { // A complementary accent, can adjust
          DEFAULT: "#4DA8DA", // Existing accent
          secondary: "#008CFF",
          tertiary: "#00AEEF",
        },
        "medical-text": { // Dark slate for text
          DEFAULT: "#334155", 
          secondary: "#475569", // Lighter slate
          tertiary: "#64748B",  // Even lighter slate
        },
        "medical-success": "#28C76F",
        "medical-error": "#FF4C4C",
        "medical-warning": "#FFB74D",
        "medical-info": "#2196F3",

        // System colors (ensure these align with light mode first)
        border: "hsl(var(--border))", // Should be light gray for light mode
        input: "hsl(var(--input))",   // Light gray
        ring: "hsl(var(--ring))",     // Primary blue: #2A7FFF
        background: "hsl(var(--background))", // White: #FFFFFF
        foreground: "hsl(var(--foreground))", // Dark Slate: #334155
        primary: {
          DEFAULT: "hsl(var(--primary))", // Dark Slate
          foreground: "hsl(var(--primary-foreground))", // White
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Light gray
          foreground: "hsl(var(--secondary-foreground))", // Dark Slate
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))", // White
          foreground: "hsl(var(--card-foreground))", // Dark Slate
        },
      },
      fontFamily: { // Added Inter font as primary
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-slow": { // Added slow pulse for alerts
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(200%) skewX(-12deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", // Added slow pulse
        "shimmer": "shimmer 2s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-medical': 'linear-gradient(135deg, #2A7FFF, #4DA8DA)', // Updated with primary blue
        'gradient-teal': 'linear-gradient(135deg, #00BFA6, #008CFF)',
        'gradient-dark': 'linear-gradient(135deg, #1E1E2E, #3A3A5E)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
