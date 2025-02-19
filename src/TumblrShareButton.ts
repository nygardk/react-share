import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

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

const TumblrShareButton = createShareButton<
  Options & { tags?: string[] },
  Options & { tags: string }
>(
  'tumblr',
  tumblrLink,
  props => ({
    title: props.title,
    tags: (props.tags || []).join(','),
    caption: props.caption,
    posttype: props.posttype || 'link',
    content: props.content,
  }),
  {
    windowWidth: 660,
    windowHeight: 460,
  },
);

export default TumblrShareButton;
