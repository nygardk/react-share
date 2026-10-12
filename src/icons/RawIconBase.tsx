import type { ReactNode, SVGProps } from 'react';

export type RawIconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  size?: number | string;
};

type RawIconBaseProps = RawIconProps & {
  /**
   * Put the glyph on a filled circle, scaled around the center of the 24x24
   * viewBox. Used for glyph-only marks so they match the visual weight of the
   * circular brand marks. The glyph is always drawn in white.
   */
  badge?: {
    scale: number;
  };
  children: ReactNode;
  color?: string;
  outlined?: boolean;
  viewBox?: string;
};

const outlinePaint = {
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 2,
};

function glyphPaint(outlined: boolean, color: string | undefined) {
  return outlined ? { ...outlinePaint, stroke: color } : { fill: color };
}

export function RawIconBase({
  badge,
  children,
  color,
  fill,
  outlined = false,
  size = 24,
  viewBox = '0 0 24 24',
  ...rest
}: RawIconBaseProps) {
  const paint = fill ?? color;

  if (badge) {
    const transform = `translate(12 12) scale(${badge.scale}) translate(-12 -12)`;

    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill={paint} {...rest}>
        <circle cx="12" cy="12" r="12" />
        <g transform={transform} {...glyphPaint(outlined, 'white')}>
          {children}
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox={viewBox} width={size} height={size} {...glyphPaint(outlined, paint)} {...rest}>
      {children}
    </svg>
  );
}
