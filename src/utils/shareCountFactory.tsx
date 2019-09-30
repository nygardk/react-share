import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const defaultChildren = (shareCount: number) => shareCount;

type SocialMediaShareCountProps = {
  children?: (shareCount: number) => React.ReactNode;
  className?: string;
  getCount: (url: string, callback: (shareCount?: number) => void) => void;
  url: string;
};

type StateTypes = {
  count?: number;
  isLoading: boolean;
};

class SocialMediaShareCount extends Component<SocialMediaShareCountProps, StateTypes> {
  _isMounted = false;

  static propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    getCount: PropTypes.func,
    url: PropTypes.string.isRequired,
  };

  constructor(props: SocialMediaShareCountProps) {
    super(props);
    this.state = { count: 0, isLoading: false };
  }

  componentDidMount() {
    this._isMounted = true;
    this.updateCount(this.props.url);
  }

  componentDidUpdate(prevProps: SocialMediaShareCountProps) {
    if (this.props.url !== prevProps.url) {
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

    const { children = defaultChildren, className } = this.props;

    return (
      <div className={cx('SocialMediaShareCount', className)}>
        {!isLoading && children(count || 0)}
      </div>
    );
  }
}

export default function shareCountFactory(getCount: SocialMediaShareCountProps['getCount']) {
  const ShareCount = (props: Omit<SocialMediaShareCountProps, 'getCount'>) => (
    <SocialMediaShareCount getCount={getCount} {...props} />
  );

  ShareCount.displayName = `ShareCount(${getCount.name})`;

  return ShareCount;
}
