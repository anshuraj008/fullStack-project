/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
        border: "var(--color-border)", /* light-pink-gray */
        input: "var(--color-input)", /* near-white */
        ring: "var(--color-ring)", /* baby-pink */
        background: "var(--color-background)", /* near-white */
        foreground: "var(--color-foreground)", /* charcoal */
        primary: {
          DEFAULT: "var(--color-primary)", /* baby-pink */
          foreground: "var(--color-primary-foreground)", /* charcoal */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* deeper-pink */
          foreground: "var(--color-secondary-foreground)", /* charcoal */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* muted-coral */
          foreground: "var(--color-destructive-foreground)", /* charcoal */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* warm-neutral */
          foreground: "var(--color-muted-foreground)", /* medium-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* misty-rose */
          foreground: "var(--color-accent-foreground)", /* charcoal */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* near-white */
          foreground: "var(--color-popover-foreground)", /* charcoal */
        },
        card: {
          DEFAULT: "var(--color-card)", /* warm-neutral */
          foreground: "var(--color-card-foreground)", /* charcoal */
        },
        success: {
          DEFAULT: "var(--color-success)", /* soft-sage-green */
          foreground: "var(--color-success-foreground)", /* charcoal */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* warm-golden-yellow */
          foreground: "var(--color-warning-foreground)", /* charcoal */
        },
        error: {
          DEFAULT: "var(--color-error)", /* muted-coral */
          foreground: "var(--color-error-foreground)", /* charcoal */
        },
        surface: "var(--color-surface)", /* warm-neutral */
        'text-primary': "var(--color-text-primary)", /* charcoal */
        'text-secondary': "var(--color-text-secondary)", /* medium-gray */
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius)",
        sm: "calc(var(--radius) - 2px)",
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Source Sans Pro', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'medium': 'var(--shadow-medium)',
        'large': 'var(--shadow-large)',
        'xl-custom': 'var(--shadow-xl)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'smooth': '200ms',
        'large': '400ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}