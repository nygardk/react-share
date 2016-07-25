import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import icons from './icons';

export function generateIcon(network) {
  if (!icons[network.toLowerCase()]) {
    throw new Error('invalid network name for a social icon');
  }

  const iconConfig = icons[network.toLowerCase()];

  return React.createClass({
    propTypes: {
      className: React.PropTypes.string,
      iconBgStyle: React.PropTypes.object,
      logoFillColor: React.PropTypes.string,
      round: React.PropTypes.bool,
      size: React.PropTypes.number,
      inline: React.PropTypes.boolean,
    },

    getDefaultProps() {
      return {
        logoFillColor: 'white',
        size: 64,
        inline: false,
      };
    },

    render() {
      const {
        className,
        iconBgStyle,
        logoFillColor,
        round,
        size,
        inline,
      } = this.props;

      const baseStyle = {
        width: size,
        height: size,
      };

      const svgStyle = {
        fill: logoFillColor,
        width: size,
        height: size,
      };

      const classes = `social-icon social-icon--${network} ${className}`;

      const finalIconBgStyle = {
        fill: iconConfig.color,
        ...iconBgStyle,
      };

      const svg = (
        <svg viewBox="0 0 64 64"
          style={svgStyle}
          className={classes}>
          <g>
            {(!round ? (
              <rect
                width="64"
                height="64"
                style={finalIconBgStyle} />
            ) : (
              <circle
                cx="32"
                cy="32"
                r="31"
                style={finalIconBgStyle} />
            ))}
          </g>

          <g>
            <path d={iconConfig.icon} />
          </g>
        </svg>
      );

      if (inline) {
        const data = btoa(renderToStaticMarkup(svg));
        return (
          <img style={baseStyle} src={`data:image/svg+xml;base64,${data}`} role="presentation" />
        );
      }

      return (
        <div style={baseStyle}>
          {svg}
        </div>
      );
    },
  });
}
