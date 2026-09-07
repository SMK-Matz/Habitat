import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If your repo is NOT at the root of a custom domain,
// change base to '/your-repo-name/'  e.g. '/habitat-inventory/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
