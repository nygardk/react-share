/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';

import exampleImage from './react-share-pin-example.png';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');

const Demo = React.createClass({
  render() {
    const shareUrl = 'http://github.com';
    const title = 'GitHub';

    return (
      <div className="Demo__container">
        <div className="Demo__some-network">
          <FacebookShareButton
            url={shareUrl}
            title={title}
            picture={`${String(window.location)}/${exampleImage}`}
            className="Demo__some-network__share-button">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>

          <FacebookShareCount
            url={shareUrl}
            className="Demo__some-network__share-count">
            {count => count}
          </FacebookShareCount>
        </div>

        <div className="Demo__some-network">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>

          <div className="Demo__some-network__share-count">
            &nbsp;
          </div>
        </div>

        <div className="Demo__some-network">
          <GooglePlusShareButton
            url={shareUrl}
            className="Demo__some-network__share-button">
            <GooglePlusIcon
              size={32}
              round />
          </GooglePlusShareButton>

          <GooglePlusShareCount
            url={shareUrl}
            className="Demo__some-network__share-count">
            {count => count}
          </GooglePlusShareCount>
        </div>

        <div className="Demo__some-network">
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            windowWidth={750}
            windowHeight={600}
            className="Demo__some-network__share-button">
            <LinkedinIcon
              size={32}
              round />
          </LinkedinShareButton>

          <LinkedinShareCount
            url={shareUrl}
            className="Demo__some-network__share-count">
            {count => count}
          </LinkedinShareCount>
        </div>

        <div className="Demo__some-network">
          <PinterestShareButton
            url={String(window.location)}
            media={`${String(window.location)}/${exampleImage}`}
            windowWidth={1000}
            windowHeight={730}
            className="Demo__some-network__share-button">
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <PinterestShareCount url={String(window.location)}
            className="Demo__some-network__share-count" />
        </div>

        <div className="Demo__some-network">
          <VKShareButton
            url={shareUrl}
            image={`${String(window.location)}/${exampleImage}`}
            windowWidth={660}
            windowHeight={460}
            className="Demo__some-network__share-button">
            <VKIcon
              size={32}
              round />
          </VKShareButton>

          <VKShareCount url={String(window.location)}
            className="Demo__some-network__share-count" />
        </div>
      </div>
    );
  },
});

export default Demo;
