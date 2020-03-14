# react-share

[![npm version](https://badge.fury.io/js/react-share.svg)](https://badge.fury.io/js/react-share)
[![Download Count](http://img.shields.io/npm/dm/react-share.svg?style=flat-square)](https://npmjs.org/package/react-share)

> Social media share buttons and share counts for React.

<img src="example.png" alt="Share buttons and counts example" />

Migrating from v2 to v3? Read [changelog](./CHANGELOG.md).

Migrating from v1 to v2? Read [migration notes](./migrate-v1-to-v2.md).

### Features

- no external script loading, i.e. no dependencies on SDKs
- opens a popup share-window
- share buttons for:
  - Facebook
  - Twitter
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
  - email
- share counts for
  - Facebook
  - Pinterest
  - VK
  - Odnoklassniki
  - Reddit
  - Tumblr
- social media icons included in the library
- supports also custom icons

#### Demo

[View demo](http://nygardk.github.io/react-share/)

To run demo: clone repo and run `npm install && npm run run-demos`
and open `http://localhost:8080`.

## Install

```shell
npm install react-share --save
```

## Compatibility

**Version 1.x.x**: compatible with React versions `0.13.x`, `0.14.x` and `15.x.x`.

**Version 2.x.x**: compatiblity is tested with React 15 and 16.

**Version 3.x.x**: compatiblity is tested with React 15 and 16.

**Version 3.0.1**: compatible with React ^16.3.

**Version 4.x.x**: compatible with React >=16.3.

## API

### Share buttons

```js
import {
  EmailShareButton,
  FacebookShareButton,
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

|                        | Required props                                                                              | Optional props                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **All**                | **`children`** (string/element): React node<br />**`url`** (string): URL of the shared page | **`disabled`** (bool): Disables click action and adds "disabled" class<br/>**`disabledStyle`** (object, default=`{ opacity: 0.6 }`): Disabled style<br/>**`windowWidth`, `windowHeight`** (number, different default for all share buttons): opened window dimensions<br />**`beforeOnClick`** (`() => Promise`/`() => void`): Takes a function that returns a Promise to be fulfilled before calling `onClick`. If you do not return promise, `onClick` is called immediately.<br/>**`openShareDialogOnClick`** (boolean): Open dialog on click. Defaults to `true`<br/>**`onShareWindowClose`** (`() => void`): Takes a function to be called after closing share dialog.<br/>**`resetButtonStyle`** (boolean, default=`true`): Reset `button` element style. Preferred to be set to `false` if you wan't to customize the button style. |
| EmailShareButton       | -                                                                                           | **`subject`** (string): Title of the shared page<br/>**`body`** (string): Email, will be prepended to the url.<br/>**`separator`** (string, default=`" "`): Separates body from the url                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| FacebookShareButton    | -                                                                                           | **`quote`** (string): A quote to be shared along with the link.<br/>**`hashtag`** (string): A hashtag specified by the developer to be added to the shared content. People will still have the opportunity to remove this hashtag in the dialog. The hashtag should include the hash symbol.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| InstapaperShareButton  | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`description`** (string): Description of the shared page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| LinkedinShareButton    | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`summary`** (string): Description of the shared page<br/>**`source`** (string): Source of the content (e.g. your website or application name)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| LineShareButton        | -                                                                                           | **`title`** (string): Title of the shared page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| LivejournalShareButton | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`description`** (string): Description of the shared page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| MailruShareButton      | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`description`** (string): Description of the shared page<br/>**`imageUrl`** (string): An absolute link to the image that will be shared                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| OKShareButton          | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`description`** (string): Description of the shared page<br/>**`image`** (string): An absolute link to the image that will be shared                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| PinterestShareButton   | **`media`** (string): An absolute link to the image that will be pinned                     | **`description`** (string): Description for the shared media.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| PocketShareButton      | -                                                                                           | **`title`** (string): Title of the shared page. Note that if Pocket detects a title tag on the page being saved, this parameter will be ignored and the title tag of the saved page will be used instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| RedditShareButton      | -                                                                                           | **`title`** (string): Title of the shared page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| TelegramShareButton    | -                                                                                           | **`title`** (string): Title of the shared page<br/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| TumblrShareButton      | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`tags`**: (`Array<string>`)<br/>**`caption`** (string): Description of the shared page<br/>**`posttype`** (string, default=`link`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| TwitterShareButton     | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`via`**: (string)<br/>**`hashtags`** (array): Hashtags<br/>**`related`** (array): Accounts to recommend following                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ViberShareButton       | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`separator`** (string), default=`" "`: Separates title from the url                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| VKShareButton          | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`image`** (string): An absolute link to the image that will be shared<br/>**`noParse`** (boolean): If true is passed, VK will not retrieve URL information<br/>**`noVkLinks`** (boolean): If true is passed, there will be no links to the user's profile in the open window. Only for mobile devices                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| WeiboShareButton       | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`image`** (string): An absolute link to the image that will be shared                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| WhatsappShareButton    | -                                                                                           | **`title`** (string): Title of the shared page<br/>**`separator`** (string, default=`" "`): Separates title from the url                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| WorkplaceShareButton   | -                                                                                           | **`quote`** (string): A quote to be shared along with the link.<br/>**`hashtag`** (string): A hashtag specified by the developer to be added to the shared content. People will still have the opportunity to remove this hashtag in the dialog. The hashtag should include the hash symbol.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### Share counts

```js
import {
  FacebookShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount
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
  {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
</FacebookShareCount>
```

### Icons

```js
import {
  EmailIcon,
  FacebookIcon,
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
