import React, { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import EmailIcon from '../src/EmailIcon';
import EmailShareButton from '../src/EmailShareButton';
import PinterestIcon from '../src/PinterestIcon';
import PinterestShareButton from '../src/PinterestShareButton';
import ThreadsShareButton from '../src/ThreadsShareButton';
import TumblrShareButton from '../src/TumblrShareButton';

describe('share button components', () => {
  it('does not forward network-specific props to the DOM', () => {
    render(
      <EmailShareButton
        body="Body"
        htmlTitle="Native title"
        separator=" :: "
        subject="Subject"
        url="https://example.com"
      >
        Share by email
      </EmailShareButton>,
    );

    const button = screen.getByRole('button', { name: 'Share by email' });

    expect(button).toHaveAttribute('title', 'Native title');
    expect(button).not.toHaveAttribute('body');
    expect(button).not.toHaveAttribute('subject');
    expect(button).not.toHaveAttribute('separator');
  });

  it('keeps ref forwarding when rendered as a direct component', () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <EmailShareButton ref={ref} subject="Subject" url="https://example.com">
        Share by email
      </EmailShareButton>,
    );

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Share by email' }));
  });

  it('preserves option remapping such as Tumblr tag joining', () => {
    render(
      <TumblrShareButton
        caption="Example caption"
        openShareDialogOnClick={false}
        posttype="photo"
        tags={['react', 'share']}
        title="Example title"
        url="https://example.com"
      >
        Share on Tumblr
      </TumblrShareButton>,
    );

    const button = screen.getByRole('button', { name: 'Share on Tumblr' });

    expect(button).not.toHaveAttribute('tags');
    expect(button).not.toHaveAttribute('caption');
    expect(button).not.toHaveAttribute('posttype');
  });

  it('keeps legacy Threads props as ignored no-ops', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    render(
      <ThreadsShareButton
        hashtags={['react', 'share']}
        related={['openai']}
        title="Example title"
        url="https://example.com"
        via="reactshare"
      >
        Share on Threads
      </ThreadsShareButton>,
    );

    const button = screen.getByRole('button', { name: 'Share on Threads' });

    fireEvent.click(button);

    expect(button).not.toHaveAttribute('hashtags');
    expect(button).not.toHaveAttribute('related');
    expect(button).not.toHaveAttribute('via');
    expect(openSpy).toHaveBeenCalledWith(
      'https://threads.net/intent/post?url=https%3A%2F%2Fexample.com&text=Example%20title',
      '',
      expect.any(String),
    );
  });

  it('adds the email fallback label for icon-only buttons', () => {
    render(
      <EmailShareButton subject="Subject" url="https://example.com">
        <EmailIcon round />
      </EmailShareButton>,
    );

    expect(screen.getByRole('button', { name: 'Share by email' })).toBeInTheDocument();
  });

  it('adds the Pinterest fallback label for icon-only buttons', () => {
    render(
      <PinterestShareButton media="https://example.com/image.png" url="https://example.com">
        <PinterestIcon round />
      </PinterestShareButton>,
    );

    expect(screen.getByRole('button', { name: 'Pin on Pinterest' })).toBeInTheDocument();
  });
});
