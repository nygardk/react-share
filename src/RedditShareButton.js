import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function redditLink(url, { title }) {
  assert(url, 'reddit.url');

  return 'https://www.reddit.com/submit' + objectToGetParams({
    url,
    title,
  });
}

const RedditShareButton = createShareButton('reddit', redditLink, props => ({
  title: props.title,
}), {
  title: PropTypes.string,
}, {
  windowWidth: 660,
  windowHeight: 460,
});

export default RedditShareButton;
