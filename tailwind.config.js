/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F5F0EB',
        'parchment-dark': '#EDE6DC',
        'parchment-deeper': '#E0D7CB',
        graphite: '#3B3B3B',
        'graphite-light': '#6B6B6B',
        blue: '#6E8CA0',
        'blue-light': '#8AAFC4',
        'blue-dark': '#4A6E84',
        clay: '#C2785C',
        'clay-light': '#D4917A',
        'clay-dark': '#A85E42',
        dark: '#2A2A2A',
        'dark-surface': '#1E1E1E',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['Fraunces', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        display: 'clamp(3rem, 6vw, 5.5rem)',
        'display-sm': 'clamp(2rem, 4vw, 3.5rem)',
      },
    },
  },
  plugins: [],
};
