---
"react-share": patch
---

This patch fixes an issue with the Reddit sharing functionality, where the shared link was not automatically populated in Reddit’s share preview. By appending /web before /submit in the Reddit share URL, the link now populates correctly, improving the user experience for Reddit sharing.
