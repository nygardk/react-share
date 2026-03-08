import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton from './ShareButton';

type LineShareButtonProps = Omit<
  ComponentProps<typeof ShareButton<{ title?: string }>>,
  'networkName' | 'networkLink' | 'opts'
> & {
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
