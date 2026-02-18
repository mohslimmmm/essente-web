/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'essente-cream': '#F9F9F7',
        'essente-charcoal': '#1A1A1A',
        'essente-gold': '#D4AF37',
        'essente-gold-light': '#E8D4B0',
        'essente-gold-dark': '#A08442',
        'primary-navy': '#0a192f',
        'action-orange': '#FF5722',
      },
      fontFamily: {
        elegant: ['"Playfair Display"', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      }
    },
  },
  plugins: [],
}
