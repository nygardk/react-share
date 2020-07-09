import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

function mailruLink(
  url: string,
  { title, description, imageUrl }: { title?: string; description?: string; imageUrl?: string },
) {
  assert(url, 'mailru.url');

  return (
    'https://connect.mail.ru/share' +
    objectToGetParams({
      url,
      title,
      description,
      image_url: imageUrl,
    })
  );
}

const MailruShareButton = createShareButton<{
  title?: string;
  description?: string;
  imageUrl?: string;
}>(
  'mailru',
  mailruLink,
  props => ({
    title: props.title,
    description: props.description,
    imageUrl: props.imageUrl,
  }),
  {
    windowWidth: 660,
    windowHeight: 460,
  },
);

export default MailruShareButton;
