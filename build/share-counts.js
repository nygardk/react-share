'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TwitterShareCount = exports.PinterestShareCount = exports.GooglePlusShareCount = exports.LinkedinShareCount = exports.FacebookShareCount = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shareCountGetters = require('./share-count-getters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-multi-comp */


var SocialMediaShareCount = _react2.default.createClass({
  displayName: 'SocialMediaShareCount',

  propTypes: {
    children: _react2.default.PropTypes.func,
    className: _react2.default.PropTypes.string,
    getCount: _react2.default.PropTypes.func,
    url: _react2.default.PropTypes.string.isRequired
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

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, this.props, { className: className }),
      !isLoading && render(count || 0)
    );
  }
});

function shareCountFactory(getCount) {
  return function (props) {
    return _react2.default.createElement(SocialMediaShareCount, (0, _extends3.default)({ getCount: getCount }, props));
  };
}

var FacebookShareCount = exports.FacebookShareCount = shareCountFactory(_shareCountGetters.getFacebookShareCount);
var LinkedinShareCount = exports.LinkedinShareCount = shareCountFactory(_shareCountGetters.getLinkedinShareCount);
var GooglePlusShareCount = exports.GooglePlusShareCount = shareCountFactory(_shareCountGetters.getGooglePlusShareCount);
var PinterestShareCount = exports.PinterestShareCount = shareCountFactory(_shareCountGetters.getPinterestShareCount);
var TwitterShareCount = exports.TwitterShareCount = function TwitterShareCount() {
  throw new Error('TwitterShareCount was removed in version 1.3.0 because' + 'the Twitter API was shut down and there is no replacement. Please ' + 'remove it from your code.');
};