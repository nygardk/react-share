import { forwardRef } from 'react';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type LineShareButtonProps = Omit<ShareButtonProps<{ text?: string }>, 'title'> & {
  text?: string;
};

function lineLink(url: string, { text }: { text?: string }) {
  assert(url, 'line.url');

  return (
    'https://social-plugins.line.me/lineit/share' +
    objectToGetParams({
      url,
      text,
    })
  );
}

export const buildLineShareUrl = lineLink;

export const LineShareButton = forwardRef<HTMLButtonElement, LineShareButtonProps>(
  ({ text, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="line"
      networkLink={buildLineShareUrl}
      opts={{ text }}
      windowHeight={500}
      windowWidth={500}
    />
  ),
);

LineShareButton.displayName = 'LineShareButton';

