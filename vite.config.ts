import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssAutoPrefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    style: {
        // @ts-ignore
        postcssPlugins: [postCssAutoPrefixer()]
    }
  })],
  server: {
    host: "0.0.0.0"
  }
})
