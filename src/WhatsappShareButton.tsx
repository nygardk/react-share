import { forwardRef } from 'react';
import { type MobileBehavior, resolveMobileShareStrategy } from './mobile';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type WhatsappShareButtonProps = Omit<
  ShareButtonProps<{ message?: string; separator?: string }>,
  'title'
> & {
  message?: string;
  mobileBehavior?: MobileBehavior;
  separator?: string;
};

function whatsappLink(
  url: string,
  { message, separator }: { message?: string; separator?: string },
) {
  assert(url, 'whatsapp.url');
  return (
    'https://api.whatsapp.com/send' +
    objectToGetParams({
      text: message ? message + separator + url : url,
    })
  );
}

export const buildWhatsappShareUrl = whatsappLink;

function whatsappAppLink(
  url: string,
  { message, separator }: { message?: string; separator?: string },
) {
  assert(url, 'whatsapp.url');
  return (
    'whatsapp://send' +
    objectToGetParams({
      text: message ? message + separator + url : url,
    })
  );
}

export const WhatsappShareButton = forwardRef<HTMLButtonElement, WhatsappShareButtonProps>(
  ({ message, mobileBehavior, separator, ...props }, ref) => {
    const { linkBehavior, networkLink } = resolveMobileShareStrategy(
      mobileBehavior,
      buildWhatsappShareUrl,
      whatsappAppLink,
    );

    return (
      <ShareButton
        {...props}
        forwardedRef={ref}
        linkBehavior={linkBehavior}
        networkName="whatsapp"
        networkLink={networkLink}
        opts={{
          message,
          separator: separator || ' ',
        }}
        windowHeight={400}
        windowWidth={550}
      />
    );
  },
);

WhatsappShareButton.displayName = 'WhatsappShareButton';
