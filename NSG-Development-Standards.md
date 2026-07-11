# NSG Workspace Memory Summary

- Size chart size code convention: Always use NSG 2-5 character size codes (SM/MD/LG/2X etc.); never raw manufacturer labels; only include sizes the garment offers.
- Bento CSS rollout plan: Venice.ai built the bento design and applied it to 3 AmeriCorps PDTs; user is moving CSS to `base.css` then rolling out to remaining AmeriCorps overrides.
- AMC shipping rule: Free UPS Ground $50+ to lower 48; logic is in base `ordershipping.js` gated by `InteropID==='AMC'`; store-specific code is consolidated into base via Interop ID gates.
- Comment code changes: Add short what/why comments when changing code here, even where default style favors none (exception: size chart files).
- CSS comment typo warning: Never write `col-xs-*/col-sm-*` style prose in a CSS comment; the `*/` closes it early and silently kills the next rule.
- Store InteropIDs: `IBVI=IBVI`, `IBVI Custom=IBC`; both are MTO stores; 9/11/MLK content in their `categoryView.html` is unrelated drift.
- categoryView.html consolidation: 10 stores' `categoryView.html` files have been folded into base by `InteropID`; `NPS-Mailings` stays separate but shares NPS's ID; there is a key CSS gotchas list.

## Four51 Webstore Interop IDs

- Use these canonical Interop IDs for store-specific Four51 logic, templates, and content gating.

| Webstore | Interop ID |
| --- | --- |
| AmeriCorps | `AMC` |
| AmeriCorps NCCC | `AMC_NCCC` |
| AmeriCorps Symposium | `AMCSYM` |
| Bureau of Land Management | `BLM` |
| IBVI | `IBVI` |
| IBVI Custom | `IBC` |
| National Park Service | `NPS` |
| National Service Gear | `NSG` |
| US Census Bureau | `USCB` |
| US Army Corps of Engineers | `USACE` |
| USDA FSIS | `USDA-FSIS` |
| Youth Conservation Corps | `YCC` |

- Item Desc rules: product descriptions must output three copy/paste-ready code blocks separated by `---`, with exact semantic HTML, ERP stock description codes, and BigCommerce keywords. Descriptions are capped at 999 characters, use 2-space indentation, omit sizing tables, and avoid Markdown inside code blocks.
- Item Desc ERP format: `AGENCY,ITEMTYPE,COLOR,SIZE,STATUS`; parse agency from letters after `C-` in part numbers, use NSG-defined codes, and support MTO/STK status.
- Item Desc keywords: comma-separated tags including agency name, product type, color, sizes, decoration method, program name, and manufacturer/vendor part numbers when present.
- Item Desc agency rules: NPS must spell "Junior Ranger" fully; Athletic Heather / Sport Grey must use `SPG` in stock codes.

- NSG-PDT rules: optimized PDTs must use the canonical bento shell with `productnav`, `loadingindicator`, `bento-container`, `bento-image`, `bento-right-grid`, and full-width cells for description/specs/pricing/order/related products.
- NSG-PDT alert rules: Stock files use a green in-stock alert; MTO files use an amber disclosure alert with lead time from filename; no `priceScheduleTable` in bento PDTs, pricing uses a custom `ng-repeat` grid and filters by Matrix MinQty/MaxQty.
- NSG-PDT accessibility rules: skip link first child, section aria-label, `aria-expanded` on collapsible sizing box, `role="button" tabindex="0"` on collapsible header, label+input pairing for variant search, `aria-live="assertive"` on order error alerts.
- NSG-PDT feature mapping: `+LB` means lightbox image cell, `+Matrix` means `<productmatrix>` plus pricing filters, `MTO` means disclosure alert, `Stock` means in-stock alert, `No Price` means omit pricing cell, `Closeout` means no MTO disclosure.
- NSG-PDT icon rules: use FA6 syntax for new icons; `fa-clock-o` must be `fa-regular fa-clock`, `fa-trash-o` must be `fa-regular fa-trash-can`.
- Optimize directive: when asked to optimize, treat the page as a full modernization task — prioritize 508 / WCAG accessibility, code modernization, comment preservation, and adding new comments for any changed logic; update to a bento look only when the bento design is a meaningful improvement.

- categoryView consolidation: store-specific `categoryView.html` files were folded into base and gated by `user.Company.InteropID`; NPS-Mailings stays separate because it shares NPS InteropID; IBVI and IBVI Custom are real MTO stores with IDs `IBVI` and `IBC`.
- Bento rollout details: rollout across AmeriCorps PDTs first, then IBVI, YCC, BLM, Census, USDA-FSIS, NPS, NSG base, RCC; build canonical template types rather than 90 one-offs.
- CSS gotcha: avoid `*/` sequence inside CSS comment prose; if a rule completely disappears from DevTools, suspect a comment parse error before caching or specificity issues.

## Production Optimization Protocol

