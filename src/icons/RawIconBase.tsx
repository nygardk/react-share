import type { ReactNode, SVGProps } from 'react';

export type RawIconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  size?: number | string;
};

type RawIconBaseProps = RawIconProps & {
  children: ReactNode;
  color?: string;
  viewBox?: string;
};

export function RawIconBase({
  children,
  color,
  fill,
  size = 24,
  viewBox = '0 0 24 24',
  ...rest
}: RawIconBaseProps) {
  return (
    <svg viewBox={viewBox} width={size} height={size} fill={fill ?? color} {...rest}>
      {children}
    </svg>
  );
}
