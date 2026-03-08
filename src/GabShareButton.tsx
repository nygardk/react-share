import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton from './ShareButton';

type GabShareButtonProps = Omit<
  ComponentProps<typeof ShareButton<{ title?: string }>>,
  'networkName' | 'networkLink' | 'opts'
> & {
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
