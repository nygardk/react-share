import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type PinterestShareProps = {
  media: string;
  description?: string;
  pinId?: string;
};

type PinterestShareButtonProps = ShareButtonProps<PinterestShareProps> & PinterestShareProps;

function pinterestLink(url: string, { media, description, pinId }: PinterestShareProps) {
  if (pinId) {
    return `https://pinterest.com/pin/${pinId}/repin/x/`;
  }

  assert(url, 'pinterest.url');
  assert(media, 'pinterest.media');

  return (
    'https://pinterest.com/pin/create/button/' +
    objectToGetParams({
      url,
      media,
      description,
    })
  );
}

const PinterestShareButton = forwardRef<HTMLButtonElement, PinterestShareButtonProps>(
  ({ description, media, pinId, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="pinterest"
      networkLink={pinterestLink}
      opts={{
        media,
        description,
        pinId,
      }}
      windowHeight={730}
      windowWidth={1000}
    />
  ),
);

PinterestShareButton.displayName = 'PinterestShareButton';

export default PinterestShareButton;
