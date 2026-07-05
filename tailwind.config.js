/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#001050',
        deep: '#002060',
        royal: '#002070',
        medium: '#0040A0',
        bright: '#0060D0',
        light: '#0070D0',
        accent: '#0040B0',
        foam: '#e8f2ff',
        muted: '#4060a0',
        brandGreen: '#22c55e',
        gold: '#f5c842',
      },
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        barlowCond: ['"Barlow Condensed"', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-22px) scale(1.03)' },
        },
        smoothFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        bounceArrow: {
          '0%, 100%': { transform: 'rotate(45deg) translateY(0)' },
          '50%': { transform: 'rotate(45deg) translateY(6px)' },
        },
      },
      animation: {
        float: 'float 10s ease-in-out infinite',
        smoothFloat: 'smoothFloat 6s ease-in-out infinite',
        blink: 'blink 1.8s ease-in-out infinite',
        bounceArrow: 'bounceArrow 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};