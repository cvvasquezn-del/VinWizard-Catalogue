# Verification record

1 November 2026. First review edition.

- Node navigation tests: 3 passed, 0 failed. Covers all pages in order, front/back cover boundaries, individual mobile pages, selected-page preservation when switching to spreads, and invalid shared-page values.
- Build: 16 static A4 pages generated, referenced local images verified, no unresolved template tokens.
- JavaScript syntax checks: application and local server passed.
- Browser: desktop spreads and 390 × 844 mobile viewport inspected. No horizontal document overflow in mobile book view.
- Every page inspected: no content overflow or broken images. Content remains at least 29 CSS pixels above the printed footer in the final layout.
- Contents dialog and chapter navigation checked. Image detail and page zoom dialogs checked.
- Reading mode creates all 16 pages and returns to the selected book page.
- Share button copied a page link successfully on localhost.
- Home/End and arrow navigation checked in the browser. Touch swipe support is implemented; no physical touchscreen device was used in this session.
- Header controls retain accessible names when their visible labels are hidden on mobile.
- Browser console: no warnings or errors in the final desktop and mobile checks.
- Independent read-only code review: ready for internal review; no critical, important or actionable minor findings. Reviewer independently reran the 3 navigation tests successfully.
- Screenshots: overview and representative desktop preview in this directory; individual QA screenshots in ignored `qa/`.

The print stylesheet is included as a foundation for the later PDF phase. A final PDF has not been exported or verified. Fullscreen uses the browser's native API and depends on browser support; no physical-device/fullscreen certification is implied.

The catalogue is prepared locally for Netlify. No hosted URL or deployment has been created, and no remote GitHub repository has been changed.

Browser QA used the local HTTP preview (HTTP 200). Direct `file:` navigation was unavailable in the in-app test browser because its policy permits only HTTP/HTTPS; direct-file opening is therefore not part of the verified browser results.
