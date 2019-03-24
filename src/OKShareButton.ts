import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function okLink(
  url: string,
  { title, description, image }: { title?: string; description?: string; image?: string },
) {
  assert(url, 'ok.url');

  return (
    'https://connect.ok.ru/offer' +
    objectToGetParams({
      url,
      title,
      description,
      imageUrl: image,
    })
  );
}

const OKShareButton = createShareButton(
  'ok',
  okLink,
  props => ({
    title: props.title,
    description: props.description,
    image: props.image,
  }),
  {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  },
  {
    windowWidth: 588,
    windowHeight: 480,
    windowPosition: 'screenCenter',
  },
);

export default OKShareButton;
