/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './demo',
  plugins: [react()],
  build: {
    outDir: '../demo',
    emptyOutDir: true,
    cssMinify: false,
  },
});
