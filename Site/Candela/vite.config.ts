import { defineConfig } from 'vite'
import path from 'path'
import { AliasOptions } from 'vite'
import vue from '@vitejs/plugin-vue'

const alias = {
  '@': path.resolve(__dirname as string, './src'),
  '#': path.resolve(__dirname as string, './types'),
} as AliasOptions

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {alias}
})
