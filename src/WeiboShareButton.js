import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function weiboLink(url, { title, pic }) {
  assert(url, 'weibo.url');
  assert(pic, 'weibo.pic');

  return 'http://service.weibo.com/share/share.php?' + objectToGetParams({
    url,
    title,
    pic,
  });
}

const WeiboShareButton = createShareButton('weibo', weiboLink, props => ({
  title: props.title,
  pic: props.pic,
}), {
  title: PropTypes.string,
  pic: PropTypes.string,
}, {
  windowWidth: 550,
  windowHeight: 400,
});

export default WeiboShareButton;
