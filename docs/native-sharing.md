# Native and mobile sharing behavior

This guide explains how sharing behaves in v6 across popup-based buttons, mobile app handoff, and the browser Web Share API.

## Three sharing modes in v6

### 1. Web popup sharing

This is the default behavior for most share buttons.

- The button generates a network URL.
- Clicking the button opens a popup with `window.open(...)`.
- The popup URL is the same URL returned by that button's `build*ShareUrl(...)` helper.

This is still the default for all buttons unless noted otherwise.

### 2. Best-effort mobile app handoff

These buttons support `mobileBehavior`:

- `FacebookMessengerShareButton`
- `TelegramShareButton`
- `ViberShareButton`
- `WhatsappShareButton`

Supported values:

- `'web'`: always use the web popup flow
- `'app'`: navigate directly to the app/deep link
- `'auto'`: use the app/deep link only on detected mobile environments, otherwise keep the web popup flow

Important limits:

- App-open success is not detectable in a reliable cross-browser way.
- The library does not use timer-based fallback hacks.
- The library does not guarantee a web fallback if the app is missing.
- iOS standalone PWAs and in-app browsers can still show blank intermediary pages or other platform-specific behavior.

### 3. Browser-native sharing

Use `NativeShareButton`, `canNativeShare(data)`, or `shareNative(data)` when you want the browser or OS share sheet instead of a network popup.

- `NativeShareButton` uses `navigator.share()`.
- File sharing depends on `navigator.canShare()`.
- The button disables itself when native sharing is unavailable for the current payload.

This is the preferred path for:

- mobile-first product flows
- PWA share actions
- file sharing such as PDFs or images
- generic “share this” UI that should use the device share sheet

## How `mobileBehavior` works by button

### `WhatsappShareButton`

- `mobileBehavior="web"`: uses `https://api.whatsapp.com/send?...` in a popup
- `mobileBehavior="app"`: navigates to `whatsapp://send?...`
- `mobileBehavior="auto"`: uses the app link on detected mobile environments and the popup URL elsewhere

```jsx
<WhatsappShareButton
  message="Read this next"
  mobileBehavior="app"
  url={shareUrl}
>
  <WhatsappIcon size={32} />
</WhatsappShareButton>
```

### `TelegramShareButton`

- `mobileBehavior="web"`: uses `https://telegram.me/share/url?...` in a popup
- `mobileBehavior="app"`: navigates to `tg://msg_url?...`
- `mobileBehavior="auto"`: uses the app link on detected mobile environments and the popup URL elsewhere

### `ViberShareButton`

- `mobileBehavior="web"`: opens the Viber URL in a popup
- `mobileBehavior="app"`: navigates directly to the Viber URL
- `mobileBehavior="auto"`: uses direct navigation on detected mobile environments and a popup elsewhere

Viber is a special case: the generated share URL stays the same, but the way the button opens it changes.

### `FacebookMessengerShareButton`

- `mobileBehavior="web"`: uses `https://www.facebook.com/dialog/send?...` in a popup
- `mobileBehavior="app"`: navigates to `fb-messenger://share?...`
- `mobileBehavior="auto"`: uses the app link on detected mobile environments and the popup URL elsewhere

Messenger support is the least stable of the four. Platform behavior depends heavily on Meta's current app and dialog handling.

## How mobile detection works for `auto`

`mobileBehavior="auto"` is a lightweight best-effort choice, not a strong device capability system.

It currently prefers:

- `navigator.userAgentData.mobile` when available
- otherwise a mobile user-agent match
- otherwise a touch-capable Mac heuristic for iPad-style environments

This only decides whether to choose the app link or the web link. It does not verify that the app handoff succeeded.

## When to use `NativeShareButton` instead

Prefer `NativeShareButton` or `shareNative(...)` when:

- you want the platform share sheet instead of one network
- you need to share files
- you are building a PWA action bar or mobile-only UI
- you want one generic share action that adapts to the device

Example:

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

For low-level control:

```jsx
import { canNativeShare, shareNative } from 'react-share';

if (canNativeShare({ title: 'Read this next', url: shareUrl })) {
  await shareNative({ title: 'Read this next', url: shareUrl });
}
```

## Behavior with `openShareDialogOnClick={false}`

For popup-based buttons, setting `openShareDialogOnClick={false}` still prevents the button from opening the popup or navigating on its own.

That is useful when you want to:

- inspect the generated link through `onClick`
- open it yourself
- perform your own routing or analytics logic first

This applies to both normal popup mode and mobile-aware buttons.

## Recommended patterns

### Generic share button for mobile/PWA

Use `NativeShareButton`.

### Social network icon row on desktop

Use the normal network buttons with default behavior.

### Messaging buttons where app handoff matters

Use `mobileBehavior="app"` if direct app navigation is the intended experience and best-effort behavior is acceptable.

Use `mobileBehavior="auto"` if you want desktop to stay popup-based while preferring app links on mobile.

### Strictly predictable web behavior

Leave `mobileBehavior` unset or set it to `'web'`.
