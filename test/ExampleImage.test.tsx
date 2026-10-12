import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Demo } from '../demo/Demo';

const ICON_SIZE = 64;
const GAP = 16;
const PADDING = 16;

// Builds the README preview (example.svg) from the icons the demo renders,
// in demo order. Run `npm run update-example` after changing icons or the
// demo; CI fails while the committed file is stale.
function renderExampleSvg() {
  const { container } = render(<Demo />);
  const icons = Array.from(container.querySelectorAll('svg'));
  const width = PADDING * 2 + icons.length * ICON_SIZE + (icons.length - 1) * GAP;
  const height = PADDING * 2 + ICON_SIZE;

  const lines = icons.map((icon, index) => {
    const placed = icon.cloneNode(true) as SVGSVGElement;

    placed.setAttribute('x', String(PADDING + index * (ICON_SIZE + GAP)));
    placed.setAttribute('y', String(PADDING));
    placed.setAttribute('width', String(ICON_SIZE));
    placed.setAttribute('height', String(ICON_SIZE));

    return `  ${placed.outerHTML}`;
  });

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="react-share icons">`,
    ...lines,
    '</svg>',
    '',
  ].join('\n');
}

describe('README example image', () => {
  it('matches the icons rendered by the demo', async () => {
    const svg = renderExampleSvg();

    expect(svg.match(/<svg /g)?.length).toBeGreaterThan(20);
    await expect(svg).toMatchFileSnapshot('../example.svg');
  });
});
