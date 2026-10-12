import { forwardRef } from 'react';
import { type MobileBehavior, resolveMobileShareStrategy } from './mobile';
import { objectToGetParams } from './utils/objectToGetParams';
import { ShareButton, type ShareButtonProps } from './ShareButton';

type Options = {
  /** Your app's unique identifier. */
  appId: string;
  /** Best-effort mobile strategy. `app` and `auto` prefer a Messenger deep link. */
  mobileBehavior?: MobileBehavior;
  /** The URL to redirect to after a person clicks a button on the dialog.
   * Required when using URL redirection. */
  redirectUri?: string;
  /** A user ID of a recipient. Once the dialog comes up, the sender can
   * specify additional people as recipients. */
  to?: string;
};

type FacebookMessengerShareButtonProps = ShareButtonProps<Options> & Options;

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

export const buildFacebookMessengerShareUrl = facebookMessengerLink;

function facebookMessengerAppLink(url: string, { appId, redirectUri, to }: Options) {
  return (
    'fb-messenger://share' +
    objectToGetParams({
      link: url,
      redirect_uri: redirectUri || url,
      app_id: appId,
      to,
    })
  );
}

export const FacebookMessengerShareButton = forwardRef<
  HTMLButtonElement,
  FacebookMessengerShareButtonProps
>(({ appId, mobileBehavior, redirectUri, to, ...props }, ref) => {
  const { linkBehavior, networkLink } = resolveMobileShareStrategy(
    mobileBehavior,
    buildFacebookMessengerShareUrl,
    facebookMessengerAppLink,
  );

  return (
    <ShareButton
      {...props}
      forwardedRef={ref}
      linkBehavior={linkBehavior}
      networkName="facebookmessenger"
      networkLink={networkLink}
      opts={{
        appId,
        redirectUri,
        to,
      }}
      windowHeight={820}
      windowWidth={1000}
    />
  );
});

FacebookMessengerShareButton.displayName = 'FacebookMessengerShareButton';
