import { defineConfig } from 'vite'
import dns from 'dns'
import react from '@vitejs/plugin-react-swc'
import pluginRewriteAll from 'vite-plugin-rewrite-all';

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [react(),pluginRewriteAll()],
  server: {
    host: 'localhost',
    port: 3000
  },
 
})