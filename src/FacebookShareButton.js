import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function facebookLink(url, { quote, hashtag }) {
  assert(url, 'facebook.url');

  return 'https://www.facebook.com/sharer/sharer.php' + objectToGetParams({
    u: url,
    quote,
    hashtag,
  });
}

const FacebookShareButton = createShareButton('facebook', facebookLink, (props) => {
  /* eslint-disable no-console */
  if (props.picture) {
    console.warn('FacebookShareButton warning: picture is a deprecated prop.');
  }

  if (props.title) {
    console.warn('FacebookShareButton warning: title is a deprecated prop. Use "quote" instead.');
  }

  if (props.description) {
    console.warn(`FacebookShareButton warning: description is a deprecated prop.
      Use "quote" instead.`);
  }
  /* eslint-enable no-console */

  return {
    quote: props.quote,
    hashtag: props.hashtag,
  };
}, {
  quote: PropTypes.string,
  hashtag: PropTypes.string,
}, {
  windowWidth: 550,
  windowHeight: 400,
});

export default FacebookShareButton;
