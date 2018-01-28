import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function whatsappLink(url, { title, separator }) {
  assert(url, 'whatsapp.url');
  return 'https://api.whatsapp.com/send' + objectToGetParams({
    text: title ? title + separator + url : url,
  });
}

const WhatsappShareButton = createShareButton('whatsapp', whatsappLink, props => ({
  title: props.title,
  separator: props.separator,
}), {
  title: PropTypes.string,
  separator: PropTypes.string,
}, {
  separator: ' ',
  windowWidth: 550,
  windowHeight: 400,
});

export default WhatsappShareButton;
