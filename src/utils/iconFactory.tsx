import React from 'react';

type Props = Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  borderRadius?: number;
  iconBgStyle?: React.CSSProperties;
  logoFillColor?: string;
  round?: boolean;
  size?: number;
};

type IconConfig = {
  color: string;
  networkName: string;
  /** SVG path */
  path: string;
};

export default function iconFactory(iconConfig: IconConfig) {
  const Icon: React.FC<Props> = ({
    iconBgStyle,
    logoFillColor,
    borderRadius,
    round,
    size,
    ...rest
  }) => (
    <svg viewBox="0 0 64 64" width={size} height={size} {...rest}>
      <g>
        {round ? (
          <circle cx="32" cy="32" r="31" fill={iconConfig.color} style={iconBgStyle} />
        ) : (
          <rect
            width="64"
            height="64"
            rx={borderRadius}
            ry={borderRadius}
            fill={iconConfig.color}
            style={iconBgStyle}
          />
        )}
      </g>

      <g>
        <path d={iconConfig.path} fill={logoFillColor} />
      </g>
    </svg>
  );

  Icon.defaultProps = {
    iconBgStyle: {},
    logoFillColor: 'white',
    size: 64,
    borderRadius: 0,
  };

  return Icon;
}
