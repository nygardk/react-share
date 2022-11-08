import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

function facebookLink(url: string, { quote, hashtag }: { quote?: string; hashtag?: string }) {
  assert(url, 'facebook.url');

  return (
    'https://accounts.spotify.com/authorize' +
    objectToGetParams({
      u: url,
      quote,
      hashtag,
    })
  );
}

const SpotifyShareButton = createShareButton<{ quote?: string; hashtag?: string }>(
  'spotify',
  facebookLink,
  props => ({
    quote: props.quote,
    hashtag: props.hashtag,
  }),
  {
    windowWidth: 550,
    windowHeight: 400,
  },
);

export default SpotifyShareButton;
