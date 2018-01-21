import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function vkLink(url, { title, description, image }) {
  assert(url, 'vk.url');

  return 'https://vk.com/share.php' + objectToGetParams({
    url,
    title,
    description,
    image,
  });
}

const VKShareButton = createShareButton('vk', vkLink, props => ({
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

export default VKShareButton;
