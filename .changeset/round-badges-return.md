---
'react-share': minor
---

Put glyph-only raw icons on circle badges so every raw icon has a similar visual weight, like the v5 badges had. `XIcon`, `WeiboIcon`, `BlueskyIcon`, `EmailIcon`, `NativeShareIcon`, `InstapaperIcon`, and `TumblrIcon` now sit on a circle. The glyph is always drawn in white, so it stays legible on dark backgrounds. `NativeShareIcon` now uses a fixed blue (`#0A84FF`) instead of the current text color, which would hide the white glyph on dark pages.
