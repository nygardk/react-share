---
'react-share': major
---

Open the share popup synchronously when `beforeOnClick` returns a promise, then load the share URL into it once the promise resolves. If the promise rejects, sharing is cancelled and the popup is closed.

Previously the popup was opened only after awaiting `beforeOnClick`. By then the click's user activation had expired, so Safari and other browsers with strict popup blockers silently blocked the share window (#525, #506, #529). Rejections from `beforeOnClick` also used to surface as unhandled promise rejections.
