import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import FacebookMessengerShareButton from '../src/FacebookMessengerShareButton';

describe('FacebookMessengerShareButton', () => {
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
});
