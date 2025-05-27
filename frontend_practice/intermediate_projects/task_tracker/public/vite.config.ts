import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/practice/frontend_practice/intermediate_projects/task_tracker/public/dist/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), 
    },
  },
})
