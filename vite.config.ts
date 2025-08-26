// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If your Pages URL is https://USERNAME.github.io/REPO/,
// set base to "/REPO/".  For user/org sites (https://USERNAME.github.io/),
// use base: "/".
export default defineConfig({
  base: '/ratios-simulator/', // e.g., '/ratios-simulator/'  ← change this
  plugins: [react()],
})
