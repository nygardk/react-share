/* eslint-disable react/no-multi-comp */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shareCountGetters = require('./share-count-getters');

var SocialMediaShareCount = _react2['default'].createClass({
  displayName: 'SocialMediaShareCount',

  propTypes: {
    children: _react2['default'].PropTypes.func,
    className: _react2['default'].PropTypes.string,
    getCount: _react2['default'].PropTypes.func,
    url: _react2['default'].PropTypes.string.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      count: 0
    };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    if (this.props.getCount) {
      this.setState({
        isLoading: true
      });

      this.props.getCount(this.props.url, function (count) {
        if (_this.isMounted()) {
          _this.setState({
            count: count,
            isLoading: false
          });
        }
      });
    }
  },

  render: function render() {
    var _state = this.state;
    var count = _state.count;
    var isLoading = _state.isLoading;
    var children = this.props.children;

    var className = 'SocialMediaShareCount ' + (this.props.className || '');

    var render = children || function renderCount(shareCount) {
      return shareCount;
    };

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: className }),
      !isLoading && render(count || 0)
    );
  }
});

function shareCountFactory(getCount) {
  return _react2['default'].createClass({
    render: function render() {
      return _react2['default'].createElement(SocialMediaShareCount, _extends({ getCount: getCount }, this.props));
    }
  });
}

var FacebookShareCount = shareCountFactory(_shareCountGetters.getFacebookShareCount);
exports.FacebookShareCount = FacebookShareCount;
var LinkedinShareCount = shareCountFactory(_shareCountGetters.getLinkedinShareCount);
exports.LinkedinShareCount = LinkedinShareCount;
var GooglePlusShareCount = shareCountFactory(_shareCountGetters.getGooglePlusShareCount);
exports.GooglePlusShareCount = GooglePlusShareCount;
var PinterestShareCount = shareCountFactory(_shareCountGetters.getPinterestShareCount);
exports.PinterestShareCount = PinterestShareCount;
var TwitterShareCount = function TwitterShareCount() {
  throw new Error('TwitterShareCount was removed in version 1.3.0 because' + 'the Twitter API was shut down and there is no replacement. Please ' + 'remove it from your code.');
};
exports.TwitterShareCount = TwitterShareCount;