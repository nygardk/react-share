/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as links from './social-media-share-links';
import { isPromise, windowOpen } from './utils';

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
    beforeOnClick: PropTypes.func,
  };

  static defaultProps = {
    disabledStyle: {
      opacity: 0.6,
    },
  }

  onClick = (e) => {
    const {
      disabled,
      windowWidth,
      windowHeight,
      beforeOnClick,
    } = this.props;

    if (!disabled) {
      e.preventDefault();

      const windowOptions = {
        height: windowHeight,
        width: windowWidth,
      };

      const windowOpenBound = () => windowOpen(this.link(), windowOptions);

      if (beforeOnClick) {
        const returnVal = beforeOnClick();

        if (isPromise(returnVal)) {
          returnVal.then(windowOpenBound);
        } else {
          windowOpenBound();
        }
      } else {
        windowOpenBound();
      }
    }
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === 13) {
      this.onClick(e);
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
        role="button"
        tabIndex="0"
        onClick={this.onClick}
        onKeyPress={this.onKeyPress}
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
  const CreatedButton = props => (
    <ShareButton {...props}
      network={network}
      opts={optsMap(props)} />
  );

  CreatedButton.propTypes = propTypes;
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

export const TelegramShareButton = createShareButton('telegram', props => ({
  title: props.title,
  via: props.via,
}), {
  title: PropTypes.string,
  via: PropTypes.string,
}, {
  windowWidth: 550,
  windowHeight: 400,
});

export const WhatsappShareButton = createShareButton('whatsapp', props => ({
  title: props.title,
  separator: props.separator,
}), {
  title: PropTypes.string,
  separator: PropTypes.string,
}, {
  separator: ' ',
  windowWidth: 550,
  windowHeight: 400,
});

export const EmailShareButton = createShareButton('email', props => ({
  subject: props.subject,
  body: props.body,
}), {
  subject: PropTypes.string,
  body: PropTypes.string,
}, {
  separator: ' ',
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
  image: props.image,
}), {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
}, {
  windowWidth: 660,
  windowHeight: 460,
});

export const OKShareButton = createShareButton('ok', props => ({
  title: props.title,
  description: props.description,
  image: props.image,
}), {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
}, {
  windowWidth: 660,
  windowHeight: 460,
});

export const RedditShareButton = createShareButton('reddit', props => ({
  title: props.title,
}), {
  title: PropTypes.string,
}, {
  windowWidth: 660,
  windowHeight: 460,
});
