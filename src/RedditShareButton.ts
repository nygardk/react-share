import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

function redditLink(url: string, { title }: { title?: string }) {
  assert(url, 'reddit.url');

  return (
    'https://www.reddit.com/submit' +
    objectToGetParams({
      url,
      title,
    })
  );
}

const RedditShareButton = createShareButton<{ title?: string }>(
  'reddit',
  redditLink,
  props => ({
    title: props.title,
  }),
  {
    windowWidth: 660,
    windowHeight: 460,
    windowPosition: 'windowCenter',
  },
);

export default RedditShareButton;
