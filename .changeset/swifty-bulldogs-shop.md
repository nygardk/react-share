---
'react-share': major
---

Remove `title`, `summary`, and `source` from `LinkedinShareButton` and make `buildLinkedinShareUrl` URL-only.

This follows the long-running LinkedIn compatibility problems in #550 and #362. LinkedIn no longer provides a reliable public URL-based way to prefill those fields, so v6 stops exposing them as if they were dependable.
