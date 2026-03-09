import React, { createRef } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NativeShareButton } from '../src/NativeShareButton';
import { canNativeShare, shareNative } from '../src/nativeShare';

describe('native share', () => {
  beforeEach(() => {
    Object.defineProperty(window.navigator, 'canShare', {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(window.navigator, 'share', {
      configurable: true,
      value: undefined,
    });
  });

  it('returns false when navigator.share is unavailable', () => {
    expect(canNativeShare({ text: 'Example' })).toBe(false);
  });

  it('uses navigator.canShare for file-sharing capability checks', () => {
    const canShareMock = vi.fn().mockReturnValue(true);

    Object.defineProperty(window.navigator, 'share', {
      configurable: true,
      value: vi.fn(),
    });
    Object.defineProperty(window.navigator, 'canShare', {
      configurable: true,
      value: canShareMock,
    });

    const file = new File(['example'], 'example.pdf', { type: 'application/pdf' });

    expect(canNativeShare({ files: [file], title: 'Example' })).toBe(true);
    expect(canShareMock).toHaveBeenCalledWith({ files: [file], title: 'Example' });
  });

  it('rejects predictably when native share is unavailable', async () => {
    await expect(shareNative({ text: 'Example' })).rejects.toThrow('native share is not supported');
  });

  it('triggers native share only after the user clicks the button', async () => {
    const shareMock = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(window.navigator, 'share', {
      configurable: true,
      value: shareMock,
    });

    render(
      <NativeShareButton text="Example" url="https://example.com">
        Share natively
      </NativeShareButton>,
    );

    expect(shareMock).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Share natively' }));

    await waitFor(() => {
      expect(shareMock).toHaveBeenCalledWith({
        text: 'Example',
        url: 'https://example.com',
      });
    });
  });

  it('forwards refs to the underlying button', () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <NativeShareButton ref={ref} text="Example">
        Share natively
      </NativeShareButton>,
    );

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Share natively' }));
  });

  it('ignores share sheet cancellation by the user', async () => {
    const shareMock = vi.fn().mockRejectedValue(new DOMException('Share canceled', 'AbortError'));

    Object.defineProperty(window.navigator, 'share', {
      configurable: true,
      value: shareMock,
    });

    render(<NativeShareButton text="Example">Share natively</NativeShareButton>);

    fireEvent.click(screen.getByRole('button', { name: 'Share natively' }));

    await waitFor(() => {
      expect(shareMock).toHaveBeenCalled();
    });
    await new Promise(resolve => setTimeout(resolve, 0));
  });
});
