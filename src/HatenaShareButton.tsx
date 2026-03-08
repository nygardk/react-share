import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import assert from './utils/assert';
import ShareButton from './ShareButton';

type HatenaShareButtonProps = Omit<
  ComponentProps<typeof ShareButton<{ title?: string }>>,
  'networkName' | 'networkLink' | 'opts'
> & {
  title?: string;
};

function hatenaLink(url: string, { title }: { title?: string }) {
  assert(url, 'hatena.url');

  return `http://b.hatena.ne.jp/add?mode=confirm&url=${url}&title=${title}`;
}

const HatenaShareButton = forwardRef<HTMLButtonElement, HatenaShareButtonProps>(
  ({ title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="hatena"
      networkLink={hatenaLink}
      opts={{ title }}
      windowHeight={460}
      windowPosition="windowCenter"
      windowWidth={660}
    />
  ),
);

HatenaShareButton.displayName = 'HatenaShareButton';

export default HatenaShareButton;
