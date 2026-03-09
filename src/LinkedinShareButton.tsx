import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type Options = {
  /** The url-encoded title value that you wish you use. */
  shareTitle?: string;
  /** The url-encoded description that you wish you use. */
  summary?: string;
  /** The url-encoded source of the content (e.g. your website or application name) */
  source?: string;
};

type LinkedinShareButtonProps = Omit<ShareButtonProps<Options>, 'title'> & Options;

function linkedinLink(url: string, { shareTitle, summary, source }: Options) {
  assert(url, 'linkedin.url');

  return (
    'https://linkedin.com/shareArticle' +
    objectToGetParams({ url, mini: 'true', title: shareTitle, summary, source })
  );
}

export const buildLinkedinShareUrl = linkedinLink;

const LinkedinShareButton = forwardRef<HTMLButtonElement, LinkedinShareButtonProps>(
  ({ shareTitle, source, summary, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="linkedin"
      networkLink={buildLinkedinShareUrl}
      opts={{ shareTitle, summary, source }}
      windowHeight={600}
      windowWidth={750}
    />
  ),
);

LinkedinShareButton.displayName = 'LinkedinShareButton';

export default LinkedinShareButton;
