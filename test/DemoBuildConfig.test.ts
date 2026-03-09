import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

describe('demo build config', () => {
  it('writes built assets under demo/dist without overwriting demo sources', async () => {
    const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    const configPath = path.join(workspaceRoot, 'vite.demo.config.js');
    const configSource = await readFile(configPath, 'utf8');

    expect(configSource).toContain("root: './demo'");
    expect(configSource).toContain("outDir: './dist'");
    expect(configSource).not.toContain("outDir: '../demo'");
  });
});
