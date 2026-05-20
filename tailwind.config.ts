import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fond: '#FAF8F5',
        encre: {
          DEFAULT: '#1C1917',
          muted: '#78716C',
        },
        accent: {
          DEFAULT: '#D9541E',
          light: '#FEF0EA',
          hover: '#B8441A',
        },
        pierre: {
          DEFAULT: '#E7E0D8',
          light: '#F5F0EC',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-out-left': 'slideOutLeft 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(60px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-60px)', opacity: '0' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
