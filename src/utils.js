/* eslint-disable prefer-template */
import platform from 'platform';

export function objectToGetParams(object) {
  return '?' + Object.keys(object)
    .filter(key => !!object[key])
    .map(key => `${key}=${encodeURIComponent(object[key])}`)
    .join('&');
}

export function windowOpen(url, { name, height = 400, width = 550 }, closeCallback) {
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
    platform.name === 'IE' && parseInt(platform.version, 10) < 10 ? '' : name,
    Object.keys(config).map(key => `${key}=${config[key]}`).join(', ')
  );

  if (closeCallback) {
    const interval = window.setInterval(() => {
      try {
        if (shareDialog === null || shareDialog.closed) {
          window.clearInterval(interval);
          closeCallback(shareDialog);
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }

  return shareDialog;
}

export const isPromise = obj =>
  !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
