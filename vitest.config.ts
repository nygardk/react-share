import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      all: true,
      exclude: ['demo/**', 'dist/**', 'src/index.ts', 'test/**'],
      include: ['src/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'test/PackageBuilds.test.ts'],
    setupFiles: ['./test/setup.ts'],
  },
});
