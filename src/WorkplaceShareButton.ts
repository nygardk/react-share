import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

function workplaceLink(url: string, { quote, hashtag }: { quote?: string; hashtag?: string }) {
  assert(url, 'workplace.url');

  return (
    'https://work.facebook.com/sharer.php' +
    objectToGetParams({
      u: url,
      quote,
      hashtag,
    })
  );
}

const WorkplaceShareButton = createShareButton<{ quote?: string; hashtag?: string }>(
  'workplace',
  workplaceLink,
  props => ({
    quote: props.quote,
    hashtag: props.hashtag,
  }),
  {
    windowWidth: 550,
    windowHeight: 400,
  },
);

export default WorkplaceShareButton;
