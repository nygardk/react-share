import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import createIcon from '../src/hocs/createIcon';

const TestIcon = createIcon({
  color: '#123456',
  networkName: 'test',
  path: 'M1 1h62v62H1z',
});

describe('createIcon', () => {
  it('renders a rectangular icon by default', () => {
    render(<TestIcon aria-label="test icon" data-testid="icon" />);

    const svg = screen.getByTestId('icon');
    const rect = svg.querySelector('rect');
    const path = svg.querySelector('path');

    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveAttribute('height', '64');
    expect(rect).toHaveAttribute('fill', '#123456');
    expect(path).toHaveAttribute('fill', 'white');
  });

  it('renders a round icon with custom style props', () => {
    render(
      <TestIcon
        aria-label="round icon"
        bgStyle={{ opacity: 0.5 }}
        iconFillColor="black"
        round
        size={32}
      />,
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
    render(<TestIcon aria-label="rounded rect" borderRadius={12} />);

    const rect = screen.getByLabelText('rounded rect').querySelector('rect');

    expect(rect).toHaveAttribute('rx', '12');
    expect(rect).toHaveAttribute('ry', '12');
  });
});
