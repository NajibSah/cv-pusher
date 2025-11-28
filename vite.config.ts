import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // ⚠️ SECURITY WARNING: Hardcoding your API key is risky if you commit this file to GitHub.
      // For Vercel deployment, it is better to use Environment Variables in the Vercel Dashboard.
      // However, to put it directly here as requested, replace the string below with your actual key:
      'process.env.API_KEY': JSON.stringify("") 
    }
  }
})