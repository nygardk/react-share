import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import cx from 'classnames';

type countFetchFn = {
  url: string, callback: (shareCount: number) => void;
}

type SocialMediaShareCountProps = {
  children: (shareCount: number) => React.ReactNode;
  className?: string;
  getCount: (url: string, callback: (shareCount: number) => void);
  url: string;
};

type StateTypes  = {
  count?: number;
  isLoading: boolean;
}

class SocialMediaShareCount extends Component<SocialMediaShareCountProps, StateTypes> {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { count: 0, isLoading: false };
  }

  componentDidMount() {
    this._isMounted = true;
    this.updateCount(this.props.url);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.updateCount(this.props.url);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateCount(url: string) {
      this.setState({
        isLoading: true,
      });

      this.props.getCount(url, count => {
        if (this._isMounted) {
          this.setState({
            count,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const { count, isLoading } = this.state;

    const { children, className } = this.props;

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

/* eslint-disable react/display-name */
export default function shareCountFactory(getCount) {
  return props => <SocialMediaShareCount getCount={getCount} {...props} />;
}
/* eslint-enable react/display-name */
