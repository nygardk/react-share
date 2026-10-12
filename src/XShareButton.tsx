import { forwardRef } from 'react';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

function xLink(
  url: string | undefined,
  {
    text,
    via,
    hashtags = [],
    related = [],
  }: { text?: string; via?: string; hashtags?: string[]; related?: string[] },
) {
  assert(url || text, 'x.url or x.text');
  assert(Array.isArray(hashtags), 'x.hashtags is not an array');
  assert(Array.isArray(related), 'x.related is not an array');

  return (
    'https://x.com/intent/post' +
    objectToGetParams({
      url: url || undefined,
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
  'title' | 'url'
> & {
  /** URL of the shared page. Optional when `text` is set, for text-only posts. */
  url?: string;
  text?: string;
  via?: string;
  hashtags?: string[];
  related?: string[];
};

export const XShareButton = forwardRef<HTMLButtonElement, XShareButtonProps>(
  ({ hashtags, related, text, url, via, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      url={url ?? ''}
      networkName="x"
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
