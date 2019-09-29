import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent, ReactNode, WeakValidationMap } from 'react';

const isPromise = (obj: any | Promise<any>) =>
  !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';

const getBoxPositionOnWindowCenter = (width: number, height: number) => ({
  left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
  top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2,
});

const getBoxPositionOnScreenCenter = (width: number, height: number) => ({
  top: (window.screen.height - height) / 2,
  left: (window.screen.width - width) / 2,
});

function windowOpen(
  url: string,
  { height = 400, width = 550, ...configRest },
  onClose?: (dialog: Window | null) => void,
) {
  const config: { [key: string]: string | number } = {
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
    Object.keys(config)
      .map(key => `${key}=${config[key]}`)
      .join(', '),
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

export interface CommonShareButtonProps {
  /**
   * An object to pass any additional properties, such as `aria-*` attributes.
   */
  additionalProps?: React.HTMLAttributes<HTMLDivElement>;
  children?: ReactNode;
  className?: string;
  /** Disables click action and adds `disabled` class */
  disabled?: boolean;
  /**
   * Style when button is disabled
   * @default { opacity: 0.6 }
   */
  disabledStyle?: React.StyleHTMLAttributes<HTMLDivElement>;
  network: string;
  networkLink: (url: string, options: { [key: string]: string | undefined }) => string;
  onClick?: (link: string, event: React.MouseEvent<HTMLElement>) => void;
  opts?: { [key: string]: string | undefined };
  openWindow?: boolean;
  /** aria role */
  role?: string;
  /**
   * URL of the shared page
   */
  url: string;
  style?: React.StyleHTMLAttributes<HTMLDivElement>;
  windowWidth: number;
  windowHeight: number;
  windowPosition: 'windowCenter' | 'screenCenter';
  /**
   *  Takes a function that returns a Promise to be fulfilled before calling
   * `onClick`. If you do not return promise, `onClick` is called immediately.
   */
  beforeOnClick?: () => Promise<void>;
  /**
   * Takes a function to be called after closing share dialog.
   */
  onShareWindowClose?: () => void;
  tabIndex?: number;
}

class ShareButton extends PureComponent<CommonShareButtonProps> {
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
    windowWidth: PropTypes.number.isRequired,
    windowHeight: PropTypes.number.isRequired,
    windowPosition: PropTypes.oneOf(['windowCenter', 'screenCenter']).isRequired,
    beforeOnClick: PropTypes.func,
    onShareWindowClose: PropTypes.func,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    disabledStyle: {
      opacity: 0.6,
    },
    openWindow: true,
    role: 'button',
    windowPosition: 'windowCenter',
    tabIndex: 0,
  };

  onClick = (e: React.MouseEvent<HTMLElement>) => {
    const { disabled, onClick, openWindow, beforeOnClick } = this.props;

    if (disabled) {
      return;
    }

    e.preventDefault();

    const link = this.link();

    const clickHandler = openWindow
      ? () => this.openWindow(link)
      : () => onClick && onClick(link, e);

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
  };

  onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === '13' || e.key === ' ' || e.key === '32') {
      // TODO: get rid of this hack -> refactor props.onClick to props.onOpen
      this.onClick((e as unknown) as React.MouseEvent<HTMLElement>);
    }
  };

  openWindow = (link: string) => {
    const { windowPosition, onShareWindowClose, windowWidth, windowHeight } = this.props;

    const windowConfig = {
      height: windowHeight,
      width: windowWidth,
      ...(windowPosition === 'windowCenter'
        ? getBoxPositionOnWindowCenter(windowWidth, windowHeight)
        : getBoxPositionOnScreenCenter(windowWidth, windowHeight)),
    };

    windowOpen(link, windowConfig, onShareWindowClose);
  };

  link() {
    const { url, opts = {}, networkLink } = this.props;
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
        }}
      >
        {children}
      </div>
    );
  }
}

export interface HiddenShareButtonProps {
  networkLink: string;
  opts: { [key: string]: string | undefined };
}

function createShareButton<OptionProps = any, MappedOptions = {}>(
  network: string,
  link: (url: string, options: MappedOptions) => string,
  optsMap: (props: CommonShareButtonProps & OptionProps) => MappedOptions,
  propTypes: WeakValidationMap<CommonShareButtonProps & OptionProps>,
  defaultProps = {},
) {
  const CreatedButton: React.SFC<CommonShareButtonProps & OptionProps> = props => (
    <ShareButton {...props} network={network} networkLink={link} opts={optsMap(props)} />
  );

  CreatedButton.propTypes = propTypes;
  CreatedButton.defaultProps = defaultProps;

  return CreatedButton;
}

export default createShareButton;
