import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import objectToGetParams from './utils/objectToGetParams';
import ShareButton from './ShareButton';

type Options = {
  /** Your app's unique identifier. */
  appId: string;
  /** The URL to redirect to after a person clicks a button on the dialog.
   * Required when using URL redirection. */
  redirectUri?: string;
  /** A user ID of a recipient. Once the dialog comes up, the sender can
   * specify additional people as recipients. */
  to?: string;
};

type FacebookMessengerShareButtonProps = Omit<
  ComponentProps<typeof ShareButton<Options>>,
  'networkName' | 'networkLink' | 'opts'
> &
  Options;

function facebookMessengerLink(url: string, { appId, redirectUri, to }: Options) {
  return (
    'https://www.facebook.com/dialog/send' +
    objectToGetParams({
      link: url,
      redirect_uri: redirectUri || url,
      app_id: appId,
      to,
    })
  );
}

const FacebookMessengerShareButton = forwardRef<
  HTMLButtonElement,
  FacebookMessengerShareButtonProps
>(({ appId, redirectUri, to, ...props }, ref) => (
  <ShareButton
    {...props}
    forwardedRef={ref}
    networkName="facebookmessenger"
    networkLink={facebookMessengerLink}
    opts={{
      appId,
      redirectUri,
      to,
    }}
    windowHeight={820}
    windowWidth={1000}
  />
));

FacebookMessengerShareButton.displayName = 'FacebookMessengerShareButton';

export default FacebookMessengerShareButton;
