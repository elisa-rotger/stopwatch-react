import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // root: '/Users/elisa.rotger/Documents/Workspace/Projects/stopwatch-react/',
  base: '/stopwatch-react/src',
  plugins: [react()],
})
