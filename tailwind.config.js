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
          purple: '#bf00ff', // <--- Añadido el morado
        },
      },
      boxShadow: {
        // Ajustado para usar el morado por defecto o el que prefieras
        'neon-purple': '0 0 10px #bf00ff, 0 0 20px #bf00ff', 
      },
      animation: {
        'pulse-neon-purple': 'pulse-neon-purple 2s infinite',
      },
      keyframes: {
        'pulse-neon-purple': {
          '0%, 100%': { boxShadow: '0 0 10px #bf00ff, 0 0 20px #bf00ff' },
          '50%': { boxShadow: '0 0 20px #bf00ff, 0 0 40px #bf00ff, 0 0 60px #bf00ff' },
        }
      }
    },
  },
  plugins: [],
}