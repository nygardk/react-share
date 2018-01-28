import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function tumblrLink(url, { title, caption, tags, posttype }) {
  assert(url, 'tumblr.url');

  return 'https://www.tumblr.com/widgets/share/tool' + objectToGetParams({
    canonicalUrl: url,
    title,
    caption,
    tags,
    posttype,
  });
}

const TumblrShareButton = createShareButton('tumblr', tumblrLink, props => ({
  title: props.title,
  tags: props.tags.join(','),
  caption: props.caption,
  posttype: props.posttype,
}), {
  title: PropTypes.string,
  caption: PropTypes.string,
  posttype: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}, {
  tags: [],
  posttype: 'link',
  windowWidth: 660,
  windowHeight: 460,
});

export default TumblrShareButton;
