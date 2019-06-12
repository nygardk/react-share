import PropTypes from 'prop-types';

import assert from 'assert';

import createShareButton from './utils/createShareButton';
import objectToGetParams from './utils/objectToGetParams';

function instapaperLink(url, { title, description }) {
  assert(url, 'instapaper.url');

  return 'http://www.instapaper.com/hello2' + objectToGetParams({
    url,
    title,
    description,
  });
}

const InstapaperShareButton = createShareButton('instapaper', instapaperLink, props => ({
  title: props.title,
  description: props.description,
}), {
  title: PropTypes.string,
  description: PropTypes.string,
}, {
  windowWidth: 500,
  windowHeight: 500,
});

export default InstapaperShareButton;
