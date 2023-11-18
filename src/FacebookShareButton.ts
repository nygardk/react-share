import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

function facebookLink(url: string, { hashtag }: { hashtag?: string }) {
  assert(url, 'facebook.url');

  return 'https://www.facebook.com/sharer/sharer.php' + objectToGetParams({ u: url, hashtag });
}

const FacebookShareButton = createShareButton<{ hashtag?: string }>(
  'facebook',
  facebookLink,
  props => ({ hashtag: props.hashtag }),
  {
    windowWidth: 550,
    windowHeight: 400,
  },
);

export default FacebookShareButton;
