# NSG Workspace Memory Summary

- Size chart size code convention: Always use NSG 2-5 character size codes (SM/MD/LG/2X etc.); never raw manufacturer labels; only include sizes the garment offers.
- Bento CSS rollout plan: Venice.ai built the bento design and applied it to 3 AmeriCorps PDTs; user is moving CSS to `base.css` then rolling out to remaining AmeriCorps overrides.
- AMC shipping rule: Free UPS Ground $50+ to lower 48; logic is in base `ordershipping.js` gated by `InteropID==='AMC'`; store-specific code is consolidated into base via Interop ID gates.
- Comment code changes: Add short what/why comments when changing code here, even where default style favors none (exception: size chart files).
- CSS comment typo warning: Never write `col-xs-*/col-sm-*` style prose in a CSS comment; the `*/` closes it early and silently kills the next rule.
- Store InteropIDs: `IBVI=IBVI`, `IBVI Custom=IBC`; both are MTO stores; 9/11/MLK content in their `categoryView.html` is unrelated drift.
- categoryView.html consolidation: 10 stores' `categoryView.html` files have been folded into base by `InteropID`; `NPS-Mailings` stays separate but shares NPS's ID; there is a key CSS gotchas list.

- Item Desc rules: product descriptions must output three copy/paste-ready code blocks separated by `---`, with exact semantic HTML, ERP stock description codes, and BigCommerce keywords. Descriptions are capped at 999 characters, use 2-space indentation, omit sizing tables, and avoid Markdown inside code blocks.
- Item Desc ERP format: `AGENCY,ITEMTYPE,COLOR,SIZE,STATUS`; parse agency from letters after `C-` in part numbers, use NSG-defined codes, and support MTO/STK status.
- Item Desc keywords: comma-separated tags including agency name, product type, color, sizes, decoration method, program name, and manufacturer/vendor part numbers when present.
- Item Desc agency rules: NPS must spell "Junior Ranger" fully; Athletic Heather / Sport Grey must use `SPG` in stock codes.

- NSG-PDT rules: optimized PDTs must use the canonical bento shell with `productnav`, `loadingindicator`, `bento-container`, `bento-image`, `bento-right-grid`, and full-width cells for description/specs/pricing/order/related products.
- NSG-PDT alert rules: Stock files use a green in-stock alert; MTO files use an amber disclosure alert with lead time from filename; no `priceScheduleTable` in bento PDTs, pricing uses a custom `ng-repeat` grid and filters by Matrix MinQty/MaxQty.
- NSG-PDT accessibility rules: skip link first child, section aria-label, `aria-expanded` on collapsible sizing box, `role="button" tabindex="0"` on collapsible header, label+input pairing for variant search, `aria-live="assertive"` on order error alerts.
- NSG-PDT feature mapping: `+LB` means lightbox image cell, `+Matrix` means `<productmatrix>` plus pricing filters, `MTO` means disclosure alert, `Stock` means in-stock alert, `No Price` means omit pricing cell, `Closeout` means no MTO disclosure.
- NSG-PDT icon rules: use FA6 syntax for new icons; `fa-clock-o` must be `fa-regular fa-clock`, `fa-trash-o` must be `fa-regular fa-trash-can`.

- categoryView consolidation: store-specific `categoryView.html` files were folded into base and gated by `user.Company.InteropID`; NPS-Mailings stays separate because it shares NPS InteropID; IBVI and IBVI Custom are real MTO stores with IDs `IBVI` and `IBC`.
- Bento rollout details: rollout across AmeriCorps PDTs first, then IBVI, YCC, BLM, Census, USDA-FSIS, NPS, NSG base, RCC; build canonical template types rather than 90 one-offs.
- CSS gotcha: avoid `*/` sequence inside CSS comment prose; if a rule completely disappears from DevTools, suspect a comment parse error before caching or specificity issues.
