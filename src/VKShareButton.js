import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function vkLink(url, { title, image, noParse, noVkLinks }) {
  assert(url, 'vk.url');

  return 'https://vk.com/share.php' + objectToGetParams({
    url,
    title,
    image,
    noparse: noParse ? 1 : 0,
    no_vk_links: noVkLinks ? 1 : 0,
  });
}

const VKShareButton = createShareButton('vk', vkLink, props => ({
  title: props.title,
  image: props.image,
  noParse: props.noParse,
  noVkLinks: props.noVkLinks,
}), {
  title: PropTypes.string,
  image: PropTypes.string,
  noParse: PropTypes.bool,
  noVkLinks: PropTypes.bool,
}, {
  windowWidth: 660,
  windowHeight: 460,
});

export default VKShareButton;
