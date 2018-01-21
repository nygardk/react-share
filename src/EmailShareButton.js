import PropTypes from 'prop-types';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function emailLink(url, { subject, body }) {
  return 'mailto:' + objectToGetParams({ subject, body: body || subject });
}

const EmailShareButton = createShareButton('email', emailLink, props => ({
  subject: props.subject,
  body: props.body,
}), {
  subject: PropTypes.string,
  body: PropTypes.string,
}, {
  openWindow: false,
  onClick: (link) => { window.location.href = link; },
});

export default EmailShareButton;
