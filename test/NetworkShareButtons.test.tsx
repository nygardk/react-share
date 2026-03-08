import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import BlueskyShareButton from '../src/BlueskyShareButton';
import FacebookShareButton from '../src/FacebookShareButton';
import GabShareButton from '../src/GabShareButton';
import HatenaShareButton from '../src/HatenaShareButton';
import InstapaperShareButton from '../src/InstapaperShareButton';
import LineShareButton from '../src/LineShareButton';
import LinkedinShareButton from '../src/LinkedinShareButton';
import LivejournalShareButton from '../src/LivejournalShareButton';
import MailruShareButton from '../src/MailruShareButton';
import OKShareButton from '../src/OKShareButton';
import PocketShareButton from '../src/PocketShareButton';
import TelegramShareButton from '../src/TelegramShareButton';
import ThreadsShareButton from '../src/ThreadsShareButton';
import TumblrShareButton from '../src/TumblrShareButton';
import ViberShareButton from '../src/ViberShareButton';
import VKShareButton from '../src/VKShareButton';
import WeiboShareButton from '../src/WeiboShareButton';
import WorkplaceShareButton from '../src/WorkplaceShareButton';

type ShareButtonCase = {
  children: string;
  Component: React.ElementType;
  expectedUrl: string;
  props: Record<string, unknown>;
};

const shareButtonCases: ShareButtonCase[] = [
  {
    children: 'Share on Bluesky',
    Component: BlueskyShareButton,
    expectedUrl: 'https://bsky.app/intent/compose?text=Example%20title%20https%3A%2F%2Fexample.com',
    props: {
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on Facebook',
    Component: FacebookShareButton,
    expectedUrl:
      'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com&hashtag=%23reactshare',
    props: {
      hashtag: '#reactshare',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on Gab',
    Component: GabShareButton,
    expectedUrl: 'https://gab.com/compose?url=https%3A%2F%2Fexample.com&text=Example%20title',
    props: {
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on Hatena',
    Component: HatenaShareButton,
    expectedUrl: 'http://b.hatena.ne.jp/add?mode=confirm&url=https://example.com&title=Example',
    props: {
      title: 'Example',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on Instapaper',
    Component: InstapaperShareButton,
    expectedUrl:
      'http://www.instapaper.com/hello2?url=https%3A%2F%2Fexample.com&title=Example%20title&description=Example%20description',
    props: {
      description: 'Example description',
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on Line',
    Component: LineShareButton,
    expectedUrl:
      'https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Fexample.com&text=Example%20title',
    props: {
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on LinkedIn',
    Component: LinkedinShareButton,
    expectedUrl:
      'https://linkedin.com/shareArticle?url=https%3A%2F%2Fexample.com&mini=true&title=Example%20title&summary=Example%20summary&source=Example%20source',
    props: {
      source: 'Example source',
      summary: 'Example summary',
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on LiveJournal',
    Component: LivejournalShareButton,
    expectedUrl:
      'https://www.livejournal.com/update.bml?subject=Example%20title&event=Example%20description',
    props: {
      description: 'Example description',
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on Mail.ru',
    Component: MailruShareButton,
    expectedUrl:
      'https://connect.mail.ru/share?url=https%3A%2F%2Fexample.com&title=Example%20title&description=Example%20description&image_url=https%3A%2F%2Fexample.com%2Fimage.png',
    props: {
      description: 'Example description',
      imageUrl: 'https://example.com/image.png',
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on OK',
    Component: OKShareButton,
    expectedUrl:
      'https://connect.ok.ru/offer?url=https%3A%2F%2Fexample.com&title=Example%20title&description=Example%20description&imageUrl=https%3A%2F%2Fexample.com%2Fimage.png',
    props: {
      description: 'Example description',
      image: 'https://example.com/image.png',
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on Pocket',
    Component: PocketShareButton,
    expectedUrl: 'https://getpocket.com/save?url=https%3A%2F%2Fexample.com&title=Example%20title',
    props: {
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on Telegram',
    Component: TelegramShareButton,
    expectedUrl: 'https://telegram.me/share/url?url=https%3A%2F%2Fexample.com&text=Example%20title',
    props: {
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on Threads',
    Component: ThreadsShareButton,
    expectedUrl: 'https://threads.net/intent/post?url=https%3A%2F%2Fexample.com&text=Example%20title',
    props: {
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on Tumblr',
    Component: TumblrShareButton,
    expectedUrl:
      'https://www.tumblr.com/widgets/share/tool?canonicalUrl=https%3A%2F%2Fexample.com&title=Example%20title&caption=Example%20caption&tags=react%2Cshare&posttype=link',
    props: {
      caption: 'Example caption',
      tags: ['react', 'share'],
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on Viber',
    Component: ViberShareButton,
    expectedUrl: 'viber://forward?text=Example%20title%20https%3A%2F%2Fexample.com',
    props: {
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on VK',
    Component: VKShareButton,
    expectedUrl:
      'https://vk.com/share.php?url=https%3A%2F%2Fexample.com&title=Example%20title&image=https%3A%2F%2Fexample.com%2Fimage.png&noparse=1&no_vk_links=1',
    props: {
      image: 'https://example.com/image.png',
      noParse: true,
      noVkLinks: true,
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on Weibo',
    Component: WeiboShareButton,
    expectedUrl:
      'http://service.weibo.com/share/share.php?url=https%3A%2F%2Fexample.com&title=Example%20title&pic=https%3A%2F%2Fexample.com%2Fimage.png',
    props: {
      image: 'https://example.com/image.png',
      title: 'Example title',
      url: 'https://example.com',
    },
  },
  {
    children: 'Share on Workplace',
    Component: WorkplaceShareButton,
    expectedUrl:
      'https://work.facebook.com/sharer.php?u=https%3A%2F%2Fexample.com&quote=Example%20quote&hashtag=%23reactshare',
    props: {
      hashtag: '#reactshare',
      quote: 'Example quote',
      url: 'https://example.com',
    },
  },
];

describe('network share buttons', () => {
  it.each(shareButtonCases)('builds the expected share URL for $children', ({
    Component,
    children,
    expectedUrl,
    props,
  }) => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    render(<Component {...props}>{children}</Component>);

    fireEvent.click(screen.getByRole('button', { name: children }));

    expect(openSpy).toHaveBeenCalledWith(expectedUrl, '', expect.any(String));
  });
});
