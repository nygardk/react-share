import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import FacebookIcon from '../src/FacebookIcon';
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

  it('defaults the button type to button', () => {
    render(
      <ShareButton
        networkLink={(url: string) => url}
        networkName="test"
        opts={{}}
        url="https://example.com"
      >
        Share
      </ShareButton>,
    );

    expect(screen.getByRole('button', { name: 'Share' })).toHaveAttribute('type', 'button');
  });

  it('does not submit an enclosing form by default', () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());

    render(
      <form onSubmit={onSubmit}>
        <ShareButton
          networkLink={(url: string) => url}
          networkName="test"
          openShareDialogOnClick={false}
          opts={{}}
          url="https://example.com"
        >
          Share
        </ShareButton>
      </form>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share' }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('preserves an explicit submit button type', () => {
    render(
      <form>
        <ShareButton
          networkLink={(url: string) => url}
          networkName="test"
          openShareDialogOnClick={false}
          opts={{}}
          type="submit"
          url="https://example.com"
        >
          Share
        </ShareButton>
      </form>,
    );

    const button = screen.getByRole('button', { name: 'Share' });

    fireEvent.click(button);

    expect(button).toHaveAttribute('type', 'submit');
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

    const shareDialog = { closed: false };
    const onShareWindowClose = vi.fn();

    vi.spyOn(window, 'open').mockReturnValue(shareDialog as unknown as Window);

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
    };
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    vi.spyOn(window, 'open').mockReturnValue(shareDialog as unknown as Window);

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

  it('uses inline-flex in the reset button styles to avoid icon baseline gaps', () => {
    render(
      <ShareButton
        networkLink={(url: string) => url}
        networkName="test"
        opts={{}}
        url="https://example.com"
      >
        Share
      </ShareButton>,
    );

    expect(screen.getByRole('button', { name: 'Share' })).toHaveStyle({
      display: 'inline-flex',
      outlineOffset: '2px',
    });
  });

  it('matches the button border radius to round icon children for focus outlines', () => {
    render(
      <ShareButton
        networkLink={(url: string) => url}
        networkName="test"
        opts={{}}
        url="https://example.com"
      >
        <FacebookIcon round aria-label="facebook icon" />
      </ShareButton>,
    );

    expect(screen.getByRole('button')).toHaveStyle({ borderRadius: '50%' });
  });

  it('adds a fallback aria-label for icon-only network buttons', () => {
    render(
      <ShareButton
        networkLink={(url: string) => url}
        networkName="facebook"
        opts={{}}
        url="https://example.com"
      >
        <FacebookIcon round />
      </ShareButton>,
    );

    expect(screen.getByRole('button', { name: 'Share on Facebook' })).toHaveAttribute(
      'aria-label',
      'Share on Facebook',
    );
  });

  it('does not override an explicit aria-label', () => {
    render(
      <ShareButton
        aria-label="Custom share label"
        networkLink={(url: string) => url}
        networkName="facebook"
        opts={{}}
        url="https://example.com"
      >
        <FacebookIcon round />
      </ShareButton>,
    );

    expect(screen.getByRole('button', { name: 'Custom share label' })).toHaveAttribute(
      'aria-label',
      'Custom share label',
    );
  });

  it('does not override aria-labelledby', () => {
    render(
      <>
        <span id="share-label">Send this page</span>
        <ShareButton
          aria-labelledby="share-label"
          networkLink={(url: string) => url}
          networkName="facebook"
          opts={{}}
          url="https://example.com"
        >
          <FacebookIcon round />
        </ShareButton>
      </>,
    );

    expect(screen.getByRole('button', { name: 'Send this page' })).toHaveAttribute(
      'aria-labelledby',
      'share-label',
    );
  });

  it('does not add a fallback aria-label when visible text is present', () => {
    render(
      <ShareButton
        networkLink={(url: string) => url}
        networkName="facebook"
        opts={{}}
        url="https://example.com"
      >
        <span>Share now</span>
      </ShareButton>,
    );

    expect(screen.getByRole('button', { name: 'Share now' })).not.toHaveAttribute('aria-label');
  });

  it('matches the button border radius to rounded rectangular icon children', () => {
    render(
      <ShareButton
        networkLink={(url: string) => url}
        networkName="test"
        opts={{}}
        url="https://example.com"
      >
        <FacebookIcon aria-label="facebook icon" borderRadius={12} />
      </ShareButton>,
    );

    expect(screen.getByRole('button')).toHaveStyle({ borderRadius: '12px' });
  });

  it('lets callers override the default reset display style', () => {
    render(
      <ShareButton
        networkLink={(url: string) => url}
        networkName="test"
        opts={{}}
        style={{ borderRadius: 4, display: 'inline-block', outlineOffset: 3 }}
        url="https://example.com"
      >
        <FacebookIcon round aria-label="facebook icon" />
      </ShareButton>,
    );

    expect(screen.getByRole('button')).toHaveStyle({
      borderRadius: '4px',
      display: 'inline-block',
      outlineOffset: '3px',
    });
  });
});
