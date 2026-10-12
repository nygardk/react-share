# Changelog

## 6.1.0

### Minor Changes

- 5ebcdc2: Add a `content` prop to `TumblrShareButton` and `buildTumblrShareUrl`, and list the other Tumblr post types for `posttype`. For post types other than `link`, `content` carries the actual post data, such as the quote text. Based on #564 by @me4502.
- 37bf4cc: Add a `to` prop to `EmailShareButton` and `buildEmailShareUrl` for prefilling the recipient. It accepts one address or an array of addresses. Requested in #418.
- a40bfc8: Add an `openInNewTab` prop to popup-based share buttons, and a matching `newTab` option for `openShareWindow`, to open the share page in a regular browser tab instead of a popup window. Requested in #449 and proposed in #342.
- e15ed00: Add `FarcasterShareButton`, `FarcasterIcon`, `FarcasterLegacyIcon`, and `buildFarcasterShareUrl` for sharing to Farcaster (formerly Warpcast) through its compose intent. The shared URL is attached as an embed, and `text`, `channelKey`, and `parentCastHash` are supported. Requested in #558.
- 8d087a7: Make `url` optional on `XShareButton` and `buildXShareUrl` so text-only posts can be shared by passing only `text`. At least one of `url` or `text` is still required. Requested in #570.
- 8c76486: Add a `phone` prop to `WhatsappShareButton` and `buildWhatsappShareUrl` for sharing to a specific number. It takes the number in international format and removes everything except digits. It applies to both the web and the app link. Requested in #359.

## 6.0.0

### Major Changes

- a811bc3: Change the default `EmailShareButton` `separator` from `" "` to `"\n"` so the shared URL appears on its own line below the email body. The new `buildEmailShareUrl` helper uses the same default.

  Reported in #582, where the URL was run together with the body text. Pass `separator=" "` to keep the previous formatting.

- 5bb43a5: Open the share popup synchronously when `beforeOnClick` returns a promise, then load the share URL into it once the promise resolves. If the promise rejects, sharing is cancelled and the popup is closed.

  Previously the popup was opened only after awaiting `beforeOnClick`. By then the click's user activation had expired, so Safari and other browsers with strict popup blockers silently blocked the share window (#525, #506, #529). Rejections from `beforeOnClick` also used to surface as unhandled promise rejections.

- e72b45e: Remove all deprecated share count exports in v6, including the underlying share count implementation and the `jsonp` dependency that previously powered them.
- 2dc35f2: Remove the deprecated `TwitterShareButton` and `TwitterIcon` aliases in v6. Use `XShareButton` and `XIcon` instead.
- 05c4997: Remove `PocketShareButton`, `PocketIcon`, `PocketLegacyIcon`, and `buildPocketShareUrl`, as well as `WorkplaceShareButton`, `WorkplaceIcon`, `WorkplaceLegacyIcon`, and `buildWorkplaceShareUrl`.

  Pocket shut down in July 2025 and Workplace from Meta shut down in June 2026, so these buttons could only open dead share pages.

- 20570c5: Drop React 17 support in v6 and require React 18 or 19 via `peerDependencies`.
- 08b5638: Remove `title`, `summary`, and `source` from `LinkedinShareButton` and make `buildLinkedinShareUrl` URL-only.

  This follows the long-running LinkedIn compatibility problems in #550 and #362. LinkedIn no longer provides a reliable public URL-based way to prefill those fields, so v6 stops exposing them as if they were dependable.

- 22249a6: Split the icon exports into raw and legacy families for v6.

  The existing `*Icon` exports now render SVG logos that are closer to the underlying network marks. The previous badge-style icons remain available as `*LegacyIcon` exports with the existing `round`, `borderRadius`, `bgStyle`, and `iconFillColor` props.

  If you want to preserve the v5 visuals, rename imports such as `FacebookIcon` to `FacebookLegacyIcon`, `XIcon` to `XLegacyIcon`, and `WhatsappIcon` to `WhatsappLegacyIcon`.

  If you keep the `*Icon` names, note that raw icons default to `size={24}` instead of `64`, and no longer accept `round`, `borderRadius`, `bgStyle`, or `iconFillColor`.

