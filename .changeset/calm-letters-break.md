---
'react-share': major
---

Change the default `EmailShareButton` `separator` from `" "` to `"\n"` so the shared URL appears on its own line below the email body. The new `buildEmailShareUrl` helper uses the same default.

Reported in #582, where the URL was run together with the body text. Pass `separator=" "` to keep the previous formatting.
