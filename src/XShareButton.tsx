import { forwardRef } from 'react';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

function xLink(
  url: string,
  {
    text,
    via,
    hashtags = [],
    related = [],
  }: { text?: string; via?: string; hashtags?: string[]; related?: string[] },
) {
  assert(url, 'x.url');
  assert(Array.isArray(hashtags), 'x.hashtags is not an array');
  assert(Array.isArray(related), 'x.related is not an array');

  return (
    'https://twitter.com/intent/tweet' +
    objectToGetParams({
      url,
      text,
      via,
      hashtags: hashtags.length > 0 ? hashtags.join(',') : undefined,
      related: related.length > 0 ? related.join(',') : undefined,
    })
  );
}

export const buildXShareUrl = xLink;

type XShareButtonProps = Omit<
  ShareButtonProps<{
    text?: string;
    via?: string;
    hashtags?: string[];
    related?: string[];
  }>,
  'title'
> & {
  text?: string;
  via?: string;
  hashtags?: string[];
  related?: string[];
};

export const XShareButton = forwardRef<HTMLButtonElement, XShareButtonProps>(
  ({ hashtags, related, text, via, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="twitter"
      networkLink={buildXShareUrl}
      opts={{
        hashtags,
        text,
        via,
        related,
      }}
      windowHeight={400}
      windowWidth={550}
    />
  ),
);

XShareButton.displayName = 'XShareButton';
