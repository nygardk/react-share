import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const isPromise = obj => !!obj
  && (typeof obj === 'object' || typeof obj === 'function')
  && typeof obj.then === 'function';

const getBoxPositionOnWindowCenter = (width, height) => ({
  left: (window.outerWidth / 2)
    + (window.screenX || window.screenLeft || 0) - (width / 2),
  top: (window.outerHeight / 2)
    + (window.screenY || window.screenTop || 0) - (height / 2),
});

const getBoxPositionOnScreenCenter = (width, height) => ({
  top: (window.screen.height - height) / 2,
  left: (window.screen.width - width) / 2,
});

function windowOpen(url, { height = 400, width = 550, ...configRest }, onClose) {
  const config = {
    height,
    width,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    centerscreen: 'yes',
    chrome: 'yes',
    ...configRest,
  };

  const shareDialog = window.open(
    url,
    '',
    Object.keys(config).map(key => `${key}=${config[key]}`).join(', '),
  );

  if (onClose) {
    const interval = window.setInterval(() => {
      try {
        if (shareDialog === null || shareDialog.closed) {
          window.clearInterval(interval);
          onClose(shareDialog);
        }
      } catch (e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      }
    }, 1000);
  }

  return shareDialog;
}

class ShareButton extends PureComponent {
  static propTypes = {
    additionalProps: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    disabledStyle: PropTypes.object,
    network: PropTypes.string.isRequired,
    networkLink: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    opts: PropTypes.object,
    openWindow: PropTypes.bool,
    url: PropTypes.string.isRequired,
    role: PropTypes.string,
    style: PropTypes.object,
    windowWidth: PropTypes.number,
    windowHeight: PropTypes.number,
    windowPosition: PropTypes.oneOf(['windowCenter', 'screenCenter']),
    beforeOnClick: PropTypes.func,
    onShareWindowClose: PropTypes.func,
    tabIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    disabledStyle: {
      opacity: 0.6,
    },
    openWindow: true,
    role: 'button',
    windowPosition: 'windowCenter',
    tabIndex: '0',
  }

  onClick = (e) => {
    const {
      disabled,
      onClick,
      openWindow,
      beforeOnClick,
    } = this.props;

    if (disabled) {
      return;
    }

    e.preventDefault();

    const link = this.link();

    const clickHandler = openWindow ? () => this.openWindow(link) : () => onClick(link);

    if (beforeOnClick) {
      const returnVal = beforeOnClick();

      if (isPromise(returnVal)) {
        returnVal.then(clickHandler);
      } else {
        clickHandler();
      }
    } else {
      clickHandler();
    }
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === 13 || e.key === ' ' || e.key === 32) {
      this.onClick(e);
    }
  }

  openWindow = (link) => {
    const {
      windowPosition,
      onShareWindowClose,
      windowWidth,
      windowHeight,
    } = this.props;

    const windowConfig = {
      height: windowHeight,
      width: windowWidth,
      ...(windowPosition === 'windowCenter'
        ? getBoxPositionOnWindowCenter(windowWidth, windowHeight)
        : getBoxPositionOnScreenCenter(windowWidth, windowHeight)
      ),
    };

    windowOpen(link, windowConfig, onShareWindowClose);
  }

  link() {
    const { url, opts, networkLink } = this.props;
    return networkLink(url, opts);
  }

  render() {
    const {
      additionalProps,
      children,
      className,
      disabled,
      disabledStyle,
      network,
      role,
      style,
      tabIndex,
    } = this.props;

    const classes = cx(
      'SocialMediaShareButton',
      `SocialMediaShareButton--${network}`,
      {
        'SocialMediaShareButton--disabled': !!disabled,
        disabled: !!disabled,
      },
      className,
    );

    return (
      <div
        aria-label={network}
        {...additionalProps}
        role={role}
        tabIndex={tabIndex}
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

function createShareButton(network, link, optsMap = () => ({}), propTypes, defaultProps = {}) {
  const CreatedButton = props => (
    <ShareButton {...props}
      network={network}
      networkLink={link}
      opts={optsMap(props)} />
  );

  CreatedButton.propTypes = propTypes;
  CreatedButton.defaultProps = defaultProps;

  return CreatedButton;
}

export default createShareButton;
