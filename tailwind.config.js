export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          100: '#fef8e9',
          200: '#fde9c3',
          300: '#f5d5a0',
          400: '#ecc27e',
          500: '#d4a574',
          600: '#c99462',
          700: '#b87d4e',
          950: '#6d5a3d',
        },
        dark: {
          600: '#222222',
          700: '#161616',
          800: '#1a1a1a',
          900: '#0f0f0f',
          950: '#070707',
        },
      },
      boxShadow: {
        gold: '0 0 30px rgba(212,165,116,0.22)',
      },
      backgroundImage: {
        'islamic-grid': "radial-gradient(circle at 20% 20%, rgba(212,165,116,0.08), transparent 25%), radial-gradient(circle at 80% 70%, rgba(212,165,116,0.06), transparent 22%)",
        'gradient-gold': 'linear-gradient(135deg, #d4a574, #fef8e9)',
      },
    },
  },
  plugins: [],
};
