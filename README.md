# react-share

> Easy social media share buttons and share counts.

<img src="example.png" alt="Share buttons and counts example" />

### News

##### 6.5.2016

`New!` VK support added in version 1.6.0.

##### 23.11.2015

Since 20th of November Twitter no longer supports open count API. The service
was shut down and there is currently no way to fetch the share count.
Thus, TwitterShareCount was removed in version 1.3.0.

#### Features:
* no external script loading, i.e. no dependencies on SDKs
* opens a popup share-window
* sharing buttons for Facebook, Twitter, Google+, LinkedIn, Pinterest, VK
* share counts for Facebook, Google+, Linkedin and Pinterest
* share buttons with generated icons or custom icons of your choice

#### Demos:

* [demos/demo0](demos/demo0): Facebook, Twitter, Google+, Linkedin, Pinterest, VK

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
  PinterestShareButton,
  VKShareButton
} = ShareButtons;
```

Required props for all:

* `children`: A React node (e.g. string or element)
* `url`: URL of the shared page (string)


Required props for `LinkedinShareButton`, `TwitterShareButton`
and `FacebookShareButton`:

* `title`: Title of the shared page (string)

Required prop for `PinterestShareButton`:

* `media`: An absolute link to the image that will be pinned (string)

Optional props for `PinterestShareButton`:

* `description`: Description for the shared media.

### Share counts

```js
const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount
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
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');
```

Props:

* `size`: Icon size in pixels (number)
* `round`: Whether to show round or rect icons (bool)

Example:
```
<TwitterIcon size={32} round={true} />
```

## License

MIT

## Icons

Icon paths provided by:
[react-social-icons](https://github.com/jaketrent/react-social-icons).
