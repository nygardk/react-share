import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('jsonp', () => ({
  default: vi.fn(),
}));

import jsonp from 'jsonp';

import FacebookShareCount from '../src/FacebookShareCount';
import HatenaShareCount from '../src/HatenaShareCount';
import OKShareCount from '../src/OKShareCount';
import PinterestShareCount from '../src/PinterestShareCount';
import RedditShareCount from '../src/RedditShareCount';
import TumblrShareCount from '../src/TumblrShareCount';
import VKShareCount from '../src/VKShareCount';

const jsonpMock = vi.mocked(jsonp);

describe('network share count modules', () => {
  beforeEach(() => {
    jsonpMock.mockReset();
    delete window.OK;
    delete window.ODKL;
    delete window.VK;
  });

  it('requests and resolves Facebook share counts', async () => {
    render(<FacebookShareCount url="https://example.com" />);

    expect(jsonpMock).toHaveBeenCalledWith(
      'https://graph.facebook.com/?id=https://example.com&fields=og_object{engagement}',
      expect.any(Function),
    );

    act(() => {
      const callback = jsonpMock.mock.calls[0][1] as (
        err: Error | null,
        data?: { og_object?: { engagement?: { count?: number } } },
      ) => void;

      callback(null, { og_object: { engagement: { count: 12 } } });
    });

    await waitFor(() => expect(screen.getByText('12')).toBeInTheDocument());
  });

  it('requests and resolves Hatena share counts', async () => {
    render(<HatenaShareCount url="https://example.com" />);

    expect(jsonpMock).toHaveBeenCalledWith(
      'https://bookmark.hatenaapis.com/count/entry?url=https%3A%2F%2Fexample.com',
      expect.any(Function),
    );

    act(() => {
      const callback = jsonpMock.mock.calls[0][1] as (err: Error | null, data?: number) => void;

      callback(null, 8);
    });

    await waitFor(() => expect(screen.getByText('8')).toBeInTheDocument());
  });

  it('requests and resolves Pinterest share counts', async () => {
    render(<PinterestShareCount url="https://example.com" />);

    expect(jsonpMock).toHaveBeenCalledWith(
      'https://api.pinterest.com/v1/urls/count.json?url=https%3A%2F%2Fexample.com',
      expect.any(Function),
    );

    act(() => {
      const callback = jsonpMock.mock.calls[0][1] as (
        err: Error | null,
        data?: { count?: number },
      ) => void;

      callback(null, { count: 15 });
    });

    await waitFor(() => expect(screen.getByText('15')).toBeInTheDocument());
  });

  it('requests and resolves Reddit share counts', async () => {
    render(<RedditShareCount url="https://example.com" />);

    expect(jsonpMock).toHaveBeenCalledWith(
      'https://www.reddit.com/api/info.json?limit=1&url=https://example.com',
      { param: 'jsonp' },
      expect.any(Function),
    );

    act(() => {
      const callback = jsonpMock.mock.calls[0][2] as (
        err: Error | null,
        data?: { data?: { children: Array<{ data: { score?: number } }> } },
      ) => void;

      callback(null, { data: { children: [{ data: { score: 6 } }] } });
    });

    await waitFor(() => expect(screen.getByText('6')).toBeInTheDocument());
  });

  it('requests and resolves Tumblr share counts', async () => {
    render(<TumblrShareCount url="https://example.com" />);

    expect(jsonpMock).toHaveBeenCalledWith(
      'https://api.tumblr.com/v2/share/stats?url=https%3A%2F%2Fexample.com',
      expect.any(Function),
    );

    act(() => {
      const callback = jsonpMock.mock.calls[0][1] as (
        err: Error | null,
        data?: { response?: { note_count?: number } },
      ) => void;

      callback(null, { response: { note_count: 19 } });
    });

    await waitFor(() => expect(screen.getByText('19')).toBeInTheDocument());
  });

  it('registers OK callbacks and resolves counts through ODKL', async () => {
    render(<OKShareCount url="https://example.com" />);

    expect(jsonpMock).toHaveBeenCalledWith(
      'https://connect.ok.ru/dk?st.cmd=extLike&uid=react-share-0&ref=https%3A%2F%2Fexample.com',
    );

    act(() => {
      window.ODKL.updateCount('react-share-0', '11');
    });

    await waitFor(() => expect(screen.getByText('11')).toBeInTheDocument());
  });

  it('registers VK callbacks and resolves counts through VK.Share.count', async () => {
    render(<VKShareCount url="https://example.com" />);

    expect(jsonpMock).toHaveBeenCalledWith(
      'https://vk.com/share.php?act=count&index=0&url=https%3A%2F%2Fexample.com',
    );

    act(() => {
      window.VK.Share?.count(0, 4);
    });

    await waitFor(() => expect(screen.getByText('4')).toBeInTheDocument());
  });
});
