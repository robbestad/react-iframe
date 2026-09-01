# Change Log

All notable changes to this project are documented in this file.

## [2.0.1](https://github.com/svenanders/react-iframe/compare/v2.0.0...v2.0.1) (2026-09-02)

### Fixes

* **onError:** pass the native DOM `Event` instead of casting it to a React synthetic event. The listener is kept stable across handler identity changes.
* **refs:** keep the host ref callback stable so an inline `ref` does not retrigger `null` / node on every parent render.
* **useIframeMessage:** optional `source` filter matches `event.source` to the iframe's `contentWindow`. `origin: "null"` matches `srcDoc` frames.
* **postToIframe:** `targetOrigin` is required. Pass the child origin, or `"*"` for `srcDoc` / opaque origins (browsers reject `"null"` as a target origin).

## [2.0.0](https://github.com/svenanders/react-iframe/compare/v1.8.5...v2.0.0) (2026-09-01)

### Breaking

* Require React 18+ (React 19 supported). React 16/17 should stay on 1.8.5.
* Dual ESM/CJS package with an `exports` map. Types live in `dist/` instead of the repo root.
* Drop the `object-assign` runtime dependency.
* Do not force `display: initial` or `allowFullScreen="allowFullScreen"`.
* Stop writing `target` and `key` onto the DOM node.
* `onLoad` / `onError` / mouse handlers use React’s event types instead of `() => void`.

### Fixes

* **sandbox:** a string value is no longer spread into individual characters (`"allow-scripts"` no longer becomes `"a l l o w - s c r i p t s"`).
* **allowFullScreen:** honor the boolean; merge `fullscreen` into `allow` with semicolons and without duplicates ([#139](https://github.com/svenanders/react-iframe/issues/139)).
* **refs:** `forwardRef` to the underlying `HTMLIFrameElement` ([#54](https://github.com/svenanders/react-iframe/issues/54), [#43](https://github.com/svenanders/react-iframe/issues/43)).
* **events:** `onLoad` receives the synthetic event; `onError` is supported ([#67](https://github.com/svenanders/react-iframe/issues/67), [#136](https://github.com/svenanders/react-iframe/pull/136)).
* **docs:** sandbox arrays use square brackets ([#135](https://github.com/svenanders/react-iframe/issues/135)).

### Features

* Pass through native iframe attributes (`srcDoc`, `fetchPriority`, `credentialless`, `referrerPolicy`, …).
* `srcDoc` for inline HTML documents ([#55](https://github.com/svenanders/react-iframe/issues/55)).
* `useIframeMessage` and `postToIframe` helpers for `postMessage`.
* Deprecated aliases: `referrerpolicy`, `importance`, `allowpaymentrequest`.

## [1.8.5](https://github.com/svenanders/react-iframe/compare/v1.8.4...v1.8.5) (2022-10-20)

## [1.8.4](https://github.com/svenanders/react-iframe/compare/v1.8.3...v1.8.4) (2022-09-27)

## [1.8.3](https://github.com/svenanders/react-iframe/compare/v1.8.2...v1.8.3) (2022-09-27)

## [1.8.2](https://github.com/svenanders/react-iframe/compare/v1.8.1...v1.8.2) (2022-09-26)

## [1.8.1](https://github.com/svenanders/react-iframe/compare/v1.8.0...v1.8.1) (2022-09-26)

### Bug Fixes

* merge styles into style ([93d9bfe](https://github.com/svenanders/react-iframe/commit/93d9bfecf0c5d086e7c3bd2d5721ee0a6b657675))

# [1.8.0](https://github.com/svenanders/react-iframe/compare/v1.7.16...v1.8.0) (2019-04-14)

### Bug Fixes

* add some lines about this lib vs native `<iframe>` ([e64bd0a](https://github.com/svenanders/react-iframe/commit/e64bd0a))

### Features

* deprecates attributes according to HTML5 spec, sets new default values ([e1c6a62](https://github.com/svenanders/react-iframe/commit/e1c6a62))

## [1.7.16](https://github.com/svenanders/react-iframe/compare/v1.7.15...v1.7.16) (2019-04-14)

### Bug Fixes

* actually add the new loading property ([df1dcdd](https://github.com/svenanders/react-iframe/commit/df1dcdd))
