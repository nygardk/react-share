/* eslint-disable react/no-multi-comp */
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as links from './social-media-share-links';
import { windowOpen } from './utils';

const supportedNetworks = Object.keys(links);

export default class ShareButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    network: PropTypes.oneOf(supportedNetworks),
    url: PropTypes.string.isRequired,
    opts: PropTypes.object,
  };

  onClick = (e) => {
    e.preventDefault();
    windowOpen(this.link());
    return false;
  }

  link() {
    const { url, opts, network } = this.props;
    return links[network](url, opts);
  }

  render() {
    const {
      className,
      network,
      ...rest,
    } = this.props;

    return (
      <div {...rest}
        onClick={this.onClick}
        url={this.link()}
        className={cx(
          'SocialMediaShareButton',
          `SocialMediaShareButton--${network}`,
          className
        )} />
    );
  }
}

/* HOC to ease migration from v1 to v2.
 * To-be-removed in v2.
 */
function createShareButton(network, optsMap = () => ({}), propTypes) {
  const component = props => (
    <ShareButton {...props} network={network} opts={optsMap(props)} />
  );

  component.propTypes = propTypes;

  return component;
}

export const FacebookShareButton = createShareButton('facebook', props => ({
  title: props.title,
}), {
  title: PropTypes.string.isRequired,
});

export const TwitterShareButton = createShareButton('twitter', props => ({
  text: props.title,
  via: props.via,
  hashtags: props.hashtags,
}), {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  via: PropTypes.string,
});

export const GooglePlusShareButton = createShareButton('googlePlus');

export const LinkedinShareButton = createShareButton('linkedin', props => ({
  title: props.title,
}), {
  title: PropTypes.string.isRequired,
});

export const PinterestShareButton = createShareButton('pinterest', props => ({
  media: props.media,
  description: props.description,
}), {
  media: PropTypes.string.isRequired,
  description: PropTypes.string,
});
