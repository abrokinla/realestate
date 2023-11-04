import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    optimizeDeps: {
      include: ['/src/index.jsx'],
    },
    rollupOptions: {
      input: '/src/index.jsx',
    },
  },
})
