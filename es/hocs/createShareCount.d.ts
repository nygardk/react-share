import React from 'react';
declare type SocialMediaShareCountProps = React.HTMLAttributes<HTMLSpanElement> & {
    children?: (shareCount: number) => React.ReactNode;
    getCount: (url: string, callback: (shareCount?: number) => void) => void;
    url: string;
};
export default function createShareCount(getCount: SocialMediaShareCountProps['getCount']): {
    (props: Omit<SocialMediaShareCountProps, 'getCount'>): JSX.Element;
    displayName: string;
};
export {};
