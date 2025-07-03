/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // Sudah benar
    "./public/**/*.html",           // Tambahan (untuk jaga-jaga jika ada HTML di public)
  ],
  theme: {
    extend: {
      // Tambahkan jika ingin kostumisasi breakpoint atau warna
    },
  },
  plugins: [
    aspectRatio,
  ],
}
