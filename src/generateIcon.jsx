import React from 'react';
import PropTypes from 'prop-types';

import icons from './icons';

export function generateIcon(network) {
  if (!icons[network.toLowerCase()]) {
    throw new Error('invalid network name for a social icon');
  }

  const iconConfig = icons[network.toLowerCase()];

  const Icon = (props) => {
    const {
      className,
      iconBgStyle,
      logoFillColor,
      round,
      size,
    } = props;

    const baseStyle = {
      width: size,
      height: size,
    };

    const classes = `social-icon social-icon--${network} ${className}`;

    const finalIconBgStyle = {
      ...iconBgStyle,
    };

    return (
      <div style={baseStyle}>
        <svg
          viewBox="0 0 64 64"
          fill={logoFillColor}
          width={size}
          height={size}
          className={classes}>
          <g>
            {(!round ? (
              <rect
                width="64"
                height="64"
                fill={iconConfig.color}
                style={finalIconBgStyle} />
            ) : (
              <circle
                cx="32"
                cy="32"
                r="31"
                fill={iconConfig.color}
                style={finalIconBgStyle} />
            ))}
          </g>

          <g>
            <path d={iconConfig.icon} />
          </g>
        </svg>
      </div>
    );
  };

  Icon.propTypes = {
    className: PropTypes.string,
    iconBgStyle: PropTypes.object,
    logoFillColor: PropTypes.string,
    round: PropTypes.bool,
    size: PropTypes.number,
  };

  Icon.defaultProps = {
    className: '',
    logoFillColor: 'white',
    size: 64,
  };

  return Icon;
}
