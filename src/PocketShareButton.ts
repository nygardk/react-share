import assert from './utils/assert';
import createShareButton from './hocs/createShareButton';
import objectToGetParams from './utils/objectToGetParams';

function pocketLink(url: string, { title }: { title?: string }) {
  assert(url, 'pocket.url');

  return (
    'https://getpocket.com/save' +
    objectToGetParams({
      url,
      title,
    })
  );
}

const PocketShareButton = createShareButton<{ title?: string }>(
  'pocket',
  pocketLink,
  props => ({
    title: props.title,
  }),
  {
    windowWidth: 500,
    windowHeight: 500,
  },
);

export default PocketShareButton;
