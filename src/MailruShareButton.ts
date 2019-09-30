import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function mailruLink(
  url: string,
  { title, description, image }: { title?: string; description?: string; image?: string },
) {
  assert(url, 'mailru.url');

  return (
    'https://connect.mail.ru/share' +
    objectToGetParams({
      url,
      title,
      description,
      imageurl: image,
    })
  );
}

const MailruShareButton = createShareButton<{
  title?: string;
  description?: string;
  image?: string;
}>(
  'mailru',
  mailruLink,
  props => ({
    title: props.title,
    description: props.description,
    image: props.image,
  }),
  {
    windowWidth: 660,
    windowHeight: 460,
  },
);

export default MailruShareButton;
