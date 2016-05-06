/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';

import exampleImage from './react-share-pin-example.png';

const {
  PinterestShareButton,
} = ShareButtons;

const {
  PinterestShareCount,
} = ShareCounts;

const PinterestIcon = generateShareIcon('pinterest');

const Demo = React.createClass({
  render() {
    const shareUrl = String(window.location);
    const media = `${shareUrl}/${exampleImage}`;

    return (
      <div className="Demo__container">
        <div className="Demo__some-network">
          <PinterestShareButton
            url={shareUrl}
            media={media}
            className="Demo__some-network__share-button">
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <PinterestShareCount url={shareUrl}
            className="Demo__some-network__share-count" />
        </div>
      </div>
    );
  },
});

export default Demo;
