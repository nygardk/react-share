import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

type Options = {
  body?: string;
  separator?: string;
};

function smsLink(url: string, { body, separator }: Options) {
  return (
    'sms:' + objectToGetParams({ body: body ? body + separator + url : url }).replace(/^\?/, '&')
  );
}

const SMSShareButton = createShareButton<Options>(
  'sms',
  smsLink,
  props => ({
    body: props.body,
    separator: props.separator || ' ',
  }),
  {
    openShareDialogOnClick: false,
    onClick: (_, link: string) => {
      console.log('SMS LINK', link);
      window.location.href = link;
    },
  },
);

export default SMSShareButton;
