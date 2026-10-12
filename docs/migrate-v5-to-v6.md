# Migrate v5 to v6 guide

`react-share` v6 is a cleanup release. It removes deprecated exports, tightens some platform-specific APIs, and adds first-class native/mobile sharing support.

## Minimum requirements

- React 18 or 19 is required.
- React 17 is no longer supported.

## Removed exports

### X/Twitter aliases

`TwitterShareButton` and `TwitterIcon` were removed.

#### Before (v5)

```jsx
import { TwitterIcon, TwitterShareButton } from 'react-share';
```

#### After (v6)

```jsx
import { XIcon, XShareButton } from 'react-share';
```

### Share counts

All share count exports were removed in v6:

- `FacebookShareCount`
- `HatenaShareCount`
- `OKShareCount`
- `PinterestShareCount`
- `RedditShareCount`
- `TumblrShareCount`
- `VKShareCount`

If your app still depends on share counts, keep using `react-share` v5 until you replace that UI.

### Pocket and Workplace

Pocket (shut down in July 2025) and Workplace from Meta (shut down in June 2026) no longer accept shares, so their exports were removed:

- `PocketShareButton`, `PocketIcon`, `PocketLegacyIcon`, `buildPocketShareUrl`
- `WorkplaceShareButton`, `WorkplaceIcon`, `WorkplaceLegacyIcon`, `buildWorkplaceShareUrl`

Remove these buttons from your UI. There is no drop-in replacement.

## Renamed share payload props

`htmlTitle` is still the native button `title` attribute. The old overloaded share-button `title` prop was replaced with explicit payload names.

### `title` -> `text`

Used by:

- `BlueskyShareButton`
- `GabShareButton`
- `LineShareButton`
- `TelegramShareButton`
- `ThreadsShareButton`
- `XShareButton`

#### Before (v5)

```jsx
<XShareButton title="Read this next" url={shareUrl} />
```

#### After (v6)

```jsx
<XShareButton text="Read this next" url={shareUrl} />
```

### `title` -> `message`

Used by:

- `WhatsappShareButton`
- `ViberShareButton`

#### Before (v5)

```jsx
<WhatsappShareButton title="Read this next" url={shareUrl} />
```

#### After (v6)

```jsx
<WhatsappShareButton message="Read this next" url={shareUrl} />
```

### `title` -> `shareTitle`

Used by:

- `HatenaShareButton`
- `InstapaperShareButton`
- `LivejournalShareButton`
- `LinkedinShareButton` in v5 only
- `MailruShareButton`
- `OKShareButton`
- `RedditShareButton`
- `VKShareButton`
- `WeiboShareButton`

#### Before (v5)

```jsx
<RedditShareButton title="Read this next" url={shareUrl} />
```

#### After (v6)

```jsx
<RedditShareButton shareTitle="Read this next" url={shareUrl} />
```

### `title` -> `postTitle`

Used by `TumblrShareButton`.

#### Before (v5)

```jsx
<TumblrShareButton title="Read this next" url={shareUrl} />
```

#### After (v6)

```jsx
<TumblrShareButton postTitle="Read this next" url={shareUrl} />
```

## LinkedIn is now URL-only

`LinkedinShareButton` no longer accepts:

- `shareTitle`
- `summary`
- `source`

`buildLinkedinShareUrl` is also URL-only now.

#### Before (v5)

```jsx
<LinkedinShareButton
  shareTitle="Read this next"
  summary="Quick summary"
  source="example.com"
  url={shareUrl}
/>
```

#### After (v6)

```jsx
<LinkedinShareButton url={shareUrl} />
```

## Threads cleanup

`ThreadsShareButton` no longer accepts the legacy compatibility props that were ignored in v5:

- `hashtags`
- `related`
- `via`

## Behavior changes

- Popup-based buttons now open the share popup immediately when `beforeOnClick` returns a promise, and load the share URL once it resolves. Rejecting the promise cancels sharing and closes the popup. Previously the popup opened after the promise resolved and was often blocked by the browser.
- `EmailShareButton` and `buildEmailShareUrl` now separate `body` and the URL with a newline (`"\n"`) instead of a space, so the URL appears on its own line. Pass `separator=" "` to keep the v5 formatting.

## New helper exports

v6 adds low-level helpers from the package root:

- `build<Network>ShareUrl(...)`
- `openShareWindow(url, options)`
- `canNativeShare(data)`
- `shareNative(data)`

Example:

```jsx
import { buildXShareUrl, openShareWindow } from 'react-share';

const url = buildXShareUrl('https://example.com', {
  text: 'Read this next',
  hashtags: ['react', 'share'],
});

openShareWindow(url, { width: 550, height: 400 });
```

## New native/mobile sharing APIs

v6 adds:

- `NativeShareButton`
- `NativeShareIcon`
- `canNativeShare(data)`
- `shareNative(data)`

Use these when you want browser-native sharing instead of network-specific popup URLs, especially for mobile and PWA flows.

```jsx
import { NativeShareButton, NativeShareIcon } from 'react-share';

<NativeShareButton
  title="Read this next"
  text="Thought you might like this"
  url={shareUrl}
  aria-label="Share with your device"
>
  <NativeShareIcon size={32} />
</NativeShareButton>;
```

## Icons now have raw and legacy families

In v5, `*Icon` exports were the badge-style icons with background props such as `round`, `bgStyle`, and `iconFillColor`.

In v6:

- `*Icon` now means the raw, background-free icon.
- `*LegacyIcon` preserves the old badge-style visual and props.

If you want the old icon look without changing visuals, rename your imports:

- `FacebookIcon` -> `FacebookLegacyIcon`
- `XIcon` -> `XLegacyIcon`
- `NativeShareIcon` -> `NativeShareLegacyIcon`

Example:

```jsx
import { FacebookLegacyIcon, XIcon } from 'react-share';

<FacebookLegacyIcon size={32} round />;
<XIcon size={32} />;
```

## New mobile app handoff option

These buttons now support `mobileBehavior?: 'web' | 'app' | 'auto'`:

- `FacebookMessengerShareButton`
- `TelegramShareButton`
- `ViberShareButton`
- `WhatsappShareButton`

Default behavior is still `mobileBehavior="web"`.

```jsx
<WhatsappShareButton
  message="Read this next"
  mobileBehavior="app"
  url={shareUrl}
/>
```

Use `mobileBehavior="app"` and `mobileBehavior="auto"` only when best-effort app handoff is acceptable. The library does not try to detect whether the native app actually opened.

## Upgrade checklist

1. Upgrade your app to React 18 or 19.
2. Replace `TwitterShareButton` and `TwitterIcon` with `XShareButton` and `XIcon`.
3. Remove all share count usage.
4. Remove `PocketShareButton` and `WorkplaceShareButton` usage.
5. Rename every old share-button `title` prop to the correct v6 payload prop.
6. Remove `hashtags`, `related`, and `via` from `ThreadsShareButton`.
7. Remove `shareTitle`, `summary`, and `source` from `LinkedinShareButton`.
8. Rename any old badge-style icon usage from `*Icon` to `*LegacyIcon`.
9. Remove `round`, `borderRadius`, `bgStyle`, and `iconFillColor` from raw `*Icon` usage.
10. Decide whether any messaging buttons should opt into `mobileBehavior`.
11. For mobile/PWA or file-sharing flows, prefer `NativeShareButton` or `shareNative(...)`.
