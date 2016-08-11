/* eslint-disable prefer-template */
import platform from 'platform';

export function objectToGetParams(object) {
  return '?' + Object.keys(object)
    .filter(key => !!object[key])
    .map(key => `${key}=${encodeURIComponent(object[key])}`)
    .join('&');
}

export function windowOpen(url, { name, height = 400, width = 550 }) {
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

  return window.open(
    url,
    platform.name === 'IE' && parseInt(platform.version, 10) < 10 ? '' : name,
    Object.keys(config).map(key => `${key}=${config[key]}`).join(', ')
  );
}
