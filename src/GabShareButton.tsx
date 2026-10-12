import { forwardRef } from 'react';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type GabShareButtonProps = Omit<ShareButtonProps<{ text?: string }>, 'title'> & {
  text?: string;
};

function gabLink(url: string, { text }: { text?: string }) {
  assert(url, 'gab.url');

  return (
    'https://gab.com/compose' +
    objectToGetParams({
      url,
      text,
    })
  );
}

export const buildGabShareUrl = gabLink;

export const GabShareButton = forwardRef<HTMLButtonElement, GabShareButtonProps>(
  ({ text, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="gab"
      networkLink={buildGabShareUrl}
      opts={{ text }}
      windowHeight={640}
      windowPosition="windowCenter"
      windowWidth={660}
    />
  ),
);

GabShareButton.displayName = 'GabShareButton';
