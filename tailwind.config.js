/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#FAF8F3',
          aged: '#F4E8D0',
        },
        ink: {
          black: '#2C2C2C',
          faded: '#6B6B6B',
        },
        ribbon: '#B83C3C',
        clip: {
          silver: '#C0C0C0',
          shadow: '#808080',
        },
      },
      fontFamily: {
        klee: ['"Klee One"', '"Noto Sans JP"', 'cursive'],
        courier: ['"Courier Prime"', '"Noto Sans JP"', 'monospace'],
      },
      animation: {
        'paper-float': 'paperFloat 4s ease-in-out infinite',
        'page-turn': 'pageTurn 0.3s ease-out',
      },
      keyframes: {
        paperFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        pageTurn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
