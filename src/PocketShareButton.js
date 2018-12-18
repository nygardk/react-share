import PropTypes from 'prop-types';

import assert from 'assert';

import createShareButton from './utils/createShareButton';
import objectToGetParams from './utils/objectToGetParams';

function pocketLink(url, { title }) {
  assert(url, 'pocket.url');

  return 'https://getpocket.com/save' + objectToGetParams({
    url,
    title,
  });
}

const PocketShareButton = createShareButton('pocket', pocketLink, props => ({
  title: props.title,
}), {
  title: PropTypes.string,
}, {
  windowWidth: 500,
  windowHeight: 500,
});

export default PocketShareButton;
