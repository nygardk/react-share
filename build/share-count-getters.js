'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getFacebookShareCount = getFacebookShareCount;
exports.getTwitterShareCount = getTwitterShareCount;
exports.getGooglePlusShareCount = getGooglePlusShareCount;
exports.getLinkedinShareCount = getLinkedinShareCount;
exports.getPinterestShareCount = getPinterestShareCount;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jsonp = require('jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _platform = require('platform');

var _platform2 = _interopRequireDefault(_platform);

var _utils = require('./utils');

function jsonpPromise(url) {
  return new _bluebird2['default'](function promiseCallback(resolve, reject) {
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

  return jsonpPromise(endpoint).then(function (response) {
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
  if (_platform2['default'].name === 'IE' && parseInt(_platform2['default'].version, 10) < 11) {
    /* eslint-disable no-console */
    console.error('Google plus share count is not supported in <=IE10!');
    /* eslint-enable no-console */
    return;
  }

  return new _bluebird2['default'](function promiseCb(resolve, reject) {
    var xhr = new XMLHttpRequest();

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

function getPinterestShareCount(shareUrl) {
  var url = 'https://api.pinterest.com/v1/urls/count.json';

  return jsonpPromise(url + (0, _utils.objectToGetParams)({
    url: shareUrl
  })).then(function (response) {
    return !!response ? response.count : undefined;
  });
}