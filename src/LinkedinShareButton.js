import PropTypes from 'prop-types';

import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function linkedinLink(url, { title, description }) {
  assert(url, 'linkedin.url');

  return 'https://linkedin.com/shareArticle' + objectToGetParams({
    url,
    title,
    summary: description,
  });
}

const LinkedinShareButton = createShareButton('linkedin', linkedinLink, props => ({
  title: props.title,
  description: props.description,
}), {
  title: PropTypes.string,
  description: PropTypes.string,
}, {
  windowWidth: 750,
  windowHeight: 600,
});

export default LinkedinShareButton;
