import { forwardRef } from 'react';
import { type MobileBehavior, resolveMobileShareStrategy } from './mobile';
import { assert } from './utils/assert';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type TelegramShareButtonProps = Omit<ShareButtonProps<{ text?: string }>, 'title'> & {
  mobileBehavior?: MobileBehavior;
  text?: string;
};

function telegramLink(url: string, { text }: { text?: string }) {
  assert(url, 'telegram.url');

  return (
    'https://t.me/share/url' +
    objectToGetParams({
      url,
      text,
    })
  );
}

export const buildTelegramShareUrl = telegramLink;

function telegramAppLink(url: string, { text }: { text?: string }) {
  assert(url, 'telegram.url');

  return (
    'tg://msg_url' +
    objectToGetParams({
      url,
      text,
    })
  );
}

export const TelegramShareButton = forwardRef<HTMLButtonElement, TelegramShareButtonProps>(
  ({ mobileBehavior, text, ...props }, ref) => {
    const { linkBehavior, networkLink } = resolveMobileShareStrategy(
      mobileBehavior,
      buildTelegramShareUrl,
      telegramAppLink,
    );

    return (
      <ShareButton
        {...props}
        forwardedRef={ref}
        linkBehavior={linkBehavior}
        networkName="telegram"
        networkLink={networkLink}
        opts={{ text }}
        windowHeight={400}
        windowWidth={550}
      />
    );
  },
);

TelegramShareButton.displayName = 'TelegramShareButton';
