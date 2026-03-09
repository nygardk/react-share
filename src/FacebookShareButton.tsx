import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type FacebookShareButtonProps = ShareButtonProps<{ hashtag?: string }> & {
  hashtag?: string;
};

function facebookLink(url: string, { hashtag }: { hashtag?: string }) {
  assert(url, 'facebook.url');

  return 'https://www.facebook.com/sharer/sharer.php' + objectToGetParams({ u: url, hashtag });
}

const FacebookShareButton = forwardRef<HTMLButtonElement, FacebookShareButtonProps>(
  ({ hashtag, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="facebook"
      networkLink={facebookLink}
      opts={{ hashtag }}
      windowHeight={400}
      windowWidth={550}
    />
  ),
);

FacebookShareButton.displayName = 'FacebookShareButton';

export default FacebookShareButton;
