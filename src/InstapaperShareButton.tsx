import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type InstapaperShareButtonProps = Omit<
  ShareButtonProps<{ title?: string; description?: string }>,
  'title'
> & {
  description?: string;
  title?: string;
};

function instapaperLink(
  url: string,
  { title, description }: { title?: string; description?: string },
) {
  assert(url, 'instapaper.url');

  return (
    'http://www.instapaper.com/hello2' +
    objectToGetParams({
      url,
      title,
      description,
    })
  );
}

const InstapaperShareButton = forwardRef<HTMLButtonElement, InstapaperShareButtonProps>(
  ({ description, title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="instapaper"
      networkLink={instapaperLink}
      opts={{
        title,
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
