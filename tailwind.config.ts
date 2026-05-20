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
        rouge:  '#F44839',
        blanc:  '#FEFAEF',
        bleu:   '#75BBE8',
        jaune:  '#F9DE76',
        vert:   '#A4A85A',
        marron: '#1F0C06',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body:    ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        fadeUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
