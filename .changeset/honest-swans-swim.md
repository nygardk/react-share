---
"react-share": patch
---

Remove "web" element from path for RedditShareButton

Current issue:
- The current share url leads to a "Page not found" error, making sharing to Reddit impossible
- Example: https://www.reddit.com/web/submit?url=http%3A%2F%2Flocalhost%3A3000%2Fblog%2Fblog-post&title=Blog+post&type=LINK

Fix:
- Changed the path so it works correctly
- Example: https://www.reddit.com/submit?url=http%3A%2F%2Flocalhost%3A3000%2Fblog%2Fblog-post&title=Blog+post&type=LINK
