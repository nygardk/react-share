# react-share

[![NPM](https://img.shields.io/npm/v/react-share.svg)](https://www.npmjs.com/package/react-share) ![npm bundle size](https://img.shields.io/bundlephobia/min/react-share) [![downloads](https://img.shields.io/npm/dm/react-share.svg?label=monthly%20downloads)](https://www.npmjs.com/package/react-share) [![downloads](https://img.shields.io/npm/dt/react-share.svg?label=total%20downloads)](https://www.npmjs.com/package/react-share)

> Social media share buttons for your React apps.

![Share buttons screenshot](example.png)

## Install

```shell
npm install react-share
```

## Features

- no external script loading, i.e. no dependencies on SDKs
- supports tree shaking with ES modules
- opens a popup share-window
- includes opt-in mobile app handoff for selected messaging networks
- includes Web Share API helpers and a native share button
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
  - [Reddit](#redditsharebutton)
  - [Telegram](#telegramsharebutton)
  - [Threads](#threadssharebutton)
  - [Tumblr](#tumblrsharebutton)
  - [Viber](#vibersharebutton)
  - [VK](#vksharebutton)
  - [Weibo](#weibosharebutton)
  - [Whatsapp](#whatsappsharebutton)
  - [X](#xsharebutton)
- social media icons included in the library
- supports also custom icons

## Demo

- [Deployed demo](https://npm-react-share-demo.netlify.app) (from [`./demo`](./demo/))

- Locally: clone the repository and run `npm install && npm run demo`.

## Guides

- [Migrate v5 to v6](./docs/migrate-v5-to-v6.md)
- [Native and mobile sharing behavior](./docs/native-sharing.md)

## React compatibility

| Version | Compatible React versions     |
| ------- | ----------------------------- |
| 6       | `18`, `19`                    |
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
- `mobileBehavior` (`"web" | "app" | "auto"`): Supported only by `FacebookMessengerShareButton`, `TelegramShareButton`, `ViberShareButton`, and `WhatsappShareButton`. Defaults to `"web"`. `"app"` uses a best-effort app/deep link. `"auto"` prefers that app/deep link on detected mobile environments and otherwise keeps the web flow.

The native button `title` attribute uses `htmlTitle` so it does not conflict with share payload props such as `text`, `message`, `shareTitle`, or `postTitle`:

```jsx
import { XShareButton, XIcon } from "react-share";

<XShareButton
  text="Share text sent to X"
  htmlTitle="Native button tooltip"
  url={shareUrl}
  aria-label="Share on X"
>
  <XIcon size={32} />
</XShareButton>;
```

Basic example:

```jsx
import { FacebookShareButton, FacebookIcon } from "react-share";

<FacebookShareButton url={shareUrl} aria-label="Share this page on Facebook">
  <FacebookIcon size={32} />
</FacebookShareButton>;
```

Low-level helpers are also available when you want to generate a share URL or open a popup yourself. Every popup-based button has a matching `build*ShareUrl` export, such as `buildFacebookShareUrl`, `buildLinkedinShareUrl`, `buildWhatsappShareUrl`, and `buildXShareUrl`. `openShareWindow` exposes the same popup behavior used internally by the button components:

```jsx
import { buildXShareUrl, openShareWindow } from "react-share";

const url = buildXShareUrl(shareUrl, {
  text: "Read this next",
  hashtags: ["react", "share"],
});

openShareWindow(url, { width: 550, height: 400 });
```

For mobile-first or PWA-first flows, the package also exports `canNativeShare(data)` and `shareNative(data)` for the browser Web Share API.

#### NativeShareButton

Optional props:

- `title` (`string`): Native share title.
- `text` (`string`): Native share text.
- `url` (`string`): Native share URL.
- `files` (`File[]`): Files to share when the platform supports them.
- Notes:
  - Uses `navigator.share()` and disables itself when native sharing is unavailable.
  - For file sharing, capability checks rely on `navigator.canShare()`.

```jsx
import { NativeShareButton, NativeShareIcon } from "react-share";

<NativeShareButton
  title="Read this next"
  text="Thought you might like this"
  url={shareUrl}
  aria-label="Share with your device"
>
  <NativeShareIcon size={32} />
</NativeShareButton>;
```

#### BlueskyShareButton

Optional props:

- `text` (`string`): Text to share before the URL.
- `separator` (`string`, default `" "`): Separator between the text and URL.

```jsx
import { BlueskyShareButton, BlueskyIcon } from "react-share";

<BlueskyShareButton text="Read this next" url={shareUrl} aria-label="Share on Bluesky">
  <BlueskyIcon size={32} />
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
  <EmailIcon size={32} />
</EmailShareButton>;
```

#### FacebookMessengerShareButton

Extra required props:

- `appId` (`string`): Facebook application ID.
  Optional props:
- `redirectUri` (`string`): Redirect target after sharing. Defaults to the shared URL.
- `to` (`string`): Recipient user ID.
- `mobileBehavior` (`"web" | "app" | "auto"`, default `"web"`): Best-effort mobile strategy. `"app"` uses a Messenger deep link and `"auto"` only does that on detected mobile environments.
- Notes:
  - Mobile behavior depends on Meta's current app and dialog support and is less reliable than WhatsApp or Telegram app handoff.

```jsx
import { FacebookMessengerShareButton, FacebookMessengerIcon } from "react-share";

<FacebookMessengerShareButton
  appId={appId}
  mobileBehavior="app"
  url={shareUrl}
  aria-label="Send in Messenger"
>
  <FacebookMessengerIcon size={32} />
</FacebookMessengerShareButton>;
```

#### FacebookShareButton

Optional props:

- `hashtag` (`string`): Hashtag to append to the shared content. Include the leading `#`.

```jsx
import { FacebookShareButton, FacebookIcon } from "react-share";

<FacebookShareButton hashtag="#reactshare" url={shareUrl} aria-label="Share on Facebook">
  <FacebookIcon size={32} />
</FacebookShareButton>;
```

#### GabShareButton

Optional props:

- `text` (`string`): Text to share before the URL.

```jsx
import { GabShareButton, GabIcon } from "react-share";

<GabShareButton text="Read this next" url={shareUrl} aria-label="Share on Gab">
  <GabIcon size={32} />
</GabShareButton>;
```

#### HatenaShareButton

Optional props:

- `shareTitle` (`string`): Title sent in the share payload.

```jsx
import { HatenaShareButton, HatenaIcon } from "react-share";

<HatenaShareButton shareTitle="Read this next" url={shareUrl} aria-label="Share on Hatena">
  <HatenaIcon size={32} />
</HatenaShareButton>;
```

#### InstapaperShareButton

Optional props:

- `shareTitle` (`string`): Title sent in the share payload.
- `description` (`string`): Description of the shared page.

```jsx
import { InstapaperShareButton, InstapaperIcon } from "react-share";

<InstapaperShareButton
  shareTitle="Read this next"
  description="Quick summary"
  url={shareUrl}
  aria-label="Save to Instapaper"
>
  <InstapaperIcon size={32} />
</InstapaperShareButton>;
```

#### LineShareButton

Optional props:

- `text` (`string`): Text to share before the URL.

```jsx
import { LineShareButton, LineIcon } from "react-share";

<LineShareButton text="Read this next" url={shareUrl} aria-label="Share on Line">
  <LineIcon size={32} />
</LineShareButton>;
```

#### LinkedinShareButton

- Notes:
  - LinkedIn sharing is URL-first and best-effort.
  - The button only sends the shared URL because LinkedIn no longer provides a reliable public URL-based way to prefill title, summary, or source values.

```jsx
import { LinkedinShareButton, LinkedinIcon } from "react-share";

<LinkedinShareButton url={shareUrl} aria-label="Share on LinkedIn">
  <LinkedinIcon size={32} />
</LinkedinShareButton>;
```

#### LivejournalShareButton

Optional props:

- `shareTitle` (`string`): Title sent in the share payload.
- `description` (`string`): Description of the shared page.

```jsx
import { LivejournalShareButton, LivejournalIcon } from "react-share";

<LivejournalShareButton
  shareTitle="Read this next"
  description="Quick summary"
  url={shareUrl}
  aria-label="Share on LiveJournal"
>
  <LivejournalIcon size={32} />
</LivejournalShareButton>;
```

#### MailruShareButton

Optional props:

- `shareTitle` (`string`): Title sent in the share payload.
- `description` (`string`): Description of the shared page.
- `imageUrl` (`string`): Absolute image URL to include in the share payload.

```jsx
import { MailruShareButton, MailruIcon } from "react-share";

<MailruShareButton
  shareTitle="Read this next"
  description="Quick summary"
  imageUrl={imageUrl}
  url={shareUrl}
  aria-label="Share on Mail.ru"
>
  <MailruIcon size={32} />
</MailruShareButton>;
```

#### OKShareButton

Optional props:

- `shareTitle` (`string`): Title sent in the share payload.
- `description` (`string`): Description of the shared page.
- `image` (`string`): Absolute image URL to include in the share payload.

```jsx
import { OKShareButton, OKIcon } from "react-share";

<OKShareButton
  shareTitle="Read this next"
  description="Quick summary"
  image={imageUrl}
  url={shareUrl}
  aria-label="Share on OK"
>
  <OKIcon size={32} />
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
  <PinterestIcon size={32} />
</PinterestShareButton>;
```

#### RedditShareButton

Optional props:

- `shareTitle` (`string`): Title sent in the share payload.

```jsx
import { RedditShareButton, RedditIcon } from "react-share";

<RedditShareButton shareTitle="Read this next" url={shareUrl} aria-label="Share on Reddit">
  <RedditIcon size={32} />
</RedditShareButton>;
```

#### TelegramShareButton

Optional props:

- `text` (`string`): Text to share before the URL.

```jsx
import { TelegramShareButton, TelegramIcon } from "react-share";

<TelegramShareButton
  text="Read this next"
  mobileBehavior="app"
  url={shareUrl}
  aria-label="Share on Telegram"
>
  <TelegramIcon size={32} />
</TelegramShareButton>;
```

#### ThreadsShareButton

Optional props:

- `text` (`string`): Text to share before the URL.

```jsx
import { ThreadsShareButton, ThreadsIcon } from "react-share";

<ThreadsShareButton text="Read this next" url={shareUrl} aria-label="Share on Threads">
  <ThreadsIcon size={32} />
</ThreadsShareButton>;
```

#### TumblrShareButton

Optional props:

- `postTitle` (`string`): Title sent in the Tumblr post payload.
- `tags` (`string[]`): Tags to attach to the post.
- `caption` (`string`): Description shown with the shared page.
- `posttype` (`string`, default `"link"`): Tumblr post type.

```jsx
import { TumblrShareButton, TumblrIcon } from "react-share";

<TumblrShareButton
  postTitle="Read this next"
  caption="Quick summary"
  tags={["react", "share"]}
  url={shareUrl}
  aria-label="Share on Tumblr"
>
  <TumblrIcon size={32} />
</TumblrShareButton>;
```

#### XShareButton

Optional props:

- `text` (`string`): Text to share before the URL.
- `via` (`string`): Account to attribute the share to.
- `hashtags` (`string[]`): Hashtags without the leading `#`.
- `related` (`string[]`): Related accounts to recommend.
- Notes:
  - X can ignore or rewrite some share fields.

```jsx
import { XShareButton, XIcon } from "react-share";

<XShareButton
  text="Read this next"
  via="reactshare"
  hashtags={["react", "share"]}
  url={shareUrl}
  aria-label="Share on X"
>
  <XIcon size={32} />
</XShareButton>;
```

#### ViberShareButton

Optional props:

- `message` (`string`): Message to share before the URL.
- `separator` (`string`, default `" "`): Separator between the message and URL.
- `mobileBehavior` (`"web" | "app" | "auto"`, default `"web"`): `"app"` navigates to the Viber URL scheme directly and `"auto"` uses that path only on detected mobile environments.

```jsx
import { ViberShareButton, ViberIcon } from "react-share";

<ViberShareButton
  message="Read this next"
  mobileBehavior="app"
  url={shareUrl}
  aria-label="Share on Viber"
>
  <ViberIcon size={32} />
</ViberShareButton>;
```

#### VKShareButton

Optional props:

- `shareTitle` (`string`): Title sent in the share payload.
- `image` (`string`): Absolute image URL to include in the share payload.
- `noParse` (`boolean`): Prevent VK from retrieving URL information.
- `noVkLinks` (`boolean`): Hide profile links in the window. Relevant on mobile devices.

```jsx
import { VKShareButton, VKIcon } from "react-share";

<VKShareButton
  shareTitle="Read this next"
  image={imageUrl}
  noParse
  noVkLinks
  url={shareUrl}
  aria-label="Share on VK"
>
  <VKIcon size={32} />
</VKShareButton>;
```

#### WeiboShareButton

Optional props:

- `shareTitle` (`string`): Title sent in the share payload.
- `image` (`string`): Absolute image URL to include in the share payload.

```jsx
import { WeiboShareButton, WeiboIcon } from "react-share";

<WeiboShareButton
  shareTitle="Read this next"
  image={imageUrl}
  url={shareUrl}
  aria-label="Share on Weibo"
>
  <WeiboIcon size={32} />
</WeiboShareButton>;
```

#### WhatsappShareButton

Optional props:

- `message` (`string`): Message to share before the URL.
- `separator` (`string`, default `" "`): Separator between the message and URL.
- `mobileBehavior` (`"web" | "app" | "auto"`, default `"web"`): `"app"` uses a WhatsApp app link and `"auto"` uses it only on detected mobile environments.
- Notes:
  - Generates an `api.whatsapp.com` share URL.

```jsx
import { WhatsappShareButton, WhatsappIcon } from "react-share";

<WhatsappShareButton
  message="Read this next"
  mobileBehavior="app"
  url={shareUrl}
  aria-label="Share on WhatsApp"
>
  <WhatsappIcon size={32} />
</WhatsappShareButton>;
```

### Icons

v6 exports two icon families:

- `*Icon`: raw, background-free network logos.
- `*LegacyIcon`: the v5 badge-style icons with customizable backgrounds.

Raw icons use a smaller, simpler prop surface:

| Prop          | Type                      | Default | Description                                                            |
| ------------- | ------------------------- | ------- | ---------------------------------------------------------------------- |
| `size`        | `number \| string`        | `24`    | Icon size.                                                             |
| `...svgProps` | `SVGProps<SVGSVGElement>` | -       | Standard SVG attributes such as `className`, `aria-hidden`, `aria-label`, or `role`. |

Example:

```jsx
import { XIcon } from "react-share";

<XIcon aria-hidden="true" size={32} />;
```

Most raw icons render with their default brand color. `NativeShareIcon` follows the current text color so it can blend into generic action UI.

Legacy icons preserve the old badge look and prop contract:

| Prop            | Type                      | Default   | Description                                                            |
| --------------- | ------------------------- | --------- | ---------------------------------------------------------------------- |
| `size`          | `number \| string`        | `64`      | Icon size.                                                             |
| `round`         | `boolean`                 | `false`   | Render a circular background instead of a rectangle.                   |
| `borderRadius`  | `number`                  | `0`       | Rounded corners when using the rectangular shape.                      |
| `bgStyle`       | `CSSProperties`           | `{}`      | Custom background styles such as `fill`.                               |
| `iconFillColor` | `string`                  | `"white"` | Fill color applied to icon paths that do not already specify one.      |
| `...svgProps`   | `SVGProps<SVGSVGElement>` | -         | Standard SVG attributes such as `className`, `aria-hidden`, `aria-label`, or `role`. |

```jsx
import { XLegacyIcon } from "react-share";

<XLegacyIcon aria-hidden="true" size={32} round />;
```

Standalone icons are raw SVG elements. Mark decorative icons with `aria-hidden="true"`, or provide an accessible name when the icon itself conveys meaning.

## Troubleshooting

- Popup blockers: share buttons use `window.open` from the click handler. If your app does async work in `beforeOnClick`, some browsers may treat the eventual popup as script-triggered and block it. In those cases, set `openShareDialogOnClick={false}` and manage the resulting URL yourself.
- Accessibility: icon-only buttons should always have an accessible name. Use `aria-label` or `aria-labelledby` on the share button; `htmlTitle` is only a tooltip.
- Mobile app handoff: some platforms open the browser, an in-app browser, or an extra tab before handing off to a native app. This behavior is controlled by the target platform and browser, not by `react-share`.
- Mobile app strategies: `mobileBehavior="app"` and `mobileBehavior="auto"` are best-effort only. The library does not try to detect whether an app-open succeeded or guarantee a browser fallback path.
- iOS PWAs: standalone mode can show a blank intermediary page for schemes such as `mailto:` or native-app handoff URLs. This is a platform limitation.

### About semantic versioning

This library uses the standard semver convention. However, the share buttons are prone to lots of changes that are not in control of this library. For example: if Facebook decides to change or deprecate its API in a major way, this library will not get a major version bump just because of that. Keep this in mind when you are planning the maintenance of your application.

## License

MIT

## Icon sources

Raw icons are vendored from [Simple Icons](https://simpleicons.org/) where there is a strong canonical match, with a small set of repo-local custom glyphs for unsupported networks and the generic native-share icon.

Legacy icon badge paths are preserved from the earlier [react-social-icons](https://github.com/jaketrent/react-social-icons)-based implementation.
