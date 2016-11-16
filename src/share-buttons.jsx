/* eslint-disable react/no-multi-comp */
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as links from './social-media-share-links';
import { windowOpen } from './utils';

const supportedNetworks = Object.keys(links);

export default class ShareButton extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    disabledStyle: PropTypes.object,
    network: PropTypes.oneOf(supportedNetworks),
    opts: PropTypes.object,
    url: PropTypes.string.isRequired,
    style: PropTypes.object,
    windowWidth: PropTypes.number,
    windowHeight: PropTypes.number,
  };

  static defaultProps = {
    disabledStyle: {
      opacity: 0.6,
    },
  }

  onClick = (e) => {
    if (!this.props.disabled) {
      e.preventDefault();

      const windowOptions = {
        height: this.props.windowHeight,
        width: this.props.windowWidth,
      };

      windowOpen(this.link(), windowOptions);
    }
  }

  link() {
    const { url, opts, network } = this.props;
    return links[network](url, opts);
  }

  render() {
    const {
      children,
      className,
      disabled,
      disabledStyle,
      network,
      style,
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
      <div
        onClick={this.onClick}
        className={classes}
        style={{
          ...style,
          ...(disabled ? disabledStyle : {}),
        }}>
        {children}
      </div>
    );
  }
}

/* HOC to ease migration from v1 to v2.
 * To-be-removed in v2.
 */
function createShareButton(network, optsMap = () => ({}), propTypes, defaultProps = {}) {
  const CreatedButton = React.createClass({
    propTypes,

    render() {
      return (
        <ShareButton {...this.props}
          network={network}
          opts={optsMap(this.props)} />
      );
    },
  });

  CreatedButton.defaultProps = defaultProps;

  return CreatedButton;
}

export const FacebookShareButton = createShareButton('facebook', props => ({
  description: props.description,
  title: props.title,
  picture: props.picture,
  hashtag: props.hashtag,
}), {
  description: PropTypes.string,
  title: PropTypes.string,
  picture: PropTypes.string,
  hashtag: PropTypes.string,
}, {
  windowWidth: 550,
  windowHeight: 400,
});

export const TwitterShareButton = createShareButton('twitter', props => ({
  hashtags: props.hashtags,
  title: props.title,
  via: props.via,
}), {
  hashtags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  via: PropTypes.string,
}, {
  windowWidth: 550,
  windowHeight: 400,
});

export const GooglePlusShareButton = createShareButton('googlePlus',
  undefined,
  undefined,
  {
    windowWidth: 550,
    windowHeight: 400,
  }
);

export const LinkedinShareButton = createShareButton('linkedin', props => ({
  title: props.title,
  description: props.description,
}), {
  title: PropTypes.string,
  description: PropTypes.string,
}, {
  windowWidth: 750,
  windowHeight: 600,
});

export const PinterestShareButton = createShareButton('pinterest', props => ({
  media: props.media,
  description: props.description,
}), {
  media: PropTypes.string.isRequired,
  description: PropTypes.string,
}, {
  windowWidth: 1000,
  windowHeight: 730,
});

export const VKShareButton = createShareButton('vk', props => ({
  title: props.title,
  description: props.description,
}), {
  title: PropTypes.string,
  description: PropTypes.string,
}, {
  windowWidth: 660,
  windowHeight: 460,
});
