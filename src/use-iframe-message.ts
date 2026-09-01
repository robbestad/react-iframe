import { useEffect, useRef, type RefObject } from "react"

export type IframeMessageSource =
	Window | HTMLIFrameElement | RefObject<HTMLIFrameElement | null | undefined>

export type UseIframeMessageOptions = {
	/**
	 * When set, messages from other origins are ignored.
	 * A `srcDoc` frame has origin `"null"` (the string).
	 */
	origin?: string
	/**
	 * When set, messages whose `event.source` is not this frame's
	 * `contentWindow` are ignored. Prefer this over origin-only filtering
	 * when several frames share an origin.
	 */
	source?: IframeMessageSource | null
}

function windowFromSource(
	source: IframeMessageSource | null | undefined,
): Window | null | undefined {
	if (source == null) {
		return undefined
	}
	if (typeof HTMLIFrameElement !== "undefined" && source instanceof HTMLIFrameElement) {
		return source.contentWindow
	}
	if (typeof source === "object" && "current" in source) {
		const node = source.current
		if (node == null) {
			return null
		}
		if (typeof HTMLIFrameElement !== "undefined" && node instanceof HTMLIFrameElement) {
			return node.contentWindow
		}
	}
	return source as Window
}

/**
 * Subscribe to `window` `"message"` events from framed documents.
 * Pair with `postToIframe` or `ref.current.contentWindow.postMessage`.
 */
export function useIframeMessage(
	handler: (event: MessageEvent) => void,
	options: UseIframeMessageOptions = {},
): void {
	const { origin, source } = options
	const handlerRef = useRef(handler)
	const sourceRef = useRef(source)

	useEffect(() => {
		handlerRef.current = handler
	}, [handler])

	useEffect(() => {
		sourceRef.current = source
	}, [source])

	useEffect(() => {
		const onMessage = (event: MessageEvent) => {
			if (origin && event.origin !== origin) {
				return
			}
			const expected = windowFromSource(sourceRef.current)
			if (expected !== undefined && event.source !== expected) {
				return
			}
			handlerRef.current(event)
		}

		window.addEventListener("message", onMessage)
		return () => window.removeEventListener("message", onMessage)
	}, [origin])
}

/**
 * Post a message to an iframe's `contentWindow`.
 * Returns `false` when the iframe is missing or not yet ready.
 *
 * `targetOrigin` is required. Use the child's origin. For a `srcDoc`
 * frame the origin is opaque and the browser rejects `"null"` — pass `"*"`.
 */
export function postToIframe(
	iframe: HTMLIFrameElement | null | undefined,
	message: unknown,
	targetOrigin: string,
): boolean {
	const target = iframe?.contentWindow
	if (!target) {
		return false
	}
	target.postMessage(message, targetOrigin)
	return true
}
