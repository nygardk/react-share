import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EmailIcon } from '../src/EmailIcon';
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

  it('draws LinkedIn as a single-color full-size mark', () => {
    render(<LinkedinIcon aria-label="linkedin icon" data-testid="linkedin-icon" size={32} />);

    const svg = screen.getByTestId('linkedin-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
    expect(svg).toHaveAttribute('fill', '#0A66C2');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg.querySelector('rect')).toBeNull();
    expect(svg.querySelector('circle')).toBeNull();
  });

  it('renders outlined icons with a stroke in their default color', () => {
    render(<EmailIcon aria-label="email icon" data-testid="email-icon" />);

    const svg = screen.getByTestId('email-icon');

    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', '#7f7f7f');
    expect(svg).toHaveAttribute('stroke-width', '2');
    expect(svg).toHaveAttribute('stroke-linecap', 'round');
    expect(svg).toHaveAttribute('stroke-linejoin', 'round');
  });

  it('recolors outlined icons through the color and fill props', () => {
    render(
      <>
        <EmailIcon color="#123456" data-testid="email-color" />
        <EmailIcon data-testid="email-fill" fill="#654321" />
      </>,
    );

    expect(screen.getByTestId('email-color')).toHaveAttribute('stroke', '#123456');
    expect(screen.getByTestId('email-color')).toHaveAttribute('fill', 'none');
    expect(screen.getByTestId('email-fill')).toHaveAttribute('stroke', '#654321');
    expect(screen.getByTestId('email-fill')).toHaveAttribute('fill', 'none');
  });

  it('recolors filled icons through the color prop', () => {
    render(<FacebookIcon color="#123456" data-testid="facebook-color" />);

    expect(screen.getByTestId('facebook-color')).toHaveAttribute('fill', '#123456');
  });

  it('uses the current text color for the native share glyph', () => {
    render(<NativeShareIcon aria-label="native share icon" data-testid="native-share-icon" />);

    const svg = screen.getByTestId('native-share-icon');

    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
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
