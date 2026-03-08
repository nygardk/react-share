import { access, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';

const rootDir = path.resolve(new URL('..', import.meta.url).pathname);
const require = createRequire(import.meta.url);

const distPaths = {
  cjs: path.join(rootDir, 'dist/index.cjs'),
  esm: path.join(rootDir, 'dist/index.js'),
  types: path.join(rootDir, 'dist/index.d.ts'),
  typesCjs: path.join(rootDir, 'dist/index.d.cts'),
};

const packageJsonPath = path.join(rootDir, 'package.json');

type PackageJson = {
  exports: {
    import: string;
    require: string;
  };
  main: string;
  module: string;
  types: string;
};

const isUsableExport = (value: unknown) =>
  typeof value === 'function' || (typeof value === 'object' && value !== null);

const representativeExportNames = [
  'FacebookShareButton',
  'TwitterShareButton',
  'FacebookIcon',
  'PinterestShareCount',
] as const;

describe('package builds', () => {
  it('declares the expected root entrypoints in package.json', async () => {
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as PackageJson;

    expect(packageJson.main).toBe('./dist/index.cjs');
    expect(packageJson.module).toBe('./dist/index.js');
    expect(packageJson.types).toBe('./dist/index.d.ts');
    expect(packageJson.exports).toEqual({
      import: './dist/index.js',
      require: './dist/index.cjs',
    });
  });

  it('emits ESM, CJS, and declaration entry files', async () => {
    // fs.access resolves with no value when the path exists and is readable.
    await expect(access(distPaths.esm)).resolves.toBeUndefined();
    await expect(access(distPaths.cjs)).resolves.toBeUndefined();
    await expect(access(distPaths.types)).resolves.toBeUndefined();
    await expect(access(distPaths.typesCjs)).resolves.toBeUndefined();
  });

  it('marks share count exports as deprecated in the built type declarations', async () => {
    const declarationBundle = await readFile(distPaths.types, 'utf8');

    expect(declarationBundle).toContain('@deprecated Share counts are deprecated and will be removed in v6.');
    expect(declarationBundle).toContain('FacebookShareCount');
    expect(declarationBundle).toContain('PinterestShareCount');
  });

  it('exports the same public surface from the ESM and CJS builds', async () => {
    const esmModule = await import(pathToFileURL(distPaths.esm).href);
    const cjsModule = require(distPaths.cjs) as Record<string, unknown>;

    expect(Object.keys(esmModule).sort()).toEqual(Object.keys(cjsModule).sort());
  });

  it.each(representativeExportNames)('exposes %s from both module formats', async exportName => {
    const esmModule = await import(pathToFileURL(distPaths.esm).href);
    const cjsModule = require(distPaths.cjs) as Record<string, unknown>;

    expect(isUsableExport(esmModule[exportName])).toBe(true);
    expect(isUsableExport(cjsModule[exportName])).toBe(true);
  });
});
