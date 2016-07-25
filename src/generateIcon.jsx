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
      useDataUrl: React.PropTypes.bool,
    },

    getDefaultProps() {
      return {
        logoFillColor: 'white',
        size: 64,
        useDataUrl: false,
      };
    },

    render() {
      const {
        className,
        iconBgStyle,
        logoFillColor,
        round,
        size,
        useDataUrl,
      } = this.props;

      const baseStyle = {
        width: size,
        height: size,
      };

      const classes = `social-icon social-icon--${network} ${className || ''}`;

      const finalIconBgStyle = {
        ...iconBgStyle,
      };

      const svg = (
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
      );

      if (useDataUrl) {
        // React can't render svgs with xmlns set, so we replace it in the string
        const svgMarkup = renderToStaticMarkup(svg).replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        const data = btoa(svgMarkup);
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
