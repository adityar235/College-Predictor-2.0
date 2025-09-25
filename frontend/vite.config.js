import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://college-predictor-2-0-cp21.vercel.app/',
//         changeOrigin: true
//       }
//     }
//   },
//   build: {
//     outDir: 'dist',
//     sourcemap: false
//   }
// })
