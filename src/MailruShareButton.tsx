import { forwardRef } from 'react';
import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

function mailruLink(
  url: string,
  { title, description, imageUrl }: { title?: string; description?: string; imageUrl?: string },
) {
  assert(url, 'mailru.url');

  return (
    'https://connect.mail.ru/share' +
    objectToGetParams({
      url,
      title,
      description,
      image_url: imageUrl,
    })
  );
}

type MailruShareButtonProps = Omit<
  ShareButtonProps<{ title?: string; description?: string; imageUrl?: string }>,
  'title'
> & {
  description?: string;
  imageUrl?: string;
  title?: string;
};

const MailruShareButton = forwardRef<HTMLButtonElement, MailruShareButtonProps>(
  ({ description, imageUrl, title, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="mailru"
      networkLink={mailruLink}
      opts={{
        title,
        description,
        imageUrl,
      }}
      windowHeight={460}
      windowWidth={660}
    />
  ),
);

MailruShareButton.displayName = 'MailruShareButton';

export default MailruShareButton;
