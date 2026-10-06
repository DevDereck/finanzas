/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F14',
        surface: {
          DEFAULT: '#111820',
          secondary: '#171F29',
        },
        border: '#25303B',
        primary: {
          DEFAULT: '#4F8CFF',
          hover: '#3A74DF',
        },
        success: '#35C98B',
        warning: '#F2B84B',
        danger: '#FF5C70',
        text: {
          DEFAULT: '#F5F7FA',
          secondary: '#9AA6B2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
