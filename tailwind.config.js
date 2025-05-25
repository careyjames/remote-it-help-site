/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',          // ← tell Tailwind we’ll control dark-mode with a class
  content: [
    './src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#22d3ee', // cyan-400 for better contrast
        },
      },
    },
  },
  plugins: [],
};
