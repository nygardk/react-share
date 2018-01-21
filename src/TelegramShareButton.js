import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function telegramLink(url, { title }) {
  assert(url, 'telegram.url');

  return 'https://telegram.me/share/' + objectToGetParams({
    url,
    text: title,
  });
}

const TelegramShareButton = createShareButton('telegram', telegramLink, props => ({
  title: props.title,
  via: props.via,
}), {
  title: PropTypes.string,
  via: PropTypes.string,
}, {
  windowWidth: 550,
  windowHeight: 400,
});

export default TelegramShareButton;
