import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

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

const OKShareButton = createShareButton<{ title?: string; description?: string; image?: string }>(
  'ok',
  okLink,
  props => ({
    title: props.title,
    description: props.description,
    image: props.image,
  }),
  {
    windowWidth: 588,
    windowHeight: 480,
    windowPosition: 'screenCenter',
  },
);

export default OKShareButton;
