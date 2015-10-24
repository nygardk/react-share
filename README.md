# react-share

> Easy social media share buttons and share counts.

<img src="example.png" alt="Share buttons and counts example" />

#### Features:
* open popup-share window
* share counts from most popular social media sites
* use custom icons or generate de-facto social media icons

See demos/demo0 for a concrete example.

## Install

```shell
npm install react-share --save
```

## Compatibility

Compatible with React versions `0.13.x` and `0.14.x`.

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
  TwitterShareButton
} = ShareButtons;
```

Required props for all:

* `children`: A React node (e.g. string or element)
* `url`: URL of the shared page (string)


Required props for `LinkedinShareButton`, `TwitterShareButton`
and `FacebookShareButton`:

* `title`: Title of the shared page (string)

### Share counts

```js
const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  TwitterShareCount
} = ShareCounts;
```

All share count components take in only one mandatory prop: `url`, which is the
URL you are sharing. `className` prop is optional.

Example:

```jsx
<TwitterShareCount url={shareUrl} />
```

If you want to render anything else but the count,
you can provide a function as a child element that takes in `shareCount` as an
argument and returns an element:

```jsx
<TwitterShareCount url={shareUrl}>
  {shareCount => (
    <span className="myShareCountWrapper">{shareCount}</span>
  )}
</TwitterShareCount>
```

### Icons

```js
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
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
