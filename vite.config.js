import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // The production site is served from the custom domain root:
  // https://agentstrategycouncil.com/
  // Keep '/' as the default so GitHub Pages custom-domain deploys do not emit
  // /agent-strategy-council-asp/assets/... paths that 404 on the public domain.
  base: process.env.VITE_BASE_PATH || '/',
});
