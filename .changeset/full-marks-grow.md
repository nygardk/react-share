---
'react-share': patch
---

Draw the raw `LinkedinIcon` and `GabIcon` at full size. They reused the small glyphs from the badge icons without their backgrounds, so they filled less than half of the icon box and looked tiny next to the other raw icons. `LinkedinIcon` now uses the full rounded-square "in" mark in LinkedIn's current `#0A66C2` blue, and `GabIcon` puts the wordmark on a rounded green square.
