import React from 'react';

import icons from './icons';

export function generateIcon(network) {
  if (!icons[network.toLowerCase()]) {
    throw new Error('invalid network name for a social icon');
  }

  const iconConfig = icons[network.toLowerCase()];

  return React.createClass({
    propTypes: {
      className: React.PropTypes.string,
      round: React.PropTypes.bool,
      size: React.PropTypes.number,
      disabled: React.PropTypes.bool,
    },

    getDefaultProps() {
      return {
        size: 64,
      };
    },

    render() {
      const {
        className,
        round,
        size,
        disabled,
      } = this.props;

      const baseStyle = {
        width: size,
        height: size,
      };

      const svgStyle = {
        fill: 'white',
        width: size,
        height: size,
      };

      const classes = `social-icon social-icon--${network} ${className}`;
      const iconColor = disabled ? 'gray' : iconConfig.color;

      return (
        <div style={baseStyle}>
          <svg viewBox="0 0 64 64"
            style={svgStyle}
            className={classes}>
            <g>
              {(!round ? (
                <rect
                  width="64"
                  height="64"
                  style={{ fill: iconColor }} />
              ) : (
                <circle
                  cx="32"
                  cy="32"
                  r="31"
                  style={{ fill: iconColor }} />
              ))}
            </g>

            <g>
              <path d={iconConfig.icon} />
            </g>
          </svg>
        </div>
      );
    },
  });
}
