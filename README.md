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
  - [Bluesky](#blueskysharebutton)
  - [Email](#emailsharebutton)
  - [Facebook](#facebooksharebutton)
  - [Facebook Messenger](#facebookmessengersharebutton)
  - [Gab](#gabsharebutton)
  - [Hatena](#hatenasharebutton)
  - [Instapaper](#instapapersharebutton)
  - [Line](#linesharebutton)
  - [LinkedIn](#linkedinsharebutton)
  - [LiveJournal](#livejournalsharebutton)
  - [Mail.Ru](#mailrusharebutton)
  - [Odnoklassniki](#oksharebutton)
  - [Pinterest](#pinterestsharebutton)
  - [Pocket](#pocketsharebutton)
  - [Reddit](#redditsharebutton)
  - [Telegram](#telegramsharebutton)
  - [Threads](#threadssharebutton)
  - [Tumblr](#tumblrsharebutton)
  - [Viber](#vibersharebutton)
  - [VK](#vksharebutton)
  - [Weibo](#weibosharebutton)
  - [Whatsapp](#whatsappsharebutton)
  - [Workplace](#workplacesharebutton)
  - [X](#xsharebutton)
- [share counts](#share-counts) (deprecated)
- social media icons included in the library
- supports also custom icons

## Demo

- [Deployed demo](https://npm-react-share-demo.netlify.app) (from [`./demo`](./demo/))

- Locally: clone the repository and run `npm install && npm run demo`.

## React compatibility

| Version | Compatible React versions     |
| ------- | ----------------------------- |
| 5       | `17`, `18`, `19`              |
| 4       | `^16.3`, `17`, `18`           |
| 3.0.1   | `^16.3.`                      |
| 3       | `15`, `16`                    |
| 2       | `15`, `16`                    |
| 1       | `0.13.x`, `0.14.x`, `15.x.x`. |

## API

### Share buttons

All share buttons render a native `<button>` element and pass through standard button attributes such as `aria-label`, `aria-labelledby`, `aria-describedby`, `name`, and `data-*`.

Buttons and icons are separate named exports. Import only the components you use to keep tree shaking effective, and pass any custom element as `children` if you want to use your own icon set instead of the bundled icons.

Icon-only buttons need an accessible name. Pass `aria-label` or `aria-labelledby` when you render them in your app. `htmlTitle` only sets the native tooltip/title attribute and is not used as the button's accessible name.

Shared props:

Required:

- `children` (`ReactNode`): Button contents.
- `url` (`string`): URL of the shared page.
  Optional on all share buttons:
- `beforeOnClick` (`() => Promise<void> | void`): Runs before the share action.
- `disabled` (`boolean`): Disables click handling and adds a `disabled` class.
- `disabledStyle` (`CSSProperties`, default `{ opacity: 0.6 }`): Applied when `disabled` is true.
- `htmlTitle` (`string`): Sets the native `title` attribute on the underlying button.
- `onClick` (`(event, link) => void`): Called with the click event and generated share URL after link generation. Not exposed by `EmailShareButton`.
- `onShareWindowClose` (`() => void`): Called after the popup closes on popup-based buttons.
- `resetButtonStyle` (`boolean`, default `true`): Resets native button styles unless disabled.
- `windowHeight`, `windowWidth` (`number`): Override popup dimensions on popup-based buttons.
- `windowPosition` (`"windowCenter" | "screenCenter"`): Controls popup positioning on popup-based buttons.
  Optional on popup-based share buttons:
- `openShareDialogOnClick` (`boolean`, default `true`): Opens the popup automatically on click. `EmailShareButton` does not expose this prop because it always uses `mailto:` navigation.

The native button `title` attribute uses `htmlTitle` so it does not conflict with network share props named `title`:

```jsx
import { XShareButton, XIcon } from "react-share";

<XShareButton
  title="Share title sent to X"
  htmlTitle="Native button tooltip"
  url={shareUrl}
  aria-label="Share on X"
>
  <XIcon size={32} round />
</XShareButton>;
```

Basic example:

```jsx
import { FacebookShareButton, FacebookIcon } from "react-share";

<FacebookShareButton url={shareUrl} aria-label="Share this page on Facebook">
  <FacebookIcon size={32} round />
</FacebookShareButton>;
```

#### BlueskyShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- `separator` (`string`, default `" "`): Separator between the title and URL.

```jsx
import { BlueskyShareButton, BlueskyIcon } from "react-share";

<BlueskyShareButton title="Read this next" url={shareUrl} aria-label="Share on Bluesky">
  <BlueskyIcon size={32} round />
</BlueskyShareButton>;
```

#### EmailShareButton

Optional props:

- `subject` (`string`): Email subject line.
- `body` (`string`): Text prepended before the shared URL.
- `separator` (`string`, default `" "`): Separator between the body and URL.
- Notes:
  - Uses `mailto:` navigation instead of opening a popup.
  - Does not expose `openShareDialogOnClick` or `onClick`.

```jsx
import { EmailShareButton, EmailIcon } from "react-share";

<EmailShareButton
  subject="Take a look"
  body="Thought you might like this:"
  url={shareUrl}
  aria-label="Share by email"
>
  <EmailIcon size={32} round />
</EmailShareButton>;
```

#### FacebookMessengerShareButton

Extra required props:

- `appId` (`string`): Facebook application ID.
  Optional props:
- `redirectUri` (`string`): Redirect target after sharing. Defaults to the shared URL.
- `to` (`string`): Recipient user ID.
- Notes:
  - Mobile behavior depends on Meta's current app and dialog support.

```jsx
import { FacebookMessengerShareButton, FacebookMessengerIcon } from "react-share";

<FacebookMessengerShareButton appId={appId} url={shareUrl} aria-label="Send in Messenger">
  <FacebookMessengerIcon size={32} round />
</FacebookMessengerShareButton>;
```

#### FacebookShareButton

Optional props:

- `hashtag` (`string`): Hashtag to append to the shared content. Include the leading `#`.

```jsx
import { FacebookShareButton, FacebookIcon } from "react-share";

<FacebookShareButton hashtag="#reactshare" url={shareUrl} aria-label="Share on Facebook">
  <FacebookIcon size={32} round />
</FacebookShareButton>;
```

#### GabShareButton

Optional props:

- `title` (`string`): Title of the shared page.

```jsx
import { GabShareButton, GabIcon } from "react-share";

<GabShareButton title="Read this next" url={shareUrl} aria-label="Share on Gab">
  <GabIcon size={32} round />
</GabShareButton>;
```

#### HatenaShareButton

Optional props:

- `title` (`string`): Title of the shared page.

```jsx
import { HatenaShareButton, HatenaIcon } from "react-share";

<HatenaShareButton title="Read this next" url={shareUrl} aria-label="Share on Hatena">
  <HatenaIcon size={32} round />
</HatenaShareButton>;
```

#### InstapaperShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- `description` (`string`): Description of the shared page.

```jsx
import { InstapaperShareButton, InstapaperIcon } from "react-share";

<InstapaperShareButton
  title="Read this next"
  description="Quick summary"
  url={shareUrl}
  aria-label="Save to Instapaper"
>
  <InstapaperIcon size={32} round />
</InstapaperShareButton>;
```

#### LineShareButton

Optional props:

- `title` (`string`): Title of the shared page.

```jsx
import { LineShareButton, LineIcon } from "react-share";

<LineShareButton title="Read this next" url={shareUrl} aria-label="Share on Line">
  <LineIcon size={32} round />
</LineShareButton>;
```

#### LinkedinShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- `summary` (`string`): Description of the shared page.
- `source` (`string`): Source label such as your app or site name.
- Notes:
  - These fields are best-effort only and may be ignored or rewritten by LinkedIn.

```jsx
import { LinkedinShareButton, LinkedinIcon } from "react-share";

<LinkedinShareButton
  title="Read this next"
  summary="Quick summary"
  source="example.com"
  url={shareUrl}
  aria-label="Share on LinkedIn"
>
  <LinkedinIcon size={32} round />
</LinkedinShareButton>;
```

#### LivejournalShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- `description` (`string`): Description of the shared page.

```jsx
import { LivejournalShareButton, LivejournalIcon } from "react-share";

<LivejournalShareButton
  title="Read this next"
  description="Quick summary"
  url={shareUrl}
  aria-label="Share on LiveJournal"
>
  <LivejournalIcon size={32} round />
</LivejournalShareButton>;
```

#### MailruShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- `description` (`string`): Description of the shared page.
- `imageUrl` (`string`): Absolute image URL to include in the share payload.

```jsx
import { MailruShareButton, MailruIcon } from "react-share";

<MailruShareButton
  title="Read this next"
  description="Quick summary"
  imageUrl={imageUrl}
  url={shareUrl}
  aria-label="Share on Mail.ru"
>
  <MailruIcon size={32} round />
</MailruShareButton>;
```

#### OKShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- `description` (`string`): Description of the shared page.
- `image` (`string`): Absolute image URL to include in the share payload.

```jsx
import { OKShareButton, OKIcon } from "react-share";

<OKShareButton
  title="Read this next"
  description="Quick summary"
  image={imageUrl}
  url={shareUrl}
  aria-label="Share on OK"
>
  <OKIcon size={32} round />
</OKShareButton>;
```

#### PinterestShareButton

Extra required props:

- `media` (`string`): Absolute image URL to pin.
  Optional props:
- `description` (`string`): Description of the pin.
- `pinId` (`string`): Existing pin ID to treat new pins as repins.

```jsx
import { PinterestShareButton, PinterestIcon } from "react-share";

<PinterestShareButton
  media={imageUrl}
  description="Pin this"
  url={shareUrl}
  aria-label="Pin on Pinterest"
>
  <PinterestIcon size={32} round />
</PinterestShareButton>;
```

#### PocketShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- Notes:
  - If Pocket detects a title on the target page, it may ignore this prop and use page metadata instead.

```jsx
import { PocketShareButton, PocketIcon } from "react-share";

<PocketShareButton title="Read this next" url={shareUrl} aria-label="Save to Pocket">
  <PocketIcon size={32} round />
</PocketShareButton>;
```

#### RedditShareButton

Optional props:

- `title` (`string`): Title of the shared page.

```jsx
import { RedditShareButton, RedditIcon } from "react-share";

<RedditShareButton title="Read this next" url={shareUrl} aria-label="Share on Reddit">
  <RedditIcon size={32} round />
</RedditShareButton>;
```

#### TelegramShareButton

Optional props:

- `title` (`string`): Title of the shared page.

```jsx
import { TelegramShareButton, TelegramIcon } from "react-share";

<TelegramShareButton title="Read this next" url={shareUrl} aria-label="Share on Telegram">
  <TelegramIcon size={32} round />
</TelegramShareButton>;
```

#### ThreadsShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- `hashtags` (`string[]`): Deprecated compatibility prop. Ignored in v5 and removed in v6.
- `related` (`string[]`): Deprecated compatibility prop. Ignored in v5 and removed in v6.
- `via` (`string`): Deprecated compatibility prop. Ignored in v5 and removed in v6.

```jsx
import { ThreadsShareButton, ThreadsIcon } from "react-share";

<ThreadsShareButton title="Read this next" url={shareUrl} aria-label="Share on Threads">
  <ThreadsIcon size={32} round />
</ThreadsShareButton>;
```

#### TumblrShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- `tags` (`string[]`): Tags to attach to the post.
- `caption` (`string`): Description shown with the shared page.
- `posttype` (`string`, default `"link"`): Tumblr post type.

```jsx
import { TumblrShareButton, TumblrIcon } from "react-share";

<TumblrShareButton
  title="Read this next"
  caption="Quick summary"
  tags={["react", "share"]}
  url={shareUrl}
  aria-label="Share on Tumblr"
>
  <TumblrIcon size={32} round />
</TumblrShareButton>;
```

#### XShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- `via` (`string`): Account to attribute the share to.
- `hashtags` (`string[]`): Hashtags without the leading `#`.
- `related` (`string[]`): Related accounts to recommend.
- Notes:
  - X can ignore or rewrite some share fields.
  - `TwitterShareButton` remains available as a deprecated alias for backwards compatibility.

```jsx
import { XShareButton, XIcon } from "react-share";

<XShareButton
  title="Read this next"
  via="reactshare"
  hashtags={["react", "share"]}
  url={shareUrl}
  aria-label="Share on X"
>
  <XIcon size={32} round />
</XShareButton>;
```

#### ViberShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- `separator` (`string`, default `" "`): Separator between the title and URL.

```jsx
import { ViberShareButton, ViberIcon } from "react-share";

<ViberShareButton title="Read this next" url={shareUrl} aria-label="Share on Viber">
  <ViberIcon size={32} round />
</ViberShareButton>;
```

#### VKShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- `image` (`string`): Absolute image URL to include in the share payload.
- `noParse` (`boolean`): Prevent VK from retrieving URL information.
- `noVkLinks` (`boolean`): Hide profile links in the window. Relevant on mobile devices.

```jsx
import { VKShareButton, VKIcon } from "react-share";

<VKShareButton
  title="Read this next"
  image={imageUrl}
  noParse
  noVkLinks
  url={shareUrl}
  aria-label="Share on VK"
>
  <VKIcon size={32} round />
</VKShareButton>;
```

#### WeiboShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- `image` (`string`): Absolute image URL to include in the share payload.

```jsx
import { WeiboShareButton, WeiboIcon } from "react-share";

<WeiboShareButton
  title="Read this next"
  image={imageUrl}
  url={shareUrl}
  aria-label="Share on Weibo"
>
  <WeiboIcon size={32} round />
</WeiboShareButton>;
```

#### WhatsappShareButton

Optional props:

- `title` (`string`): Title of the shared page.
- `separator` (`string`, default `" "`): Separator between the title and URL.
- Notes:
  - Generates an `api.whatsapp.com` share URL.

```jsx
import { WhatsappShareButton, WhatsappIcon } from "react-share";

<WhatsappShareButton title="Read this next" url={shareUrl} aria-label="Share on WhatsApp">
  <WhatsappIcon size={32} round />
</WhatsappShareButton>;
```

#### WorkplaceShareButton

Optional props:

- `quote` (`string`): Quote to include with the share.
- `hashtag` (`string`): Hashtag to append to the share. Include the leading `#`.

```jsx
import { WorkplaceShareButton, WorkplaceIcon } from "react-share";

<WorkplaceShareButton
  quote="Worth a read"
  hashtag="#reactshare"
  url={shareUrl}
  aria-label="Share on Workplace"
>
  <WorkplaceIcon size={32} round />
</WorkplaceShareButton>;
```

### Share counts

Share count components are deprecated and will be removed in v6. They remain available in v5 as best-effort compatibility only, and upstream networks may stop returning counts without notice.

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

Supported components:

- `FacebookShareCount`
- `HatenaShareCount`
- `OKShareCount`
- `PinterestShareCount`
- `RedditShareCount`
- `TumblrShareCount`
- `VKShareCount`

Shared props:

- `url` (`string`, required): URL to look up.
- `children` (`(shareCount: number) => ReactNode`, optional): Render prop for custom output.
- Standard `<span>` attributes such as `className`, `aria-*`, and `data-*`.

Example:

```jsx
<FacebookShareCount url={shareUrl} />
```

Custom rendering:

```jsx
<FacebookShareCount url={shareUrl}>
  {(shareCount) => <span className="myShareCountWrapper">{shareCount}</span>}
</FacebookShareCount>
```

### Icons

All exported icons share the same props:

| Prop            | Type                      | Default   | Description                                                            |
| --------------- | ------------------------- | --------- | ---------------------------------------------------------------------- |
| `size`          | `number \| string`        | `64`      | Icon size.                                                             |
| `round`         | `boolean`                 | `false`   | Render a circular background instead of a rectangle.                   |
| `borderRadius`  | `number`                  | `0`       | Rounded corners when using the rectangular shape.                      |
| `bgStyle`       | `CSSProperties`           | `{}`      | Custom background styles such as `fill`.                               |
| `iconFillColor` | `string`                  | `"white"` | Fill color applied to icon paths that do not already specify one.      |
| `...svgProps`   | `SVGProps<SVGSVGElement>` | -         | Standard SVG attributes such as `className`, `aria-hidden`, `aria-label`, or `role`. |

Example:

```jsx
import { XIcon } from "react-share";

<XIcon aria-hidden="true" size={32} round />;
```

Standalone icons are raw SVG elements. Mark decorative icons with `aria-hidden="true"`, or provide an accessible name when the icon itself conveys meaning.

## Troubleshooting

- Popup blockers: share buttons use `window.open` from the click handler. If your app does async work in `beforeOnClick`, some browsers may treat the eventual popup as script-triggered and block it. In those cases, set `openShareDialogOnClick={false}` and manage the resulting URL yourself.
- Accessibility: icon-only buttons should always have an accessible name. Use `aria-label` or `aria-labelledby` on the share button; `htmlTitle` is only a tooltip.
- Mobile app handoff: some platforms open the browser, an in-app browser, or an extra tab before handing off to a native app. This behavior is controlled by the target platform and browser, not by `react-share`.
- iOS PWAs: standalone mode can show a blank intermediary page for schemes such as `mailto:` or native-app handoff URLs. This is a platform limitation.

### About semantic versioning

This library uses the standard semver convention. However, the share buttons and and counts are prone to lots of changes that are not in control of this library. For example: if Facebook decides to change or deprecate it's API in a major way, this library will not get a major version bump just because of that. Keep this in mind when you are planning the maintenance of your application.

## License

MIT

## Icons

Icon paths provided by:
[react-social-icons](https://github.com/jaketrent/react-social-icons).
