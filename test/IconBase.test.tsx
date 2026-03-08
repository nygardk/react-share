import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FacebookIcon from '../src/FacebookIcon';
import FacebookMessengerIcon from '../src/FacebookMessengerIcon';
import HatenaIcon from '../src/HatenaIcon';
import IconBase from '../src/icons/IconBase';
import LineIcon from '../src/LineIcon';
import LivejournalIcon from '../src/LivejournalIcon';
import MailruIcon from '../src/MailruIcon';
import OKIcon from '../src/OKIcon';
import PinterestIcon from '../src/PinterestIcon';
import RedditIcon from '../src/RedditIcon';
import TelegramIcon from '../src/TelegramIcon';
import TumblrIcon from '../src/TumblrIcon';
import VKIcon from '../src/VKIcon';
import ViberIcon from '../src/ViberIcon';
import WeiboIcon from '../src/WeiboIcon';
import WorkplaceIcon from '../src/WorkplaceIcon';

describe('IconBase', () => {
  it('renders exported icons with the shared rectangular background by default', () => {
    render(<FacebookIcon aria-label="facebook icon" data-testid="icon" />);

    const svg = screen.getByTestId('icon');
    const rect = svg.querySelector('rect');
    const path = svg.querySelector('path');

    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveAttribute('height', '64');
    expect(rect).toHaveAttribute('fill', '#0866FF');
    expect(path).toHaveAttribute('fill', 'white');
  });

  it('keeps the reviewed brand background colors for current v5 icon badges', () => {
    const cases = [
      ['facebook-messenger', FacebookMessengerIcon, '#0866FF'],
      ['hatena', HatenaIcon, '#00A4DE'],
      ['line', LineIcon, '#06C755'],
      ['livejournal', LivejournalIcon, '#00B0EA'],
      ['mailru', MailruIcon, '#005FF9'],
      ['ok', OKIcon, '#FF7700'],
      ['pinterest', PinterestIcon, '#E60023'],
      ['reddit', RedditIcon, '#FF4500'],
      ['telegram', TelegramIcon, '#26A5E4'],
      ['tumblr', TumblrIcon, '#36465D'],
      ['vk', VKIcon, '#0077FF'],
      ['viber', ViberIcon, '#7360F2'],
      ['weibo', WeiboIcon, '#E6162D'],
      ['workplace', WorkplaceIcon, '#4526CE'],
    ] as const;

    for (const [name, Component, color] of cases) {
      render(<Component data-testid={name} />);

      const rect = screen.getByTestId(name).querySelector('rect');

      expect(rect).toHaveAttribute('fill', color);
    }
  });

  it('renders a round icon with custom style props', () => {
    render(
      <IconBase
        aria-label="round icon"
        bgStyle={{ opacity: 0.5 }}
        color="#123456"
        iconFillColor="black"
        round
        size={32}
      >
        <path d="M1 1h62v62H1z" />
      </IconBase>,
    );

    const svg = screen.getByLabelText('round icon');
    const circle = svg.querySelector('circle');
    const rect = svg.querySelector('rect');
    const path = svg.querySelector('path');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
    expect(circle).toHaveStyle({ opacity: '0.5' });
    expect(rect).toBeNull();
    expect(path).toHaveAttribute('fill', 'black');
  });

  it('applies borderRadius when rendering a non-round icon', () => {
    render(
      <IconBase aria-label="rounded rect" borderRadius={12} color="#123456">
        <path d="M1 1h62v62H1z" />
      </IconBase>,
    );

    const rect = screen.getByLabelText('rounded rect').querySelector('rect');

    expect(rect).toHaveAttribute('rx', '12');
    expect(rect).toHaveAttribute('ry', '12');
  });
});
