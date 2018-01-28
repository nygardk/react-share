import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function mailruLink(url, { title, description, image }) {
  assert(url, 'mailru.url');

  return 'https://connect.mail.ru/share' + objectToGetParams({
    url,
    title,
    description,
    imageurl: image,
  });
}

const MailruShareButton = createShareButton('mailru', mailruLink, props => ({
  title: props.title,
  description: props.description,
  image: props.image,
}), {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
}, {
  windowWidth: 660,
  windowHeight: 460,
});

export default MailruShareButton;
