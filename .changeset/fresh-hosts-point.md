---
'react-share': patch
---

Use the current share endpoints for X (`https://x.com/intent/post`), Threads (`https://www.threads.com/intent/post`), and Telegram (`https://t.me/share/url`).

The old `twitter.com`, `threads.net`, and `telegram.me` hosts only keep working through redirects, which add an extra hop and can drop the share intent if those redirects are retired. Requested in #536.
