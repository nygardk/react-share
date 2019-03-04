import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function messengerLink(url, { redirectUri, appId }) {
  assert(url, 'messenger.url');

  return 'http://www.facebook.com/dialog/send' + objectToGetParams({
    app_id: appId,
    link: url,
    redirect_uri: redirectUri,
  });
}

const MessengerShareButton = createShareButton('messenger', messengerLink, props => ({
  redirectUri: props.redirectUri,
  appId: props.appId,
}), {
  redirectUri: PropTypes.string,
  appId: PropTypes.string,
}, {
  windowWidth: 660,
  windowHeight: 460,
});

export default MessengerShareButton;
