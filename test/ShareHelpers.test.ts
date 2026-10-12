import { describe, expect, it, vi } from 'vitest';

import {
  buildBlueskyShareUrl,
  buildEmailShareUrl,
  buildFacebookShareUrl,
  buildLinkedinShareUrl,
  buildViberShareUrl,
  buildWhatsappShareUrl,
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
      'https://x.com/intent/post?url=https%3A%2F%2Fexample.com&text=Example%20title&via=reactshare&hashtags=react%2Cshare&related=openai',
    );
  });

  it('builds a LinkedIn share URL directly from only the URL', () => {
    expect(buildLinkedinShareUrl('https://example.com')).toBe(
      'https://linkedin.com/shareArticle?url=https%3A%2F%2Fexample.com&mini=true',
    );
  });

  it.each([
    [
      'Bluesky',
      () => buildBlueskyShareUrl('https://example.com', { text: 'Hello' }),
      'https://bsky.app/intent/compose?text=Hello%20https%3A%2F%2Fexample.com',
    ],
    [
      'Email',
      () => buildEmailShareUrl('https://example.com', { body: 'Hello' }),
      'mailto:?body=Hello%0Ahttps%3A%2F%2Fexample.com',
    ],
    [
      'Viber',
      () => buildViberShareUrl('https://example.com', { message: 'Hello' }),
      'viber://forward?text=Hello%20https%3A%2F%2Fexample.com',
    ],
    [
      'WhatsApp',
      () => buildWhatsappShareUrl('https://example.com', { message: 'Hello' }),
      'https://api.whatsapp.com/send?text=Hello%20https%3A%2F%2Fexample.com',
    ],
  ])('defaults the separator when building a %s share URL directly', (_, build, expected) => {
    expect(build()).toBe(expected);
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

  it('opens a regular tab instead of a popup when newTab is set', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    openShareWindow('https://example.com/share', { newTab: true });

    expect(openSpy).toHaveBeenCalledWith('https://example.com/share', '_blank');
  });
});
