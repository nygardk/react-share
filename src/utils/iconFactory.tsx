import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  borderRadius: number;
  className?: string;
  iconBgStyle: React.CSSProperties;
  logoFillColor: string;
  round?: boolean;
  size: number;
};

export default function iconFactory(network: string, iconConfig: { color: string; icon: string }) {
  const Icon: React.FC<Props> = props => {
    const { className, iconBgStyle, logoFillColor, borderRadius, round, size } = props;

    const baseStyle = {
      width: size,
      height: size,
    };

    const classes = `social-icon social-icon--${network} ${className}`;

    return (
      <div style={baseStyle}>
        <svg viewBox="0 0 64 64" width={size} height={size} className={classes}>
          <g>
            {!round ? (
              <rect
                width="64"
                height="64"
                rx={borderRadius}
                ry={borderRadius}
                fill={iconConfig.color}
                style={iconBgStyle}
              />
            ) : (
              <circle cx="32" cy="32" r="31" fill={iconConfig.color} style={iconBgStyle} />
            )}
          </g>

          <g>
            <path d={iconConfig.icon} fill={logoFillColor} />
          </g>
        </svg>
      </div>
    );
  };

  Icon.propTypes = {
    borderRadius: PropTypes.number.isRequired,
    className: PropTypes.string,
    iconBgStyle: PropTypes.object.isRequired,
    logoFillColor: PropTypes.string.isRequired,
    round: PropTypes.bool,
    size: PropTypes.number.isRequired,
  };

  Icon.defaultProps = {
    iconBgStyle: {},
    logoFillColor: 'white',
    size: 64,
    borderRadius: 0,
  };

  return Icon;
}