- b2c18ff: Remove the deprecated `hashtags`, `related`, and `via` props from `ThreadsShareButton` in v6. Those props were ignored in v5 and were kept only for compatibility ahead of this major release.
- 28da248: Replace the share button `title` prop with explicit v6 payload names:
  - `text` for Bluesky, Gab, Line, Telegram, Threads, and X
  - `message` for WhatsApp and Viber
  - `shareTitle` for Hatena, Instapaper, LiveJournal, Mail.ru, OK, Reddit, VK, and Weibo
  - `postTitle` for Tumblr

  `htmlTitle` remains the native button tooltip/title attribute.

### Minor Changes

- 7996b59: Add an `onShareWindowOpen` callback to popup-based share buttons. It receives the opened share window, or `null` when a popup blocker prevented it from opening, so apps can detect blocked popups and offer a fallback, as requested in #525.
- 98bb140: Mark the published ESM and CJS bundles with a `"use client"` directive so share buttons can be imported directly from React Server Components, such as Next.js App Router pages, without a local client wrapper. Requested in #491.
- 2ff01f4: Draw the raw `LivejournalIcon` pencil in navy and white like the official LiveJournal logo. The pencil used to be cut out of the blue circle, so it took on the page background instead of its own colors.
- 7f896ad: Update the raw `OKIcon` to the 2023 OK logo: a white figure on an orange (`#FF7700`) rounded square, as served on ok.ru. The previous bare glyph was the old mark in an older orange.
- 82f732f: Update the raw `ThreadsIcon` to the 2026 Threads app icon: a white glyph on a black rounded square. The previous bare glyph was the old mark and looked lighter than the other raw icons.
- 17a51d2: Use the Lucide mail and share glyphs for the raw `EmailIcon` and `NativeShareIcon`. The previous glyphs were small badge glyphs on a 64x64 viewBox and looked undersized next to the other raw icons.
- 57ddea2: Put glyph-only raw icons on circle badges so every raw icon has a similar visual weight, like the v5 badges had. `XIcon`, `WeiboIcon`, `BlueskyIcon`, `EmailIcon`, `NativeShareIcon`, `InstapaperIcon`, and `TumblrIcon` now sit on a circle. The glyph is always drawn in white, so it stays legible on dark backgrounds. `NativeShareIcon` now uses a fixed blue (`#0A84FF`) instead of the current text color, which would hide the white glyph on dark pages.
- e05b396: Add an explicit `mobileBehavior` prop to `FacebookMessengerShareButton`, `TelegramShareButton`, `ViberShareButton`, and `WhatsappShareButton`.

  This follows recurring mobile browser and app-handoff reports in #577, #551, #529, and #357. The new prop keeps web sharing as the default while allowing best-effort app-link behavior with `mobileBehavior="app"` or `mobileBehavior="auto"`.

- f978a65: Add low-level helper exports for advanced usage in v6, including per-network `build*ShareUrl` helpers and `openShareWindow(url, options)`.
- 9e44ba2: Add `canNativeShare(data)`, `shareNative(data)`, `NativeShareButton`, and a generic `NativeShareIcon` for browser-native sharing flows.

  This gives mobile and PWA use cases a first-class Web Share API path instead of forcing them through network-specific popup URLs, which is especially relevant for requests like #576 and the iOS/PWA limitations described in #551.

- f708c54: Keep raw icon details white on dark backgrounds. Details cut out of the brand shape, such as the Facebook "f", the LinkedIn "in", the LINE lettering, and the inside of the WhatsApp and Viber bubbles, used to show the page background through them, so the logos turned into dark blobs on dark pages. `color` still recolors the brand-colored part of the icon.

### Patch Changes

