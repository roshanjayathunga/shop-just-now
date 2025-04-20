import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f9f9f9", // Light Gray for app background
        foreground: "#1a1a1a", // Dark Gray for text
        card: {
          DEFAULT: "#ffffff", // Pure White for cards
          foreground: "#1a1a1a", // Dark Gray for card text
        },
        popover: {
          DEFAULT: "#ffffff", // Pure White for popovers
          foreground: "#1a1a1a", // Dark Gray for popover text
        },
        primary: {
          DEFAULT: "#ff6f61", // Warm Coral for primary actions
          foreground: "#ffffff", // White for primary text
        },
        secondary: {
          DEFAULT: "#ffb74d", // Soft Orange for secondary actions
          foreground: "#ffffff", // White for secondary text
        },
        muted: {
          DEFAULT: "#e0e0e0", // Light Gray for muted elements
          foreground: "#757575", // Medium Gray for muted text
        },
        accent: {
          DEFAULT: "#4caf50", // Green for accents (e.g., success)
          foreground: "#ffffff", // White for accent text
        },
        destructive: {
          DEFAULT: "#f44336", // Red for destructive actions
          foreground: "#ffffff", // White for destructive text
        },
        border: "#d6d6d6", // Light Gray for borders
        input: "#f5f5f5", // Very Light Gray for input backgrounds
        ring: "#ff6f61", // Coral for focus rings
        chart: {
          "1": "#42a5f5", // Blue for charts
          "2": "#66bb6a", // Green for charts
          "3": "#ffa726", // Orange for charts
          "4": "#ab47bc", // Purple for charts
          "5": "#ef5350", // Red for charts
        },
        sidebar: {
          DEFAULT: "#ffffff", // White for sidebar background
          foreground: "#1a1a1a", // Dark Gray for sidebar text
          primary: "#ff6f61", // Coral for sidebar highlights
          "primary-foreground": "#ffffff", // White for sidebar primary text
          accent: "#e3f2fd", // Light Blue for sidebar accents
          "accent-foreground": "#01579b", // Dark Blue for sidebar accent text
          border: "#d6d6d6", // Light Gray for sidebar borders
          ring: "#4caf50", // Green for sidebar focus rings
        },
      },
      borderRadius: {
        lg: "1rem", // Large rounded corners
        md: "0.5rem", // Medium rounded corners
        sm: "0.25rem", // Small rounded corners
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
