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
          DEFAULT: "#121212",
          secondary: "#1E1E2E",
          tertiary: "#101820",
        },
        "medical-primary": {
          DEFAULT: "#00BFA6",
          hover: "#03DAC5",
        },
        "medical-accent": {
          DEFAULT: "#4DA8DA",
          secondary: "#008CFF",
          tertiary: "#00AEEF",
        },
        "medical-success": "#28C76F",
        "medical-error": "#FF4C4C",
        "medical-warning": "#FFB74D",
        "medical-info": "#2196F3",
        "medical-text": {
          DEFAULT: "#E0E0E0",
          secondary: "#B0B0B0",
          tertiary: "#A8C4E4",
        },
        // System colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        'gradient-medical': 'linear-gradient(135deg, #003973, #00AEEF)',
        'gradient-teal': 'linear-gradient(135deg, #00BFA6, #008CFF)',
        'gradient-dark': 'linear-gradient(135deg, #1E1E2E, #3A3A5E)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;