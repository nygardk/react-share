/* eslint-disable react/no-multi-comp */
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as links from './social-media-share-links';
import { windowOpen } from './utils';

const supportedNetworks = Object.keys(links);

export default class ShareButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    disabledStyle: PropTypes.object,
    network: PropTypes.oneOf(supportedNetworks),
    opts: PropTypes.object,
    url: PropTypes.string.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    disabledStyle: {
      opacity: 0.6,
    },
  }

  onClick = (e) => {
    if (!this.props.disabled) {
      e.preventDefault();
      windowOpen(this.link());
    }
  }

  link() {
    const { url, opts, network } = this.props;
    return links[network](url, opts);
  }

  render() {
    const {
      className,
      disabled,
      disabledStyle,
      network,
      style,
      ...rest,
    } = this.props;

    const classes = cx(
      'SocialMediaShareButton',
      `SocialMediaShareButton--${network}`,
      {
        'SocialMediaShareButton--disabled': !!disabled,
        disabled: !!disabled,
      },
      className
    );

    return (
      <div {...rest}
        onClick={this.onClick}
        url={this.link()}
        className={classes}
        style={{
          ...style,
          ...(disabled ? disabledStyle : {}),
        }} />
    );
  }
}

/* HOC to ease migration from v1 to v2.
 * To-be-removed in v2.
 */
function createShareButton(network, optsMap = () => ({}), propTypes) {
  return React.createClass({
    propTypes,

    render() {
      return (
        <ShareButton {...this.props}
          network={network}
          opts={optsMap(this.props)} />
      );
    },
  });
}

export const FacebookShareButton = createShareButton('facebook', props => ({
  title: props.title,
  quote: props.quote,
  appId: props.appId,
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

export const VKShareButton = createShareButton('vk');
