import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // root: '/Users/elisa.rotger/Documents/Workspace/Projects/stopwatch-react/',
  base: './',
  plugins: [react()],
  // resolve: {
  //   alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  // },
})
