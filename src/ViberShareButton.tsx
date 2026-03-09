import { forwardRef } from 'react';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type ViberShareButtonProps = Omit<
  ShareButtonProps<{ message?: string; separator?: string }>,
  'title'
> & {
  message?: string;
  separator?: string;
};

function viberLink(url: string, { message, separator }: { message?: string; separator?: string }) {
  assert(url, 'viber.url');
  return (
    'viber://forward' +
    objectToGetParams({
      text: message ? message + separator + url : url,
    })
  );
}

export const buildViberShareUrl = viberLink;

export const ViberShareButton = forwardRef<HTMLButtonElement, ViberShareButtonProps>(
  ({ message, separator, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="viber"
      networkLink={buildViberShareUrl}
      opts={{
        message,
        separator: separator || ' ',
      }}
      windowHeight={460}
      windowWidth={660}
    />
  ),
);

ViberShareButton.displayName = 'ViberShareButton';

