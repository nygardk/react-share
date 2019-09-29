import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function weiboLink(url: string, { title, image }: { title?: string; image?: string }) {
  assert(url, 'weibo.url');

  return (
    'http://service.weibo.com/share/share.php' +
    objectToGetParams({
      url,
      title,
      pic: image,
    })
  );
}

const WeiboShareButton = createShareButton<{ title?: string; image?: string }>(
  'weibo',
  weiboLink,
  props => ({
    title: props.title,
    image: props.image,
  }),
  {
    windowWidth: 650,
    windowHeight: 350,
    windowPosition: 'screenCenter',
  },
);

export default WeiboShareButton;
