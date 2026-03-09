import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

function threadsLink(url: string, { title }: { title?: string }) {
  assert(url, 'threads.url');

  return (
    'https://threads.net/intent/post' +
    objectToGetParams({
      url,
      text: title,
    })
  );
}

type ThreadsShareButtonProps = Omit<ShareButtonProps<{ title?: string }>, 'title'> & {
  title?: string;
};

const ThreadsShareButton = forwardRef<HTMLButtonElement, ThreadsShareButtonProps>(
  ({ title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="threads"
      networkLink={threadsLink}
      opts={{ title }}
      windowHeight={600}
      windowWidth={550}
    />
  ),
);

ThreadsShareButton.displayName = 'ThreadsShareButton';

export default ThreadsShareButton;
