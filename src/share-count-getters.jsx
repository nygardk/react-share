import jsonp from 'jsonp';
import platform from 'platform';

import { objectToGetParams } from './utils';


export function getFacebookShareCount(shareUrl, callback) {
  const endpoint = `https://graph.facebook.com/?id=${shareUrl}`;

  jsonp(endpoint, (err, data) => {
    callback(!err && data && data.share && data.share.share_count
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

export function getVKShareCount(shareUrl, callback) {
  if (!window.VK) {
    window.VK = {
      Share: {
        count: (index, count) => window.VK.callbacks[index](count),
      },
      callbacks: [],
    };
  }

  const url = 'https://vk.com/share.php';
  const index = window.VK.callbacks.length;

  window.VK.callbacks.push(callback);

  return jsonp(url + objectToGetParams({
    act: 'count',
    index,
    url: shareUrl,
  }));
}

export function getOKShareCount(shareUrl, callback) {
  if (!window.OK) {
    window.OK = {
      Share: {
        count: function count(index, _count) {
          return window.OK.callbacks[index](_count);
        },
      },
      callbacks: [],
    };
  }

  const url = 'https://connect.ok.ru/dk';
  const index = window.OK.callbacks.length;

  window.ODKL = { updateCount(a, b) {window.OK.callbacks[index](b); } };
  window.OK.callbacks.push(callback);

  return jsonp(url + (0, objectToGetParams)({
    'st.cmd': 'extLike',
    uid: 'odklcnt0',
    ref: shareUrl,
  }));
}

export function getRedditShareCount(shareUrl, callback) {
  const endpoint = `https://www.reddit.com/api/info.json?limit=1&url=${shareUrl}`;

  jsonp(endpoint, { param: 'jsonp' }, (err, response) => {
    callback(!err && response && response.data &&
      (response.data.children.length > 0) && response.data.children[0].data.score
      ? response.data.children[0].data.score
      : undefined);
  });
}

export function getTumblrShareCount(shareUrl, callback) {
  const endpoint = 'http://api.tumblr.com/v2/share/stats';

  return jsonp(endpoint + objectToGetParams({
    url: shareUrl,
  }), (err, data) => {
    callback(!!data ? data.note_count : undefined);
  });
}
