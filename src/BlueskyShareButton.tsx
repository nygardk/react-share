import { forwardRef } from 'react';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type BlueskyShareButtonProps = Omit<
  ShareButtonProps<{ text?: string; separator?: string }>,
  'title'
> & {
  separator?: string;
  text?: string;
};

function blueskyLink(url: string, { text, separator }: { text?: string; separator?: string }) {
  assert(url, 'bluesky.url');

  return (
    'https://bsky.app/intent/compose' +
    objectToGetParams({
      text: text ? text + separator + url : url,
    })
  );
}

export const buildBlueskyShareUrl = blueskyLink;

export const BlueskyShareButton = forwardRef<HTMLButtonElement, BlueskyShareButtonProps>(
  ({ separator, text, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="bluesky"
      networkLink={buildBlueskyShareUrl}
      opts={{
        text,
        separator: separator || ' ',
      }}
      windowHeight={460}
      windowPosition="windowCenter"
      windowWidth={660}
    />
  ),
);

BlueskyShareButton.displayName = 'BlueskyShareButton';

