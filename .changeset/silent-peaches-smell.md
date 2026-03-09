---
'react-share': minor
---

Add an explicit `mobileBehavior` prop to `FacebookMessengerShareButton`, `TelegramShareButton`, `ViberShareButton`, and `WhatsappShareButton`.

This follows recurring mobile browser and app-handoff reports in #577, #551, #529, and #357. The new prop keeps web sharing as the default while allowing best-effort app-link behavior with `mobileBehavior="app"` or `mobileBehavior="auto"`.
