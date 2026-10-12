---
'react-share': minor
---

Add an `onShareWindowOpen` callback to popup-based share buttons. It receives the opened share window, or `null` when a popup blocker prevented it from opening, so apps can detect blocked popups and offer a fallback, as requested in #525.
