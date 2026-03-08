import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type WeiboShareButtonProps = Omit<ShareButtonProps<{ title?: string; image?: string }>, 'title'> & {
  image?: string;
  title?: string;
};

function weiboLink(url: string, { title, image }: { title?: string; image?: string }) {
  assert(url, 'weibo.url');

  return (
    'http://service.weibo.com/share/share.php' +
    objectToGetParams({
      url,
      title,
      pic: image,
    })
  );
}

const WeiboShareButton = forwardRef<HTMLButtonElement, WeiboShareButtonProps>(
  ({ image, title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="weibo"
      networkLink={weiboLink}
      opts={{
        title,
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
