---
'react-share': patch
---

Fix Reddit sharing to use the current `/submit` endpoint instead of `/web/submit`, which was causing "Page not found" failures reported in issues like #571 and addressed in PR #572.
