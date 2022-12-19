import React from 'react';
declare type Props = Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> & {
    bgStyle?: React.CSSProperties;
    borderRadius?: number;
    iconFillColor?: string;
    round?: boolean;
    size?: number | string;
};
declare type IconConfig = {
    color: string;
    networkName: string;
    /** SVG path */
    path: string;
};
export default function createIcon(iconConfig: IconConfig): React.FC<Props>;
export {};
