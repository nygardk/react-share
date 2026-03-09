import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type GabShareButtonProps = Omit<ShareButtonProps<{ title?: string }>, 'title'> & {
  title?: string;
};

function gabLink(url: string, { title }: { title?: string }) {
  assert(url, 'gab.url');

  return (
    'https://gab.com/compose' +
    objectToGetParams({
      url,
      text: title,
    })
  );
}

const GabShareButton = forwardRef<HTMLButtonElement, GabShareButtonProps>(
  ({ title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="gab"
      networkLink={gabLink}
      opts={{ title }}
      windowHeight={640}
      windowPosition="windowCenter"
      windowWidth={660}
    />
  ),
);

GabShareButton.displayName = 'GabShareButton';

export default GabShareButton;
