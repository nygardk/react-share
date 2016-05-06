'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateIcon = generateIcon;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateIcon(network) {
  if (!_icons2.default[network.toLowerCase()]) {
    throw new Error('invalid network name for a social icon');
  }

  var iconConfig = _icons2.default[network.toLowerCase()];

  return _react2.default.createClass({
    propTypes: {
      className: _react2.default.PropTypes.string,
      round: _react2.default.PropTypes.bool,
      size: _react2.default.PropTypes.number
    },

    getDefaultProps: function getDefaultProps() {
      return {
        size: 64
      };
    },
    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var round = _props.round;
      var size = _props.size;


      var baseStyle = {
        display: 'inline-block',
        width: size,
        height: size
      };

      var svgStyle = {
        fill: 'white',
        width: size,
        height: size
      };

      var classes = 'social-icon social-icon--' + network + ' ' + className;

      return _react2.default.createElement(
        'div',
        { style: baseStyle },
        _react2.default.createElement(
          'svg',
          { viewBox: '0 0 64 64',
            style: svgStyle,
            className: classes },
          _react2.default.createElement(
            'g',
            null,
            !round ? _react2.default.createElement('rect', {
              width: '64',
              height: '64',
              style: { fill: iconConfig.color } }) : _react2.default.createElement('circle', {
              cx: '32',
              cy: '32',
              r: '31',
              style: { fill: iconConfig.color } })
          ),
          _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: iconConfig.icon })
          )
        )
      );
    }
  });
}