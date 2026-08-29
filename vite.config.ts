import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    /* Vite has no built-in PORT convention — it only reads `--port` or
       this field — so an assigned port would otherwise be ignored and
       the server would take 5173 again and collide. Nothing here needs a
       fixed port (no OAuth callback, webhook or CORS origin), so the
       assigned one wins and 5173 is only the fallback. */
    port: Number(process.env.PORT) || 5173,
  },
})
