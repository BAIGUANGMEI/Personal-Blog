import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  define:{
    __BUILD_ID__: JSON.stringify(Date.now())
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build:{
    target: 'esnext',

  },
  optimizeDeps:{
    esbuildOptions:{
      target: 'esnext',
    }
  }
})
