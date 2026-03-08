import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton from './ShareButton';

type WorkplaceShareButtonProps = Omit<
  ComponentProps<typeof ShareButton<{ quote?: string; hashtag?: string }>>,
  'networkName' | 'networkLink' | 'opts'
> & {
  hashtag?: string;
  quote?: string;
};

function workplaceLink(url: string, { quote, hashtag }: { quote?: string; hashtag?: string }) {
  assert(url, 'workplace.url');

  return (
    'https://work.facebook.com/sharer.php' +
    objectToGetParams({
      u: url,
      quote,
      hashtag,
    })
  );
}

const WorkplaceShareButton = forwardRef<HTMLButtonElement, WorkplaceShareButtonProps>(
  ({ hashtag, quote, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="workplace"
      networkLink={workplaceLink}
      opts={{
        quote,
        hashtag,
      }}
      windowHeight={400}
      windowWidth={550}
    />
  ),
);

WorkplaceShareButton.displayName = 'WorkplaceShareButton';

export default WorkplaceShareButton;
