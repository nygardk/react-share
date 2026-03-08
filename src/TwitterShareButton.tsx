import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton from './ShareButton';

function twitterLink(
  url: string,
  {
    title,
    via,
    hashtags = [],
    related = [],
  }: { title?: string; via?: string; hashtags?: string[]; related?: string[] },
) {
  assert(url, 'twitter.url');
  assert(Array.isArray(hashtags), 'twitter.hashtags is not an array');
  assert(Array.isArray(related), 'twitter.related is not an array');

  return (
    'https://twitter.com/intent/tweet' +
    objectToGetParams({
      url,
      text: title,
      via,
      hashtags: hashtags.length > 0 ? hashtags.join(',') : undefined,
      related: related.length > 0 ? related.join(',') : undefined,
    })
  );
}

type TwitterShareButtonProps = Omit<
  ComponentProps<
    typeof ShareButton<{
      title?: string;
      via?: string;
      hashtags?: string[];
      related?: string[];
    }>
  >,
  'networkName' | 'networkLink' | 'opts'
> & {
  title?: string;
  via?: string;
  hashtags?: string[];
  related?: string[];
};

const TwitterShareButton = forwardRef<HTMLButtonElement, TwitterShareButtonProps>(
  ({ hashtags, related, title, via, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="twitter"
      networkLink={twitterLink}
      opts={{
        hashtags,
        title,
        via,
        related,
      }}
      windowHeight={400}
      windowWidth={550}
    />
  ),
);

TwitterShareButton.displayName = 'TwitterShareButton';

export default TwitterShareButton;
