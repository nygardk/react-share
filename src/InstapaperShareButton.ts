import assert from './utils/assert';
import createShareButton from './hocs/createShareButton';
import objectToGetParams from './utils/objectToGetParams';

function instapaperLink(
  url: string,
  { title, description }: { title?: string; description?: string },
) {
  assert(url, 'instapaper.url');

  return (
    'http://www.instapaper.com/hello2' +
    objectToGetParams({
      url,
      title,
      description,
    })
  );
}

const InstapaperShareButton = createShareButton<{ title?: string; description?: string }>(
  'instapaper',
  instapaperLink,
  props => ({
    title: props.title,
    description: props.description,
  }),
  {
    windowWidth: 500,
    windowHeight: 500,
    windowPosition: 'windowCenter',
  },
);

export default InstapaperShareButton;
