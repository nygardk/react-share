/* eslint-disable react/no-multi-comp */
import React from 'react';
import cx from 'classnames';

import {
  getFacebookShareCount,
  getGooglePlusShareCount,
  getLinkedinShareCount,
  getPinterestShareCount,
  getVKShareCount,
} from './share-count-getters';

const SocialMediaShareCount = React.createClass({
  propTypes: {
    children: React.PropTypes.func,
    className: React.PropTypes.string,
    getCount: React.PropTypes.func,
    url: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      count: 0,
    };
  },

  componentDidMount() {
    this.updateCount(this.props.url);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.updateCount(nextProps.url);
    }
  },

  updateCount(url) {
    if (this.props.getCount) {
      this.setState({
        isLoading: true,
      });

      this.props.getCount(url, count => {
        if (this.isMounted()) {
          this.setState({
            count,
            isLoading: false,
          });
        }
      });
    }
  },

  render() {
    const {
      count,
      isLoading,
    } = this.state;

    const {
      children,
      className,
    } = this.props;

    return (
      <div className={cx('SocialMediaShareCount', className)}>
        {!isLoading && children(count || 0)}
      </div>
    );
  },
});

SocialMediaShareCount.defaultProps = {
  children: shareCount => shareCount,
};

function shareCountFactory(getCount) {
  return props =>
    <SocialMediaShareCount getCount={getCount} {...props} />;
}

export const FacebookShareCount = shareCountFactory(getFacebookShareCount);
export const LinkedinShareCount = shareCountFactory(getLinkedinShareCount);
export const GooglePlusShareCount = shareCountFactory(getGooglePlusShareCount);
export const PinterestShareCount = shareCountFactory(getPinterestShareCount);
export const VKShareCount = shareCountFactory(getVKShareCount);
export const TwitterShareCount = () => {
  throw new Error('TwitterShareCount was removed in version 1.3.0 because' +
    'the Twitter API was shut down and there is no replacement. Please ' +
    'remove it from your code.');
};
