import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function viberLink(url, { title, separator }) {
  assert(url, 'viber.url');
  return 'viber://forward' + objectToGetParams({
    text: title ? title + separator + url : url,
  });
}

const ViberShareButton = createShareButton('viber', viberLink, props => ({
  title: props.title,
  separator: props.separator,
}), {
  title: PropTypes.string,
  separator: PropTypes.string,
}, {
  separator: ' ',
  windowWidth: 660,
  windowHeight: 460,
});

export default ViberShareButton;
