import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton from './ShareButton';

type PocketShareButtonProps = Omit<
  ComponentProps<typeof ShareButton<{ title?: string }>>,
  'networkName' | 'networkLink' | 'opts'
> & {
  title?: string;
};

function pocketLink(url: string, { title }: { title?: string }) {
  assert(url, 'pocket.url');

  return (
    'https://getpocket.com/save' +
    objectToGetParams({
      url,
      title,
    })
  );
}

const PocketShareButton = forwardRef<HTMLButtonElement, PocketShareButtonProps>(
  ({ title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="pocket"
      networkLink={pocketLink}
      opts={{ title }}
      windowHeight={500}
      windowWidth={500}
    />
  ),
);

PocketShareButton.displayName = 'PocketShareButton';

export default PocketShareButton;
