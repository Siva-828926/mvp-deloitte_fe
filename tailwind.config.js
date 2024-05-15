/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      colors: {
        'loginpage-white': 'rgba(240, 240, 240)',
        'loginpage-white-center': 'rgba(255, 255, 255)',
        'transparent-blue': 'rgba(0, 0, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
