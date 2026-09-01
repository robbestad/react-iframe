import { renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { postToIframe, useIframeMessage } from "./use-iframe-message"

function dispatchMessage(data: unknown, origin: string, source?: MessageEventSource | null) {
	window.dispatchEvent(new MessageEvent("message", { data, origin, source: source ?? null }))
}

describe("useIframeMessage", () => {
	it("forwards messages", () => {
		const handler = vi.fn()
		renderHook(() => useIframeMessage(handler))

		dispatchMessage({ type: "ping" }, "https://example.com")

		expect(handler).toHaveBeenCalledTimes(1)
		expect(handler.mock.calls[0]?.[0].data).toEqual({ type: "ping" })
	})

	it("filters by origin when provided", () => {
		const handler = vi.fn()
		renderHook(() => useIframeMessage(handler, { origin: "https://trusted.example" }))

		dispatchMessage("nope", "https://evil.example")
		dispatchMessage("ok", "https://trusted.example")

		expect(handler).toHaveBeenCalledTimes(1)
		expect(handler.mock.calls[0]?.[0].data).toBe("ok")
	})

	it("uses the latest handler without resubscribing", () => {
		const first = vi.fn()
		const second = vi.fn()
		const { rerender } = renderHook(({ handler }) => useIframeMessage(handler), {
			initialProps: { handler: first },
		})

		rerender({ handler: second })
		dispatchMessage("hi", "https://example.com")

		expect(first).not.toHaveBeenCalled()
		expect(second).toHaveBeenCalledTimes(1)
	})

	it('matches srcDoc frames on origin "null"', () => {
		const handler = vi.fn()
		renderHook(() => useIframeMessage(handler, { origin: "null" }))

		dispatchMessage("nope", "https://example.com")
		dispatchMessage("ok", "null")

		expect(handler).toHaveBeenCalledTimes(1)
		expect(handler.mock.calls[0]?.[0].data).toBe("ok")
	})

	it("filters by iframe contentWindow when source is set", () => {
		const iframe = document.createElement("iframe")
		const contentWindow = { name: "child" } as unknown as Window
		Object.defineProperty(iframe, "contentWindow", { value: contentWindow })
		const handler = vi.fn()
		renderHook(() => useIframeMessage(handler, { source: iframe }))

		dispatchMessage("nope", "https://example.com", window)
		dispatchMessage("ok", "https://example.com", contentWindow)

		expect(handler).toHaveBeenCalledTimes(1)
		expect(handler.mock.calls[0]?.[0].data).toBe("ok")
	})

	it("reads source from a ref object", () => {
		const iframe = document.createElement("iframe")
		const contentWindow = { name: "child" } as unknown as Window
		Object.defineProperty(iframe, "contentWindow", { value: contentWindow })
		const ref = { current: iframe }
		const handler = vi.fn()
		renderHook(() => useIframeMessage(handler, { source: ref }))

		dispatchMessage("ok", "https://example.com", contentWindow)
		expect(handler).toHaveBeenCalledTimes(1)
	})

	it("drops messages while a source iframe is not ready", () => {
		const iframe = document.createElement("iframe")
		const handler = vi.fn()
		renderHook(() => useIframeMessage(handler, { source: iframe }))

		dispatchMessage("too-soon", "https://example.com", window)
		expect(handler).not.toHaveBeenCalled()
	})
})

describe("postToIframe", () => {
	it("posts to contentWindow and returns true", () => {
		const iframe = document.createElement("iframe")
		const postMessage = vi.fn()
		Object.defineProperty(iframe, "contentWindow", {
			value: { postMessage },
		})

		expect(postToIframe(iframe, { hello: true }, "https://example.com")).toBe(true)
		expect(postMessage).toHaveBeenCalledWith({ hello: true }, "https://example.com")
	})

	it("returns false when the iframe is missing or not ready", () => {
		expect(postToIframe(null, "x", "https://example.com")).toBe(false)
		expect(postToIframe(undefined, "x", "https://example.com")).toBe(false)
		expect(postToIframe(document.createElement("iframe"), "x", "https://example.com")).toBe(false)
	})
})
