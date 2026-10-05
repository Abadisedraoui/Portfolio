# Accessibility checklist

Last updated: 6 October 2026. Baseline: `iteration-5` at
`381f06dc02e69ff17b9f863d1fcc2537a3491455`.

This is a working audit, not a statement of full WCAG conformance.
Only explicitly approved changes have been implemented, in the
`accessibility-approved-after-iteration-5` review branch. They are not yet
published. Items remain unchecked until browser verification is complete.

## Contrast and visual consistency

- [ ] C1 — “Click here”: `#9A9A9A` to `#52627A`. Implemented; browser verification pending.
- [ ] C2 — Dates, roles and decision numbers: `#8B96A8` to `#3E4E64`. Implemented; browser verification pending.
- [ ] C3 — Secondary descriptions, read time and captions: `#66758C` to `#3E4E64`. Implemented; browser verification pending.
- [ ] C4 — Contact field boundaries: opaque `#6D798A`, keeping the existing 1px border and corners. Implemented; rendered background verification pending.
- [ ] C5 — Complete contrast review of paper textures, washes, hover and focus states.

## Keyboard and dialogs

- [ ] K1 — About cards dialog: focus entry, containment, background inertness, Escape and focus restoration. Implemented; browser verification pending.
- [ ] K2 — Bring About cards forward with native button controls, preserving the DOM reading order. Disabled in the static mobile layout. Implemented; browser verification pending.
- [ ] K3 — Nine responsive gallery images: keyboard activation and return focus. Implemented; browser verification pending.
- [ ] K4 — Cookie notice modality, background access and dismissal focus. No changes approved or applied.
- [ ] K5 — All 15 navigation buttons: expanded state, controlled navigation, Escape and return focus. Implemented; browser verification pending.

## Structure and orientation

- [ ] E1 — Skip-to-main link. No changes approved or applied.
- [ ] E2 — Logical heading levels across 16 pages, preserving their visual styling. Implemented; browser verification pending.
- [ ] E3 — “All fields are required” in the contact form. Implemented; browser verification pending.

## Feedback and motion

- [ ] M1 — Contact confirmation stays until explicitly closed. Implemented; mocked success/close test passed with no external message sent.
- [ ] M2 — Remaining reduced-motion consistency in cookie animation and smooth scrolling. No changes approved or applied.
- [ ] M3 — Shared visible keyboard focus, blue on light paper and white in the dark footer. Implemented; browser verification pending.

## Content

- [ ] A1 — Silent videos: review equivalence of the existing captions and surrounding text; propose descriptions only where relevant visual information is missing. No video changes approved or applied.
- [ ] A2 — Review generic alternative text in image galleries, card illustrations and prototype links. Implemented; browser verification pending. Full data-table/diagram transcriptions are outside this task.
- [ ] A3 — Human/Robot CV PDFs: inspect tags, reading order, language and links; improve original Canva/Google Docs documents and verify the exported PDFs. No PDF changes approved or applied.

## Verification and statement

- [ ] V1 — Mobile, 320 CSS pixels and 200–400% zoom. Not tested in this environment.
- [ ] V2 — NVDA/VoiceOver testing. Authorized; no actual screen reader is available in this environment. Browser accessibility-tree review is recorded separately and does not complete this task.
- [ ] V3 — Full keyboard journeys through navigation, contact, cookies and viewers. Authorized; browser verification pending.
- [ ] V4 — Accessibility statement based on verified results and remaining limitations. Present the text for approval before publishing.

## Checks completed before publication

- Parsed all 28 JavaScript files/inline scripts without syntax errors.
- Verified a single main and h1 on all 16 pages and no skipped heading ranks.
- Tested persistent confirmation and explicit closing using the real functions with mocks; no submission sent to Formspree.
- Exercised the actual About script with a DOM mock: initial modal focus, Tab/Shift+Tab loop, Escape, preservation/restoration of background inertness, and return focus all passed.
- Exercised card activation: native button controls, retained focus, stable DOM reading order and disabling controls in the static layout all passed.
- Exercised mobile menu state, Escape closing and focus restoration with a DOM mock; verified the same handler and markup on all 15 pages with menus.
- Exercised Enter and Space on all nine responsive gallery controls: the correct three-image group, selected index and focus-restoration opener were supplied to the viewer.
- Base-color contrast: “Click here” 5.63:1 on `#F3F4F6`; secondary text 6.83:1 on `#E4E7EB`; field boundary 4.42:1 on white and 3.20:1 on `#D5DCE5`. These values do not replace rendered texture checks.

## Remaining verification limits

- The browser cannot access the local preview (`ERR_BLOCKED_BY_CLIENT`), so no rendered visual or browser keyboard check of this review branch has been completed.
- Production remains at iteration 5. Automatic approval review rejected updating `main` because explicit publication approval is required. Review proposal: https://github.com/Abadisedraoui/Portfolio/pull/1.
- V2 requires an actual NVDA/VoiceOver session; an accessibility tree or mocked DOM does not substitute for that test.
- V3 stays pending until the implemented branch is available in a browser and the complete journeys have been run. Cookie notice handling (K4) is still an unresolved finding.
