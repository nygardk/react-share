import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type TelegramShareButtonProps = Omit<ShareButtonProps<{ title?: string }>, 'title'> & {
  title?: string;
};

function telegramLink(url: string, { title }: { title?: string }) {
  assert(url, 'telegram.url');

  return (
    'https://telegram.me/share/url' +
    objectToGetParams({
      url,
      text: title,
    })
  );
}

const TelegramShareButton = forwardRef<HTMLButtonElement, TelegramShareButtonProps>(
  ({ title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="telegram"
      networkLink={telegramLink}
      opts={{ title }}
      windowHeight={400}
      windowWidth={550}
    />
  ),
);

TelegramShareButton.displayName = 'TelegramShareButton';

export default TelegramShareButton;
