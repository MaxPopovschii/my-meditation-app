module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite'
      },
      cursor: {
        'not-allowed': 'not-allowed',
        'zoom-in': 'zoom-in',
        'zoom-out': 'zoom-out',
        'grab': 'grab',
        'grabbing': 'grabbing',
        'help': 'help',
        'wait': 'wait',
        'crosshair': 'crosshair',
      }
    },
  },
  plugins: [],
}