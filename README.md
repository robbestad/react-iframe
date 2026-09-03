# react-iframe

[![npm version](https://img.shields.io/npm/v/react-iframe.svg)](https://www.npmjs.com/package/react-iframe)
[![npm downloads](https://img.shields.io/npm/dm/react-iframe.svg)](https://www.npmjs.com/package/react-iframe)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-iframe)](https://bundlephobia.com/package/react-iframe)
[![license](https://img.shields.io/npm/l/react-iframe.svg)](LICENSE)

**Embed anything in React without fighting the native `<iframe>`.**

`react-iframe` is the typed, zero-dependency iframe component for React 18 and 19. Drop in a video, a payment widget, a third-party app, or an inline `srcDoc` document and get a real `HTMLIFrameElement` ref, every native attribute, and `postMessage` helpers that filter by origin and source.

Native iframes work. This package is for the parts that usually do not: TypeScript that matches the platform, `sandbox` as an array (joined, not exploded into characters), `allowFullScreen` that actually updates `allow`, and parent/child messaging without glue code.

Hundreds of thousands of installs every month. Dual ESM/CJS. Nothing else on the dependency tree.

[Live demo](https://react-iframe-vert.vercel.app) · [npm](https://www.npmjs.com/package/react-iframe)

```bash
npm install react-iframe
```

```tsx
import Iframe from "react-iframe"

;<Iframe
	url="https://media.w3.org/2010/05/sintel/trailer.mp4"
	width="100%"
	height="320"
	allow="autoplay; fullscreen"
	allowFullScreen
	title="Sintel trailer"
/>
```

## Why this instead of `<iframe />`

| You need                                         | What you get                                                                                          |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Types that match the DOM                         | Every native iframe attribute, plus `url`, array `sandbox`, and `srcDoc`                              |
| A ref you can actually use                       | `ref.current` is the `HTMLIFrameElement` (this was broken in 1.x)                                     |
| Talk to the framed page                          | `useIframeMessage` and `postToIframe` filter by origin and source                                     |
| Permissions browsers accept                      | `allowFullScreen` prepends `fullscreen` to `allow`; sandbox arrays are space-joined                   |
| Inline HTML                                      | `srcDoc` for documents you own; message helpers support origin `"null"`                               |
| A tiny surface area                              | Zero runtime dependencies. Dual ESM/CJS. React 18 and 19                                              |

You do not need this package to render an iframe. Use it when you want TypeScript types, a `ref` to the real `HTMLIFrameElement`, `url` / array `sandbox` / `allowFullScreen` conveniences, or the small `postMessage` helpers.

## Props

The component accepts every native iframe attribute (`src`, `srcDoc`, `allow`, `loading`, `referrerPolicy`, `fetchPriority`, `credentialless`, `title`, event handlers, aria attributes, …) plus:

| Prop                                | Type                   | Notes                                                                                                      |
| ----------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `url`                               | `string`               | Alias for `src`. Provide **one of** `url`, `src`, or `srcDoc`. `srcDoc` wins, then `src`, then `url`.      |
| `srcDoc`                            | `string`               | Inline HTML document. Omits `src` when set.                                                                |
| `sandbox`                           | `string` \| `string[]` | Arrays are joined with spaces. Strings are left intact.                                                    |
| `allowFullScreen`                   | `boolean`              | Sets the boolean attribute **and** prepends `fullscreen` to `allow` (semicolon-separated, no duplicates).  |
| `styles`                            | `CSSProperties`        | Merged into `style`. Precedence: `style` > `styles` > `display` / `position` / `overflow` / `frameBorder`. |
| `display` / `position` / `overflow` | CSS values             | Style shortcuts. **No defaults** — omit them to keep the browser UA stylesheet.                            |
| `frameBorder`                       | `number` \| `string`   | Maps to `style.border` unless `style`/`styles` already set `border`. Prefer `style={{ border: 0 }}`.       |

Deprecated 1.x aliases still work: `referrerpolicy` → `referrerPolicy`, `importance` → `fetchPriority`, `allowpaymentrequest` → `allow="payment"`.

At least one of `url`, `src`, or `srcDoc` is required by the type definition.

## Refs and postMessage

```tsx
import { useRef } from "react"
import Iframe, { postToIframe, useIframeMessage } from "react-iframe"

function Widget() {
	const ref = useRef<HTMLIFrameElement>(null)

	useIframeMessage(
		(event) => {
			if (event.data?.type === "ready") {
				postToIframe(ref.current, { type: "init" }, event.origin)
			}
		},
		{ origin: "https://widget.example", source: ref },
	)

	return (
		<Iframe ref={ref} url="https://widget.example/embed" title="Widget" width="100%" height="400" />
	)
}
```

`ref.current` is the DOM iframe. Same-origin frames expose `contentDocument` / `contentWindow`. Cross-origin frames do not — use `postMessage`.

`onError` is attached as a native listener and receives a DOM `Event`, not a React synthetic event. React itself only wires iframe `load`, not `error`.

`useIframeMessage` can filter by `origin` and by `source` (the iframe node, a ref, or a `Window`). Prefer `source` when more than one frame can share an origin. A `srcDoc` document has origin `"null"` (the string); pass `{ origin: "null" }` or filter with `source`. `postToIframe` requires a `targetOrigin` — the child origin, or `"*"` for `srcDoc` (the browser rejects `"null"` as a target origin).

## Permissions policy (`allow`)

Tokens are **semicolon-separated**, optionally with an origin:

```tsx
<Iframe
	url={pageUrl}
	allow="microphone *; camera *; midi *; clipboard-write; clipboard-read; fullscreen"
	allowFullScreen
/>
```

A space-separated list (`allow="microphone camera"`) is invalid and browsers will log “Unrecognized origin”.

## FAQ

**Can I read a video’s duration, hide scrollbars, or detect scroll-to-end inside the frame?**  
Only if the framed document is **same-origin**, via `ref.current.contentDocument`. Cross-origin access is blocked by the browser. Have the child page `postMessage` the data you need.

**Why is `sessionStorage` / cookies denied?**  
Sandboxing, third-party cookie blocking, or [`credentialless`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy#credentialless_iframes) isolation. Not a library bug.

**Can I set `Authorization` headers on the iframe request?**  
No. `<iframe src>` cannot attach custom HTTP headers. Use a same-origin proxy, cookies, or a query token the server accepts.

**Safari never fires `onLoad` for my payment frame.**  
That is a UA quirk. Have the child document `postMessage` when it is ready, and listen with `useIframeMessage`.

**Why is `event.origin` `"null"` for `srcDoc`?**  
A `srcDoc` document is an opaque origin. `MessageEvent.origin` is the string `"null"`. Pass `{ origin: "null" }` to `useIframeMessage`. When posting back, use `postToIframe(iframe, message, "*")` — browsers reject `"null"` as `targetOrigin`. Filtering with `source` does not depend on that string.

**PDF on iPad only shows the first page.**  
iOS Safari’s PDF-in-iframe behavior. Use [PDF.js](https://mozilla.github.io/pdf.js/) or `<object>`/`<embed>` as a workaround.

**YouTube (or another embed) is blank on mobile.**  
Pass a complete `allow` list and `allowFullScreen`. Autoplay is still subject to the browser’s media policies.

**How do I render a local HTML file?**  
Point `src` at a URL the app can serve (`/banner.html`), or pass the markup as `srcDoc`. A relative path that your bundler does not emit will 404 and may look like “it rendered my app instead.”

**Does this bypass `X-Frame-Options` / CSP `frame-ancestors`?**  
No. If the target site forbids embedding, no wrapper can override that.

## Migrating from 1.8.x

Most call sites keep working (`url`, `styles`, `sandbox` arrays, layout shortcuts).

Breaking changes in **2.0**:

- Peer dependency is React **18+**. 1.8.5 remains on npm for React 16/17.
- `sandbox="allow-scripts"` is no longer exploded into `"a l l o w - s c r i p t s"`.
- `allowFullScreen` is a real boolean. It is **not** always set to the string `"allowFullScreen"`. Combined with `allow`, tokens are joined with `"; "`.
- No default `display: initial` / `display: block`.
- `ref` is forwarded to the `<iframe>` (this was broken since 1.7).
- `onLoad` receives a React synthetic event. `onError` receives a native DOM `Event` (React does not synthesize iframe `error`).
- Invalid DOM props (`target`, `key` as an HTML attribute) are no longer written onto the node.
- The package is dual ESM/CJS with an `exports` map. Types ship from `dist/`.

## Development

```bash
npm install
npm test
npm run build
npm run demo
```
