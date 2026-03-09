import { forwardRef } from 'react';
import { type MobileBehavior, resolveMobileShareStrategy } from './mobile';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type ViberShareButtonProps = Omit<
  ShareButtonProps<{ message?: string; separator?: string }>,
  'title'
> & {
  message?: string;
  mobileBehavior?: MobileBehavior;
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
  ({ message, mobileBehavior, separator, ...props }, ref) => {
    const { linkBehavior, networkLink } = resolveMobileShareStrategy(
      mobileBehavior,
      buildViberShareUrl,
      buildViberShareUrl,
    );

    return (
      <ShareButton
        {...props}
        forwardedRef={ref}
        linkBehavior={linkBehavior}
        networkName="viber"
        networkLink={networkLink}
        opts={{
          message,
          separator: separator || ' ',
        }}
        windowHeight={460}
        windowWidth={660}
      />
    );
  },
);

ViberShareButton.displayName = 'ViberShareButton';
