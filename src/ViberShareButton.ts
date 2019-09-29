import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function viberLink(url: string, { title, separator }: { title?: string; separator?: string }) {
  assert(url, 'viber.url');
  return (
    'viber://forward' +
    objectToGetParams({
      text: title ? title + separator + url : url,
    })
  );
}

const ViberShareButton = createShareButton<{ title?: string; separator?: string }>(
  'viber',
  viberLink,
  props => ({
    title: props.title,
    separator: props.separator,
  }),
  {
    separator: ' ',
    windowWidth: 660,
    windowHeight: 460,
  },
);

export default ViberShareButton;
