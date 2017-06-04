# react-share

[![npm version](https://badge.fury.io/js/react-share.svg)](https://badge.fury.io/js/react-share)
[![Download Count](http://img.shields.io/npm/dm/react-share.svg?style=flat-square)](https://npmjs.org/package/react-share)

> Easy social media share buttons and share counts.

<img src="example.png" alt="Share buttons and counts example" />

### Features

* no external script loading, i.e. no dependencies on SDKs
* opens a popup share-window
* share buttons for:
  - Facebook
  - Twitter
  - Telegram
  - Google+
  - Whatsapp
  - LinkedIn
  - Pinterest
  - VK
  - Odnoklassniki
  - Reddit
* share counts for
  - Facebook
  - Google+
  - Linkedin
  - Pinterest
  - VK
  - Odnoklassniki
  - Reddit
* social media icons included in the library
* supports also custom icons

#### Demo

To run demos: clone repo and run `npm install && npm run run-demos`
and open `http://localhost:8080/demo0/`.

## Install

```shell
npm install react-share --save
```

## Browser

ShareButtons work on all browsers.

ShareCounts works on all browsers, with the exception of Goolge Plus share count
working only on IE11 and newer (XHR CORS problem).

## Compatibility

Compatible with React versions `0.13.x`, `0.14.x` and `15.x.x`.

## API

```js
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';
```

### Share buttons

```js
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
} = ShareButtons;
```

##### Share button props

|       |Required props|Optional props|
|-------|--------|--------------|
|__All__|__`children`__: A React node (e.g. string or element)<br />__`url`__: URL of the shared page (string)|__`disabled`__: Disables click action and adds `disabled` class (bool)<br/>__`disabledStyle`__: Style when button is disabled (object, default = { opacity: 0.6 })<br/>__`windowWidth`, `windowHeight`__: opened window dimensions (int, different defaults for all share buttons)<br>__`beforeOnClick`__: Takes a function that returns a Promise to be fulfilled before calling onClick|
|FacebookShareButton|-|__`title`__: Title of the shared page (string)<br/>__`description`__: Description of the shared page (string)<br/>__`picture`__: An absolute link to the image that will be shared (string)|
|GooglePlusShareButton|-|-|
|LinkedinShareButton|-|__`title`__: Title of the shared page (string)<br/>__`description`__: Description of the shared page (string)|
|TwitterShareButton|-|__`title`__: Title of the shared page (string)<br/>__`via`__: (string)<br/>__`hashtags`__: (array)|
|TelegramShareButton|-|__`title`__: Title of the shared page (string)<br/>|
|WhatsappShareButton|-|__`title`__: Title of the shared page (string)<br/>__`separator`__: Separates title from the url, default: " " (string)|
|PinterestShareButton|__`media`__: An absolute link to the image that will be pinned (string)|__`description`__: Description for the shared media.|
|VKShareButton|-|__`title`__: Title of the shared page (string)<br/>__`description`__: Description of the shared page (string)<br/>__`image`__: An absolute link to the image that will be shared (string)|
|OKShareButton|-|__`title`__: Title of the shared page (string)<br/>__`description`__: Description of the shared page (string)<br/>__`image`__: An absolute link to the image that will be shared (string)|
|RedditShareButton|-|__`title`__: Title of the shared page (string)|

##### Notes

Whatsapp share button uses `whatsapp` protocol in shared links (`whatsapp://send`).
Thus, it is meant to be used on mobile views and will not work on (all) desktop web browsers.

### Share counts

```js
const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
} = ShareCounts;
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
  {shareCount => (
    <span className="myShareCountWrapper">{shareCount}</span>
  )}
</FacebookShareCount>
```

### Icons

```js
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const TelegramIcon = generateShareIcon('telegram');
const WhatsappIcon = generateShareIcon('whatsapp');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');
const OKIcon = generateShareIcon('ok');
const RedditIcon = generateShareIcon('reddit');
```

Props:

* `size`: Icon size in pixels (number)

* `round`: Whether to show round or rect icons (bool)

* `iconBgStyle`: customize background style, e.g. `fill` (object)

* `logoFillColor`: customize logo's fill color (string, default = 'white')

Example:
```
<TwitterIcon size={32} round={true} />
```

## License

MIT

## Icons

Icon paths provided by:
[react-social-icons](https://github.com/jaketrent/react-social-icons).
