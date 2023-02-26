import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

function twitterLink(
  url: string,
  {
    title,
    via,
    hashtags = [],
    related = [],
  }: { title?: string; via?: string; hashtags?: string[]; related?: string[] },
) {
  assert(url, 'twitter.url');
  assert(Array.isArray(hashtags), 'twitter.hashtags is not an array');
  assert(Array.isArray(related), 'twitter.related is not an array');

  return (
    'https://twitter.com/intent/tweet' +
    objectToGetParams({
      url,
      text: title,
      via,
      hashtags: hashtags.length > 0 ? hashtags.join(',') : undefined,
      related: related.length > 0 ? related.join(',') : undefined,
    })
  );
}

const TwitterShareButton = createShareButton<{
  title?: string;
  via?: string;
  hashtags?: string[];
  related?: string[];
}>(
  'twitter',
  twitterLink,
  props => ({
    hashtags: props.hashtags,
    title: props.title,
    via: props.via,
    related: props.related,
  }),
  {
    windowWidth: 550,
    windowHeight: 400,
  },
);

export default TwitterShareButton;
