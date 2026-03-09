---
'react-share': minor
---

Add `canNativeShare(data)`, `shareNative(data)`, `NativeShareButton`, and a generic `NativeShareIcon` for browser-native sharing flows.

This gives mobile and PWA use cases a first-class Web Share API path instead of forcing them through network-specific popup URLs, which is especially relevant for requests like #576 and the iOS/PWA limitations described in #551.
