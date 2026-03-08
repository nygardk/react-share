import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import * as ReactShare from '../src/index';

const iconExportNames = Object.keys(ReactShare)
  .filter(name => name.endsWith('Icon'))
  .sort();

describe('package exports', () => {
  it('exports the full public button and share count surface', () => {
    expect(Object.keys(ReactShare).sort()).toEqual(
      expect.arrayContaining([
        'BlueskyShareButton',
        'EmailShareButton',
        'FacebookMessengerShareButton',
        'FacebookShareButton',
        'FacebookShareCount',
        'HatenaShareButton',
        'HatenaShareCount',
        'InstapaperShareButton',
        'LineShareButton',
        'LinkedinShareButton',
        'LivejournalShareButton',
        'MailruShareButton',
        'OKShareButton',
        'OKShareCount',
        'PinterestShareButton',
        'PinterestShareCount',
        'PocketShareButton',
        'RedditShareButton',
        'RedditShareCount',
        'TelegramShareButton',
        'ThreadsShareButton',
        'TumblrShareButton',
        'TumblrShareCount',
        'TwitterShareButton',
        'ViberShareButton',
        'VKShareButton',
        'VKShareCount',
        'WeiboShareButton',
        'WhatsappShareButton',
        'WorkplaceShareButton',
        'XIcon',
      ]),
    );
  });

  it.each(iconExportNames)('renders %s as an svg', iconExportName => {
    const Icon = ReactShare[iconExportName as keyof typeof ReactShare] as React.ComponentType<{
      'aria-label': string;
    }>;

    render(<Icon aria-label={iconExportName} />);

    expect(screen.getByLabelText(iconExportName).tagName.toLowerCase()).toBe('svg');
  });
});
