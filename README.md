# react-share

[![NPM](https://img.shields.io/npm/v/react-share.svg)](https://www.npmjs.com/package/react-share) ![npm bundle size](https://img.shields.io/bundlephobia/min/react-share) [![downloads](https://img.shields.io/npm/dm/react-share.svg?label=monthly%20downloads)](https://www.npmjs.com/package/react-share) [![downloads](https://img.shields.io/npm/dt/react-share.svg?label=total%20downloads)](https://www.npmjs.com/package/react-share)

> Social media share buttons for your React apps.

![Share buttons screenshot](example.svg)

## Contents

- [Features](#features)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Supported networks](#supported-networks)
- [Share buttons](#share-buttons)
- [Native sharing](#native-sharing)
- [Mobile app handoff](#mobile-app-handoff)
- [Icons](#icons)
- [Building share URLs yourself](#building-share-urls-yourself)
- [Accessibility](#accessibility)
- [Troubleshooting](#troubleshooting)
- [Compatibility and versioning](#compatibility-and-versioning)
- [Development](#development)
- [License](#license)

## Features

- No external script loading, i.e. no dependencies on network SDKs.
- Tree-shakeable ES modules: import only the buttons and icons you use.
- Share buttons for [22 networks](#supported-networks).
- Opens a popup share window instead of navigating away.
- A [native share button](#native-sharing) and helpers for the browser Web Share API.
- Opt-in [mobile app handoff](#mobile-app-handoff) for selected messaging networks.
- Bundled network icons in two styles, or bring your own icons.
- Marked with `"use client"`, so it works from React Server Components.

## Installation

```shell
npm install react-share
```

react-share 6 supports React 18 and 19. See [Compatibility and versioning](#compatibility-and-versioning) for older versions.

Upgrading from v5? Follow the [v5 to v6 migration guide](./docs/migrate-v5-to-v6.md).

## Quick start

Each network has a share button and a matching icon. Put the icon (or any other content) inside the button, and give icon-only buttons an `aria-label`:

```jsx
import { FacebookShareButton, FacebookIcon, XShareButton, XIcon } from "react-share";

const shareUrl = "https://example.com/article";

export function ShareBar() {
  return (
    <div>
      <FacebookShareButton url={shareUrl} aria-label="Share this page on Facebook">
        <FacebookIcon size={32} />
      </FacebookShareButton>

      <XShareButton url={shareUrl} text="Read this next" aria-label="Share on X">
        <XIcon size={32} />
      </XShareButton>
    </div>
  );
}
```

Clicking a button opens the network's share page in a popup window.

See every button in action in the [deployed demo](https://npm-react-share-demo.netlify.app) (source in [`./demo`](./demo/)).

## Supported networks

| Network            | Button                                                          | Icon                    | Network-specific props                             |
| ------------------ | --------------------------------------------------------------- | ----------------------- | -------------------------------------------------- |
| Bluesky            | [`BlueskyShareButton`](#blueskysharebutton)                     | `BlueskyIcon`           | `text`, `separator`                                |
| Email              | [`EmailShareButton`](#emailsharebutton)                         | `EmailIcon`             | `subject`, `body`, `separator`                     |
| Facebook           | [`FacebookShareButton`](#facebooksharebutton)                   | `FacebookIcon`          | `hashtag`                                          |
| Facebook Messenger | [`FacebookMessengerShareButton`](#facebookmessengersharebutton) | `FacebookMessengerIcon` | **`appId`**, `redirectUri`, `to`, `mobileBehavior` |
| Gab                | [`GabShareButton`](#gabsharebutton)                             | `GabIcon`               | `text`                                             |
| Hatena             | [`HatenaShareButton`](#hatenasharebutton)                       | `HatenaIcon`            | `shareTitle`                                       |
| Instapaper         | [`InstapaperShareButton`](#instapapersharebutton)               | `InstapaperIcon`        | `shareTitle`, `description`                        |
| Line               | [`LineShareButton`](#linesharebutton)                           | `LineIcon`              | `text`                                             |
| LinkedIn           | [`LinkedinShareButton`](#linkedinsharebutton)                   | `LinkedinIcon`          | –                                                  |
| LiveJournal        | [`LivejournalShareButton`](#livejournalsharebutton)             | `LivejournalIcon`       | `shareTitle`, `description`                        |
| Mail.Ru            | [`MailruShareButton`](#mailrusharebutton)                       | `MailruIcon`            | `shareTitle`, `description`, `imageUrl`            |
| Odnoklassniki      | [`OKShareButton`](#oksharebutton)                               | `OKIcon`                | `shareTitle`, `description`, `image`               |
| Pinterest          | [`PinterestShareButton`](#pinterestsharebutton)                 | `PinterestIcon`         | **`media`**, `description`, `pinId`                |
| Reddit             | [`RedditShareButton`](#redditsharebutton)                       | `RedditIcon`            | `shareTitle`                                       |
| Telegram           | [`TelegramShareButton`](#telegramsharebutton)                   | `TelegramIcon`          | `text`, `mobileBehavior`                           |
| Threads            | [`ThreadsShareButton`](#threadssharebutton)                     | `ThreadsIcon`           | `text`                                             |
| Tumblr             | [`TumblrShareButton`](#tumblrsharebutton)                       | `TumblrIcon`            | `postTitle`, `tags`, `caption`, `posttype`         |
| Viber              | [`ViberShareButton`](#vibersharebutton)                         | `ViberIcon`             | `message`, `separator`, `mobileBehavior`           |
| VK                 | [`VKShareButton`](#vksharebutton)                               | `VKIcon`                | `shareTitle`, `image`, `noParse`, `noVkLinks`      |
| Weibo              | [`WeiboShareButton`](#weibosharebutton)                         | `WeiboIcon`             | `shareTitle`, `image`                              |
| WhatsApp           | [`WhatsappShareButton`](#whatsappsharebutton)                   | `WhatsappIcon`          | `message`, `separator`, `mobileBehavior`           |
| X                  | [`XShareButton`](#xsharebutton)                                 | `XIcon`                 | `text`, `via`, `hashtags`, `related`               |
| Device share sheet | [`NativeShareButton`](#nativesharebutton)                       | `NativeShareIcon`       | `title`, `text`, `url`, `files`                    |

Required props are in **bold**. Every icon also has a badge-style `*LegacyIcon` variant (see [Icons](#icons)), and every network button has a matching `build*ShareUrl` helper (see [Building share URLs yourself](#building-share-urls-yourself)).

## Share buttons

All share buttons render a native `<button>` element and pass through standard button attributes such as `aria-label`, `aria-labelledby`, `aria-describedby`, `name`, and `data-*`.

Buttons and icons are separate named exports. Pass any element as `children` to use your own icon set instead of the bundled icons.

### Common props

These props apply to every network share button. `NativeShareButton` has its [own props](#nativesharebutton).

**Required**

| Prop       | Type        | Description             |
| ---------- | ----------- | ----------------------- |
| `children` | `ReactNode` | Button contents.        |
| `url`      | `string`    | URL of the shared page. |

**Optional, all share buttons**

| Prop               | Type                          | Default            | Description                                                                                                                                                                                                                                                                                                                                                   |
| ------------------ | ----------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `beforeOnClick`    | `() => Promise<void> \| void` | –                  | Runs before the share action. If it returns a promise, popup-based buttons open the popup immediately (so popup blockers allow it) and load the share URL once the promise resolves. Reject the promise to cancel sharing and close the popup. The share URL is built from the props at click time, so state updated inside `beforeOnClick` is not picked up. |
| `disabled`         | `boolean`                     | –                  | Disables click handling and adds a `disabled` class.                                                                                                                                                                                                                                                                                                          |
| `disabledStyle`    | `CSSProperties`               | `{ opacity: 0.6 }` | Applied when `disabled` is true.                                                                                                                                                                                                                                                                                                                              |
| `htmlTitle`        | `string`                      | –                  | Sets the native `title` attribute on the underlying button.                                                                                                                                                                                                                                                                                                   |
| `onClick`          | `(event, link) => void`       | –                  | Called with the click event and generated share URL after link generation. Not exposed by `EmailShareButton`.                                                                                                                                                                                                                                                 |
| `resetButtonStyle` | `boolean`                     | `true`             | Resets native button styles unless disabled.                                                                                                                                                                                                                                                                                                                  |

**Optional, popup-based buttons (all except `EmailShareButton`)**

| Prop                     | Type                                    | Default | Description                                                                                                                                                  |
| ------------------------ | --------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `openShareDialogOnClick` | `boolean`                               | `true`  | Opens the popup automatically on click. `EmailShareButton` does not expose this prop because it always uses `mailto:` navigation.                            |
| `onShareWindowOpen`      | `(shareWindow: Window \| null) => void` | –       | Called after the popup opens. Receives `null` when a popup blocker prevented the window from opening, so you can fall back to another sharing flow.          |
| `onShareWindowClose`     | `() => void`                            | –       | Called after the popup closes.                                                                                                                               |
| `windowWidth`            | `number`                                | –       | Overrides the popup width.                                                                                                                                   |
| `windowHeight`           | `number`                                | –       | Overrides the popup height.                                                                                                                                  |
| `windowPosition`         | `"windowCenter" \| "screenCenter"`      | –       | Controls popup positioning.                                                                                                                                  |
| `mobileBehavior`         | `"web" \| "app" \| "auto"`              | `"web"` | Only on `FacebookMessengerShareButton`, `TelegramShareButton`, `ViberShareButton`, and `WhatsappShareButton`. See [Mobile app handoff](#mobile-app-handoff). |

### Native tooltip vs. shared text

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

### Network-specific props

Each button accepts the [common props](#common-props) plus the props below.

#### BlueskyShareButton

| Prop        | Type     | Default | Description                         |
| ----------- | -------- | ------- | ----------------------------------- |
| `text`      | `string` | –       | Text to share before the URL.       |
| `separator` | `string` | `" "`   | Separator between the text and URL. |

<details>
<summary>Example</summary>

```jsx
import { BlueskyShareButton, BlueskyIcon } from "react-share";

<BlueskyShareButton text="Read this next" url={shareUrl} aria-label="Share on Bluesky">
  <BlueskyIcon size={32} />
</BlueskyShareButton>;
```

</details>

#### EmailShareButton

| Prop        | Type     | Default | Description                                                                   |
| ----------- | -------- | ------- | ----------------------------------------------------------------------------- |
| `subject`   | `string` | –       | Email subject line.                                                           |
| `body`      | `string` | –       | Text prepended before the shared URL.                                         |
| `separator` | `string` | `"\n"`  | Separator between the body and URL. The default puts the URL on its own line. |

- Uses `mailto:` navigation instead of opening a popup.
- Does not expose `openShareDialogOnClick` or `onClick`.

<details>
<summary>Example</summary>

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

</details>

#### FacebookShareButton

| Prop      | Type     | Default | Description                                                       |
| --------- | -------- | ------- | ----------------------------------------------------------------- |
| `hashtag` | `string` | –       | Hashtag to append to the shared content. Include the leading `#`. |

<details>
<summary>Example</summary>

```jsx
import { FacebookShareButton, FacebookIcon } from "react-share";

<FacebookShareButton hashtag="#reactshare" url={shareUrl} aria-label="Share on Facebook">
  <FacebookIcon size={32} />
</FacebookShareButton>;
```

</details>

#### FacebookMessengerShareButton

| Prop                   | Type                       | Default | Description                                                                                                                  |
| ---------------------- | -------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `appId` **(required)** | `string`                   | –       | Facebook application ID.                                                                                                     |
| `redirectUri`          | `string`                   | `url`   | Redirect target after sharing. Defaults to the shared URL.                                                                   |
| `to`                   | `string`                   | –       | Recipient user ID.                                                                                                           |
| `mobileBehavior`       | `"web" \| "app" \| "auto"` | `"web"` | Best-effort mobile strategy. `"app"` uses a Messenger deep link and `"auto"` only does that on detected mobile environments. |

- Mobile behavior depends on Meta's current app and dialog support and is less reliable than WhatsApp or Telegram app handoff.

<details>
<summary>Example</summary>

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

</details>

#### GabShareButton

| Prop   | Type     | Default | Description                   |
| ------ | -------- | ------- | ----------------------------- |
| `text` | `string` | –       | Text to share before the URL. |

<details>
<summary>Example</summary>

```jsx
import { GabShareButton, GabIcon } from "react-share";

<GabShareButton text="Read this next" url={shareUrl} aria-label="Share on Gab">
  <GabIcon size={32} />
</GabShareButton>;
```

</details>

#### HatenaShareButton

| Prop         | Type     | Default | Description                      |
| ------------ | -------- | ------- | -------------------------------- |
| `shareTitle` | `string` | –       | Title sent in the share payload. |

<details>
<summary>Example</summary>

```jsx
import { HatenaShareButton, HatenaIcon } from "react-share";

<HatenaShareButton shareTitle="Read this next" url={shareUrl} aria-label="Share on Hatena">
  <HatenaIcon size={32} />
</HatenaShareButton>;
```

</details>

#### InstapaperShareButton

| Prop          | Type     | Default | Description                      |
| ------------- | -------- | ------- | -------------------------------- |
| `shareTitle`  | `string` | –       | Title sent in the share payload. |
| `description` | `string` | –       | Description of the shared page.  |

<details>
<summary>Example</summary>

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

</details>

#### LineShareButton

| Prop   | Type     | Default | Description                   |
| ------ | -------- | ------- | ----------------------------- |
| `text` | `string` | –       | Text to share before the URL. |

<details>
<summary>Example</summary>

```jsx
import { LineShareButton, LineIcon } from "react-share";

<LineShareButton text="Read this next" url={shareUrl} aria-label="Share on Line">
  <LineIcon size={32} />
</LineShareButton>;
```

</details>

#### LinkedinShareButton

No network-specific props.

- LinkedIn sharing is URL-first and best-effort.
- The button only sends the shared URL because LinkedIn no longer provides a reliable public URL-based way to prefill title, summary, or source values.

<details>
<summary>Example</summary>

```jsx
import { LinkedinShareButton, LinkedinIcon } from "react-share";

<LinkedinShareButton url={shareUrl} aria-label="Share on LinkedIn">
  <LinkedinIcon size={32} />
</LinkedinShareButton>;
```

</details>

#### LivejournalShareButton

| Prop          | Type     | Default | Description                      |
| ------------- | -------- | ------- | -------------------------------- |
| `shareTitle`  | `string` | –       | Title sent in the share payload. |
| `description` | `string` | –       | Description of the shared page.  |

<details>
<summary>Example</summary>

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

</details>

#### MailruShareButton

| Prop          | Type     | Default | Description                                         |
| ------------- | -------- | ------- | --------------------------------------------------- |
| `shareTitle`  | `string` | –       | Title sent in the share payload.                    |
| `description` | `string` | –       | Description of the shared page.                     |
| `imageUrl`    | `string` | –       | Absolute image URL to include in the share payload. |

<details>
<summary>Example</summary>

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

</details>

#### OKShareButton

| Prop          | Type     | Default | Description                                         |
| ------------- | -------- | ------- | --------------------------------------------------- |
| `shareTitle`  | `string` | –       | Title sent in the share payload.                    |
| `description` | `string` | –       | Description of the shared page.                     |
| `image`       | `string` | –       | Absolute image URL to include in the share payload. |

<details>
<summary>Example</summary>

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

</details>

#### PinterestShareButton

| Prop                   | Type     | Default | Description                                  |
| ---------------------- | -------- | ------- | -------------------------------------------- |
| `media` **(required)** | `string` | –       | Absolute image URL to pin.                   |
| `description`          | `string` | –       | Description of the pin.                      |
| `pinId`                | `string` | –       | Existing pin ID to treat new pins as repins. |

<details>
<summary>Example</summary>

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

</details>

#### RedditShareButton

| Prop         | Type     | Default | Description                      |
| ------------ | -------- | ------- | -------------------------------- |
| `shareTitle` | `string` | –       | Title sent in the share payload. |

<details>
<summary>Example</summary>

```jsx
import { RedditShareButton, RedditIcon } from "react-share";

<RedditShareButton shareTitle="Read this next" url={shareUrl} aria-label="Share on Reddit">
  <RedditIcon size={32} />
</RedditShareButton>;
```

</details>

#### TelegramShareButton

| Prop             | Type                       | Default | Description                                                                 |
| ---------------- | -------------------------- | ------- | --------------------------------------------------------------------------- |
| `text`           | `string`                   | –       | Text to share before the URL.                                               |
| `mobileBehavior` | `"web" \| "app" \| "auto"` | `"web"` | Best-effort mobile strategy. See [Mobile app handoff](#mobile-app-handoff). |

<details>
<summary>Example</summary>

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

</details>

#### ThreadsShareButton

| Prop   | Type     | Default | Description                   |
| ------ | -------- | ------- | ----------------------------- |
| `text` | `string` | –       | Text to share before the URL. |

<details>
<summary>Example</summary>

```jsx
import { ThreadsShareButton, ThreadsIcon } from "react-share";

<ThreadsShareButton text="Read this next" url={shareUrl} aria-label="Share on Threads">
  <ThreadsIcon size={32} />
</ThreadsShareButton>;
```

</details>

#### TumblrShareButton

| Prop        | Type       | Default  | Description                             |
| ----------- | ---------- | -------- | --------------------------------------- |
| `postTitle` | `string`   | –        | Title sent in the Tumblr post payload.  |
| `tags`      | `string[]` | –        | Tags to attach to the post.             |
| `caption`   | `string`   | –        | Description shown with the shared page. |
| `posttype`  | `string`   | `"link"` | Tumblr post type.                       |

<details>
<summary>Example</summary>

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

</details>

#### ViberShareButton

| Prop             | Type                       | Default | Description                                                                                                          |
| ---------------- | -------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `message`        | `string`                   | –       | Message to share before the URL.                                                                                     |
| `separator`      | `string`                   | `" "`   | Separator between the message and URL.                                                                               |
| `mobileBehavior` | `"web" \| "app" \| "auto"` | `"web"` | `"app"` navigates to the Viber URL scheme directly and `"auto"` uses that path only on detected mobile environments. |

<details>
<summary>Example</summary>

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

</details>

#### VKShareButton

| Prop         | Type      | Default | Description                                                   |
| ------------ | --------- | ------- | ------------------------------------------------------------- |
| `shareTitle` | `string`  | –       | Title sent in the share payload.                              |
| `image`      | `string`  | –       | Absolute image URL to include in the share payload.           |
| `noParse`    | `boolean` | –       | Prevent VK from retrieving URL information.                   |
| `noVkLinks`  | `boolean` | –       | Hide profile links in the window. Relevant on mobile devices. |

<details>
<summary>Example</summary>

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

</details>

#### WeiboShareButton

| Prop         | Type     | Default | Description                                         |
| ------------ | -------- | ------- | --------------------------------------------------- |
| `shareTitle` | `string` | –       | Title sent in the share payload.                    |
| `image`      | `string` | –       | Absolute image URL to include in the share payload. |

<details>
<summary>Example</summary>

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

</details>

#### WhatsappShareButton

| Prop             | Type                       | Default | Description                                                                                 |
| ---------------- | -------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `message`        | `string`                   | –       | Message to share before the URL.                                                            |
| `separator`      | `string`                   | `" "`   | Separator between the message and URL.                                                      |
| `mobileBehavior` | `"web" \| "app" \| "auto"` | `"web"` | `"app"` uses a WhatsApp app link and `"auto"` uses it only on detected mobile environments. |

- Generates an `api.whatsapp.com` share URL.

<details>
<summary>Example</summary>

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

</details>

#### XShareButton

| Prop       | Type       | Default | Description                                                   |
| ---------- | ---------- | ------- | ------------------------------------------------------------- |
| `url`      | `string`   | –       | Optional for X. Set `text` instead to share a text-only post. |
| `text`     | `string`   | –       | Text to share before the URL.                                 |
| `via`      | `string`   | –       | Account to attribute the share to.                            |
| `hashtags` | `string[]` | –       | Hashtags without the leading `#`.                             |
| `related`  | `string[]` | –       | Related accounts to recommend.                                |

- X can ignore or rewrite some share fields.

<details>
<summary>Example</summary>

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

</details>

## Native sharing

For mobile-first or PWA-first flows, react-share supports the browser [Web Share API](https://developer.mozilla.org/docs/Web/API/Navigator/share), which opens the device's own share sheet.

### NativeShareButton

| Prop    | Type     | Description                                     |
| ------- | -------- | ----------------------------------------------- |
| `title` | `string` | Native share title.                             |
| `text`  | `string` | Native share text.                              |
| `url`   | `string` | Native share URL.                               |
| `files` | `File[]` | Files to share when the platform supports them. |

All props are optional. `NativeShareButton` also accepts `beforeOnClick`, `disabled`, `disabledStyle`, `htmlTitle`, and `resetButtonStyle` from the [common props](#common-props).

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

### Helpers

To build your own UI around the Web Share API, use `canNativeShare(data)` to check support and `shareNative(data)` to open the share sheet.

See [Native and mobile sharing behavior](./docs/native-sharing.md) for how native sharing, popups, and app handoff fit together.

## Mobile app handoff

`FacebookMessengerShareButton`, `TelegramShareButton`, `ViberShareButton`, and `WhatsappShareButton` accept a `mobileBehavior` prop:

| Value             | Behavior                                                                                     |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `"web"` (default) | Always use the web popup flow.                                                               |
| `"app"`           | Use a best-effort app/deep link.                                                             |
| `"auto"`          | Prefer the app/deep link on detected mobile environments; otherwise keep the web popup flow. |

```jsx
<WhatsappShareButton url={shareUrl} mobileBehavior="auto" aria-label="Share on WhatsApp">
  <WhatsappIcon size={32} />
</WhatsappShareButton>
```

`"app"` and `"auto"` are best-effort only. The library does not try to detect whether an app-open succeeded or guarantee a browser fallback path. Some platforms open the browser, an in-app browser, or an extra tab before handing off to a native app. This behavior is controlled by the target platform and browser, not by `react-share`.

## Icons

v6 exports two icon families:

- `*Icon`: network logos without customizable backgrounds. Glyph-only marks such as X, Weibo, and Tumblr sit on a circle so every icon has a similar visual weight, and logo details stay white so the icons work on dark backgrounds.
- `*LegacyIcon`: the v5 badge-style icons with customizable backgrounds.

Icons are standalone SVG components, so you can use them outside share buttons too. To use your own icon set instead, pass any element as the share button's `children`.

### Icon props

| Prop          | Type                      | Default | Description                                                                          |
| ------------- | ------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `size`        | `number \| string`        | `24`    | Icon size.                                                                           |
| `color`       | `string`                  | brand   | Icon color.                                                                          |
| `...svgProps` | `SVGProps<SVGSVGElement>` | -       | Standard SVG attributes such as `className`, `aria-hidden`, `aria-label`, or `role`. |

```jsx
import { XIcon } from "react-share";

<XIcon aria-hidden="true" size={32} />;
```

Most icons render with their default brand color. Pass `color` to recolor the brand-colored part of any icon; white logo details stay white.

### Legacy icon props

Legacy icons preserve the old badge look and prop contract:

| Prop            | Type                      | Default   | Description                                                                          |
| --------------- | ------------------------- | --------- | ------------------------------------------------------------------------------------ |
| `size`          | `number \| string`        | `64`      | Icon size.                                                                           |
| `round`         | `boolean`                 | `false`   | Render a circular background instead of a rectangle.                                 |
| `borderRadius`  | `number`                  | `0`       | Rounded corners when using the rectangular shape.                                    |
| `bgStyle`       | `CSSProperties`           | `{}`      | Custom background styles such as `fill`.                                             |
| `iconFillColor` | `string`                  | `"white"` | Fill color applied to icon paths that do not already specify one.                    |
| `...svgProps`   | `SVGProps<SVGSVGElement>` | -         | Standard SVG attributes such as `className`, `aria-hidden`, `aria-label`, or `role`. |

```jsx
import { XLegacyIcon } from "react-share";

<XLegacyIcon aria-hidden="true" size={32} round />;
```

## Building share URLs yourself

Low-level helpers let you generate a share URL or open a popup without the button components. Every network button has a matching `build*ShareUrl` export, such as `buildFacebookShareUrl`, `buildLinkedinShareUrl`, `buildWhatsappShareUrl`, and `buildXShareUrl`. `openShareWindow` exposes the same popup behavior used internally by the button components:

```jsx
import { buildXShareUrl, openShareWindow } from "react-share";

const url = buildXShareUrl(shareUrl, {
  text: "Read this next",
  hashtags: ["react", "share"],
});

openShareWindow(url, { width: 550, height: 400 });
```

## Accessibility

- Icon-only buttons need an accessible name. Pass `aria-label` or `aria-labelledby` on the share button.
- `htmlTitle` only sets the native tooltip/title attribute and is not used as the button's accessible name.
- Standalone icons are raw SVG elements. Mark decorative icons with `aria-hidden="true"`, or provide an accessible name when the icon itself conveys meaning.

## Troubleshooting

- **Popups are blocked.** Share buttons call `window.open` synchronously from the click handler, even when `beforeOnClick` is async, so browsers treat the popup as user-initiated. If a blocker still prevents it, `onShareWindowOpen` receives `null` so you can fall back to another flow.
- **`NativeShareButton` fails after async work.** It cannot pre-open the system share sheet, so long async work in its `beforeOnClick` may cause the browser to reject `navigator.share()`.
- **Mobile app handoff opens a browser tab first.** This is controlled by the target platform and browser. See [Mobile app handoff](#mobile-app-handoff).
- **React Server Components.** The package is marked with `"use client"`, so share buttons and icons can be imported directly from Server Components in frameworks such as Next.js. They render as client components.
- **iOS PWAs show a blank page.** Standalone mode can show a blank intermediary page for schemes such as `mailto:` or native-app handoff URLs. This is a platform limitation.

## Compatibility and versioning

### React compatibility

| Version | Compatible React versions     |
| ------- | ----------------------------- |
| 6       | `18`, `19`                    |
| 5       | `17`, `18`, `19`              |
| 4       | `^16.3`, `17`, `18`           |
| 3.0.1   | `^16.3.`                      |
| 3       | `15`, `16`                    |
| 2       | `15`, `16`                    |
| 1       | `0.13.x`, `0.14.x`, `15.x.x`. |

### Semantic versioning

This library uses the standard semver convention. However, the share buttons are prone to lots of changes that are not in control of this library. For example: if Facebook decides to change or deprecate its API in a major way, this library will not get a major version bump just because of that. Keep this in mind when you are planning the maintenance of your application.

### Migration guides

- [v5 to v6](./docs/migrate-v5-to-v6.md)
- [v1 to v2](./docs/migrate-v1-to-v2.md)

## Development

```shell
npm install
npm run demo            # run the demo locally
npm test                # run the test suite
npm run update-example  # regenerate example.svg from the demo
```

## License

MIT
