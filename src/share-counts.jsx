/* eslint-disable react/no-multi-comp */
import React from 'react';

import {
  getFacebookShareCount,
  getGooglePlusShareCount,
  getLinkedinShareCount,
  getPinterestShareCount
} from './share-count-getters';


const SocialMediaShareCount = React.createClass({
  propTypes: {
    children: React.PropTypes.func,
    className: React.PropTypes.string,
    getCount: React.PropTypes.func,
    url: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      count: 0
    };
  },

  componentDidMount() {
    if (this.props.getCount) {
      this.setState({
        isLoading: true
      });

      this.props.getCount(this.props.url).then(count => {
        if (this.isMounted()) {
          this.setState({
            count,
            isLoading: false
          });
        }
      });
    }
  },

  render() {
    const {
      count,
      isLoading
    } = this.state;

    const {
      children
    } = this.props;

    const className = `SocialMediaShareCount ${this.props.className || ''}`;

    const render = children || function renderCount(shareCount) {
      return shareCount;
    };

    return (
      <div {...this.props} className={className}>
        {!isLoading && render(count || 0)}
      </div>
    );
  }
});

function shareCountFactory(getCount) {
  return React.createClass({
    render() {
      return <SocialMediaShareCount getCount={getCount} {...this.props} />;
    }
  });
}

export const FacebookShareCount = shareCountFactory(getFacebookShareCount);
export const LinkedinShareCount = shareCountFactory(getLinkedinShareCount);
export const GooglePlusShareCount = shareCountFactory(getGooglePlusShareCount);
export const PinterestShareCount = shareCountFactory(getPinterestShareCount);
export const TwitterShareCount = () => {
  throw new Error('TwitterShareCount was removed in version 1.3.0 because' +
    'the Twitter API was shut down and there is no replacement. Please ' +
    'remove it from your code.');
};
