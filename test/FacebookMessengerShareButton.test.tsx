import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FacebookMessengerShareButton } from '../src/FacebookMessengerShareButton';

describe('FacebookMessengerShareButton', () => {
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

  it('defaults redirectUri to the shared url', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    render(
      <FacebookMessengerShareButton appId="123" url="https://example.com">
        Share in Messenger
      </FacebookMessengerShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share in Messenger' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://www.facebook.com/dialog/send?link=https%3A%2F%2Fexample.com&redirect_uri=https%3A%2F%2Fexample.com&app_id=123',
      '',
      expect.any(String),
    );
  });

  it('includes explicit redirectUri and recipient parameters', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    render(
      <FacebookMessengerShareButton
        appId="123"
        redirectUri="https://redirect.example.com"
        to="user-42"
        url="https://example.com"
      >
        Share in Messenger
      </FacebookMessengerShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share in Messenger' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://www.facebook.com/dialog/send?link=https%3A%2F%2Fexample.com&redirect_uri=https%3A%2F%2Fredirect.example.com&app_id=123&to=user-42',
      '',
      expect.any(String),
    );
  });

  it('uses a Messenger app deep link when mobileBehavior is app', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    const hrefState = stubLocation();

    render(
      <FacebookMessengerShareButton appId="123" mobileBehavior="app" url="https://example.com">
        Share in Messenger
      </FacebookMessengerShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share in Messenger' }));

    expect(openSpy).not.toHaveBeenCalled();
    expect(hrefState.value).toBe(
      'fb-messenger://share?link=https%3A%2F%2Fexample.com&redirect_uri=https%3A%2F%2Fexample.com&app_id=123',
    );
  });

  it('keeps the web dialog on desktop when mobileBehavior is auto', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    });

    render(
      <FacebookMessengerShareButton appId="123" mobileBehavior="auto" url="https://example.com">
        Share in Messenger
      </FacebookMessengerShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share in Messenger' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://www.facebook.com/dialog/send?link=https%3A%2F%2Fexample.com&redirect_uri=https%3A%2F%2Fexample.com&app_id=123',
      '',
      expect.any(String),
    );
  });
});
