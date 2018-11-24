# Changelog

## 2.4.0 (Nov 24, 2018)

* Added `<LineShareButton />` and `<WeiboShareButton />`

## 2.3.1 (Aug 26, 2018)

* `tabIndex` prop can now also be a number

## 2.3.0 (Aug 16, 2018)

* Added `<WorkplaceShareButton />` (Facebook Workplace)

## 2.2.0 (May 30, 2018)

* Added `<ViberShareButton />`
* Support `name` prop in share buttons
* Fix minor accessibility issue (#156)

## 2.1.1 (Apr 13, 2018)

* Added support for `webpack 4` tree shaking with `sideEffects: false`-flag in `package.json`

## 2.1.0 (Mar 30, 2018)

* Fix: use `https` for TumblrShareCount
* Fix: use `url` as the default email body (instead of `subject`)
* Fix: invoke `beforeOnClick` also for EmailShareButton

## 2.0.0 (Jan 28, 2018)

* Major project refactoring (thanks @aautio!)
* CommonJS modules are buit to `./lib`, es-modules are built to `./es`
* Share buttons, share counts and icons are now separately importable and support tree-shaking
* Demo is now found at http://nygardk.github.io/react-share/

## 1.19.1 (Jan 28, 2018)

* Minor fix to how `logoFillColor` is passed to the icon path

## 1.19.0 (Jan 1, 2018)

* Removed `platform` dependency and replace <=IE10 check with a utility function (thanks @aautio!)

## 1.18.1 (Dec 27, 2017)

* Whatsapp share button: fixed displaying "undefined" when title was not provided (fixes #84, thanks @aautio!)

## 1.18.0 (Dec 3, 2017)

* Added LiveJournal and Mail.Ru sharebuttons (thanks @pvpshoot!)

## 1.17.0 (Nov 12, 2017)

* Added `<TumblrShareButton />` and `<TumblrShareCount />` (thanks @ArtBIT!)
* Added `additionalProps` to share buttons to make it possible to pass any additional props (like `aria-` attributes)
* It is now possible to override `role` (default='button') and `tabIndex` (default='0') props

## 1.16.0 (Sep 1, 2017)

* Allow React `v16.x.x` as peer dependency.
* Added `<EmailShareButton />`.
* Added `onShareWindowClose` share button prop (#91).

## 1.15.1 (Aug 13, 2017)

* Deprecated `title`, `description` and `picture` props for FacebookShareButton (because of Facebook API change). New prop: `quote`.

## 1.15.0 (Jun 18, 2017)

* Use new WhatsApp API (thanks @renchap!).
* A11y update: handle Enter-keypress when share button is on focus.

## 1.14.1 (Jun 4, 2017)

* Minor accessibility update.

## 1.14.0 (Jun 4, 2017)

* Added Reddit share button and count (thanks @watbe!).
* `beforeOnClick` no longer has to return Promise

## 1.13.3 (May 29, 2017)

* More permissive dependency versions.

## 1.13.2 (Apr 20, 2017)

* Minor icon component fix: use `prop-types` lib instead of `React.propTypes` and use `React.Component` instead of `React.createClass`. Suppresses warnings caused by upgrading to React v. `>=15.5.0` (thanks @yurick-flama).

## 1.13.0 (Mar 31, 2017)

* Added share button and count for Odnoklassniki.ru (thanks @R0nd!).

## 1.12.1 (Feb 25, 2017)

* Replaced `https://facebook.com/sharer.php` with `https://www.facebook.com/sharer/sharer.php`

## 1.12.0 (Feb 25, 2017)

* Added VKShareCount
* Added Whatsapp and Telegram share buttons

## 1.11.1 (Jan 22, 2017)

* Added `image` prop to VK share link
* Added missing `picture` prop to README.md for FacebookShareButton

## 1.11.0 (Nov 18, 2016)

* Added `beforeOnClick` option for share buttons
* Added `hashtag` option for Facebook share button

## 1.10.0 (Sep 17, 2016)

* Added `title` and `description` to VK and Linkedin share links (@VorontsovMaxim)
* Fixed Firefox bug with loading SVGs with CSP enabled (@OttoRobotto)

## 1.9.1 (Aug 28, 2016)

* New end point for fetching Facebook share count.

## 1.9.0 (Aug 11, 2016)

* Added `windowWidth` and `windowHeight` props to share buttons to control opened window dimensions

## 1.8.2 (July 8, 2016)

* Added `title` and `description` props for FacebookShareButton. `title` was not working correctly previously.

## 1.8.1 (July 3, 2016)

* Fixed propType warnings that were caused by updating to React v. 15.2.0

## 1.8.0 (June 17, 2016)

* Share count will now be updated if url prop is changed
* Error callback with Facebook share counts is now correctly called

## 1.7.0 (May 28, 2016)

* added disabled and disabledStyle props to share buttons
* added iconBgStyle and logoFillColor to icon styles

## 1.6.1 (May 15, 2016)

* Inline style `display: 'inline-block'` is no longer added to icons. If you are upgrading from an older version, be sure to add the style yourself if needed.

## 1.6.0 (May 7, 2016)

* feature: added sharing support for VK
* internal changes for preparing version 2, assertion message changes
* minor breaking change: Google Plus button now has class `SocialMediaShareButton--googlePlus` instead of `SocialMediaShareButton--google-plus`

## 1.5.0 (Apr 12, 2016)

* Updated to support React v. 15.x.x

## 1.4.1 (Jan 11, 2016)

* Bugfix: className-prop was not propagating correctly in share-buttons.

## 1.4.0 (Nov 23, 2015)

* Removed Bluebird from dependencies: no need for Promises. The library has a much smaller footprint now.

## 1.3.0 (Nov 23, 2015)

* TwitterShareCount removed: Since 20th of November Twitter no longer supports open count API. The service was shut down and there is currently no way to fetch the share count. Thus, TwitterShareCount was removed in version 1.3.0.

## 1.1.0 (Nov 3, 2015)

### Changes

* use jsonp instead of fetch API when fetching Facebook share count
* use XHR instead of fetch API when fetching Google Plus share count
* fixed problem with window.open on <=IE9
