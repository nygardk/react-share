import React from 'react';

type Props = Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  bgStyle?: React.CSSProperties;
  borderRadius?: number;
  iconFillColor?: string;
  round?: boolean;
  size?: number | string;
};

type IconConfig = {
  color: string;
  networkName: string;
  /** SVG path */
  path: string;
};

export default function createIcon(iconConfig: IconConfig) {
  const Icon: React.FC<Props> = ({
    bgStyle,
    borderRadius,
    iconFillColor,
    round,
    size,
    ...rest
  }) => (
    <svg viewBox="0 0 64 64" width={size} height={size} {...rest}>
      {round ? (
        <circle cx="32" cy="32" r="31" fill={iconConfig.color} style={bgStyle} />
      ) : (
        <rect
          width="64"
          height="64"
          rx={borderRadius}
          ry={borderRadius}
          fill={iconConfig.color}
          style={bgStyle}
        />
      )}

      <path d={iconConfig.path} fill={iconFillColor} />
    </svg>
  );

  Icon.defaultProps = {
    bgStyle: {},
    borderRadius: 0,
    iconFillColor: 'white',
    size: 64,
  };

  return Icon;
}
