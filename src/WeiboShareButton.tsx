import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type WeiboShareButtonProps = Omit<
  ShareButtonProps<{ shareTitle?: string; image?: string }>,
  'title'
> & {
  image?: string;
  shareTitle?: string;
};

function weiboLink(
  url: string,
  { shareTitle, image }: { shareTitle?: string; image?: string },
) {
  assert(url, 'weibo.url');

  return (
    'http://service.weibo.com/share/share.php' +
    objectToGetParams({
      url,
      title: shareTitle,
      pic: image,
    })
  );
}

export const buildWeiboShareUrl = weiboLink;

const WeiboShareButton = forwardRef<HTMLButtonElement, WeiboShareButtonProps>(
  ({ image, shareTitle, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="weibo"
      networkLink={buildWeiboShareUrl}
      opts={{
        shareTitle,
        image,
      }}
      windowHeight={550}
      windowPosition="screenCenter"
      windowWidth={660}
    />
  ),
);

WeiboShareButton.displayName = 'WeiboShareButton';

export default WeiboShareButton;
