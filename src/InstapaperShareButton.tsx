import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type InstapaperShareButtonProps = Omit<
  ShareButtonProps<{ shareTitle?: string; description?: string }>,
  'title'
> & {
  description?: string;
  shareTitle?: string;
};

function instapaperLink(
  url: string,
  { shareTitle, description }: { shareTitle?: string; description?: string },
) {
  assert(url, 'instapaper.url');

  return (
    'http://www.instapaper.com/hello2' +
    objectToGetParams({
      url,
      title: shareTitle,
      description,
    })
  );
}

const InstapaperShareButton = forwardRef<HTMLButtonElement, InstapaperShareButtonProps>(
  ({ description, shareTitle, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="instapaper"
      networkLink={instapaperLink}
      opts={{
        shareTitle,
        description,
      }}
      windowHeight={500}
      windowPosition="windowCenter"
      windowWidth={500}
    />
  ),
);

InstapaperShareButton.displayName = 'InstapaperShareButton';

export default InstapaperShareButton;
