'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getFacebookShareCount = getFacebookShareCount;
exports.getTwitterShareCount = getTwitterShareCount;
exports.getGooglePlusShareCount = getGooglePlusShareCount;
exports.getLinkedinShareCount = getLinkedinShareCount;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jsonp = require('jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _utils = require('./utils');

function jsonpPromise(url) {
  return new Promise(function promiseCallback(resolve, reject) {
    (0, _jsonp2['default'])(url, function jsonpCallback(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }

      return data;
    });
  });
}

function getFacebookShareCount(shareUrl) {
  var fql = encodeURIComponent('select like_count, share_count from ' + ('link_stat where url = \'' + encodeURIComponent(shareUrl) + '\''));

  var endpoint = 'https://api.facebook.com/method/fql.query' + ('?format=json&query=' + fql);

  return fetch(endpoint).then(function (response) {
    return response.json();
  }).then(function (response) {
    return response.length && response[0].share_count ? response[0].share_count : undefined;
  });
}

function getTwitterShareCount(shareUrl) {
  var url = 'https://cdn.api.twitter.com/1/urls/count.json' + ('?&url=' + encodeURIComponent(shareUrl));

  return jsonpPromise(url).then(function (response) {
    return !isNaN(response.count) ? response.count : undefined;
  });
}

function getGooglePlusShareCount(shareUrl) {
  return fetch('https://clients6.google.com/rpc', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
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
    })
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    return !!response ? response.result.metadata.globalCounts.count : undefined;
  });
}

function getLinkedinShareCount(shareUrl) {
  var url = 'https://www.linkedin.com/countserv/count/share';

  return jsonpPromise(url + (0, _utils.objectToGetParams)({
    url: shareUrl,
    format: 'jsonp'
  })).then(function (response) {
    return !!response ? response.count : undefined;
  });
}

// TODO
// export function getPinterestShareCount(shareUrl) {
//   const url = 'https://api.pinterest.com/v1/urls/count.json';

//   return jsonpPromise(url + objectToGetParams({
//     url: shareUrl
//   })).then(response => !!response ? response.count : undefined);
// }