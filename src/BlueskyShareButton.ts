import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

function blueskyLink(url: string, { title, separator }: { title?: string; separator?: string }) {
  assert(url, 'bluesky.url');

  return (
    'https://bsky.app/intent/compose' +
    objectToGetParams({
      text: title ? title + separator + url : url,
    })
  );
}

const BlueskyShareButton = createShareButton<{ title?: string; separator?: string }>(
  'bluesky',
  blueskyLink,
  props => ({
    title: props.title,
    separator: props.separator || ' ',
  }),
  {
    windowWidth: 660,
    windowHeight: 460,
    windowPosition: 'windowCenter',
  },
);

export default BlueskyShareButton;
