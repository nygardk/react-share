import PropTypes from 'prop-types';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function emailLink(url, { subject, body, separator }) {
  return 'mailto:' + objectToGetParams({ subject, body: body ? body + separator + url : url });
}

const EmailShareButton = createShareButton('email', emailLink, props => ({
  subject: props.subject,
  body: props.body,
  separator: props.separator,
}), {
  subject: PropTypes.string,
  body: PropTypes.string,
  separator: PropTypes.string,
}, {
  separator: ' ',
  openWindow: false,
  onClick: (link) => { window.location.href = link; },
});

export default EmailShareButton;
