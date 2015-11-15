import jsonp from 'jsonp';
import Promise from 'bluebird';
import platform from 'platform';

import { objectToGetParams } from './utils';

function jsonpPromise(url) {
  return new Promise(function promiseCallback(resolve, reject) {
    jsonp(url, function jsonpCallback(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }

      return data;
    });
  });
}

export function getFacebookShareCount(shareUrl) {
  const fql = encodeURIComponent('select like_count, share_count from ' +
    `link_stat where url = '${encodeURIComponent(shareUrl)}'`);

  const endpoint = 'https://api.facebook.com/method/fql.query' +
    `?format=json&query=${fql}`;

  return jsonpPromise(endpoint)
    .then(response => response.length && response[0].share_count
      ? response[0].share_count
      : undefined);
}

export function getTwitterShareCount(shareUrl) {
  const url = 'https://cdn.api.twitter.com/1/urls/count.json' +
    `?&url=${encodeURIComponent(shareUrl)}`;

  return jsonpPromise(url)
    .then(response => !isNaN(response.count) ? response.count : undefined);
}

export function getGooglePlusShareCount(shareUrl) {
  if (platform.name === 'IE' && parseInt(platform.version, 10) < 11) {
    /* eslint-disable no-console */
    console.error('Google plus share count is not supported in <=IE10!');
    /* eslint-enable no-console */
    return;
  }

  return new Promise(function promiseCb(resolve, reject) {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://clients6.google.com/rpc');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

    xhr.send(JSON.stringify({
      method: 'pos.plusones.get',
      id: 'p',
      params: {
        nolog: true,
        id: shareUrl,
        source: 'widget',
        userId: '@viewer',
        groupId: '@self'
      },
      jsonrpc: '2.0',
      key: 'p',
      apiVersion: 'v1'
    }));

    xhr.onload = function onSuccessResponse() {
      resolve(JSON.parse(this.responseText));
    };

    xhr.onerror = function onErrorResponse() {
      reject();
    };
  })
  .then(response => !!response
    ? response.result.metadata.globalCounts.count
    : undefined);
}

export function getLinkedinShareCount(shareUrl) {
  const url = 'https://www.linkedin.com/countserv/count/share';

  return jsonpPromise(url + objectToGetParams({
    url: shareUrl,
    format: 'jsonp'
  })).then(response => !!response ? response.count : undefined);
}

export function getPinterestShareCount(shareUrl) {
  const url = 'https://api.pinterest.com/v1/urls/count.json';

  return jsonpPromise(url + objectToGetParams({
    url: shareUrl
  })).then(response => !!response ? response.count : undefined);
}
