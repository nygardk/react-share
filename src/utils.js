/*
 * This detection method identifies Internet Explorers up until version 11.
 *
 * Reference: https://msdn.microsoft.com/en-us/library/ms537503(v=vs.85).aspx
 */
export function isInternetExplorerBefore(version) {
  const iematch = (/MSIE ([0-9]+)/g.exec(window.navigator.userAgent));

  return iematch ? +iematch[1] < version : false;
}

/* eslint-disable prefer-template */
export function objectToGetParams(object) {
  return '?' + Object.keys(object)
    .filter(key => !!object[key])
    .map(key => `${key}=${encodeURIComponent(object[key])}`)
    .join('&');
}
/* eslint-enable prefer-template */

export function windowOpen(url, { name, height = 400, width = 550 }, onShareWindowClose) {
  const left = (window.outerWidth / 2)
    + (window.screenX || window.screenLeft || 0) - (width / 2);
  const top = (window.outerHeight / 2)
    + (window.screenY || window.screenTop || 0) - (height / 2);

  const config = {
    height,
    width,
    left,
    top,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    centerscreen: 'yes',
    chrome: 'yes',
  };

  const shareDialog = window.open(
    url,
    isInternetExplorerBefore(10) ? '' : name,
    Object.keys(config).map(key => `${key}=${config[key]}`).join(', ')
  );

  if (onShareWindowClose) {
    const interval = window.setInterval(() => {
      try {
        if (shareDialog === null || shareDialog.closed) {
          window.clearInterval(interval);
          onShareWindowClose(shareDialog);
        }
      } catch (e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      }
    }, 1000);
  }

  return shareDialog;
}

export const isPromise = obj =>
  !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
