import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: '//home/gabdev/Documents/practice/frontend_practice/beginner_projects/flash_cards/public/',
})
