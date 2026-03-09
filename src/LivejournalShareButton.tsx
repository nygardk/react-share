import { forwardRef } from 'react';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type LivejournalShareButtonProps = Omit<
  ShareButtonProps<{ shareTitle?: string; description?: string }>,
  'title'
> & {
  description?: string;
  shareTitle?: string;
};

function livejournalLink(
  url: string,
  { shareTitle, description }: { shareTitle?: string; description?: string },
) {
  assert(url, 'livejournal.url');

  return (
    'https://www.livejournal.com/update.bml' +
    objectToGetParams({
      subject: shareTitle,
      event: description,
    })
  );
}

export const buildLivejournalShareUrl = livejournalLink;

export const LivejournalShareButton = forwardRef<HTMLButtonElement, LivejournalShareButtonProps>(
  ({ description, shareTitle, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="livejournal"
      networkLink={buildLivejournalShareUrl}
      opts={{
        shareTitle,
        description,
      }}
      windowHeight={460}
      windowWidth={660}
    />
  ),
);

LivejournalShareButton.displayName = 'LivejournalShareButton';

