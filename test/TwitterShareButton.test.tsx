import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import XShareButton from '../src/XShareButton';
import TwitterShareButton from '../src/TwitterShareButton';

const shareButtons = [
  ['XShareButton', XShareButton],
  ['TwitterShareButton', TwitterShareButton],
] as const;

describe.each(shareButtons)('%s', (_, ShareButtonComponent) => {
  it('builds a share url with hashtags and related accounts', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    render(
      <ShareButtonComponent
        hashtags={['react', 'share']}
        related={['openai', 'vitejs']}
        title="Example title"
        url="https://example.com"
        via="reactshare"
      >
        Share on X
      </ShareButtonComponent>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share on X' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://twitter.com/intent/tweet?url=https%3A%2F%2Fexample.com&text=Example%20title&via=reactshare&hashtags=react%2Cshare&related=openai%2Cvitejs',
      '',
      expect.any(String),
    );
  });

  it('does not forward share option props to the button element', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    render(
      <ShareButtonComponent
        hashtags={['react']}
        htmlTitle="Native title"
        related={['openai']}
        title="Share title"
        url="https://example.com"
      >
        Share on X
      </ShareButtonComponent>,
    );

    const button = screen.getByRole('button', { name: 'Share on X' });

    fireEvent.click(button);

    expect(button).toHaveAttribute('title', 'Native title');
    expect(button).not.toHaveAttribute('hashtags');
    expect(button).not.toHaveAttribute('related');
    expect(openSpy).toHaveBeenCalledWith(
      'https://twitter.com/intent/tweet?url=https%3A%2F%2Fexample.com&text=Share%20title&hashtags=react&related=openai',
      '',
      expect.any(String),
    );
  });

  it('omits empty hashtags and related parameters', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    render(
      <ShareButtonComponent hashtags={[]} related={[]} title="Example title" url="https://example.com">
        Share on X
      </ShareButtonComponent>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share on X' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://twitter.com/intent/tweet?url=https%3A%2F%2Fexample.com&text=Example%20title',
      '',
      expect.any(String),
    );
  });
});
