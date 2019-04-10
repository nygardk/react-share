import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function facebookMessengerLink(url, { appId, display, to, redirectUri }) {
  assert(url, 'facebookmessenger.url');

  return 'https://www.facebook.com/dialog/send' + objectToGetParams({
    link: url,
    redirect_uri: redirectUri || url,
    app_id: appId,
    to,
    display,
  });
}

const FacebookMessengerShareButton = createShareButton('facebookmessenger', facebookMessengerLink, props => ({
  appId: props.appId,
  display: props.display,
  to: props.to,
  redirectUri: props.redirectUri,
}), {
  appId: PropTypes.string.isRequired,
  display: PropTypes.string,
  to: PropTypes.string,
  redirectUri: PropTypes.string,
}, {
  windowWidth: 550,
  windowHeight: 400,
});

export default FacebookMessengerShareButton;