- Trigger: When the user provides code and asks to "optimize it," overhaul the full document to production-ready standards rather than making only superficial edits.
- Accessibility: Target Section 508 and WCAG Level AA, especially for blind and visually impaired users. Use semantic elements such as `<main>`, `<nav>`, `<section>`, and `<article>` where the host platform permits them.
- Heading structure: Maintain a logical `<h1>` through `<h6>` hierarchy without skipping heading levels.
- Images: Give every meaningful image concise, descriptive alt text; never use generic filenames or labels as alt text. Handle genuinely decorative images according to accessibility best practices.
- Complex data: Represent sizing charts, feature grids, and similar structured data as accessible HTML tables with appropriate captions and header associations rather than unstructured text blocks.
- Platform safety: Keep markup and code compatible with rigid e-commerce environments, including BigCommerce formatting rules and Four51 tag limitations. Do not introduce structures that interfere with platform tags, bindings, or rendering.
- Indentation: Use exactly 2 spaces for every nested structural level and never use hard tab characters.
- Spacing: Use conventional spaces after commas and around operators, including in formulas and expressions (for example, `= IF($A1 = "Value", "True", "False")`).
- Comment preservation: Preserve existing structural, explanatory, and `<!-- -->` comments exactly as written unless a comment is syntactically invalid. Retain useful comments and add concise what/why comments for meaningful changes.
- Complete output: Return the entire completed document or code block. Never truncate the result or use placeholders such as `// rest of code here`.
- Copy-ready packaging: Put production code in a fenced, copyable code block. Do not place Markdown emphasis, headings, or other Markdown decoration inside the code itself; keep all explanations, documentation, and advice outside the code block.

## Product Description Color Codes

- Use the following canonical three-character color codes in ERP stock descriptions, product descriptions, and related product data.
- Preserve listed aliases because multiple vendor color names can intentionally map to the same NSG code.

| Color | Code |
| --- | --- |
| Anthracite Grey | ANG |
| Army Green | ARG |
| Ash | ASH |
| Athletic Heather | ATH |
| Athletic Maroon | ATM |
| Beach-Blue & Red | BBR |
| Black | BLK |
| Black/Elec Red | BER |
| Black/Red | BKR |
| Black/White | BKW |
| Blue | BLU |
| Blustry | BSY |
| Bottle Green | BOG |
| Brisk Blue | BRS |
| Brown | BRN |
| Camo | CAM |
| Carbon Heather Grey | CHG |
| Cardinal | CAR |
| Carhartt Brown | CAB |
| Carrot Orange | COR |
| Charcoal Grey | CHA |
| Charcoal Grey/True Navy | CTN |
| Ciel Blue | CIB |
| Cobalt Blue | COB |
| Cool Grey | CGR |
| Court Blue | CTB |
| Cranberry Red | CBR |
| Dark Chocolate Brown | DCB |
| Dark Green | DGR |
| Dark Grey | DGY |
| Dark Heather Grey | DHG |
| Dark Navy Blue | DNB |
| Dark Smoke Grey | DSG |
| Deep Black | DBK |
| Deep Maroon Red/White | DMW |
| Desert | DES |
| Dress Blue Navy | DBN |
| Driftwood | DRF |
| Duck Brown | DUB |
| Electric Blue | ELB |
| Forest Green | FOR |
| Game Royal Blue | GRB |
| Gold | GLD |
| Green | GRN |
| Grey | GRY |
| Grey Frost | GFR |
| Grey Melange | GME |
| Grey Smoke | GSM |
| Gusty Grey | GUG |
| Heather Grey | HGR |
| Heather Grey/Black | HGB |
| Hot Pink | HPN |
| Hunter Green | HTG |
| Iron Gate Grey | IGG |
| Jet Black | JBK |
| Jet Grey/Black | JGB |
| Kelly/White | KLW |
| Khaki Tan / Beige | KHA |
| Light Denim Blue | LDB |
| Light Green | LGR |
| Light Grey/White | LGW |
| Lime Green | LIM |
| Magic Purple | MPU |
| Maroon | MAR |
| Natural / Black | NBL |
| Navy | NVY |
| Navy Blue | NVY |
| Navy Charcoal | NCH |
| Navy Heather Blue | NHB |
| Orange | ORA |
| Pink | PNK |
| Pique | PIQ |
| Purple | PUR |
| Purple Magic | PMA |
| Quiet Shade Grey | QSG |
| Red | RED |
| River Blue Navy | RBN |
| Royal | ROY |
| Royal Blue | ROY |
| Royal Blue/Light Oxford Grey | RLG |
| Sand Beige | SBE |
| Sapphire Blue | SAP |
| Shadow Grey Heather | SGH |
| Silver | SIL |
| Slate Camo | SCA |
| Slicker Yellow | SLY |
| Sport Grey | SPG |
| Sports Assortment | SPT |
| Steel Grey | STG |
| Stone | STO |
| Stone Green | SGN |
| Stone Grey | SGY |
| Strong Blue | STB |
| Tarmac Grey | TGY |
| Teal | TEA |
| Titanium | TTM |
| Tri-Charcoal Grey | TCG |
| True Navy | TNV |
| True Royal | TRB |
| Vacation | VAC |
| White | WHT |
| Windsor Grey | WNG |
| Yellow | YEL |
| Zinfandel Burgundy Red | ZBR |
