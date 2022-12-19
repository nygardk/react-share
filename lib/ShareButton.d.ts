import React, { Component, Ref } from 'react';
declare type NetworkLink<LinkOptions> = (url: string, options: LinkOptions) => string;
declare type WindowPosition = 'windowCenter' | 'screenCenter';
interface CustomProps<LinkOptions> {
    children: React.ReactNode;
    className?: string;
    /** Disables click action and adds `disabled` class */
    disabled?: boolean;
    /**
     * Style when button is disabled
     * @default { opacity: 0.6 }
     */
    disabledStyle?: React.CSSProperties;
    forwardedRef?: Ref<HTMLButtonElement>;
    networkName: string;
    networkLink: NetworkLink<LinkOptions>;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>, link: string) => void;
    openShareDialogOnClick?: boolean;
    opts: LinkOptions;
    /**
     * URL of the shared page
     */
    url: string;
    style?: React.CSSProperties;
    windowWidth?: number;
    windowHeight?: number;
    windowPosition?: WindowPosition;
    /**
     *  Takes a function that returns a Promise to be fulfilled before calling
     * `onClick`. If you do not return promise, `onClick` is called immediately.
     */
    beforeOnClick?: () => Promise<void> | void;
    /**
     * Takes a function to be called after closing share dialog.
     */
    onShareWindowClose?: () => void;
    resetButtonStyle?: boolean;
}
export declare type Props<LinkOptions> = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CustomProps<LinkOptions>> & CustomProps<LinkOptions>;
export default class ShareButton<LinkOptions> extends Component<Props<LinkOptions>> {
    static defaultProps: {
        disabledStyle: {
            opacity: number;
        };
        openShareDialogOnClick: boolean;
        resetButtonStyle: boolean;
    };
    openShareDialog: (link: string) => void;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
    render(): JSX.Element;
}
export {};
