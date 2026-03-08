import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton from './ShareButton';

type RedditShareButtonProps = Omit<
  ComponentProps<typeof ShareButton<{ title?: string }>>,
  'networkName' | 'networkLink' | 'opts'
> & {
  title?: string;
};

function redditLink(url: string, { title }: { title?: string }) {
  assert(url, 'reddit.url');

  return (
    'https://www.reddit.com/submit' +
    objectToGetParams({
      url,
      title,
    })
  );
}

const RedditShareButton = forwardRef<HTMLButtonElement, RedditShareButtonProps>(
  ({ title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="reddit"
      networkLink={redditLink}
      opts={{ title }}
      windowHeight={460}
      windowPosition="windowCenter"
      windowWidth={660}
    />
  ),
);

RedditShareButton.displayName = 'RedditShareButton';

export default RedditShareButton;
