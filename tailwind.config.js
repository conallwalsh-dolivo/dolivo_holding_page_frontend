/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'tight-xl': '-1.44px',
        'tight-lg': '-0.96px',
        'tight-md': '-0.22px',
        'wide-sm': '0.28px',
        'wide-xs': '0.16px',
      },
      lineHeight: {
        'heading': '68px',
        'subheading': '48px',
      },
    },
  },
  plugins: [],
}
