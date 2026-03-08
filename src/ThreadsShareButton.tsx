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
  /** @deprecated This prop is ignored and will be removed in v6. */
  hashtags?: string[];
  /** @deprecated This prop is ignored and will be removed in v6. */
  related?: string[];
  title?: string;
  /** @deprecated This prop is ignored and will be removed in v6. */
  via?: string;
};

const ThreadsShareButton = forwardRef<HTMLButtonElement, ThreadsShareButtonProps>(
  ({ hashtags, related, title, via, ...props }, ref) => {
    void hashtags;
    void related;
    void via;

    return (
      <ShareButton
        {...props}
        forwardedRef={ref}
        networkName="threads"
        networkLink={threadsLink}
        opts={{ title }}
        windowHeight={600}
        windowWidth={550}
      />
    );
  },
);

ThreadsShareButton.displayName = 'ThreadsShareButton';

export default ThreadsShareButton;
