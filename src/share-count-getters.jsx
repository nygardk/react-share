import jsonp from 'jsonp';
import platform from 'platform';

import { objectToGetParams } from './utils';


export function getFacebookShareCount(shareUrl, callback) {
  const endpoint = `http://graph.facebook.com/?id=${shareUrl}`;

  jsonp(endpoint, (err, data) => {
    callback(!err && data && data.share.share_count
      ? data.share.share_count
      : undefined);
  });
}

export function getGooglePlusShareCount(shareUrl, callback) {
  if (platform.name === 'IE' && parseInt(platform.version, 10) < 11) {
    /* eslint-disable no-console */
    console.error('Google plus share count is not supported in <=IE10!');
    /* eslint-enable no-console */
    return;
  }

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
      groupId: '@self',
    },
    jsonrpc: '2.0',
    key: 'p',
    apiVersion: 'v1',
  }));

  xhr.onload = function onSuccessdata() {
    const data = JSON.parse(this.responseText);
    callback(!!data
      ? data.result.metadata.globalCounts.count
      : undefined);
  };

  xhr.onerror = function onErrordata() {};
}

export function getLinkedinShareCount(shareUrl, callback) {
  const url = 'https://www.linkedin.com/countserv/count/share';

  return jsonp(url + objectToGetParams({
    url: shareUrl,
    format: 'jsonp',
  }), (err, data) => {
    callback(!!data ? data.count : undefined);
  });
}

export function getPinterestShareCount(shareUrl, callback) {
  const url = 'https://api.pinterest.com/v1/urls/count.json';

  return jsonp(url + objectToGetParams({
    url: shareUrl,
  }), (err, data) => {
    callback(!!data ? data.count : undefined);
  });
}
