import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function weiboLink(url, { title, image }) {
  assert(url, 'weibo.url');

  return 'http://service.weibo.com/share/share.php?' + objectToGetParams({
    url,
    title,
    pic: image,
  });
}

const WeiboShareButton = createShareButton('weibo', weiboLink, props => ({
  title: props.title,
  image: props.image,
}), {
  title: PropTypes.string,
  image: PropTypes.string,
}, {
  windowWidth: 550,
  windowHeight: 400,
});

export default WeiboShareButton;
