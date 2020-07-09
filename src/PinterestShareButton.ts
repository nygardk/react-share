import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

function pinterestLink(
  url: string,
  { media, description }: { media: string; description?: string },
) {
  assert(url, 'pinterest.url');
  assert(media, 'pinterest.media');

  return (
    'https://pinterest.com/pin/create/button/' +
    objectToGetParams({
      url,
      media,
      description,
    })
  );
}

const PinterestShareButton = createShareButton<{ media: string; description?: string }>(
  'pinterest',
  pinterestLink,
  props => ({
    media: props.media,
    description: props.description,
  }),
  {
    windowWidth: 1000,
    windowHeight: 730,
  },
);

export default PinterestShareButton;
