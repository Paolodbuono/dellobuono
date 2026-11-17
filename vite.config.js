import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' fa funzionare il sito anche caricato in una sottocartella dell'hosting Aruba
export default defineConfig({
  base: './',
  plugins: [react()],
})
