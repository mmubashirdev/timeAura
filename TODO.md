# TODO

- [ ] Implement collections API wiring:
  - [x] Replace static `PRODUCTS` usage in `frontend/app/collections/page.js` with `productsApi.list(params)`.
  - [x] Replace sidebar option sources in `frontend/app/collections/page.js` via `productsApi.filters()`.

- [ ] Update `FiltersSidebar.jsx` to consume filter option lists via props (no static `@/lib/data/products` constants).
- [ ] Refactor cart state to call backend:
  - [ ] Update `frontend/hooks/useCart.js` to fetch from `cartApi.get()` and mutate via `cartApi`.
  - [ ] Add merge flow `cartApi.merge(cartStore.get())` after successful login.

- [ ] Trigger merge right after login:
  - [ ] Update `frontend/app/login/page.js` to dispatch an event after token save.
- [ ] Verify:
  - [ ] Run frontend lint/typecheck/build.
  - [ ] Manually verify collections filtering and cart merge behavior.
