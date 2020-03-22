import React, { Component, Ref } from 'react';
import cx from 'classnames';

type NetworkLink<LinkOptions> = (url: string, options: LinkOptions) => string;

type WindowPosition = 'windowCenter' | 'screenCenter';

/**
 * Options from cordova.InAppBrowser.open()
 * See [InAppBrowser docs](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/index.html#cordovainappbrowseropen) for details
 */
interface CordovaOptions {
  target: string;
  [key: string]: string;
}

type InAppBrowserOptions = Omit<CordovaOptions, 'target'>;

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
  { height, width, ...configRest }: { height: number; width: number; [key: string]: any },
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

function windowOpenFromWebView(url: string, cordovaOptions: CordovaOptions, onClose?: () => void) {
  const { target } = cordovaOptions;
  delete cordovaOptions.target;

  /* eslint-disable no-console */
  if (!Object.prototype.hasOwnProperty.call(window, 'cordova')) {
    console.error('You can use cordovaOptions only in Cordova environment');
    return;
  }
  if (!Object.prototype.hasOwnProperty.call((window as any).cordova, 'InAppBrowser')) {
    console.error('InAppBrowser not installed or deviceReady event not yet triggered');
    return;
  }
  if (onClose && target !== '_blank')
    console.error('onClose() can only be used within InAppBrowser (set target: "_blank")');
  /* eslint-enable no-console */

  // Suggested non-default optimizations
  const config: InAppBrowserOptions = {
    clearcache: 'no',
    clearsessioncache: 'no',
    toolbar: 'no',
    hideurlbar: 'yes',
    zoom: 'no',
    ...cordovaOptions,
  };

  const launchIntent = (window as any).cordova.InAppBrowser.open(
    url,
    target,
    (Object.keys(config) as Array<keyof InAppBrowserOptions>)
      .map(key => `${key}=${config[key]}`)
      .join(', '),
  );

  if (onClose && target == '_blank') launchIntent.addEventListener('exit', onClose);

  return launchIntent;
}

interface CustomProps<LinkOptions> {
  children: React.ReactNode;
  className?: string;
  /** Disables click action and adds `disabled` class */
  disabled?: boolean;
  /**
   * Style when button is disabled
   * @default { opacity: 0.6 }
   */
  disabledStyle?: React.CSSProperties;
  forwardedRef?: Ref<HTMLButtonElement>;
  networkName: string;
  networkLink: NetworkLink<LinkOptions>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, link: string) => void;
  openShareDialogOnClick?: boolean;
  opts: LinkOptions;
  /**
   * URL of the shared page
   */
  url: string;
  style?: React.CSSProperties;
  windowWidth?: number;
  windowHeight?: number;
  windowPosition?: WindowPosition;
  /**
   *  Takes a function that returns a Promise to be fulfilled before calling
   * `onClick`. If you do not return promise, `onClick` is called immediately.
   */
  beforeOnClick?: () => Promise<void>;
  /**
   * Takes a function to be called after closing share dialog.
   */
  onShareWindowClose?: () => void;
  resetButtonStyle?: boolean;
  /**
   * Options to trigger InAppBrowser plugin on cordova apps
   * See [Cordova docs](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/index.html#cordovainappbrowseropen)
   */
  cordovaOptions?: CordovaOptions;
}

export type Props<LinkOptions> = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof CustomProps<LinkOptions>
> &
  CustomProps<LinkOptions>;

export default class ShareButton<LinkOptions> extends Component<Props<LinkOptions>> {
  static defaultProps = {
    disabledStyle: { opacity: 0.6 },
    openShareDialogOnClick: true,
    resetButtonStyle: true,
  };

  openShareDialog = (link: string) => {
    const {
      onShareWindowClose,
      windowHeight = 400,
      windowPosition = 'windowCenter',
      windowWidth = 550,
    } = this.props;

    const windowConfig = {
      height: windowHeight,
      width: windowWidth,
      ...(windowPosition === 'windowCenter'
        ? getBoxPositionOnWindowCenter(windowWidth, windowHeight)
        : getBoxPositionOnScreenCenter(windowWidth, windowHeight)),
    };

    windowOpen(link, windowConfig, onShareWindowClose);
  };

  openFromWebView = (link: string, cordovaOptions: CordovaOptions) => {
    const { onShareWindowClose } = this.props;
    windowOpenFromWebView(link, cordovaOptions, onShareWindowClose);
  };

  handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      beforeOnClick,
      disabled,
      networkLink,
      onClick,
      url,
      openShareDialogOnClick,
      opts,
      cordovaOptions,
    } = this.props;

    const link = networkLink(url, opts);

    if (disabled) {
      return;
    }

    e.preventDefault();

    if (beforeOnClick) {
      const returnVal = beforeOnClick();

      if (isPromise(returnVal)) {
        await returnVal;
      }
    }

    if (cordovaOptions) {
      this.openFromWebView(link, cordovaOptions);
    } else if (openShareDialogOnClick) {
      this.openShareDialog(link);
    }

    if (onClick) {
      onClick(e, link);
    }
  };

  render() {
    const {
      beforeOnClick,
      children,
      className,
      disabled,
      disabledStyle,
      forwardedRef,
      networkLink,
      networkName,
      onShareWindowClose,
      openShareDialogOnClick,
      opts,
      resetButtonStyle,
      style,
      url,
      windowHeight,
      windowPosition,
      windowWidth,
      ...rest
    } = this.props;

    const newClassName = cx(
      'react-share__ShareButton',
      {
        'react-share__ShareButton--disabled': !!disabled,
        disabled: !!disabled,
      },
      className,
    );

    const newStyle = resetButtonStyle
      ? {
          backgroundColor: 'transparent',
          border: 'none',
          padding: 0,
          font: 'inherit',
          color: 'inherit',
          cursor: 'pointer',
          ...style,
          ...(disabled && disabledStyle),
        }
      : {
          ...style,
          ...(disabled && disabledStyle),
        };

    return (
      <button
        {...rest}
        aria-label={rest['aria-label'] || networkName}
        className={newClassName}
        onClick={this.handleClick}
        ref={forwardedRef}
        style={newStyle}
      >
        {children}
      </button>
    );
  }
}
