import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Demo } from '../demo/Demo';

describe('Demo', () => {
  it('gives every share button an accessible name', () => {
    render(<Demo />);

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBeGreaterThan(0);

    for (const button of buttons) {
      expect(button).toHaveAccessibleName();
    }
  });
});
