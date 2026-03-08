import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type LineShareButtonProps = Omit<ShareButtonProps<{ title?: string }>, 'title'> & {
  title?: string;
};

function lineLink(url: string, { title }: { title?: string }) {
  assert(url, 'line.url');

  return (
    'https://social-plugins.line.me/lineit/share' +
    objectToGetParams({
      url,
      text: title,
    })
  );
}

const LineShareButton = forwardRef<HTMLButtonElement, LineShareButtonProps>(
  ({ title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="line"
      networkLink={lineLink}
      opts={{ title }}
      windowHeight={500}
      windowWidth={500}
    />
  ),
);

LineShareButton.displayName = 'LineShareButton';

export default LineShareButton;
