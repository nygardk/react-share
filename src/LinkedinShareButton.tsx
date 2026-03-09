import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type Options = {
  /** The url-encoded title value that you wish you use. */
  title?: string;
  /** The url-encoded description that you wish you use. */
  summary?: string;
  /** The url-encoded source of the content (e.g. your website or application name) */
  source?: string;
};

type LinkedinShareButtonProps = Omit<ShareButtonProps<Options>, 'title'> & Options;

function linkedinLink(url: string, { title, summary, source }: Options) {
  assert(url, 'linkedin.url');

  return (
    'https://linkedin.com/shareArticle' +
    objectToGetParams({ url, mini: 'true', title, summary, source })
  );
}

const LinkedinShareButton = forwardRef<HTMLButtonElement, LinkedinShareButtonProps>(
  ({ source, summary, title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="linkedin"
      networkLink={linkedinLink}
      opts={{ title, summary, source }}
      windowHeight={600}
      windowWidth={750}
    />
  ),
);

LinkedinShareButton.displayName = 'LinkedinShareButton';

export default LinkedinShareButton;
