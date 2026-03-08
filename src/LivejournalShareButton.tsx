import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton from './ShareButton';

type LivejournalShareButtonProps = Omit<
  ComponentProps<typeof ShareButton<{ title?: string; description?: string }>>,
  'networkName' | 'networkLink' | 'opts'
> & {
  description?: string;
  title?: string;
};

function livejournalLink(
  url: string,
  { title, description }: { title?: string; description?: string },
) {
  assert(url, 'livejournal.url');

  return (
    'https://www.livejournal.com/update.bml' +
    objectToGetParams({
      subject: title,
      event: description,
    })
  );
}

const LivejournalShareButton = forwardRef<HTMLButtonElement, LivejournalShareButtonProps>(
  ({ description, title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="livejournal"
      networkLink={livejournalLink}
      opts={{
        title,
        description,
      }}
      windowHeight={460}
      windowWidth={660}
    />
  ),
);

LivejournalShareButton.displayName = 'LivejournalShareButton';

export default LivejournalShareButton;
