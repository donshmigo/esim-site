import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@features': resolve(__dirname, './src/features'),
      '@pages': resolve(__dirname, './src/pages'),
      '@layouts': resolve(__dirname, './src/layouts'),
      '@components': resolve(__dirname, './src/components'),
      '@firebase': resolve(__dirname, './src/firebase'),
      '@assets': resolve(__dirname, './src/assets'),
      '@utils': resolve(__dirname, './src/utils'),
    },
  },
})
