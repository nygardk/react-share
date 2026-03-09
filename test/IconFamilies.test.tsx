import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FacebookIcon } from '../src/FacebookIcon';
import { FacebookLegacyIcon } from '../src/FacebookLegacyIcon';
import { LinkedinIcon } from '../src/LinkedinIcon';
import { NativeShareIcon } from '../src/NativeShareIcon';
import { NativeShareLegacyIcon } from '../src/NativeShareLegacyIcon';
import { RawIconBase } from '../src/icons/RawIconBase';

describe('raw icon family', () => {
  it('renders background-free icons with their default brand color', () => {
    render(<FacebookIcon aria-label="facebook icon" data-testid="facebook-icon" />);

    const svg = screen.getByTestId('facebook-icon');

    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('fill', '#0866FF');
    expect(svg.querySelector('rect')).toBeNull();
    expect(svg.querySelector('circle')).toBeNull();
  });

  it('keeps repo-local raw icons background-free', () => {
    render(<LinkedinIcon aria-label="linkedin icon" data-testid="linkedin-icon" size={32} />);

    const svg = screen.getByTestId('linkedin-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
    expect(svg).toHaveAttribute('fill', '#0077B5');
    expect(svg.querySelector('rect')).toBeNull();
    expect(svg.querySelector('circle')).toBeNull();
  });

  it('uses the current text color for the native share glyph', () => {
    render(<NativeShareIcon aria-label="native share icon" data-testid="native-share-icon" />);

    expect(screen.getByTestId('native-share-icon')).toHaveAttribute('fill', 'currentColor');
  });

  it('passes standard svg props through the raw icon base', () => {
    render(
      <RawIconBase
        aria-label="raw icon"
        color="#123456"
        data-testid="raw-icon"
        role="img"
        size={32}
        viewBox="0 0 32 32"
      >
        <path d="M4 4h24v24H4z" />
      </RawIconBase>,
    );

    const svg = screen.getByTestId('raw-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
    expect(svg).toHaveAttribute('fill', '#123456');
    expect(svg).toHaveAttribute('viewBox', '0 0 32 32');
  });
});

describe('legacy icon family', () => {
  it('renders the existing badge background by default', () => {
    render(
      <FacebookLegacyIcon aria-label="facebook legacy icon" data-testid="facebook-legacy-icon" />,
    );

    const svg = screen.getByTestId('facebook-legacy-icon');
    const rect = svg.querySelector('rect');
    const path = svg.querySelector('path');

    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveAttribute('height', '64');
    expect(rect).toHaveAttribute('fill', '#0866FF');
    expect(path).toHaveAttribute('fill', 'white');
  });

  it('preserves round, bgStyle, and iconFillColor support on legacy icons', () => {
    render(
      <NativeShareLegacyIcon
        aria-label="native share legacy icon"
        bgStyle={{ opacity: 0.5 }}
        data-testid="native-share-legacy-icon"
        iconFillColor="black"
        round
        size={32}
      />,
    );

    const svg = screen.getByTestId('native-share-legacy-icon');
    const circle = svg.querySelector('circle');
    const rect = svg.querySelector('rect');
    const path = svg.querySelector('path');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
    expect(circle).toHaveStyle({ opacity: '0.5' });
    expect(rect).toBeNull();
    expect(path).toHaveAttribute('fill', 'black');
  });

  it('applies borderRadius when rendering a legacy rectangular icon', () => {
    render(
      <FacebookLegacyIcon
        aria-label="rounded legacy icon"
        borderRadius={12}
        data-testid="rounded-legacy-icon"
      />,
    );

    const rect = screen.getByTestId('rounded-legacy-icon').querySelector('rect');

    expect(rect).toHaveAttribute('rx', '12');
    expect(rect).toHaveAttribute('ry', '12');
  });
});
