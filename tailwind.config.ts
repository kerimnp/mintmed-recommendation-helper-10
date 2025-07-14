
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
        // iOS Design System Colors
        "ios": {
          blue: "hsl(var(--ios-blue))",
          green: "hsl(var(--ios-green))",
          orange: "hsl(var(--ios-orange))",
          red: "hsl(var(--ios-red))",
          purple: "hsl(var(--ios-purple))",
          gray: "hsl(var(--ios-gray))",
        },
        
        // Medical theme colors (keeping for compatibility)
        "medical-bg": {
          DEFAULT: "#FFFFFF", 
          secondary: "#F0F4F8", 
          tertiary: "#E2E8F0",   
        },
        "medical-primary": { 
          DEFAULT: "hsl(var(--primary))", 
          hover: "hsl(var(--primary) / 0.9)", 
        },
        "medical-accent": { 
          DEFAULT: "hsl(var(--accent))", 
          secondary: "hsl(var(--ios-blue))",
          tertiary: "hsl(var(--ios-purple))",
        },
        "medical-text": { 
          DEFAULT: "hsl(var(--foreground))", 
          secondary: "hsl(var(--muted-foreground))", 
          tertiary: "hsl(var(--muted-foreground) / 0.7)",  
        },
        "medical-success": "hsl(var(--ios-green))",
        "medical-error": "hsl(var(--ios-red))",
        "medical-warning": "hsl(var(--ios-orange))",
        "medical-info": "hsl(var(--ios-blue))",

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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", // Added slow pulse
      },
      backgroundImage: {
        'gradient-ios-blue': 'var(--gradient-ios-blue)',
        'gradient-ios-purple': 'var(--gradient-ios-purple)',
        'gradient-glass': 'var(--gradient-glass)',
        'gradient-medical': 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
        'gradient-hero': 'linear-gradient(135deg, hsl(var(--ios-blue)), hsl(var(--ios-purple)))',
        'gradient-subtle': 'linear-gradient(180deg, hsl(var(--background)), hsl(var(--muted)))',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
