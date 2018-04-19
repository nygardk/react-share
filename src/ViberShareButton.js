import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function viberLink(url, { title }) {
  assert(url, 'viber.url');
  return 'viber://forward' + objectToGetParams({
    text: `${title || ''} ${url}`,
  });
}

const ViberShareButton = createShareButton('viber', viberLink, props => ({
  title: props.title,
}), {
  title: PropTypes.string,
}, {
  windowWidth: 660,
  windowHeight: 460,
});

export default ViberShareButton;
