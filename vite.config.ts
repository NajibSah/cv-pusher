import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Vercel injects environment variables into process.env during build.
  // We prioritize process.env.API_KEY (System/Vercel) -> env.API_KEY (.env file) -> Empty string
  const apiKey = process.env.API_KEY || env.API_KEY || '';

  return {
    plugins: [react()],
    define: {
      // This exposes process.env.API_KEY to the client-side code
      // The JSON.stringify is crucial to ensure it's inserted as a string literal
      'process.env.API_KEY': JSON.stringify(apiKey) 
    }
  }
})