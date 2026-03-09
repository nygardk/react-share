import { forwardRef } from 'react';
import assert from './utils/assert';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type HatenaShareButtonProps = Omit<ShareButtonProps<{ shareTitle?: string }>, 'title'> & {
  shareTitle?: string;
};

function hatenaLink(url: string, { shareTitle }: { shareTitle?: string }) {
  assert(url, 'hatena.url');

  return `http://b.hatena.ne.jp/add?mode=confirm&url=${url}&title=${shareTitle}`;
}

const HatenaShareButton = forwardRef<HTMLButtonElement, HatenaShareButtonProps>(
  ({ shareTitle, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="hatena"
      networkLink={hatenaLink}
      opts={{ shareTitle }}
      windowHeight={460}
      windowPosition="windowCenter"
      windowWidth={660}
    />
  ),
);

HatenaShareButton.displayName = 'HatenaShareButton';

export default HatenaShareButton;
