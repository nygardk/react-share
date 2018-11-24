import PropTypes from 'prop-types';

import assert from 'assert';

import createShareButton from './utils/createShareButton';
import objectToGetParams from './utils/objectToGetParams';

function lineLink(url, { title }) {
  assert(url, 'line.url');

  return 'https://social-plugins.line.me/lineit/share' + objectToGetParams({
    url,
    text: title,
  });
}

const LineShareButton = createShareButton('line', lineLink, props => ({
  title: props.title,
}), {
  title: PropTypes.string,
}, {
  windowWidth: 500,
  windowHeight: 500,
});

export default LineShareButton;
