import { useEffect, useRef } from "react"

export type UseIframeMessageOptions = {
	/** When set, messages from other origins are ignored. */
	origin?: string
}

/**
 * Subscribe to `window` `"message"` events from framed documents.
 * Pair with `postToIframe` or `ref.current.contentWindow.postMessage`.
 */
export function useIframeMessage(
	handler: (event: MessageEvent) => void,
	options: UseIframeMessageOptions = {},
): void {
	const { origin } = options
	const handlerRef = useRef(handler)

	useEffect(() => {
		handlerRef.current = handler
	}, [handler])

	useEffect(() => {
		const onMessage = (event: MessageEvent) => {
			if (origin && event.origin !== origin) {
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
 */
export function postToIframe(
	iframe: HTMLIFrameElement | null | undefined,
	message: unknown,
	targetOrigin = "*",
): boolean {
	const target = iframe?.contentWindow
	if (!target) {
		return false
	}
	target.postMessage(message, targetOrigin)
	return true
}
