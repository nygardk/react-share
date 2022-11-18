import assert from './utils/assert';
import createShareButton from './hocs/createShareButton';

function instagramLink(username: string) {
  assert(username, 'instagram.url');

  return `https://www.instagram.com/${username}`;
}

const InstagramShareButton = createShareButton(
  'instagram',
  instagramLink,
  props => ({
    username: props.username,
  }),
  {
    windowWidth: 550,
    windowHeight: 400,
  },
);

export default InstagramShareButton;
