import { forwardRef } from 'react';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type FarcasterOptions = {
  channelKey?: string;
  parentCastHash?: string;
  text?: string;
};

type FarcasterShareButtonProps = Omit<ShareButtonProps<FarcasterOptions>, 'title'> &
  FarcasterOptions;

function farcasterLink(url: string, { channelKey, parentCastHash, text }: FarcasterOptions) {
  assert(url, 'farcaster.url');

  return (
    'https://farcaster.xyz/~/compose' +
    objectToGetParams({
      text,
      'embeds[]': url,
      channelKey,
      parentCastHash,
    }).replace('embeds%5B%5D=', 'embeds[]=')
  );
}

export const buildFarcasterShareUrl = farcasterLink;

export const FarcasterShareButton = forwardRef<HTMLButtonElement, FarcasterShareButtonProps>(
  ({ channelKey, parentCastHash, text, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="farcaster"
      networkLink={buildFarcasterShareUrl}
      opts={{
        channelKey,
        parentCastHash,
        text,
      }}
      windowHeight={460}
      windowPosition="windowCenter"
      windowWidth={660}
    />
  ),
);

FarcasterShareButton.displayName = 'FarcasterShareButton';
