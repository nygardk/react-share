## 1.13.1 (Apr 20, 2017)

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
