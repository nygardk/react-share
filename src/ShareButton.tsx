import type React from 'react';
import cx from 'classnames';

type NetworkLink<LinkOptions> = (url: string, options: LinkOptions) => string;

type WindowPosition = 'windowCenter' | 'screenCenter';

const isPromise = (obj: unknown): obj is Promise<unknown> =>
  !!obj &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  'then' in obj &&
  typeof (obj as Promise<unknown>).then === 'function';

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
  { height, width, ...configRest }: { height: number; width: number; [key: string]: unknown },
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
        console.error(e);
      }
    }, 1000);
  }

  return shareDialog;
}

export interface Props<LinkOptions>
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   *  Takes a function that returns a Promise to be fulfilled before calling
   * `onClick`. If you do not return promise, `onClick` is called immediately.
   */
  beforeOnClick?: () => Promise<void> | void;
  children: React.ReactNode;
  className?: string;
  /** Disables click action and adds `disabled` class */
  disabled?: boolean;
  /**
   * Style when button is disabled
   * @default { opacity: 0.6 }
   */
  disabledStyle?: React.CSSProperties;
  forwardedRef?: React.Ref<HTMLButtonElement>;
  /**
   * Passes as the native `title` atribute for the `button` element.
   */
  htmlTitle?: HTMLButtonElement['title'];
  networkName: string;
  networkLink: NetworkLink<LinkOptions>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, link: string) => void;
  /**
   * Takes a function to be called after closing share dialog.
   */
  onShareWindowClose?: () => void;
  openShareDialogOnClick?: boolean;
  opts: LinkOptions;
  resetButtonStyle?: boolean;
  /**
   * URL of the shared page
   */
  url: string;
  style?: React.CSSProperties;
  windowWidth?: number;
  windowHeight?: number;
  windowPosition?: WindowPosition;
}

export default function ShareButton<LinkOptions extends Record<string, unknown>>({
  beforeOnClick,
  children,
  className,
  disabled,
  disabledStyle = { opacity: 0.6 },
  forwardedRef,
  htmlTitle,
  networkLink,
  // networkName, // TODO
  onClick,
  onShareWindowClose,
  openShareDialogOnClick = true,
  opts,
  resetButtonStyle = true,
  style,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title, // deconstructed from ...rest to prevent passing it to the button element
  url,
  windowHeight = 400,
  windowPosition = 'windowCenter',
  windowWidth = 550,
  ...rest
}: Props<LinkOptions>) {
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const link = networkLink(url, opts);

    if (disabled) {
      return;
    }

    event.preventDefault();

    if (beforeOnClick) {
      const returnVal = beforeOnClick();

      if (isPromise(returnVal)) {
        await returnVal;
      }
    }

    if (openShareDialogOnClick) {
      const windowConfig = {
        height: windowHeight,
        width: windowWidth,
        ...(windowPosition === 'windowCenter'
          ? getBoxPositionOnWindowCenter(windowWidth, windowHeight)
          : getBoxPositionOnScreenCenter(windowWidth, windowHeight)),
      };

      windowOpen(link, windowConfig, onShareWindowClose);
    }

    if (onClick) {
      onClick(event, link);
    }
  };

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
      className={newClassName}
      onClick={handleClick}
      ref={forwardedRef}
      style={newStyle}
      title={htmlTitle}
    >
      {children}
    </button>
  );
}
