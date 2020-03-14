import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

type Options = {
  body?: string;
  separator?: string;
  subject?: string;
};

function emailLink(url: string, { subject, body, separator }: Options) {
  return 'mailto:' + objectToGetParams({ subject, body: body ? body + separator + url : url });
}

const EmailShareButton = createShareButton<Options>(
  'email',
  emailLink,
  props => ({
    subject: props.subject,
    body: props.body,
    separator: props.separator || ' ',
  }),
  {
    openShareDialogOnClick: false,
    onClick: (_, link: string) => {
      window.location.href = link;
    },
  },
);

export default EmailShareButton;
