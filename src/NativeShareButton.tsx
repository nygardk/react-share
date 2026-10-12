import { forwardRef } from 'react';
import type React from 'react';
import cx from 'classnames';
import { canNativeShare, shareNative, type NativeShareData } from './nativeShare';
import { getButtonBorderRadius, hasTextContent, isPromise } from './utils/buttonHelpers';

type NativeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'>;

export type NativeShareButtonProps = NativeButtonProps &
  NativeShareData & {
    beforeOnClick?: () => Promise<void> | void;
    children: React.ReactNode;
    disabled?: boolean;
    disabledStyle?: React.CSSProperties;
    htmlTitle?: HTMLButtonElement['title'];
    resetButtonStyle?: boolean;
  };

export const NativeShareButton = forwardRef<HTMLButtonElement, NativeShareButtonProps>(
  (
    {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      beforeOnClick,
      children,
      className,
      disabled,
      disabledStyle = { opacity: 0.6 },
      files,
      htmlTitle,
      onClick,
      resetButtonStyle = true,
      style,
      text,
      title,
      type = 'button',
      url,
      ...rest
    },
    ref,
  ) => {
    const buttonBorderRadius = getButtonBorderRadius(children);
    const shareData = { files, text, title, url };
    const fallbackAriaLabel =
      !ariaLabel && !ariaLabelledBy && !hasTextContent(children) ? 'Share' : undefined;
    const isUnavailable = !canNativeShare(shareData);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }

      if (beforeOnClick) {
        const returnVal = beforeOnClick();

        if (isPromise(returnVal)) {
          await returnVal;
        }
      }

      onClick?.(event);

      if (event.defaultPrevented || isUnavailable) {
        return;
      }

      try {
        await shareNative(shareData);
      } catch (error) {
        // Closing the share sheet rejects with AbortError, which is not a failure.
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          throw error;
        }
      }
    };

    const newClassName = cx(
      'react-share__NativeShareButton',
      {
        'react-share__NativeShareButton--disabled': !!disabled || isUnavailable,
        disabled: !!disabled || isUnavailable,
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
          cursor: disabled || isUnavailable ? 'not-allowed' : 'pointer',
          ...style,
          ...((disabled || isUnavailable) && disabledStyle),
        }
      : {
          ...style,
          ...((disabled || isUnavailable) && disabledStyle),
        };

    return (
      <button
        {...rest}
        aria-label={ariaLabel || fallbackAriaLabel}
        aria-labelledby={ariaLabelledBy}
        className={newClassName}
        disabled={disabled || isUnavailable}
        onClick={handleClick}
        ref={ref}
        style={newStyle}
        title={htmlTitle}
        type={type}
      >
        {children}
      </button>
    );
  },
);

NativeShareButton.displayName = 'NativeShareButton';
