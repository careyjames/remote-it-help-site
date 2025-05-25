/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',          // we’ll force <html class="dark"> for now
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        bg:     '#121212',     // near-black background
        fg:     '#ECECEC',     // primary text
        accent: '#00FF9D',     // soft neon green accent
        dim:    '#888A',       // faint grey for borders / meta text
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
};
