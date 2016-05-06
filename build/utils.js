'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.objectToGetParams = objectToGetParams;
exports.windowOpen = windowOpen;

var _platform = require('platform');

var _platform2 = _interopRequireDefault(_platform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function objectToGetParams(object) {
  return '?' + (0, _keys2.default)(object).filter(function (key) {
    return !!object[key];
  }).map(function (key) {
    return key + '=' + encodeURIComponent(object[key]);
  }).join('&');
} /* eslint-disable prefer-template */


function windowOpen(url, name) {
  var height = arguments.length <= 2 || arguments[2] === undefined ? 400 : arguments[2];
  var width = arguments.length <= 3 || arguments[3] === undefined ? 550 : arguments[3];

  var left = window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2;
  var top = window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2;

  var config = {
    height: height,
    width: width,
    left: left,
    top: top,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    centerscreen: 'yes',
    chrome: 'yes'
  };

  return window.open(url, _platform2.default.name === 'IE' && parseInt(_platform2.default.version, 10) < 10 ? '' : name, (0, _keys2.default)(config).map(function (key) {
    return key + '=' + config[key];
  }).join(', '));
}