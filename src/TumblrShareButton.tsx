import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

function tumblrLink(
  url: string,
  {
    title,
    caption,
    tags,
    posttype,
    content,
  }: {
    title?: string;
    caption?: string;
    tags?: string;
    posttype?: 'link' | string;
    content?: string;
  },
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
      content,
    })
  );
}

type Options = {
  title?: string;
  caption?: string;
  posttype?: 'link' | 'text' | 'quote' | 'photo' | 'chat' | 'video' | string;
  content?: string;
};

type TumblrShareButtonProps = Omit<ShareButtonProps<Options & { tags: string }>, 'title'> &
  Options & { tags?: string[] };

const TumblrShareButton = forwardRef<HTMLButtonElement, TumblrShareButtonProps>(
  ({ caption, posttype, tags, title, content, ...props }, ref) => (
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
        content,
      }}
      windowHeight={460}
      windowWidth={660}
    />
  ),
);

TumblrShareButton.displayName = 'TumblrShareButton';

export default TumblrShareButton;
