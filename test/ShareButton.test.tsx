import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ShareButton from '../src/ShareButton';

describe('ShareButton', () => {
  it('opens the share window and forwards the generated link to onClick', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    const onClick = vi.fn();

    render(
      <ShareButton
        networkLink={(url, { suffix }: { suffix: string }) => `${url}/${suffix}`}
        networkName="test"
        onClick={onClick}
        opts={{ suffix: 'share' }}
        url="https://example.com"
      >
        Share
      </ShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share' }));

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith(
      'https://example.com/share',
      '',
      expect.stringContaining('height=400'),
    );
    expect(onClick).toHaveBeenCalledWith(expect.any(Object), 'https://example.com/share');
  });

  it('waits for beforeOnClick before invoking onClick', async () => {
    const steps: string[] = [];
    const onClick = vi.fn(() => {
      steps.push('click');
    });

    render(
      <ShareButton
        beforeOnClick={async () => {
          steps.push('before:start');
          await Promise.resolve();
          steps.push('before:end');
        }}
        networkLink={(url: string) => url}
        networkName="test"
        onClick={onClick}
        openShareDialogOnClick={false}
        opts={{}}
        url="https://example.com"
      >
        Share
      </ShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share' }));

    await waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
    expect(steps).toEqual(['before:start', 'before:end', 'click']);
  });

  it('skips window.open when openShareDialogOnClick is false', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    render(
      <ShareButton
        networkLink={(url: string) => url}
        networkName="test"
        openShareDialogOnClick={false}
        opts={{}}
        url="https://example.com"
      >
        Share
      </ShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share' }));

    expect(openSpy).not.toHaveBeenCalled();
  });

  it('applies native disabled semantics', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    const onClick = vi.fn();

    render(
      <ShareButton
        disabled
        networkLink={(url: string) => url}
        networkName="test"
        onClick={onClick}
        opts={{}}
        url="https://example.com"
      >
        Share
      </ShareButton>,
    );

    const button = screen.getByRole('button', { name: 'Share' });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(openSpy).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});
