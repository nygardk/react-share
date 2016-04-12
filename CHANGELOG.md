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
