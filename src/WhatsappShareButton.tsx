import { forwardRef } from 'react';
import { type MobileBehavior, resolveMobileShareStrategy } from './mobile';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type WhatsappOptions = { message?: string; phone?: string; separator?: string };

type WhatsappShareButtonProps = Omit<ShareButtonProps<WhatsappOptions>, 'title'> & {
  message?: string;
  mobileBehavior?: MobileBehavior;
  /** Recipient phone number in international format, for example `+358401234567`. */
  phone?: string;
  separator?: string;
};

function whatsappPhone(phone: string | undefined) {
  return phone?.replace(/\D/g, '') || undefined;
}

function whatsappLink(url: string, { message, phone, separator = ' ' }: WhatsappOptions) {
  assert(url, 'whatsapp.url');
  return (
    'https://api.whatsapp.com/send' +
    objectToGetParams({
      phone: whatsappPhone(phone),
      text: message ? message + separator + url : url,
    })
  );
}

export const buildWhatsappShareUrl = whatsappLink;

function whatsappAppLink(url: string, { message, phone, separator = ' ' }: WhatsappOptions) {
  assert(url, 'whatsapp.url');
  return (
    'whatsapp://send' +
    objectToGetParams({
      phone: whatsappPhone(phone),
      text: message ? message + separator + url : url,
    })
  );
}

export const WhatsappShareButton = forwardRef<HTMLButtonElement, WhatsappShareButtonProps>(
  ({ message, mobileBehavior, phone, separator, ...props }, ref) => {
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
          phone,
          separator: separator || ' ',
        }}
        windowHeight={400}
        windowWidth={550}
      />
    );
  },
);

WhatsappShareButton.displayName = 'WhatsappShareButton';
