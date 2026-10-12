import { forwardRef } from 'react';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type RedditShareButtonProps = Omit<ShareButtonProps<{ shareTitle?: string }>, 'title'> & {
  shareTitle?: string;
};

function redditLink(url: string, { shareTitle }: { shareTitle?: string }) {
  assert(url, 'reddit.url');

  return (
    'https://www.reddit.com/submit' +
    objectToGetParams({
      url,
      title: shareTitle,
    })
  );
}

export const buildRedditShareUrl = redditLink;

export const RedditShareButton = forwardRef<HTMLButtonElement, RedditShareButtonProps>(
  ({ shareTitle, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="reddit"
      networkLink={buildRedditShareUrl}
      opts={{ shareTitle }}
      windowHeight={460}
      windowPosition="windowCenter"
      windowWidth={660}
    />
  ),
);

RedditShareButton.displayName = 'RedditShareButton';
