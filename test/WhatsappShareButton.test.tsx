import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import WhatsappShareButton from '../src/WhatsappShareButton';

describe('WhatsappShareButton', () => {
  it('uses the api host for generated share links', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    render(
      <WhatsappShareButton title="Example" url="https://example.com">
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
});
