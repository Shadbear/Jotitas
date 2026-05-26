/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#ff00ff',
          green: '#39ff14',
          blue: '#00ffff',
        },
      },
      boxShadow: {
        'neon': '0 0 10px #ff00ff, 0 0 20px #ff00ff',
      },
      // Puedes añadir más animaciones personalizadas aquí si quieres
      animation: {
        'pulse-neon': 'pulse-neon 2s infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff' },
          '50%': { boxShadow: '0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 60px #ff00ff' },
        }
      }
    },
  },
  plugins: [],
}