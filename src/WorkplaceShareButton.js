import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function workplaceLink(url, { quote, hashtag }) {
  assert(url, 'workplace.url');

  return 'https://work.facebook.com/sharer.php' + objectToGetParams({
    u: url,
    quote,
    hashtag,
  });
}

const WorkplaceShareButton = createShareButton('workplace', workplaceLink, props => ({
  quote: props.quote,
  hashtag: props.hashtag,
}), {
  quote: PropTypes.string,
  hashtag: PropTypes.string,
}, {
  windowWidth: 550,
  windowHeight: 400,
});

export default WorkplaceShareButton;
