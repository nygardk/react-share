import React from 'react';

type Props = Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  bgStyle?: React.CSSProperties;
  borderRadius?: number;
  iconFillColor?: string;
  round?: boolean;
  size?: number | string;
};

type InnerPathObject = {
  innerPath: string;
  innerColor: string;
};

type IconConfig = {
  color: string;
  networkName: string;
  /** SVG path */
  path: string;
  innerPaths?: Array<InnerPathObject>;
};

export default function createIcon(iconConfig: IconConfig) {
  const { innerPaths = [] } = iconConfig;
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
      {innerPaths.length !== 0 && (
        <g>
          {innerPaths.map((pathObject, index) => (
            <path key={index} d={pathObject.innerPath} fill={pathObject.innerColor} />
          ))}
        </g>
      )}
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
