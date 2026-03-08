import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FacebookIcon from '../src/FacebookIcon';
import IconBase from '../src/icons/IconBase';

describe('IconBase', () => {
  it('renders exported icons with the shared rectangular background by default', () => {
    render(<FacebookIcon aria-label="facebook icon" data-testid="icon" />);

    const svg = screen.getByTestId('icon');
    const rect = svg.querySelector('rect');
    const path = svg.querySelector('path');

    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveAttribute('height', '64');
    expect(rect).toHaveAttribute('fill', '#0965FE');
    expect(path).toHaveAttribute('fill', 'white');
  });

  it('renders a round icon with custom style props', () => {
    render(
      <IconBase
        aria-label="round icon"
        bgStyle={{ opacity: 0.5 }}
        color="#123456"
        iconFillColor="black"
        round
        size={32}
      >
        <path d="M1 1h62v62H1z" />
      </IconBase>,
    );

    const svg = screen.getByLabelText('round icon');
    const circle = svg.querySelector('circle');
    const rect = svg.querySelector('rect');
    const path = svg.querySelector('path');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
    expect(circle).toHaveStyle({ opacity: '0.5' });
    expect(rect).toBeNull();
    expect(path).toHaveAttribute('fill', 'black');
  });

  it('applies borderRadius when rendering a non-round icon', () => {
    render(
      <IconBase aria-label="rounded rect" borderRadius={12} color="#123456">
        <path d="M1 1h62v62H1z" />
      </IconBase>,
    );

    const rect = screen.getByLabelText('rounded rect').querySelector('rect');

    expect(rect).toHaveAttribute('rx', '12');
    expect(rect).toHaveAttribute('ry', '12');
  });
});
