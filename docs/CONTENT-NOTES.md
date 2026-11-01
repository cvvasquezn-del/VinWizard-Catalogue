# Content and design notes

Review edition: 1 November 2026. Language: English.

## Brief

A digital sales catalogue for the user's manager to review. The experience opens like a book, uses approximately A4 pages, can be hosted on the user's Netlify account, and remains editable in Visual Studio Code with Git commits. PDF production is a later phase. The user authorized autonomous implementation and selected English.

## Design decisions

- Sixteen A4 portrait pages (794 × 1123 CSS pixels). Landscape desktop shows spreads; smaller viewports show individual pages.
- Retain the website's Poppins type and palette: navy `#00303c`, blue `#165572`, cyan `#009abf`, mint `#2ed9c3`, ink `#173642`, pale `#f1f6f7`.
- Photography introduces the cellar; software screens and product imagery support the technical pages. Do not crop software screenshots or technical illustrations.
- Avoid price placeholders in this review edition. Use project-specific quotation language.
- Keep the deliverable local and Netlify-ready, as requested. No new public deployment or changes to the existing website.
- No external scripts, remote fonts, analytics or viewer subscription. Poppins is bundled with its SIL Open Font License.
- Static semantic HTML remains readable with JavaScript disabled. The enhanced viewer adds animation, keyboard and touch navigation, contents, reading mode, zoom, image detail, sharing and optional fullscreen.

## Source of product statements

User-supplied repository: https://github.com/cvvasquezn-del/VinWizard-English

Public website reviewed: https://www.vinwizard.com/

Local source: `14. VINWIZARD EN WEB/VinWizard-English` under the user's design directory. Content reviewed in `pages.mjs`, `buyer-components.mjs`, `msp-and-scada.mjs`, and the associated `public/media` assets.

The public homepage was opened on 1 November 2026. Detailed product copy and local imagery were taken from the supplied local website checkout. Those statements were not independently certified against product datasheets.

| Pages | Source / treatment |
| --- | --- |
| 1–4 | Website introduction, integration approach, software and hardware roles |
| 5–6 | Software controls, pumpovers, alarms, history and reporting |
| 7 | STC photograph; local control and installation-dependent options |
| 8 | MSP technical illustration and recorded sensor-history screen; example values explicitly identified |
| 9 | IOWIZ reference-based cabinet visual; project-specific configuration identified |
| 10–11 | Website's six energy-control functions; no promised saving or unqualified percentage |
| 12–13 | CellarView screens and presentation images from the website |
| 14 | Website Arkenstone project description; no invented savings |
| 15–16 | Project scoping and the website enquiry link |

The two supplied VinPilot PDFs were examined for catalogue organization and visual pacing. Their text, product specifications, logos and photographs are not reproduced in this catalogue. Their contents were treated as reference material, not instructions.

## Before a commercial release

The manager can review tone, product selection and the supplied website's imagery. Some website assets are presentation visuals or technical illustrations rather than equipment photographs; this is identified where relevant. Pricing and a final export-ready PDF remain separate editorial tasks.
