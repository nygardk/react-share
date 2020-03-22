import React, { Component, Ref } from 'react';
import cx from 'classnames';

type NetworkLink<LinkOptions> = (url: string, options: LinkOptions) => string;

type WindowPosition = 'windowCenter' | 'screenCenter';

/**
 * Extracted from cordova.InAppBrowser.open()
 * See [InAppBrowser docs](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/index.html#cordovainappbrowseropen) for details
 */
interface WebViewOptions {
  target?: '_blank' | '_self' | '_system';
  closebuttoncaption?: string;
  location?: 'yes' | 'no';
  hidden?: 'yes' | 'no';
  beforeload?: 'get' | 'post' | 'yes';
  clearcache?: 'yes' | 'no';
  clearsessioncache?: 'yes' | 'no';
  closebuttoncolor?: string;
  hidenavigationbuttons?: 'yes' | 'no';
  navigationbuttoncolor?: string;
  toolbar?: 'yes' | 'no';
  toolbarcolor?: string;
  lefttoright?: 'yes' | 'no';
  /* Android only */
  footer?: 'yes' | 'no';
  footercolor?: string;
  hardwareback?: 'yes' | 'no';
  hideurlbar?: 'yes' | 'no';
  zoom?: 'yes' | 'no';
  useWideViewPort?: 'yes' | 'no';
  /* iOS only */
  usewkwebview?: 'yes' | 'no';
  disallowoverscroll?: 'yes' | 'no';
  enableViewportScale?: 'yes' | 'no';
  cleardata?: 'yes' | 'no';
  toolbarposition?: 'top' | 'bottom';
  presentationstyle?: 'pagesheet' | 'formsheet' | 'fullscreen';
  transitionstyle?: 'fliphorizontal' | 'crossdissolve' | 'coververtical';
}

type InAppBrowserOptions = Omit<WebViewOptions, 'target'>;

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

function windowOpenFromWebView(
  url: string,
  webViewOptions: WebViewOptions,
  onClose?: (dialog: Window | null) => void,
) {
  const target = webViewOptions.target || '_blank';
  if (webViewOptions.target) delete webViewOptions.target;

  if (!Object.prototype.hasOwnProperty.call(window, 'cordova'))
    throw new Error('You can use webViewOptions in Cordova envirorment only');

  if (!Object.prototype.hasOwnProperty.call((window as any).cordova, 'InAppBrowser'))
    throw new Error('InAppBrowser not installed or deviceReady event not triggeted yet');

  if (onClose && target !== '_blank')
    throw new Error('onClose() can be used witin InAppBrowser only (set target: "_blank")');

  const config: InAppBrowserOptions = {
    closebuttoncaption: 'Done',
    clearcache: 'no',
    clearsessioncache: 'no',
    toolbar: 'yes',
    enableViewportScale: 'no',
    presentationstyle: 'fullscreen',
    transitionstyle: 'coververtical',
    ...webViewOptions,
  };

  const launchIntent = (window as any).cordova.InAppBrowser.open(
    url,
    target,
    (Object.keys(config) as Array<keyof InAppBrowserOptions>)
      .map(key => `${key}=${config[key]}`)
      .join(', '),
  );

  if (onClose) {
    const interval = window.setInterval(() => {
      try {
        if (launchIntent === null || launchIntent.closed) {
          onClose(launchIntent);
        }
      } catch (e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      } finally {
        window.clearInterval(interval);
      }
    }, 1000);
  }

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
   * Options to trigger InAppBrowser on cordova-based apps
   * See [Cordova docs](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/index.html#cordovainappbrowseropen)
   */
  webViewOptions?: WebViewOptions;
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

  openFromWebView = (link: string, webViewOptions: WebViewOptions) => {
    const { onShareWindowClose } = this.props;

    windowOpenFromWebView(link, webViewOptions, onShareWindowClose);
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
      webViewOptions,
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

    if (openShareDialogOnClick) {
      this.openShareDialog(link);
    } else if (webViewOptions) {
      this.openFromWebView(link, webViewOptions);
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
