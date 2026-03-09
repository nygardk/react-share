import { describe, expect, it, vi } from 'vitest';

import {
  buildFacebookShareUrl,
  buildLinkedinShareUrl,
  buildXShareUrl,
  openShareWindow,
} from '../src';

describe('share helpers', () => {
  it('builds a Facebook share URL directly', () => {
    expect(buildFacebookShareUrl('https://example.com', { hashtag: '#reactshare' })).toBe(
      'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com&hashtag=%23reactshare',
    );
  });

  it('builds an X share URL directly', () => {
    expect(
      buildXShareUrl('https://example.com', {
        hashtags: ['react', 'share'],
        related: ['openai'],
        text: 'Example title',
        via: 'reactshare',
      }),
    ).toBe(
      'https://twitter.com/intent/tweet?url=https%3A%2F%2Fexample.com&text=Example%20title&via=reactshare&hashtags=react%2Cshare&related=openai',
    );
  });

  it('builds a LinkedIn share URL directly from only the URL', () => {
    expect(buildLinkedinShareUrl('https://example.com')).toBe(
      'https://linkedin.com/shareArticle?url=https%3A%2F%2Fexample.com&mini=true',
    );
  });

  it('opens a centered share window with the requested size', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    Object.defineProperty(window, 'screen', {
      configurable: true,
      value: { height: 900, width: 1600 },
    });

    openShareWindow('https://example.com/share', {
      height: 500,
      position: 'screenCenter',
      width: 600,
    });

    expect(openSpy).toHaveBeenCalledWith(
      'https://example.com/share',
      '',
      expect.stringContaining('height=500'),
    );
    expect(openSpy).toHaveBeenCalledWith(
      'https://example.com/share',
      '',
      expect.stringContaining('width=600'),
    );
    expect(openSpy).toHaveBeenCalledWith(
      'https://example.com/share',
      '',
      expect.stringContaining('top=200'),
    );
    expect(openSpy).toHaveBeenCalledWith(
      'https://example.com/share',
      '',
      expect.stringContaining('left=500'),
    );
  });
});
