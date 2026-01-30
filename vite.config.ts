/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 
      'App.spec.ts', 
      'src/services/useLogHistory.spec.ts', 
      'src/services/useMessageForm.spec.ts', 
      'src/components/__tests__/HomeView.spec.ts',
      'useLogHistory.spec.ts',
      'useMessageForm.spec.ts',
      'NotificationService.spec.ts',
      'src/services/NotificationService.spec.ts'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
