module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      keyframes: {
        'test-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20%)' },
        }
      },
      animation: {
        'test-bounce': 'test-bounce 1s ease-in-out 1',
      }
    }
  }
}
