// tailwind.config.js
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/tailwind';

export default defineConfig({
  darkMode: 'class',          // we toggle darkness via <html class="dark">
  safelist: [
    'bg-gray-900',
    'text-gray-100',
  ],
  plugins: [tailwindcss()],
});
