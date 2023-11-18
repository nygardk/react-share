import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

interface PinterestShareProps {
  media: string;
  description?: string;
  pinId?: string;
}

function pinterestLink(url: string, { media, description, pinId }: PinterestShareProps) {
  if (pinId) {
    return `https://pinterest.com/pin/${pinId}/repin/x/`;
  }

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

const PinterestShareButton = createShareButton<PinterestShareProps>(
  'pinterest',
  pinterestLink,
  props => ({
    media: props.media,
    description: props.description,
    pinId: props.pinId,
  }),
  {
    windowWidth: 1000,
    windowHeight: 730,
  },
);

export default PinterestShareButton;
