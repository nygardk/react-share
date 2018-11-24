# react-share

[![npm version](https://badge.fury.io/js/react-share.svg)](https://badge.fury.io/js/react-share)
[![Download Count](http://img.shields.io/npm/dm/react-share.svg?style=flat-square)](https://npmjs.org/package/react-share)

> Social media share buttons and share counts for React.

<img src="example.png" alt="Share buttons and counts example" />

Migrating from v1 to v2? Read [migration notes](./migrate-v1-to-v2.md).

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
  - Tumblr
  - Mail.Ru
  - LiveJournal
  - Viber
  - Workplace
  - Line
  - Weibo
  - email
* share counts for
  - Facebook
  - Google+
  - Linkedin
  - Pinterest
  - VK
  - Odnoklassniki
  - Reddit
  - Tumblr
* social media icons included in the library
* supports also custom icons

#### Demo

[View demo](http://nygardk.github.io/react-share/)

To run demo: clone repo and run `npm install && npm run run-demos`
and open `http://localhost:8080`.

## Install

```shell
npm install react-share --save
```

## Browser

ShareButtons work on all browsers.

ShareCounts works on all browsers, with the exception of Google Plus share count
working only on IE11 and newer (XHR CORS problem).

## Compatibility

__Version 1.x.x__: compatible with React versions `0.13.x`, `0.14.x` and `15.x.x`.

__Version 2.x.x__: comptiblity is tested with React 15 and 16.

## API

### Share buttons

```js
import {
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
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  EmailShareButton,
} from 'react-share';
```

##### Share button props

|       |Required props|Optional props|
|-------|--------|--------------|
|__All__|__`children`__: A React node (e.g. string or element)<br />__`url`__: URL of the shared page (string)|__`disabled`__: Disables click action and adds `disabled` class (bool)<br/>__`disabledStyle`__: Style when button is disabled (object, default = { opacity: 0.6 })<br/>__`windowWidth`, `windowHeight`__: opened window dimensions (int, different defaults for all share buttons)<br>__`beforeOnClick`__: Takes a function that returns a Promise to be fulfilled before calling `onClick`. If you do not return promise, `onClick` is called immediately.<br>__`onShareWindowClose`__: Takes a function to be called after closing share dialog.<br>__`additionalProps`__: An object to pass any additional properties, such as `aria-*` attributes.|
|FacebookShareButton|-|__`quote`__: A quote to be shared along with the link. (string)<br/>__`hashtag`__: A hashtag specified by the developer to be added to the shared content. People will still have the opportunity to remove this hashtag in the dialog. The hashtag should include the hash symbol. (string)|
|GooglePlusShareButton|-|-|
|LinkedinShareButton|-|__`title`__: Title of the shared page (string)<br/>__`description`__: Description of the shared page (string)|
|TwitterShareButton|-|__`title`__: Title of the shared page (string)<br/>__`via`__: (string)<br/>__`hashtags`__: (array)|
|TelegramShareButton|-|__`title`__: Title of the shared page (string)<br/>|
|WhatsappShareButton|-|__`title`__: Title of the shared page (string)<br/>__`separator`__: Separates title from the url, default: " " (string)|
|PinterestShareButton|__`media`__: An absolute link to the image that will be pinned (string)|__`description`__: Description for the shared media.|
|VKShareButton|-|__`title`__: Title of the shared page (string)<br/>__`description`__: Description of the shared page (string)<br/>__`image`__: An absolute link to the image that will be shared (string)|
|OKShareButton|-|__`title`__: Title of the shared page (string)<br/>__`description`__: Description of the shared page (string)<br/>__`image`__: An absolute link to the image that will be shared (string)|
|RedditShareButton|-|__`title`__: Title of the shared page (string)|
|TumblrShareButton|-|__`title`__: Title of the shared page (string)<br/>__`tags`__: (array)<br/>__`caption`__: Description of the shared page (string)|
|LivejournalShareButton|-|__`title`__: Title of the shared page (string)<br/>__`description`__: Description of the shared page (string)|
|MailruShareButton|-|__`title`__: Title of the shared page (string)<br/>__`description`__: Description of the shared page (string)<br/>__`image`__: An absolute link to the image that will be shared (string)|
|ViberShareButton|-|__`title`__: Title of the shared page (string)<br/>|
|WorkplaceShareButton|-|__`quote`__: A quote to be shared along with the link. (string)<br/>__`hashtag`__: A hashtag specified by the developer to be added to the shared content. People will still have the opportunity to remove this hashtag in the dialog. The hashtag should include the hash symbol. (string)|
|LineShareButton|-|__`title`__: Title of the shared page (string)|
|WeiboShareButton|-|__`title`__: Title of the shared page (string)<br/>__`image`__: An absolute link to the image that will be shared (string)|
|EmailShareButton|-|__`subject`__: Title of the shared page (string)<br/>__`body`__: Body of the email (string), defaults to shared url.|

### Share counts

```js
import {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,
} from 'react-share';
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
import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  RedditIcon,
  TumblrIcon,
  LivejournalIcon,
  MailruIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  EmailIcon,
} from 'react-share';
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

### About semantic versioning

This library uses the standard semver convention. However, the share buttons and and counts are prone to lots of changes that are not in control of this library. For example: if Facebook decides to change or deprecate it's API in a major way, this library will not get a major version bump just because of that. Keep this in mind when you are planning the maintenance of your application.

## License

MIT

## Icons

Icon paths provided by:
[react-social-icons](https://github.com/jaketrent/react-social-icons).
