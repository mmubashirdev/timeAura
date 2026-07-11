# TODO

## Task: Fix signup form scroll bar + cut heading

- [x] Inspect auth layout + globals CSS to find causes of unwanted scroll and top clipping

- [ ] Update `frontend/app/globals.css` and/or auth layout CSS/classes so:
  - [ ] Remove page-level scroll bar caused by `overflow:hidden`/height mismatch
  - [ ] Prevent heading from being clipped (top padding / min-height / align)
- [x] Run frontend lint/build (if available) to ensure no CSS/JS errors

- [ ] Quick smoke test: signup page renders without scrollbar and heading fully visible
