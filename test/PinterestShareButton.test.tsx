import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import PinterestShareButton from '../src/PinterestShareButton';

describe('PinterestShareButton', () => {
  it('builds a create-pin url when media is provided', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    render(
      <PinterestShareButton
        description="Example description"
        media="https://example.com/image.png"
        url="https://example.com"
      >
        Pin it
      </PinterestShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Pin it' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://pinterest.com/pin/create/button/?url=https%3A%2F%2Fexample.com&media=https%3A%2F%2Fexample.com%2Fimage.png&description=Example%20description',
      '',
      expect.any(String),
    );
  });

  it('uses the repin shortcut when pinId is provided', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    render(
      <PinterestShareButton media="https://example.com/image.png" pinId="42" url="https://example.com">
        Pin it
      </PinterestShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Pin it' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://pinterest.com/pin/42/repin/x/',
      '',
      expect.any(String),
    );
  });
});
