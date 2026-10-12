import { forwardRef } from 'react';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type Options = {
  body?: string;
  separator?: string;
  subject?: string;
  /** Recipient address, or several addresses. */
  to?: string | string[];
};

type EmailShareButtonProps = Omit<
  ShareButtonProps<Options>,
  'onClick' | 'openInNewTab' | 'openShareDialogOnClick'
> &
  Options;

function emailRecipients(to: Options['to']) {
  return (Array.isArray(to) ? to : [to])
    .filter(Boolean)
    .map(address => encodeURIComponent(address as string).replace(/%40/g, '@'))
    .join(',');
}

function emailLink(url: string, { subject, body, separator = '\n', to }: Options) {
  return (
    'mailto:' +
    emailRecipients(to) +
    objectToGetParams({ subject, body: body ? body + separator + url : url })
  );
}

export const buildEmailShareUrl = emailLink;

export const EmailShareButton = forwardRef<HTMLButtonElement, EmailShareButtonProps>(
  ({ body, separator, subject, to, ...props }, ref) => (
    <ShareButton
      {...props}
      forwardedRef={ref}
      networkName="email"
      networkLink={buildEmailShareUrl}
      onClick={(_, link: string) => {
        window.location.href = link;
      }}
      openShareDialogOnClick={false}
      opts={{
        subject,
        body,
        separator: separator || '\n',
        to,
      }}
    />
  ),
);

EmailShareButton.displayName = 'EmailShareButton';
