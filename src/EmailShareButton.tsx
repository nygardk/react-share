import { forwardRef } from 'react';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton, { type ShareButtonProps } from './ShareButton';

type Options = {
  body?: string;
  separator?: string;
  subject?: string;
};

type EmailShareButtonProps = Omit<ShareButtonProps<Options>, 'onClick' | 'openShareDialogOnClick'> &
  Options;

function emailLink(url: string, { subject, body, separator }: Options) {
  return 'mailto:' + objectToGetParams({ subject, body: body ? body + separator + url : url });
}

const EmailShareButton = forwardRef<HTMLButtonElement, EmailShareButtonProps>(
  ({ body, separator, subject, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="email"
      networkLink={emailLink}
      onClick={(_, link: string) => {
        window.location.href = link;
      }}
      openShareDialogOnClick={false}
      opts={{
        subject,
        body,
        separator: separator || ' ',
      }}
    />
  ),
);

EmailShareButton.displayName = 'EmailShareButton';

export default EmailShareButton;
