/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      redditOrange: '#ff4500',
    },
    fontFamily: {
      roboto: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  },
};
export const darkMode = 'class';