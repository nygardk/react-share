# react-share

[![NPM](https://img.shields.io/npm/v/react-share.svg)](https://www.npmjs.com/package/react-share) ![npm bundle size](https://img.shields.io/bundlephobia/min/react-share) [![downloads](https://img.shields.io/npm/dm/react-share.svg?label=monthly%20downloads)](https://www.npmjs.com/package/react-share) [![downloads](https://img.shields.io/npm/dt/react-share.svg?label=total%20downloads)](https://www.npmjs.com/package/react-share)

> Social media share buttons and share counts for your React apps.

![Share buttons screenshot](example.png)

## Install

```shell
npm install react-share
```

## Features

- no external script loading, i.e. no dependencies on SDKs
- supports tree shaking with ES modules
- opens a popup share-window
- share buttons for:
  - Facebook
  - Facebook Messenger
  - X (formerly Twitter)
  - Telegram
  - Whatsapp
  - LinkedIn
  - Pinterest
  - VK
  - Odnoklassniki
  - Reddit
  - Tumblr
  - Mail.Ru
  - LiveJournal
  - Viber
  - Workplace
  - Line
  - Weibo
  - Pocket
  - Instapaper
  - Hatena
  - Gab
  - email
- share counts for
  - Facebook
  - Pinterest
  - VK
  - Odnoklassniki
  - Reddit
  - Tumblr
  - Hatena
- social media icons included in the library
- supports also custom icons

## Demo

- [Deployed demo](https://npm-react-share-demo.netlify.app) (from [`./demo`](./demo/))

- [Codesandbox example](https://codesandbox.io/p/sandbox/react-share-demo-474q4k)

- Locally: clone the repository and run `npm install && npm run demo`.

## React compatibility

| Version | Compatible React versions     |
| ------- | ----------------------------- |
| 1       | `0.13.x`, `0.14.x`, `15.x.x`. |
| 2       | `15`, `16`                    |
| 3       | `15`, `16`                    |
| 3.0.1   | `^16.3.`                      |
| 4       | `^16.3`, `17`, `18`           |
| 5       | `17`, `18`                    |

## API

### Share buttons

```js
import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
```

##### Share button props

|                              | Required props                                                                              | Optional props                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **All**                      | **`children`** (string/element): React node<br />**`url`** (string): URL of the shared page | **`disabled`** (bool): Disables click action and adds "disabled" class<br/>**`disabledStyle`** (object, default=`{ opacity: 0.6 }`): Disabled style<br/>**`windowWidth`, `windowHeight`** (number, different default for all share buttons): opened window dimensions<br />**`beforeOnClick`** (`() => Promise`/`() => void`): Takes a function that returns a Promise to be fulfilled before calling `onClick`. If you do not return promise, `onClick` is called immediately.<br/>**`openShareDialogOnClick`** (boolean): Open dialog on click. Defaults to `true` except on EmailShareButton<br/>**`onShareWindowClose`** (`() => void`): Takes a function to be called after closing share dialog.<br/>**`resetButtonStyle`** (boolean, default=`true`): Reset `button` element style. Preferred to be set to `false` if you want to customize the button style. |
| EmailShareButton             | -                                                                                           | **`subject`** (string): Title of the shared page<br/>**`body`** (string): Email, will be prepended to the url.<br/>**`separator`** (string, default=`" "`): Separates body from the url                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| FacebookShareButton          | -                                                                                           | **`hashtag`** (string): A hashtag specified by the developer to be added to the shared content. People will still have the opportunity to remove this hashtag in the dialog. The hashtag should include the hash symbol.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| FacebookMessengerShareButton | **`appId`** (string): Facebook application id                                               | **`redirectUri`** (string): The URL to redirect to after sharing (default: the shared url).<br />**`to`** (string): A user ID of a recipient. Once the dialog comes up, the sender can specify additional people as recipients.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| HatenaShareButton            | -                                                                                           | **`title`** (string): Title of the shared page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| InstapaperShareButton        | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`description`** (string): Description of the shared page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| LinkedinShareButton          | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`summary`** (string): Description of the shared page<br/>**`source`** (string): Source of the content (e.g. your website or application name)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| LineShareButton              | -                                                                                           | **`title`** (string): Title of the shared page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| LivejournalShareButton       | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`description`** (string): Description of the shared page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| MailruShareButton            | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`description`** (string): Description of the shared page<br/>**`imageUrl`** (string): An absolute link to the image that will be shared                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| OKShareButton                | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`description`** (string): Description of the shared page<br/>**`image`** (string): An absolute link to the image that will be shared                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| PinterestShareButton         | **`media`** (string): An absolute link to the image that will be pinned                     | **`description`** (string): Description for the shared<br/>**`pinId`** (string): Id of existing pin - If you’ve already pinned this page, use this to treat any new Pins of this page as repins of the original. Doing this can give you a better feel for engagement, because any Pins you create will count towards repins of your original Pin.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| PocketShareButton            | -                                                                                           | **`title`** (string): Title of the shared page. Note that if Pocket detects a title tag on the page being saved, this parameter will be ignored and the title tag of the saved page will be used instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| RedditShareButton            | -                                                                                           | **`title`** (string): Title of the shared page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| TelegramShareButton          | -                                                                                           | **`title`** (string): Title of the shared page<br/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| TumblrShareButton            | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`tags`**: (`Array<string>`)<br/>**`caption`** (string): Description of the shared page<br/>**`posttype`** (string, default=`link`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TwitterShareButton           | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`url`**: (string)<br/>**`hashtags`** (array): Hashtags<br/>**`related`** (array): Accounts to recommend following                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ViberShareButton             | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`separator`** (string), default=`" "`: Separates title from the url                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| VKShareButton                | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`image`** (string): An absolute link to the image that will be shared<br/>**`noParse`** (boolean): If true is passed, VK will not retrieve URL information<br/>**`noVkLinks`** (boolean): If true is passed, there will be no links to the user's profile in the open window. Only for mobile devices                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| WeiboShareButton             | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`image`** (string): An absolute link to the image that will be shared                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| WhatsappShareButton          | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`separator`** (string, default=`" "`): Separates title from the url                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| WorkplaceShareButton         | -                                                                                           | **`quote`** (string): A quote to be shared along with the link.<br/>**`hashtag`** (string): A hashtag specified by the developer to be added to the shared content. People will still have the opportunity to remove this hashtag in the dialog. The hashtag should include the hash symbol.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

### Share counts

```js
import {
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
} from "react-share";
```

All share count components take in only one mandatory prop: `url`, which is the
URL you are sharing. `className` prop is optional.

Example:

```jsx
<FacebookShareCount url={shareUrl} />
```

If you want to render anything else but the count,
you can provide a function as a child element that takes in `shareCount` as an
argument and returns an element:

```jsx
<FacebookShareCount url={shareUrl}>
  {(shareCount) => <span className="myShareCountWrapper">{shareCount}</span>}
</FacebookShareCount>
```

### Icons

```js
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  XIcon,
} from "react-share";
```

Props:

- `size`: Icon size in pixels (number)

- `round`: Whether to show round or rect icons (bool)

- `borderRadius`: Allow rounded corners if using rect icons (number)

- `bgStyle`: customize background style, e.g. `fill` (object)

- `iconFillColor`: customize icon fill color (string, default = 'white')

Example:

```jsx
<TwitterIcon size={32} round={true} />
```

### About semantic versioning

This library uses the standard semver convention. However, the share buttons and and counts are prone to lots of changes that are not in control of this library. For example: if Facebook decides to change or deprecate it's API in a major way, this library will not get a major version bump just because of that. Keep this in mind when you are planning the maintenance of your application.

## License

MIT

## Icons

Icon paths provided by:
[react-social-icons](https://github.com/jaketrent/react-social-icons).
