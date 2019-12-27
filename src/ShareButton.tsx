import React, { useMemo } from 'react';
import cx from 'classnames';

type NetworkLink<LinkOptions> = (url: string, options: LinkOptions) => string;

type WindowPosition = 'windowCenter' | 'screenCenter';

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

interface CustomProps<LinkOptions> {
  children?: React.ReactNode;
  className?: string;
  /** Disables click action and adds `disabled` class */
  disabled?: boolean;
  /**
   * Style when button is disabled
   * @default { opacity: 0.6 }
   */
  disabledStyle?: React.CSSProperties;
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
}

export type Props<LinkOptions> = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof CustomProps<LinkOptions>
> &
  CustomProps<LinkOptions>;

function ShareButton<LinkOptions>({
  beforeOnClick,
  children,
  className,
  disabled,
  disabledStyle = { opacity: 0.6 },
  networkLink,
  networkName,
  onClick,
  onShareWindowClose,
  openShareDialogOnClick = true,
  opts,
  resetButtonStyle = true,
  style,
  url,
  windowHeight = 400,
  windowPosition = 'windowCenter',
  windowWidth = 550,
  ...rest
}: Props<LinkOptions>) {
  const link = networkLink(url, opts);

  const openShareDialog = (link: string) => {
    const windowConfig = {
      height: windowHeight,
      width: windowWidth,
      ...(windowPosition === 'windowCenter'
        ? getBoxPositionOnWindowCenter(windowWidth, windowHeight)
        : getBoxPositionOnScreenCenter(windowWidth, windowHeight)),
    };

    windowOpen(link, windowConfig, onShareWindowClose);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      openShareDialog(link);
    }

    if (onClick) {
      onClick(e, link);
    }
  };

  const newStyle = useMemo(
    () =>
      resetButtonStyle
        ? {
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            font: 'inherit',
            color: 'inherit',
            mozAppearance: 'none',
            webkitAppearance: 'none',
            cursor: 'pointer',
            ...style,
            ...(disabled && disabledStyle),
          }
        : {
            ...style,
            ...(disabled && disabledStyle),
          },
    [disabled, disabledStyle, resetButtonStyle, style],
  );

  const newClassName = cx(
    'SocialMediaShareButton',
    {
      'SocialMediaShareButton--disabled': !!disabled,
      disabled: !!disabled,
    },
    className,
  );

  return (
    <button
      {...rest}
      aria-label={rest['aria-label'] || networkName}
      className={newClassName}
      onClick={(handleClick as unknown) as (e: React.MouseEvent<HTMLButtonElement>) => void}
      style={newStyle}
    >
      {children}
    </button>
  );
}

export default ShareButton;
