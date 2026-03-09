import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type ViberShareButtonProps = Omit<
  ShareButtonProps<{ title?: string; separator?: string }>,
  'title'
> & {
  separator?: string;
  title?: string;
};

function viberLink(url: string, { title, separator }: { title?: string; separator?: string }) {
  assert(url, 'viber.url');
  return (
    'viber://forward' +
    objectToGetParams({
      text: title ? title + separator + url : url,
    })
  );
}

const ViberShareButton = forwardRef<HTMLButtonElement, ViberShareButtonProps>(
  ({ separator, title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="viber"
      networkLink={viberLink}
      opts={{
        title,
        separator: separator || ' ',
      }}
      windowHeight={460}
      windowWidth={660}
    />
  ),
);

ViberShareButton.displayName = 'ViberShareButton';

export default ViberShareButton;
