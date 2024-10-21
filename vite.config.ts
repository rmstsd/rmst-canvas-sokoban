import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    port: 5633
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import h, { Fragment } from '@/h'`
  }
})
