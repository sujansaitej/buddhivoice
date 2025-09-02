/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#000000',
          darkRed: '#3D0000',
          red: '#950101',
          brightRed: '#FF0000',
        },
        custom: {
          black: 'rgb(0, 0, 0)',
          darkRed: 'rgb(61, 0, 0)',
          red: 'rgb(149, 1, 1)',
          brightRed: 'rgb(255, 0, 0)',
        }
      },
      fontFamily: {
        'google-sans': ['Google Sans', 'Inter', 'system-ui', 'sans-serif'],
        'sans': ['Google Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
