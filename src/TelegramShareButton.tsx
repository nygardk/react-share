import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type TelegramShareButtonProps = Omit<ShareButtonProps<{ text?: string }>, 'title'> & {
  text?: string;
};

function telegramLink(url: string, { text }: { text?: string }) {
  assert(url, 'telegram.url');

  return (
    'https://telegram.me/share/url' +
    objectToGetParams({
      url,
      text,
    })
  );
}

const TelegramShareButton = forwardRef<HTMLButtonElement, TelegramShareButtonProps>(
  ({ text, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="telegram"
      networkLink={telegramLink}
      opts={{ text }}
      windowHeight={400}
      windowWidth={550}
    />
  ),
);

TelegramShareButton.displayName = 'TelegramShareButton';

export default TelegramShareButton;
