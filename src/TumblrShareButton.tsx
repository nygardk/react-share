import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton from './ShareButton';

function tumblrLink(
  url: string,
  {
    title,
    caption,
    tags,
    posttype,
  }: { title?: string; caption?: string; tags?: string; posttype?: 'link' | string },
) {
  assert(url, 'tumblr.url');

  return (
    'https://www.tumblr.com/widgets/share/tool' +
    objectToGetParams({
      canonicalUrl: url,
      title,
      caption,
      tags,
      posttype,
    })
  );
}

type Options = {
  title?: string;
  caption?: string;
  posttype?: 'link' | string;
};

type TumblrShareButtonProps = Omit<
  ComponentProps<typeof ShareButton<Options & { tags: string }>>,
  'networkName' | 'networkLink' | 'opts'
> &
  Options & { tags?: string[] };

const TumblrShareButton = forwardRef<HTMLButtonElement, TumblrShareButtonProps>(
  ({ caption, posttype, tags, title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="tumblr"
      networkLink={tumblrLink}
      opts={{
        title,
        tags: (tags || []).join(','),
        caption,
        posttype: posttype || 'link',
      }}
      windowHeight={460}
      windowWidth={660}
    />
  ),
);

TumblrShareButton.displayName = 'TumblrShareButton';

export default TumblrShareButton;
