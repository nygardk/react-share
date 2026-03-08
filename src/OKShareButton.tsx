import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton from './ShareButton';

function okLink(
  url: string,
  { title, description, image }: { title?: string; description?: string; image?: string },
) {
  assert(url, 'ok.url');

  return (
    'https://connect.ok.ru/offer' +
    objectToGetParams({
      url,
      title,
      description,
      imageUrl: image,
    })
  );
}

type OKShareButtonProps = Omit<
  ComponentProps<typeof ShareButton<{ title?: string; description?: string; image?: string }>>,
  'networkName' | 'networkLink' | 'opts'
> & {
  description?: string;
  image?: string;
  title?: string;
};

const OKShareButton = forwardRef<HTMLButtonElement, OKShareButtonProps>(
  ({ description, image, title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="ok"
      networkLink={okLink}
      opts={{
        title,
        description,
        image,
      }}
      windowHeight={480}
      windowPosition="screenCenter"
      windowWidth={588}
    />
  ),
);

OKShareButton.displayName = 'OKShareButton';

export default OKShareButton;
