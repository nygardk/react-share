import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { WhatsappShareButton, buildWhatsappShareUrl } from '../src/WhatsappShareButton';

describe('WhatsappShareButton', () => {
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

  it('uses the api host for generated share links', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    render(
      <WhatsappShareButton message="Example" url="https://example.com">
        Share to WhatsApp
      </WhatsappShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share to WhatsApp' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://api.whatsapp.com/send?text=Example%20https%3A%2F%2Fexample.com',
      '',
      expect.any(String),
    );
  });

  it('uses the app deep link when mobileBehavior is app', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    const hrefState = stubLocation();

    render(
      <WhatsappShareButton message="Example" mobileBehavior="app" url="https://example.com">
        Share to WhatsApp
      </WhatsappShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share to WhatsApp' }));

    expect(openSpy).not.toHaveBeenCalled();
    expect(hrefState.value).toBe('whatsapp://send?text=Example%20https%3A%2F%2Fexample.com');
  });

  it('keeps the web URL on desktop when mobileBehavior is auto', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    });

    render(
      <WhatsappShareButton message="Example" mobileBehavior="auto" url="https://example.com">
        Share to WhatsApp
      </WhatsappShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share to WhatsApp' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://api.whatsapp.com/send?text=Example%20https%3A%2F%2Fexample.com',
      '',
      expect.any(String),
    );
  });

  it('addresses the share to a phone number, keeping digits only', () => {
    expect(
      buildWhatsappShareUrl('https://example.com', { phone: '+358 40-123 4567', message: 'Hi' }),
    ).toBe('https://api.whatsapp.com/send?phone=358401234567&text=Hi%20https%3A%2F%2Fexample.com');
  });

  it('passes the `phone` prop to the web and app links', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    const hrefState = stubLocation();

    const { rerender } = render(
      <WhatsappShareButton phone="+358401234567" url="https://example.com">
        Share to WhatsApp
      </WhatsappShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share to WhatsApp' }));

    expect(openSpy).toHaveBeenLastCalledWith(
      'https://api.whatsapp.com/send?phone=358401234567&text=https%3A%2F%2Fexample.com',
      '',
      expect.any(String),
    );

    rerender(
      <WhatsappShareButton mobileBehavior="app" phone="+358401234567" url="https://example.com">
        Share to WhatsApp
      </WhatsappShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share to WhatsApp' }));

    expect(hrefState.value).toBe(
      'whatsapp://send?phone=358401234567&text=https%3A%2F%2Fexample.com',
    );
  });
});
