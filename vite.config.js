import * as fs from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const pkg = JSON.parse(fs.readFileSync(`./package.json`, 'utf8'));

const externalDeps = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
  'react/jsx-runtime',
];

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      afterBuild: () => {
        // https://github.com/qmhc/vite-plugin-dts/issues/267
        fs.copyFileSync('dist/index.d.ts', 'dist/index.d.cts');
      },
      include: ['src'],
      tsconfigPath: './tsconfig.json',
    }),
  ],
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
      external: externalDeps,
    },
  },
});
