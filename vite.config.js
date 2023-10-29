import { resolve } from 'path'

export default {
  plugins: [],
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        overlay: resolve(__dirname, 'overlay/index.html')
      }
    }
  }
}