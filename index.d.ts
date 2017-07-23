/// <reference types="react" />
import * as React from 'react';


export namespace ShareButtons {
    interface ShareButtonProps {
        /**
         * URL of the shared page (string)
         */
        url: string;
        /**
         * Disables click action and adds disabled class
         */
        disabled?: boolean;
        /**
         * Style when button is disabled , default = { opacity: 0.6 }
         */
        disabledStyles?: React.CSSProperties;
        /**
         * opened window dimensions (int, different defaults for all share buttons)
         */
        windowHeight?: number;
        /**
         * opened window dimensions (int, different defaults for all share buttons)
         */
        windowWidth?: number;
        /**
         * Takes a function that returns a Promise to be fulfilled before calling onClick. If you do not return promise, onClick is called immediately.
         */
        beforeOnClick?: (cb: () => Promise<any>) => void;
    }

    interface TitleableShareButtonProps extends ShareButtonProps {
        /**
         * Title of the shared page (string)
         */
        title?: string;
    }

    interface FacebookShareButtonProps extends TitleableShareButtonProps {
        /**
         * Description of the shared page 
         */
        description?: string;
        /**
         * An absolute link to the image that will be shared
         */
        picture?: string;
    }
    export class FacebookShareButton extends React.Component<FacebookShareButtonProps, any> { }

    interface GooglePlusShareButtonProps extends ShareButtonProps { }
    export class GooglePlusShareButton extends React.Component<GooglePlusShareButtonProps, any> { }

    interface LinkedinShareButtonProps extends TitleableShareButtonProps {
        /**
         * Description of the shared page 
         */
        description?: string;
    }
    export class LinkedinShareButton extends React.Component<LinkedinShareButtonProps, any> { }

    interface TwitterShareButtonProps extends TitleableShareButtonProps {
        /**
         * Description of the shared page 
         */
        description?: string;
        via?: string;
        hashtags?: string;
    }
    export class TwitterShareButton extends React.Component<TwitterShareButtonProps, any> { }

    interface TelegramShareButtonProps extends TitleableShareButtonProps { }
    export class TelegramShareButton extends React.Component<TelegramShareButtonProps, any> { }

    interface WhatsappShareButtonProps extends TitleableShareButtonProps {
        /**
         * Description of the shared page 
         */
        description?: string;
        /**
         * Separates title from the url, default: " "
         */
        separator?: string;
    }
    export class WhatsappShareButton extends React.Component<WhatsappShareButtonProps, any> { }

    interface PinterestShareButtonProps extends TitleableShareButtonProps {
        /**
         * An absolute link to the image that will be pinned 
         */
        media: string;
        /**
         * Description for the shared media.
         */
        description?: string;
    }
    export class PinterestShareButton extends React.Component<PinterestShareButtonProps, any> { }

    interface RedditShareButtonProps extends TitleableShareButtonProps { }
    export class RedditShareButton extends React.Component<RedditShareButtonProps, any> { }
}

export namespace ShareCounts {
    interface Props {
        url: string;
        children?: never[] | ((shareCount: number) => JSX.Element);
    }
    export class FacebookShareCount extends React.Component<Props, any> { }
    export class GooglePlusShareCount extends React.Component<Props, any> { }
    export class LinkedinShareCount extends React.Component<Props, any> { }
    export class PinterestShareCount extends React.Component<Props, any> { }
    export class VKShareCount extends React.Component<Props, any> { }
    export class OKShareCount extends React.Component<Props, any> { }
    export class RedditShareCount extends React.Component<Props, any> { }
}


export function generateShareIcon(icon: 'facebook' | 'twitter' | 'telegram' | 'whatsapp' | 'google' | 'linkedin' | 'pinterest' | 'vk' | 'ok' | 'reddit'): React.Component<{
    /**
     * Icon size in pixels
     */
    size?: number;
    /**
     * Whether to show round or rect icons
     */
    round?: boolean;
    /**
     * customize background style
     */
    iconBgStyle?: React.CSSProperties;
    /**
     * customize logo's fill color
     */
    logoFillColor?: string;
}, any>;
