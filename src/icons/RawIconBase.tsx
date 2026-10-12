import type { ReactNode, SVGProps } from 'react';

export type RawIconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  size?: number | string;
};

type RawIconBaseProps = RawIconProps & {
  children: ReactNode;
  color?: string;
  outlined?: boolean;
  viewBox?: string;
};

export function RawIconBase({
  children,
  color,
  fill,
  outlined = false,
  size = 24,
  viewBox = '0 0 24 24',
  ...rest
}: RawIconBaseProps) {
  const paint = fill ?? color;
  const paintProps = outlined
    ? {
        fill: 'none',
        stroke: paint,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        strokeWidth: 2,
      }
    : { fill: paint };

  return (
    <svg viewBox={viewBox} width={size} height={size} {...paintProps} {...rest}>
      {children}
    </svg>
  );
}
