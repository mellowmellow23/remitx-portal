/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- REMITX PROTOCOL DEFINITIVE PALETTE ---
        'rmx-black': '#050505',
        'rmx-green': '#8CF40E',
        'rmx-slate': '#0F172A',
        'rmx-white': '#F0F0EF',
      },
    },
  },
  plugins: [],
}
