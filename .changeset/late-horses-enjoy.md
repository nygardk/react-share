---
"react-share": patch
---

The `title` prop is no longer passed to the `button` element, which may have caused e.g. warnings in the console before. Note that to set the native `title` attribute for the share buttons, you may use the `htmlTitle` prop.
