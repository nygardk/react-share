import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import ShareButton from '../src/ShareButton';

describe('ShareButton', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

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

  it('passes htmlTitle through as the native title attribute', () => {
    render(
      <ShareButton
        htmlTitle="Native title"
        networkLink={(url: string) => url}
        networkName="test"
        opts={{}}
        url="https://example.com"
      >
        Share
      </ShareButton>,
    );

    expect(screen.getByRole('button', { name: 'Share' })).toHaveAttribute('title', 'Native title');
  });

  it('supports screen-centered positioning', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    Object.defineProperty(window, 'screen', {
      configurable: true,
      value: { height: 900, width: 1600 },
    });

    render(
      <ShareButton
        networkLink={(url: string) => url}
        networkName="test"
        opts={{}}
        url="https://example.com"
        windowPosition="screenCenter"
      >
        Share
      </ShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://example.com',
      '',
      expect.stringContaining('top=250'),
    );
    expect(openSpy).toHaveBeenCalledWith(
      'https://example.com',
      '',
      expect.stringContaining('left=525'),
    );
  });

  it('calls onShareWindowClose when the popup closes', () => {
    vi.useFakeTimers();

    const shareDialog = { closed: false } as Window;
    const onShareWindowClose = vi.fn();

    vi.spyOn(window, 'open').mockReturnValue(shareDialog);

    render(
      <ShareButton
        networkLink={(url: string) => url}
        networkName="test"
        onShareWindowClose={onShareWindowClose}
        opts={{}}
        url="https://example.com"
      >
        Share
      </ShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share' }));

    shareDialog.closed = true;
    vi.advanceTimersByTime(1000);

    expect(onShareWindowClose).toHaveBeenCalledTimes(1);
  });

  it('logs popup polling errors without crashing', () => {
    vi.useFakeTimers();

    const error = new Error('Permission denied');
    const shareDialog = {
      get closed() {
        throw error;
      },
    } as Window;
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    vi.spyOn(window, 'open').mockReturnValue(shareDialog);

    render(
      <ShareButton
        networkLink={(url: string) => url}
        networkName="test"
        onShareWindowClose={vi.fn()}
        opts={{}}
        url="https://example.com"
      >
        Share
      </ShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    vi.advanceTimersByTime(1000);

    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
  });

  it('skips the reset styles when resetButtonStyle is false', () => {
    render(
      <ShareButton
        networkLink={(url: string) => url}
        networkName="test"
        opts={{}}
        resetButtonStyle={false}
        style={{ backgroundColor: 'red' }}
        url="https://example.com"
      >
        Share
      </ShareButton>,
    );

    const button = screen.getByRole('button', { name: 'Share' });

    expect(button.style.backgroundColor).toBe('red');
    expect(button.style.border).toBe('');
    expect(button.style.padding).toBe('');
  });
});