- e72d4f3: Update five raw icons to their networks' current brand colors: `BlueskyIcon` (`#0560FF`), `LineIcon` (`#06C755`), `PinterestIcon` (`#E60023`), `TumblrIcon` (`#001935`), and `GabIcon` (`#30CE7D`). They used older or approximate colors before. The legacy icons keep their v5 colors.
- 4aa9052: Use the current share endpoints for X (`https://x.com/intent/post`), Threads (`https://www.threads.com/intent/post`), and Telegram (`https://t.me/share/url`).

  The old `twitter.com`, `threads.net`, and `telegram.me` hosts only keep working through redirects, which add an extra hop and can drop the share intent if those redirects are retired. Requested in #536.

- 71e21b3: Draw the raw `LinkedinIcon` and `GabIcon` at full size. They reused the small glyphs from the badge icons without their backgrounds, so they filled less than half of the icon box and looked tiny next to the other raw icons. `LinkedinIcon` now uses the full rounded-square "in" mark in LinkedIn's current `#0A66C2` blue, and `GabIcon` puts the wordmark on a rounded green square.

## 5.3.0

### Minor Changes

- 1625ede: Mark all share count exports as deprecated in the public types and README, noting that they will be removed in v6 while remaining available as best-effort compatibility in v5.
- d040ae7: Clarify the share button API surface in v5 by documenting `htmlTitle` as the native button `title` attribute and marking the legacy `ThreadsShareButton` `hashtags`, `related`, and `via` props as deprecated no-ops ahead of their planned v6 removal.
- 08358c8: Add `XShareButton` as the canonical X sharing export while keeping `TwitterShareButton` available as a deprecated backwards-compatibility alias.

### Patch Changes

- af3a338: Apply native disabled button behavior to share buttons so disabled buttons are actually non-interactive, matching the behavior requested in issue #533.
- 8cc7a38: Use `api.whatsapp.com` for generated WhatsApp share links, following the behavior proposed in PR #459 and requested again in issue #575.
- 0f5af18: Refresh several share icon brand colors to match current platform branding in the v5 badge set.
- c17f650: Render reset share buttons as `inline-flex` so icon-only buttons do not include extra bottom space from the inline baseline gap, and match the button focus outline radius to round and rounded bundled icons with a `2px` outline offset.
- 2afa235: Fix Reddit sharing to use the current `/submit` endpoint instead of `/web/submit`, which was causing "Page not found" failures reported in issues like #571 and addressed in PR #572.

## 5.2.2

### Patch Changes

- d04d084: Fix warning of passing extraneous `networkName` for the share buttons.

## 5.2.1

### Patch Changes

- 47c2906: Fix `EmailShareButton`: a bug slipped in that broke the sharing functionality.

## 5.2.0

### Minor Changes

