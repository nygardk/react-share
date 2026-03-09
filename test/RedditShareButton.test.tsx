import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import RedditShareButton from '../src/RedditShareButton';

describe('RedditShareButton', () => {
  it('uses the current Reddit share URL', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    render(
      <RedditShareButton title="Example title" url="https://example.com">
        Share to Reddit
      </RedditShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share to Reddit' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://www.reddit.com/submit?url=https%3A%2F%2Fexample.com&title=Example%20title',
      '',
      expect.any(String),
    );
  });
});
