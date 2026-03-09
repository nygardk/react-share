import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

function xLink(
  url: string,
  {
    title,
    via,
    hashtags = [],
    related = [],
  }: { title?: string; via?: string; hashtags?: string[]; related?: string[] },
) {
  assert(url, 'x.url');
  assert(Array.isArray(hashtags), 'x.hashtags is not an array');
  assert(Array.isArray(related), 'x.related is not an array');

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

type XShareButtonProps = Omit<
  ShareButtonProps<{
    title?: string;
    via?: string;
    hashtags?: string[];
    related?: string[];
  }>,
  'title'
> & {
  title?: string;
  via?: string;
  hashtags?: string[];
  related?: string[];
};

const XShareButton = forwardRef<HTMLButtonElement, XShareButtonProps>(
  ({ hashtags, related, title, via, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="twitter"
      networkLink={xLink}
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

XShareButton.displayName = 'XShareButton';

export default XShareButton;
