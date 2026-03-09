import type React from 'react';
import cx from 'classnames';
import { openShareWindow, type LinkBehavior, type WindowPosition } from './shareWindow';
import { getButtonBorderRadius, hasTextContent, isPromise } from './utils/buttonHelpers';

type NetworkLink<LinkOptions> = (url: string, options: LinkOptions) => string;

type NativeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

const DEFAULT_ARIA_LABELS = {
  bluesky: 'Share on Bluesky',
  email: 'Share by email',
  facebook: 'Share on Facebook',
  facebookmessenger: 'Share in Messenger',
  gab: 'Share on Gab',
  hatena: 'Share on Hatena',
  instapaper: 'Save to Instapaper',
  line: 'Share on Line',
  linkedin: 'Share on LinkedIn',
  livejournal: 'Share on LiveJournal',
  mailru: 'Share on Mail.ru',
  ok: 'Share on OK',
  pinterest: 'Pin on Pinterest',
  pocket: 'Save to Pocket',
  reddit: 'Share on Reddit',
  telegram: 'Share on Telegram',
  threads: 'Share on Threads',
  tumblr: 'Share on Tumblr',
  twitter: 'Share on X',
  viber: 'Share on Viber',
  vk: 'Share on VK',
  weibo: 'Share on Weibo',
  whatsapp: 'Share on WhatsApp',
  workplace: 'Share on Workplace',
} as const;

export interface Props<LinkOptions> extends NativeButtonProps {
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
   * Passes as the native `title` attribute for the `button` element.
   * This uses `htmlTitle` instead of `title` so it does not collide with
   * share payload props exposed by the button components.
   */
  htmlTitle?: HTMLButtonElement['title'];
  linkBehavior?: LinkBehavior;
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

export type ShareButtonProps<LinkOptions extends Record<string, unknown>> = Omit<
  Props<LinkOptions>,
  'forwardedRef' | 'linkBehavior' | 'networkLink' | 'networkName' | 'opts'
>;

export function ShareButton<LinkOptions extends Record<string, unknown>>({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  beforeOnClick,
  children,
  className,
  disabled,
  disabledStyle = { opacity: 0.6 },
  forwardedRef,
  htmlTitle,
  linkBehavior = 'popup',
  networkLink,
  networkName, // deconstructed from ...rest to prevent passing it to the button element
  onClick,
  onShareWindowClose,
  openShareDialogOnClick = true,
  opts,
  resetButtonStyle = true,
  style,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title, // deconstructed from ...rest to prevent passing it to the button element
  type = 'button',
  url,
  windowHeight = 400,
  windowPosition = 'windowCenter',
  windowWidth = 550,
  ...rest
}: Props<LinkOptions>) {
  const buttonBorderRadius = getButtonBorderRadius(children);
  const fallbackAriaLabel =
    !ariaLabel && !ariaLabelledBy && !hasTextContent(children)
      ? DEFAULT_ARIA_LABELS[networkName as keyof typeof DEFAULT_ARIA_LABELS]
      : undefined;

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }

    const link = networkLink(url, opts);

    event.preventDefault();

    if (beforeOnClick) {
      const returnVal = beforeOnClick();

      if (isPromise(returnVal)) {
        await returnVal;
      }
    }

    if (openShareDialogOnClick && linkBehavior === 'popup') {
      openShareWindow(link, {
        height: windowHeight,
        onClose: onShareWindowClose,
        position: windowPosition,
        width: windowWidth,
      });
    }

    if (openShareDialogOnClick && linkBehavior === 'navigate') {
      window.location.href = link;
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
        display: 'inline-flex',
        borderRadius: buttonBorderRadius,
        outlineOffset: 2,
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
      aria-label={ariaLabel || fallbackAriaLabel}
      aria-labelledby={ariaLabelledBy}
      className={newClassName}
      disabled={disabled}
      onClick={handleClick}
      ref={forwardedRef}
      style={newStyle}
      title={htmlTitle}
      type={type}
    >
      {children}
    </button>
  );
}
