import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

type Options = {
  /** Your app's unique identifier. */
  appId: string;
  /** The URL to redirect to after a person clicks a button on the dialog.
   * Required when using URL redirection. */
  redirectUri?: string;
  /** A user ID of a recipient. Once the dialog comes up, the sender can
   * specify additional people as recipients. */
  to?: string;
  /** A boolean used to choose between fb-messenger://share (Mobile)
   * and https://www.facebook.com/dialog/send (Desktop) */
  mobile?: boolean;
};

function facebookMessengerLink(url: string, { appId, redirectUri, to, mobile }: Options) {
  return (
    (mobile ? 'fb-messenger://share' : 'https://www.facebook.com/dialog/send') +
    objectToGetParams({
      link: url,
      redirect_uri: redirectUri || url,
      app_id: appId,
      to,
    })
  );
}

const FacebookMessengerShareButton = createShareButton<Options>(
  'facebookmessenger',
  facebookMessengerLink,
  props => ({
    appId: props.appId,
    redirectUri: props.redirectUri,
    to: props.to,
    mobile: props.mobile,
  }),
  {
    windowWidth: 1000,
    windowHeight: 820,
  },
);

export default FacebookMessengerShareButton;
