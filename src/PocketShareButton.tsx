import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type PocketShareButtonProps = Omit<ShareButtonProps<{ shareTitle?: string }>, 'title'> & {
  shareTitle?: string;
};

function pocketLink(url: string, { shareTitle }: { shareTitle?: string }) {
  assert(url, 'pocket.url');

  return (
    'https://getpocket.com/save' +
    objectToGetParams({
      url,
      title: shareTitle,
    })
  );
}

export const buildPocketShareUrl = pocketLink;

const PocketShareButton = forwardRef<HTMLButtonElement, PocketShareButtonProps>(
  ({ shareTitle, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="pocket"
      networkLink={buildPocketShareUrl}
      opts={{ shareTitle }}
      windowHeight={500}
      windowWidth={500}
    />
  ),
);

PocketShareButton.displayName = 'PocketShareButton';

export default PocketShareButton;
