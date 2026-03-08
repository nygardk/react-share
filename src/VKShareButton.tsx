import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton from './ShareButton';

type Options = {
  title?: string;
  image?: string;
  noParse?: boolean;
  noVkLinks?: boolean;
};

type VKShareButtonProps = Omit<
  ComponentProps<typeof ShareButton<Options>>,
  'networkName' | 'networkLink' | 'opts'
> &
  Options;

function vkLink(url: string, { title, image, noParse, noVkLinks }: Options) {
  assert(url, 'vk.url');

  return (
    'https://vk.com/share.php' +
    objectToGetParams({
      url,
      title,
      image,
      noparse: noParse ? 1 : 0,
      no_vk_links: noVkLinks ? 1 : 0,
    })
  );
}

const VKShareButton = forwardRef<HTMLButtonElement, VKShareButtonProps>(
  ({ image, noParse, noVkLinks, title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="vk"
      networkLink={vkLink}
      opts={{
        title,
        image,
        noParse,
        noVkLinks,
      }}
      windowHeight={460}
      windowWidth={660}
    />
  ),
);

VKShareButton.displayName = 'VKShareButton';

export default VKShareButton;
