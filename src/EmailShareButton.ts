import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './utils/createShareButton';

function emailLink(
  url: string,
  { subject, body, separator }: { subject?: string; body?: string; separator?: string },
) {
  return 'mailto:' + objectToGetParams({ subject, body: body ? body + separator + url : url });
}

const EmailShareButton = createShareButton<{ subject?: string; body?: string; separator?: string }>(
  'email',
  emailLink,
  props => ({
    subject: props.subject,
    body: props.body,
    separator: props.separator,
  }),
  {
    separator: ' ',
    openWindow: false,
    onClick: (link: string) => {
      window.location.href = link;
    },
  },
);

export default EmailShareButton;
