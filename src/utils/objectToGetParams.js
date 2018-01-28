/* eslint-disable prefer-template */
export default function objectToGetParams(object) {
  return '?' + Object.keys(object)
    .filter(key => !!object[key])
    .map(key => `${key}=${encodeURIComponent(object[key])}`)
    .join('&');
}
/* eslint-enable prefer-template */
