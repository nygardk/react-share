import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton from './ShareButton';

type BlueskyShareButtonProps = Omit<
  ComponentProps<typeof ShareButton<{ title?: string; separator?: string }>>,
  'networkName' | 'networkLink' | 'opts'
> & {
  separator?: string;
  title?: string;
};

function blueskyLink(url: string, { title, separator }: { title?: string; separator?: string }) {
  assert(url, 'bluesky.url');

  return (
    'https://bsky.app/intent/compose' +
    objectToGetParams({
      text: title ? title + separator + url : url,
    })
  );
}

const BlueskyShareButton = forwardRef<HTMLButtonElement, BlueskyShareButtonProps>(
  ({ separator, title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="bluesky"
      networkLink={blueskyLink}
      opts={{
        title,
        separator: separator || ' ',
      }}
      windowHeight={460}
      windowPosition="windowCenter"
      windowWidth={660}
    />
  ),
);

BlueskyShareButton.displayName = 'BlueskyShareButton';

export default BlueskyShareButton;
