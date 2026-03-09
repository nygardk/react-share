import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import createShareCount, { SocialMediaShareCount } from '../src/hocs/createShareCount';

describe('SocialMediaShareCount', () => {
  it('renders children with the resolved count', async () => {
    let callback: ((shareCount?: number) => void) | undefined;

    render(
      <SocialMediaShareCount
        getCount={(_, cb) => {
          callback = cb;
        }}
        url="https://example.com"
      >
        {count => <span>Count: {count}</span>}
      </SocialMediaShareCount>,
    );

    expect(screen.queryByText('Count: 12')).toBeNull();

    act(() => {
      callback?.(12);
    });

    await waitFor(() => expect(screen.getByText('Count: 12')).toBeInTheDocument());
  });

  it('re-fetches when the url changes', async () => {
    const getCount = vi
      .fn<(url: string, callback: (shareCount?: number) => void) => void>()
      .mockImplementation((url, callback) => {
        callback(url === 'https://example.com/one' ? 1 : 2);
      });

    const { rerender } = render(
      <SocialMediaShareCount getCount={getCount} url="https://example.com/one" />,
    );

    await waitFor(() => expect(screen.getByText('1')).toBeInTheDocument());

    rerender(<SocialMediaShareCount getCount={getCount} url="https://example.com/two" />);

    await waitFor(() => expect(screen.getByText('2')).toBeInTheDocument());
    expect(getCount).toHaveBeenNthCalledWith(
      1,
      'https://example.com/one',
      expect.any(Function),
    );
    expect(getCount).toHaveBeenNthCalledWith(
      2,
      'https://example.com/two',
      expect.any(Function),
    );
  });

  it('does not update state after unmount', () => {
    let callback: ((shareCount?: number) => void) | undefined;

    const { unmount } = render(
      <SocialMediaShareCount
        getCount={(_, cb) => {
          callback = cb;
        }}
        url="https://example.com"
      />,
    );

    unmount();

    expect(() => {
      act(() => {
        callback?.(10);
      });
    }).not.toThrow();
  });

  it('creates share count components with the provided getCount implementation', async () => {
    const ShareCount = createShareCount((_, callback) => callback(7));

    render(<ShareCount url="https://example.com" />);

    await waitFor(() => expect(screen.getByText('7')).toBeInTheDocument());
  });
});
