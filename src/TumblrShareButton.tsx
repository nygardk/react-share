import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

function tumblrLink(
  url: string,
  {
    postTitle,
    caption,
    tags,
    posttype,
  }: { postTitle?: string; caption?: string; tags?: string; posttype?: 'link' | string },
) {
  assert(url, 'tumblr.url');

  return (
    'https://www.tumblr.com/widgets/share/tool' +
    objectToGetParams({
      canonicalUrl: url,
      title: postTitle,
      caption,
      tags,
      posttype,
    })
  );
}

type Options = {
  postTitle?: string;
  caption?: string;
  posttype?: 'link' | string;
};

type TumblrShareButtonProps = Omit<ShareButtonProps<Options & { tags: string }>, 'title'> &
  Options & { tags?: string[] };

const TumblrShareButton = forwardRef<HTMLButtonElement, TumblrShareButtonProps>(
  ({ caption, postTitle, posttype, tags, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="tumblr"
      networkLink={tumblrLink}
      opts={{
        postTitle,
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
