---
'react-share': major
---

Split the icon exports into raw and legacy families for v6.

The existing `*Icon` exports now render background-free SVG logos that are closer to the underlying network marks. The previous badge-style icons remain available as `*LegacyIcon` exports with the existing `round`, `borderRadius`, `bgStyle`, and `iconFillColor` props.

If you want to preserve the v5 visuals, rename imports such as `FacebookIcon` to `FacebookLegacyIcon`, `XIcon` to `XLegacyIcon`, and `WhatsappIcon` to `WhatsappLegacyIcon`.

If you keep the `*Icon` names, note that raw icons default to `size={24}` instead of `64`, and no longer accept `round`, `borderRadius`, `bgStyle`, or `iconFillColor`.
