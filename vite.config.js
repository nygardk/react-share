/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const { dependencies, peerDependencies } = JSON.parse(fs.readFileSync(`./package.json`, 'utf8'));

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    target: 'es2017',
    lib: {
      fileName: 'index',
      formats: ['cjs', 'es'],
      entry: 'src/index.ts',
    },
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    rollupOptions: {
      external: [
        ...Object.keys(dependencies || {}),
        ...Object.keys(peerDependencies || {}),
        'react/jsx-runtime',
      ],
    },
  },
});
