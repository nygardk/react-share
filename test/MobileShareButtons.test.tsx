import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TelegramShareButton } from '../src/TelegramShareButton';
import { ViberShareButton } from '../src/ViberShareButton';

function stubLocation() {
  const hrefState = { value: 'https://example.test/' };

  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      get href() {
        return hrefState.value;
      },
      set href(value: string) {
        hrefState.value = value;
      },
    },
  });

  return hrefState;
}

function setDesktopUserAgent() {
  Object.defineProperty(window.navigator, 'userAgent', {
    configurable: true,
    value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('mobile share buttons', () => {
  it('uses a Telegram app link when mobileBehavior is app', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    const hrefState = stubLocation();

    render(
      <TelegramShareButton mobileBehavior="app" text="Example" url="https://example.com">
        Share on Telegram
      </TelegramShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share on Telegram' }));

    expect(openSpy).not.toHaveBeenCalled();
    expect(hrefState.value).toBe('tg://msg_url?url=https%3A%2F%2Fexample.com&text=Example');
  });

  it('keeps the Telegram web URL on desktop when mobileBehavior is auto', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    setDesktopUserAgent();

    render(
      <TelegramShareButton mobileBehavior="auto" text="Example" url="https://example.com">
        Share on Telegram
      </TelegramShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share on Telegram' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://telegram.me/share/url?url=https%3A%2F%2Fexample.com&text=Example',
      '',
      expect.any(String),
    );
  });

  it('navigates directly for Viber when mobileBehavior is app', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    const hrefState = stubLocation();

    render(
      <ViberShareButton message="Example" mobileBehavior="app" url="https://example.com">
        Share on Viber
      </ViberShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share on Viber' }));

    expect(openSpy).not.toHaveBeenCalled();
    expect(hrefState.value).toBe('viber://forward?text=Example%20https%3A%2F%2Fexample.com');
  });

  it('does not forward mobileBehavior to the DOM', () => {
    render(
      <TelegramShareButton mobileBehavior="app" text="Example" url="https://example.com">
        Share on Telegram
      </TelegramShareButton>,
    );

    expect(screen.getByRole('button', { name: 'Share on Telegram' })).not.toHaveAttribute(
      'mobileBehavior',
    );
  });
});
