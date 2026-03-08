import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton from './ShareButton';

type WhatsappShareButtonProps = Omit<
  ComponentProps<typeof ShareButton<{ title?: string; separator?: string }>>,
  'networkName' | 'networkLink' | 'opts'
> & {
  separator?: string;
  title?: string;
};

function whatsappLink(url: string, { title, separator }: { title?: string; separator?: string }) {
  assert(url, 'whatsapp.url');
  return (
    'https://api.whatsapp.com/send' +
    objectToGetParams({
      text: title ? title + separator + url : url,
    })
  );
}

const WhatsappShareButton = forwardRef<HTMLButtonElement, WhatsappShareButtonProps>(
  ({ separator, title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="whatsapp"
      networkLink={whatsappLink}
      opts={{
        title,
        separator: separator || ' ',
      }}
      windowHeight={400}
      windowWidth={550}
    />
  ),
);

WhatsappShareButton.displayName = 'WhatsappShareButton';

export default WhatsappShareButton;
