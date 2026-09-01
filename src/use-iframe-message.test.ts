import { renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { postToIframe, useIframeMessage } from "./use-iframe-message"

function dispatchMessage(data: unknown, origin: string) {
	window.dispatchEvent(new MessageEvent("message", { data, origin }))
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
		expect(postToIframe(null, "x")).toBe(false)
		expect(postToIframe(undefined, "x")).toBe(false)
		expect(postToIframe(document.createElement("iframe"), "x")).toBe(false)
	})
})
