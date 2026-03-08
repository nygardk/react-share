import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import EmailShareButton from '../src/EmailShareButton';
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
});
