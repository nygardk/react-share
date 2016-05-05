/* eslint-disable react/no-multi-comp */
import React from 'react';

import {
  facebook,
  googlePlus,
  linkedin,
  pinterest,
  twitter
} from './social-media-share-links';
import { windowOpen } from './utils';


const SocialMediaShareButton = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string,
    link: React.PropTypes.node.isRequired,
    url: React.PropTypes.string.isRequired
  },

  onClick() {
    windowOpen(this.props.link);
  },

  render() {
    const className = `SocialMediaShareButton ${this.props.className || ''}`;

    return (
      <div {...this.props}
        className={className}
        onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }
});

export const FacebookShareButton = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node.isRequired,
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  },

  render() {
    const {
      url,
      title
    } = this.props;

    return (
      <SocialMediaShareButton
        link={facebook(url, title)}
        {...this.props}
        className={'SocialMediaShareButton--facebook' +
          ` ${this.props.className || ''}`} />
    );
  }
});

export const TwitterShareButton = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node.isRequired,
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    via: React.PropTypes.string,
    hashtags: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  render() {
    const {
      url,
      title,
      via,
      hashtags
    } = this.props;

    return (
      <SocialMediaShareButton
        link={twitter(url, title, via, hashtags)}
        {...this.props}
        className={'SocialMediaShareButton--twitter' +
          ` ${this.props.className || ''}`} />
    );
  }
});

export const GooglePlusShareButton = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node.isRequired,
    url: React.PropTypes.string.isRequired
  },

  render() {
    const {
      url
    } = this.props;

    return (
      <SocialMediaShareButton
        link={googlePlus(url)}
        {...this.props}
        className={'SocialMediaShareButton--google-plus' +
          ` ${this.props.className || ''}`} />
    );
  }
});

export const LinkedinShareButton = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node.isRequired,
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  },

  render() {
    const {
      url,
      title
    } = this.props;

    return (
      <SocialMediaShareButton
        link={linkedin(url, title)}
        {...this.props}
        className={'SocialMediaShareButton--linkedin' +
          ` ${this.props.className || ''}`} />
    );
  }
});

export const PinterestShareButton = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node.isRequired,
    media: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    description: React.PropTypes.string
  },

  render() {
    const {
      url,
      media,
      description
    } = this.props;

    return (
      <SocialMediaShareButton
        link={pinterest(url, media, description)}
        {...this.props}
        className={'SocialMediaShareButton--pinterest' +
          ` ${this.props.className || ''}`} />
    );
  }
});
