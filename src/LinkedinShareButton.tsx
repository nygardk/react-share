import { forwardRef } from 'react';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type Options = Record<string, never>;

type LinkedinShareButtonProps = Omit<ShareButtonProps<Options>, 'title'>;

function linkedinLink(url: string) {
  assert(url, 'linkedin.url');

  return 'https://linkedin.com/shareArticle' + objectToGetParams({ url, mini: 'true' });
}

export const buildLinkedinShareUrl = linkedinLink;

export const LinkedinShareButton = forwardRef<HTMLButtonElement, LinkedinShareButtonProps>(
  (props, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="linkedin"
      networkLink={buildLinkedinShareUrl}
      opts={{}}
      windowHeight={600}
      windowWidth={750}
    />
  ),
);

LinkedinShareButton.displayName = 'LinkedinShareButton';
