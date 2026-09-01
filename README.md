# react-iframe

A thin, typed React wrapper around [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

```bash
npm install react-iframe
```

```tsx
import Iframe from "react-iframe"

;<Iframe
	url="https://www.youtube.com/embed/dQw4w9WgXcQ"
	width="100%"
	height="320"
	loading="lazy"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
	allowFullScreen
	title="Demo"
/>
```

You do not need this package to render an iframe. Use it when you want TypeScript types, a `ref` to the real `HTMLIFrameElement`, `url` / array `sandbox` / `allowFullScreen` conveniences, or the small `postMessage` helpers.

Requires **React 18 or 19**.

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
		{ origin: "https://widget.example" },
	)

	return (
		<Iframe ref={ref} url="https://widget.example/embed" title="Widget" width="100%" height="400" />
	)
}
```

`ref.current` is the DOM iframe. Same-origin frames expose `contentDocument` / `contentWindow`. Cross-origin frames do not — use `postMessage`.

`onError` is attached as a native listener. React itself only wires iframe `load`, not `error`.

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
- `onLoad` / `onError` receive a React synthetic event.
- Invalid DOM props (`target`, `key` as an HTML attribute) are no longer written onto the node.
- The package is dual ESM/CJS with an `exports` map. Types ship from `dist/`.

## Development

```bash
npm install
npm test
npm run build
npm run demo
```
