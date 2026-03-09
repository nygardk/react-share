import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type Options = {
  shareTitle?: string;
  image?: string;
  noParse?: boolean;
  noVkLinks?: boolean;
};

type VKShareButtonProps = Omit<ShareButtonProps<Options>, 'title'> & Options;

function vkLink(url: string, { shareTitle, image, noParse, noVkLinks }: Options) {
  assert(url, 'vk.url');

  return (
    'https://vk.com/share.php' +
    objectToGetParams({
      url,
      title: shareTitle,
      image,
      noparse: noParse ? 1 : 0,
      no_vk_links: noVkLinks ? 1 : 0,
    })
  );
}

const VKShareButton = forwardRef<HTMLButtonElement, VKShareButtonProps>(
  ({ image, noParse, noVkLinks, shareTitle, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="vk"
      networkLink={vkLink}
      opts={{
        shareTitle,
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
