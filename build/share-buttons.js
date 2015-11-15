/* eslint-disable react/no-multi-comp */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _socialMediaShareLinks = require('./social-media-share-links');

var _utils = require('./utils');

var SocialMediaShareButton = _react2['default'].createClass({
  displayName: 'SocialMediaShareButton',

  propTypes: {
    children: _react2['default'].PropTypes.node.isRequired,
    className: _react2['default'].PropTypes.string,
    link: _react2['default'].PropTypes.node.isRequired,
    url: _react2['default'].PropTypes.string.isRequired
  },

  onClick: function onClick() {
    (0, _utils.windowOpen)(this.props.link);
  },

  render: function render() {
    var className = 'SocialMediaShareButton ' + (this.props.className || '');

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: className,
        onClick: this.onClick }),
      this.props.children
    );
  }
});

var FacebookShareButton = _react2['default'].createClass({
  displayName: 'FacebookShareButton',

  propTypes: {
    children: _react2['default'].PropTypes.node.isRequired,
    title: _react2['default'].PropTypes.string.isRequired,
    url: _react2['default'].PropTypes.string.isRequired
  },

  render: function render() {
    var _props = this.props;
    var url = _props.url;
    var title = _props.title;

    return _react2['default'].createElement(SocialMediaShareButton, _extends({
      link: (0, _socialMediaShareLinks.facebook)(url, title)
    }, this.props, {
      className: 'SocialMediaShareButton--facebook' }));
  }
});

exports.FacebookShareButton = FacebookShareButton;
var TwitterShareButton = _react2['default'].createClass({
  displayName: 'TwitterShareButton',

  propTypes: {
    children: _react2['default'].PropTypes.node.isRequired,
    title: _react2['default'].PropTypes.string.isRequired,
    url: _react2['default'].PropTypes.string.isRequired
  },

  render: function render() {
    var _props2 = this.props;
    var url = _props2.url;
    var title = _props2.title;

    return _react2['default'].createElement(SocialMediaShareButton, _extends({
      link: (0, _socialMediaShareLinks.twitter)(url, title)
    }, this.props, {
      className: 'SocialMediaShareButton--twitter' }));
  }
});

exports.TwitterShareButton = TwitterShareButton;
var GooglePlusShareButton = _react2['default'].createClass({
  displayName: 'GooglePlusShareButton',

  propTypes: {
    children: _react2['default'].PropTypes.node.isRequired,
    url: _react2['default'].PropTypes.string.isRequired
  },

  render: function render() {
    var url = this.props.url;

    return _react2['default'].createElement(SocialMediaShareButton, _extends({
      link: (0, _socialMediaShareLinks.googlePlus)(url)
    }, this.props, {
      className: 'SocialMediaShareButton--google-plus' }));
  }
});

exports.GooglePlusShareButton = GooglePlusShareButton;
var LinkedinShareButton = _react2['default'].createClass({
  displayName: 'LinkedinShareButton',

  propTypes: {
    children: _react2['default'].PropTypes.node.isRequired,
    title: _react2['default'].PropTypes.string.isRequired,
    url: _react2['default'].PropTypes.string.isRequired
  },

  render: function render() {
    var _props3 = this.props;
    var url = _props3.url;
    var title = _props3.title;

    return _react2['default'].createElement(SocialMediaShareButton, _extends({
      link: (0, _socialMediaShareLinks.linkedin)(url, title)
    }, this.props, {
      className: 'SocialMediaShareButton--linkedin' }));
  }
});

exports.LinkedinShareButton = LinkedinShareButton;
var PinterestShareButton = _react2['default'].createClass({
  displayName: 'PinterestShareButton',

  propTypes: {
    children: _react2['default'].PropTypes.node.isRequired,
    media: _react2['default'].PropTypes.string.isRequired,
    url: _react2['default'].PropTypes.string.isRequired
  },

  render: function render() {
    var _props4 = this.props;
    var url = _props4.url;
    var media = _props4.media;

    return _react2['default'].createElement(SocialMediaShareButton, _extends({
      link: (0, _socialMediaShareLinks.pinterest)(url, media)
    }, this.props, {
      className: 'SocialMediaShareButton--pinterest' }));
  }
});
exports.PinterestShareButton = PinterestShareButton;