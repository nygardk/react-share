# Changelog

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
