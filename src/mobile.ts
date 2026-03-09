export type MobileBehavior = 'web' | 'app' | 'auto';

type LinkBehavior = 'popup' | 'navigate';
type LinkBuilder<LinkOptions> = (url: string, options: LinkOptions) => string;

type ResolvedShareStrategy<LinkOptions> = {
  linkBehavior: LinkBehavior;
  networkLink: LinkBuilder<LinkOptions>;
};

function matchesMobileUserAgent(userAgent: string) {
  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(userAgent);
}

export function isMobileShareEnvironment() {
  if (typeof navigator === 'undefined') {
    return false;
  }

  if ('userAgentData' in navigator) {
    const userAgentData = navigator.userAgentData as { mobile?: boolean };

    if (typeof userAgentData.mobile === 'boolean') {
      return userAgentData.mobile;
    }
  }

  if (matchesMobileUserAgent(navigator.userAgent)) {
    return true;
  }

  return navigator.maxTouchPoints > 1 && /Mac/i.test(navigator.platform);
}

export function resolveMobileShareStrategy<LinkOptions>(
  mobileBehavior: MobileBehavior | undefined,
  webLink: LinkBuilder<LinkOptions>,
  appLink: LinkBuilder<LinkOptions>,
): ResolvedShareStrategy<LinkOptions> {
  switch (mobileBehavior) {
    case 'app':
      return {
        linkBehavior: 'navigate',
        networkLink: appLink,
      };
    case 'auto':
      return isMobileShareEnvironment()
        ? {
            linkBehavior: 'navigate',
            networkLink: appLink,
          }
        : {
            linkBehavior: 'popup',
            networkLink: webLink,
          };
    case 'web':
    default:
      return {
        linkBehavior: 'popup',
        networkLink: webLink,
      };
  }
}
