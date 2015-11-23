'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getFacebookShareCount = getFacebookShareCount;
exports.getGooglePlusShareCount = getGooglePlusShareCount;
exports.getLinkedinShareCount = getLinkedinShareCount;
exports.getPinterestShareCount = getPinterestShareCount;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jsonp = require('jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _platform = require('platform');

var _platform2 = _interopRequireDefault(_platform);

var _utils = require('./utils');

function getFacebookShareCount(shareUrl, callback) {
  var fql = encodeURIComponent('select like_count, share_count from ' + ('link_stat where url = \'' + encodeURIComponent(shareUrl) + '\''));

  var endpoint = 'https://api.facebook.com/method/fql.query' + ('?format=json&query=' + fql);

  (0, _jsonp2['default'])(endpoint, function (err, data) {
    if (!err) {
      callback(data.length && data[0].share_count ? data[0].share_count : undefined);
    }
  });
}

function getGooglePlusShareCount(shareUrl, callback) {
  if (_platform2['default'].name === 'IE' && parseInt(_platform2['default'].version, 10) < 11) {
    /* eslint-disable no-console */
    console.error('Google plus share count is not supported in <=IE10!');
    /* eslint-enable no-console */
    return;
  }

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

  xhr.onload = function onSuccessdata() {
    var data = JSON.parse(this.responseText);
    callback(!!data ? data.result.metadata.globalCounts.count : undefined);
  };

  xhr.onerror = function onErrordata() {};
}

function getLinkedinShareCount(shareUrl, callback) {
  var url = 'https://www.linkedin.com/countserv/count/share';

  return (0, _jsonp2['default'])(url + (0, _utils.objectToGetParams)({
    url: shareUrl,
    format: 'jsonp'
  }), function (err, data) {
    callback(!!data ? data.count : undefined);
  });
}

function getPinterestShareCount(shareUrl, callback) {
  var url = 'https://api.pinterest.com/v1/urls/count.json';

  return (0, _jsonp2['default'])(url + (0, _utils.objectToGetParams)({
    url: shareUrl
  }), function (err, data) {
    callback(!!data ? data.count : undefined);
  });
}