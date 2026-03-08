import type { CSSProperties, ReactNode, SVGProps } from 'react';
import { Children, cloneElement, isValidElement } from 'react';

type IconSvgProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'>;

export type IconProps = IconSvgProps & {
  bgStyle?: CSSProperties;
  borderRadius?: number;
  iconFillColor?: string;
  round?: boolean;
  size?: number | string;
};

type IconBaseProps = IconProps & {
  children: ReactNode;
  color: string;
};

function withDefaultFill(children: ReactNode, iconFillColor: string) {
  return Children.map(children, child => {
    if (!isValidElement<{ fill?: string }>(child) || child.props.fill !== undefined) {
      return child;
    }

    return cloneElement(child, { fill: iconFillColor });
  });
}

export default function IconBase({
  bgStyle = {},
  borderRadius = 0,
  children,
  color,
  iconFillColor = 'white',
  round = false,
  size = 64,
  ...rest
}: IconBaseProps) {
  const content = withDefaultFill(children, iconFillColor);

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} {...rest}>
      {round ? (
        <circle cx="32" cy="32" r="32" fill={color} style={bgStyle} />
      ) : (
        <rect
          width="64"
          height="64"
          rx={borderRadius}
          ry={borderRadius}
          fill={color}
          style={bgStyle}
        />
      )}

      {content}
    </svg>
  );
}
