import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function twitterLink(
  url: string,
  { title, via, hashtags = [] }: { title?: string; via?: string; hashtags?: string[] },
) {
  assert(url, 'twitter.url');
  assert(Array.isArray(hashtags), 'twitter.hashtags is not an array');

  return (
    'https://twitter.com/share' +
    objectToGetParams({
      url,
      text: title,
      via,
      hashtags: hashtags.join(','),
    })
  );
}

const TwitterShareButton = createShareButton<{ title?: string; via?: string; hashtags?: string[] }>(
  'twitter',
  twitterLink,
  props => ({
    hashtags: props.hashtags,
    title: props.title,
    via: props.via,
  }),
  {
    windowWidth: 550,
    windowHeight: 400,
  },
);

export default TwitterShareButton;
