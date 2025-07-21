/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'muddle-green': {
          50: '#E6F3EA',
          100: '#C3E2C8',
          200: '#9ED6A2',
          300: '#7AC87D',
          400: '#59BD60',
          500: '#3FAF4A',
          600: '#35993F',
          700: '#2C7C34',
          800: '#225729',
          900: '#143A19',
        },
        'muddle-blue': {
          50: '#e6f0fa',
          100: '#c6dbf3',
          200: '#9ec3eb',
          300: '#70a7e0',
          400: '#498ed7',
          500: '#2c74be',
          600: '#1f5a94',
          700: '#18456d',
          800: '#112f47',
          900: '#0a1a23',
        },
      },
    },
  },
  plugins: [],
};
