import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class SocialMediaShareCount extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = { count: 0 };
  }

  componentDidMount() {
    this._isMounted = true;
    this.updateCount(this.props.url);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.updateCount(nextProps.url);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateCount(url) {
    if (this.props.getCount) {
      this.setState({
        isLoading: true,
      });

      this.props.getCount(url, (count) => {
        if (this._isMounted) {
          this.setState({
            count,
            isLoading: false,
          });
        }
      });
    }
  }

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
  }
}

SocialMediaShareCount.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  getCount: PropTypes.func,
  url: PropTypes.string.isRequired,
};

SocialMediaShareCount.defaultProps = {
  children: shareCount => shareCount,
};

export default function shareCountFactory(getCount) {
  return props =>
    <SocialMediaShareCount getCount={getCount} {...props} />;
}
