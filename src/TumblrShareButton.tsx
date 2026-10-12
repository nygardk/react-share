import { forwardRef } from 'react';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type TumblrPostType = 'link' | 'text' | 'quote' | 'photo' | 'chat' | 'video' | (string & {});

function tumblrLink(
  url: string,
  {
    postTitle,
    caption,
    tags,
    posttype,
    content,
  }: {
    postTitle?: string;
    caption?: string;
    tags?: string;
    posttype?: TumblrPostType;
    content?: string;
  },
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
      content,
    })
  );
}

export const buildTumblrShareUrl = tumblrLink;

type Options = {
  postTitle?: string;
  caption?: string;
  /** The post content for post types other than `link`, such as the quote text or photo URL. */
  content?: string;
  posttype?: TumblrPostType;
};

type TumblrShareButtonProps = Omit<ShareButtonProps<Options & { tags: string }>, 'title'> &
  Options & { tags?: string[] };

export const TumblrShareButton = forwardRef<HTMLButtonElement, TumblrShareButtonProps>(
  ({ caption, content, postTitle, posttype, tags, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="tumblr"
      networkLink={buildTumblrShareUrl}
      opts={{
        postTitle,
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
