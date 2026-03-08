import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import * as ReactShare from '../src/index';

const iconExportNames = Object.keys(ReactShare)
  .filter(name => name.endsWith('Icon'))
  .sort();

const representativeExportNames = [
  'FacebookShareButton',
  'TwitterShareButton',
  'FacebookShareCount',
  'FacebookIcon',
  'XIcon',
] as const;

describe('package exports', () => {
  it('exports representative public symbols', () => {
    for (const exportName of representativeExportNames) {
      expect(ReactShare[exportName]).toBeDefined();
    }
  });

  it('exports icon components', () => {
    expect(iconExportNames.length).toBeGreaterThan(0);
  });

  it.each(iconExportNames)('renders %s as an svg', iconExportName => {
    const Icon = ReactShare[iconExportName as keyof typeof ReactShare] as React.ComponentType<{
      'aria-label': string;
    }>;

    render(<Icon aria-label={iconExportName} />);

    expect(screen.getByLabelText(iconExportName).tagName.toLowerCase()).toBe('svg');
  });
});