- 373add6: Added `BlueskyShareButton` and `BlueskyIcon`. This button will take a title and url parameter, and then use [Bluesky Intent Links](https://docs.bsky.app/docs/advanced-guides/intent-links) to share that content. There is also an overrideable seperator parameter (defaults as ' ') that seperates the title and url.
- d45d811: Added `ThreadsShareButton` and `ThreadsIcon`.

### Patch Changes

- 8a5016a: Build tooling updates. May affect the distributed files.
- 15e830f: The `title` prop is no longer passed to the `button` element, which may have caused e.g. warnings in the console before. Note that to set the native `title` attribute for the share buttons, you may use the `htmlTitle` prop.
- d172111: Internal type fixes.

## 5.1.2

### Patch Changes

- e5f3488: Support React 19 in peerDependencies

## 5.1.1

### Patch Changes

- e4c1704: This patch fixes an issue with the Reddit sharing functionality, where the shared link was not automatically populated in Reddit’s share preview. By appending /web before /submit in the Reddit share URL, the link now populates correctly, improving the user experience for Reddit sharing.

## 5.1.0

### Minor Changes

- 4e74597: Added `htmlTitle` prop for the share button. This prop will be passed as the native `title` attribute for the `button` element.

## 5.0.4

### Patch Changes

- 1c50111: Fixed `exports` in package.json to comply with the `publint` and `attw` tools. May solve issues when your project uses CommonJS modules and Node.js v16 or newer.

## 5.0.3

### Patch Changes

- ddcf9c8: Fixed invalid `exports` configuration (reference to `dist/index.cjs`).

## 5.0.2

### Patch Changes

- b1da2d9: Fix Reddit logo in `RedditIcon`.
- 2588f97: Fixed colors for: `FacebookIcon`, `LinkedinIcon`, `OKIcon`, `PinterestIcon`, `RedditIcon`, `TelegramIcon`, `TumblrIcon`, `VKIcon`, `ViberIcon`, `WeiboIcon`, `WorkplaceIcon`.
- 6a43137: Fixed WhatsApp sharring issue on Android described [here](https://github.com/nygardk/react-share/issues/484).

## 5.0.1

### Patch Changes

- 8dd0134: `@changesets/cli` was accidentally added in `dependencies`. It is now moved to `devDependencies`.

## 5.0.0

### Major Changes

- c04c694: Removed the `quote` prop from `FacebookShareButton` as it has been deprecated by Meta. See https://developers.facebook.com/support/bugs/734680371318112/?comment_id=743056360480513.
- 043faa3: Removed default `aria-label` prop from `ShareButtons`. Before it defaulted to the name of the "network name" (e.g. "facebook" for Facebook). Issue explained [here](https://github.com/nygardk/react-share/issues/397).
- d4c192a: Compilation target is now ES2017 instead of ES5. The distributed files are built with Vite instead of TypeScript compiler.
- 471510a: Dropped support for React 16.

### Minor Changes

- 2c0ab57: Added `GabShareButton` and `GabIcon` to share on [gab.com](https://gab.com). Originally implemented [here](https://github.com/nygardk/react-share/pull/425).
- 18f2de2: Added `XIcon`.
- 77ecaa7: Share counts are now created as function components instead of class components.
- 15fd50d: Added `pinId` prop for `PinterestShareButton`.
- 44c672f: Share buttons are now created as function components instead of class components.

### Patch Changes

- 65b53c5: Fix `HatenaShareCount` to show also `0`. Originally fixed [here](https://github.com/nygardk/react-share/pull/429).
- 14bbffa: Fixed `createIcon` defaultProps warning with React 18.

## 4.4.1 (Oct 16, 2022)

- Chore: upgraded build deps
- Fix: Support React 18 in `peerDependencies`

## 4.4.0 (Feb 23, 2021)

- Fix: Support React 17 in `peerDependencies` (#379)
- Fix: Updated Telegram link for shares custom URLs (#377)
- Fix: Updated Reddit logo background colour (#366)

## 4.3.0 (Aug 06, 2020)

- Added: `HatenaShareButton` and `HatenaShareCount`

## 4.2.1 (Jul 09, 2020)

- Fix: added internal `assert` utility to get rid of Node.js `assert` dependency (MINOR BREAKING CHANGE: the error thrown is slightly different)

## 4.2.0 (Jun 07, 2020)

- Added: `FacebookMessengerShareButton` docs are now included in the readme
- Fix: Prevent `VKShareCount` from colliding with an existing `window.VK` object
- Fix: Default separator in `ViberShareButton` is now `' '`
- Fix: `WhatsappIcon` green color to match with WhatsApp brand
- Fix: Allow `ShareButton` `beforeOnClick` to return `void`
- Fix: Guard against unexpected behaviour with `OKShareCount` for the returned index parameter by adding a sensible fallback

## 4.1.0 (Mar 14, 2020)

- Fix: `TwitterShareButton` won't have hashtags as empty string (#284, #293)
- Fix: `OKShareCount` now supports multiple different share counts per page (#289)
- Fix: share buttons won't pass link options as props (#286)
- Fix: `EmailShareButton` now has default `separator` correctly as `` #287)
- Fix: `WhatsappShareButton` now has default `separator` correctly as ``
- Fix: `TumblrShareButton` now has default `posttype` correctly as `link`
- Feature: `TwitterShareButton` now supports "related" array (#281)

## 4.0.0 (January 4, 2020)

- React 16.3.0 or newer is now required
- Refactored to TypeScript, type definitions are now included
- Added: `FacebookMessengerShareButton` and `FacebookMessengerShareCount`
- Added: `WeiboIcon`
- Fixed: `VKShareButton`
- Fixed: `LinkedinShareButton`
- Fixed: `MailruShareButton`
- Fixed: `TumblrShareCount`
- Fixed: `FacebookShareCount`
- Breaking changes:
  - default `className`s have been changed
  - all `{ ...rest }` props are spread to the root element for share buttons and share counts
  - share counts are now rendered in `span` element instead of `div`
  - icons have `svg` as root element instead of `div`
  - icon props were renamed: `iconBgStyle` -> `bgStyle`, `logoFillColor` -> `iconFillColor`

## 3.0.1 (August 26, 2019)

- Forward `ref` on to the share buttons
- use `componentDidUpdate` instead of `componentWillUpdate`

## 3.0.0 (March 24, 2019)

- Added `<PocketShareButton>`
- Added `<InstapaperShareButton>`
- Added `borderRadius` prop for icons
- A default `aria-label` is generated for the share buttons. It is based on the network name. Use `additionalProps` to override.
- Removed support for Google+.
- Removed support for `<LinkedInShareCount/>`. LinkedIn no longer provides an API to fetch share counts.
- Removed `title` and `description` from `<LinkedInShareButtons/>`.
- Fix: `<EmailShareButton/>` includes `body` before `url`.
- Fix: `<EmailShareButton/>` and `<ViberShareButton/>` allow customization of `separator`.
- Fix: `<WeiboShareButton/>` no longer requires `image` prop
- Fix: `<WeiboShareButton/>` includes url correctly when shared
- Fix: `<WeiboShareButton/>` and `<OKShareButton/>` open in screen center to prevent window from jumping after opening
- Thanks @finppp, @madkoding, @andrewl913, @jwrubel, @sinchang and @sergioribeiro!

## 2.4.0 (Nov 24, 2018)

- Added `<LineShareButton />` and `<WeiboShareButton />`

## 2.3.1 (Aug 26, 2018)

- `tabIndex` prop can now also be a number

## 2.3.0 (Aug 16, 2018)

- Added `<WorkplaceShareButton />` (Facebook Workplace)

## 2.2.0 (May 30, 2018)

- Added `<ViberShareButton />`
- Support `name` prop in share buttons
- Fix minor accessibility issue (#156)

## 2.1.1 (Apr 13, 2018)

- Added support for `webpack 4` tree shaking with `sideEffects: false`-flag in `package.json`

## 2.1.0 (Mar 30, 2018)

- Fix: use `https` for TumblrShareCount
- Fix: use `url` as the default email body (instead of `subject`)
- Fix: invoke `beforeOnClick` also for EmailShareButton

## 2.0.0 (Jan 28, 2018)

- Major project refactoring (thanks @aautio!)
- CommonJS modules are buit to `./lib`, es-modules are built to `./es`
- Share buttons, share counts and icons are now separately importable and support tree-shaking
- Demo is now found at http://nygardk.github.io/react-share/

## 1.19.1 (Jan 28, 2018)

- Minor fix to how `logoFillColor` is passed to the icon path

## 1.19.0 (Jan 1, 2018)

- Removed `platform` dependency and replace <=IE10 check with a utility function (thanks @aautio!)

## 1.18.1 (Dec 27, 2017)

- Whatsapp share button: fixed displaying "undefined" when title was not provided (fixes #84, thanks @aautio!)

## 1.18.0 (Dec 3, 2017)

- Added LiveJournal and Mail.Ru sharebuttons (thanks @pvpshoot!)

## 1.17.0 (Nov 12, 2017)

- Added `<TumblrShareButton />` and `<TumblrShareCount />` (thanks @ArtBIT!)
- Added `additionalProps` to share buttons to make it possible to pass any additional props (like `aria-` attributes)
- It is now possible to override `role` (default='button') and `tabIndex` (default='0') props

## 1.16.0 (Sep 1, 2017)

- Allow React `v16.x.x` as peer dependency.
- Added `<EmailShareButton />`.
- Added `onShareWindowClose` share button prop (#91).

## 1.15.1 (Aug 13, 2017)

- Deprecated `title`, `description` and `picture` props for FacebookShareButton (because of Facebook API change). New prop: `quote`.

## 1.15.0 (Jun 18, 2017)

- Use new WhatsApp API (thanks @renchap!).
- A11y update: handle Enter-keypress when share button is on focus.

## 1.14.1 (Jun 4, 2017)

- Minor accessibility update.

## 1.14.0 (Jun 4, 2017)

- Added Reddit share button and count (thanks @watbe!).
- `beforeOnClick` no longer has to return Promise

## 1.13.3 (May 29, 2017)

- More permissive dependency versions.

## 1.13.2 (Apr 20, 2017)

- Minor icon component fix: use `prop-types` lib instead of `React.propTypes` and use `React.Component` instead of `React.createClass`. Suppresses warnings caused by upgrading to React v. `>=15.5.0` (thanks @yurick-flama).

## 1.13.0 (Mar 31, 2017)

- Added share button and count for Odnoklassniki.ru (thanks @R0nd!).

## 1.12.1 (Feb 25, 2017)

- Replaced `https://facebook.com/sharer.php` with `https://www.facebook.com/sharer/sharer.php`

## 1.12.0 (Feb 25, 2017)

- Added VKShareCount
- Added Whatsapp and Telegram share buttons

## 1.11.1 (Jan 22, 2017)

- Added `image` prop to VK share link
- Added missing `picture` prop to README.md for FacebookShareButton

## 1.11.0 (Nov 18, 2016)

- Added `beforeOnClick` option for share buttons
- Added `hashtag` option for Facebook share button

## 1.10.0 (Sep 17, 2016)

- Added `title` and `description` to VK and Linkedin share links (@VorontsovMaxim)
- Fixed Firefox bug with loading SVGs with CSP enabled (@OttoRobotto)

## 1.9.1 (Aug 28, 2016)

- New end point for fetching Facebook share count.

## 1.9.0 (Aug 11, 2016)

- Added `windowWidth` and `windowHeight` props to share buttons to control opened window dimensions

## 1.8.2 (July 8, 2016)

- Added `title` and `description` props for FacebookShareButton. `title` was not working correctly previously.

## 1.8.1 (July 3, 2016)

- Fixed propType warnings that were caused by updating to React v. 15.2.0

## 1.8.0 (June 17, 2016)

- Share count will now be updated if url prop is changed
- Error callback with Facebook share counts is now correctly called

## 1.7.0 (May 28, 2016)

- added disabled and disabledStyle props to share buttons
- added iconBgStyle and logoFillColor to icon styles

## 1.6.1 (May 15, 2016)

- Inline style `display: 'inline-block'` is no longer added to icons. If you are upgrading from an older version, be sure to add the style yourself if needed.

## 1.6.0 (May 7, 2016)

- feature: added sharing support for VK
- internal changes for preparing version 2, assertion message changes
- minor breaking change: Google Plus button now has class `SocialMediaShareButton--googlePlus` instead of `SocialMediaShareButton--google-plus`

## 1.5.0 (Apr 12, 2016)

- Updated to support React v. 15.x.x

## 1.4.1 (Jan 11, 2016)

- Bugfix: className-prop was not propagating correctly in share-buttons.

## 1.4.0 (Nov 23, 2015)

- Removed Bluebird from dependencies: no need for Promises. The library has a much smaller footprint now.

## 1.3.0 (Nov 23, 2015)

- TwitterShareCount removed: Since 20th of November Twitter no longer supports open count API. The service was shut down and there is currently no way to fetch the share count. Thus, TwitterShareCount was removed in version 1.3.0.

## 1.1.0 (Nov 3, 2015)

### Changes

- use jsonp instead of fetch API when fetching Facebook share count
- use XHR instead of fetch API when fetching Google Plus share count
- fixed problem with window.open on <=IE9
