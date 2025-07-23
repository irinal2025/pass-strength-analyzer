import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: '/', // Azure Static Web Apps 
  base: '/pass-strength-analyzer/', // GitHub-repo
  build: {
    sourcemap: true, // Lisätään sourcemap-tiedostot buildiin. Tämä on hyödyllistä, jos halutaan debuggata tuotantoversiota.
    outDir: 'dist', // Varmistetaan, että kaikki menee distiin, mutta ei tarvita erillistä /dist/ -polkua.
  }
})
