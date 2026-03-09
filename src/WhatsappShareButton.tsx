import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type WhatsappShareButtonProps = Omit<
  ShareButtonProps<{ message?: string; separator?: string }>,
  'title'
> & {
  message?: string;
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

const WhatsappShareButton = forwardRef<HTMLButtonElement, WhatsappShareButtonProps>(
  ({ message, separator, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="whatsapp"
      networkLink={buildWhatsappShareUrl}
      opts={{
        message,
        separator: separator || ' ',
      }}
      windowHeight={400}
      windowWidth={550}
    />
  ),
);

WhatsappShareButton.displayName = 'WhatsappShareButton';

export default WhatsappShareButton;
