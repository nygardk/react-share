import { forwardRef } from 'react';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

function threadsLink(url: string, { text }: { text?: string }) {
  assert(url, 'threads.url');

  return (
    'https://threads.net/intent/post' +
    objectToGetParams({
      url,
      text,
    })
  );
}

export const buildThreadsShareUrl = threadsLink;

type ThreadsShareButtonProps = Omit<ShareButtonProps<{ text?: string }>, 'title'> & {
  text?: string;
};

export const ThreadsShareButton = forwardRef<HTMLButtonElement, ThreadsShareButtonProps>(
  ({ text, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="threads"
      networkLink={buildThreadsShareUrl}
      opts={{ text }}
      windowHeight={600}
      windowWidth={550}
    />
  ),
);

ThreadsShareButton.displayName = 'ThreadsShareButton';

