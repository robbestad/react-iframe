import { createRef } from "react"
import { fireEvent, render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { Iframe } from "./iframe"

function getIframe(container: HTMLElement) {
	const iframe = container.querySelector("iframe")
	if (!iframe) {
		throw new Error("expected an iframe")
	}
	return iframe
}

describe("Iframe", () => {
	it("uses url as src", () => {
		const { container } = render(<Iframe url="https://example.com/from-url" />)
		expect(getIframe(container).getAttribute("src")).toBe("https://example.com/from-url")
	})

	it("lets src override url", () => {
		const { container } = render(
			<Iframe url="https://example.com/url" src="https://example.com/src" />,
		)
		expect(getIframe(container).getAttribute("src")).toBe("https://example.com/src")
	})

	it("lets srcDoc win and omits src", () => {
		const html = "<p>hello</p>"
		const { container } = render(
			<Iframe url="https://example.com/url" src="https://example.com/src" srcDoc={html} />,
		)
		const iframe = getIframe(container)
		expect(iframe.getAttribute("srcdoc")).toBe(html)
		expect(iframe.getAttribute("src")).toBeNull()
	})

	it("does not split a sandbox string into characters", () => {
		const { container } = render(<Iframe url="https://example.com" sandbox="allow-scripts" />)
		expect(getIframe(container).getAttribute("sandbox")).toBe("allow-scripts")
	})

	it("joins sandbox arrays with spaces", () => {
		const { container } = render(
			<Iframe url="https://example.com" sandbox={["allow-scripts", "allow-same-origin"]} />,
		)
		expect(getIframe(container).getAttribute("sandbox")).toBe("allow-scripts allow-same-origin")
	})

	it("sets allow=fullscreen and the boolean attribute when allowFullScreen is true", () => {
		const { container } = render(<Iframe url="https://example.com" allowFullScreen />)
		const iframe = getIframe(container)
		expect(iframe.getAttribute("allow")).toBe("fullscreen")
		expect(iframe.hasAttribute("allowfullscreen")).toBe(true)
	})

	it("does not emit allowFullScreen when it is false", () => {
		const { container } = render(<Iframe url="https://example.com" allowFullScreen={false} />)
		const iframe = getIframe(container)
		expect(iframe.hasAttribute("allowfullscreen")).toBe(false)
		expect(iframe.getAttribute("allow")).toBeNull()
	})

	it("merges allowFullScreen into an existing allow list with semicolons", () => {
		const { container } = render(
			<Iframe
				url="https://example.com"
				allowFullScreen
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			/>,
		)
		expect(getIframe(container).getAttribute("allow")).toBe(
			"fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
		)
	})

	it("does not duplicate fullscreen already present in allow", () => {
		const { container } = render(
			<Iframe
				url="https://example.com"
				allowFullScreen
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
			/>,
		)
		expect(getIframe(container).getAttribute("allow")).toBe(
			"accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture",
		)
	})

	it("merges layout shortcuts, styles, and style with the right precedence", () => {
		const { container } = render(
			<Iframe
				url="https://example.com"
				position="relative"
				display="block"
				overflow="auto"
				frameBorder={0}
				styles={{ background: "red", height: "100%" }}
				style={{ height: "25px" }}
			/>,
		)
		expect(getIframe(container).style.cssText).toContain("position: relative")
		expect(getIframe(container).style.display).toBe("block")
		expect(getIframe(container).style.overflow).toBe("auto")
		expect(getIframe(container).style.background).toBe("red")
		expect(getIframe(container).style.height).toBe("25px")
		expect(getIframe(container).style.border).toBe("0px")
	})

	it("does not force default display or allowFullScreen", () => {
		const { container } = render(<Iframe url="https://example.com" />)
		const iframe = getIframe(container)
		expect(iframe.getAttribute("style")).toBeNull()
		expect(iframe.hasAttribute("allowfullscreen")).toBe(false)
	})

	it("forwards a ref to the real iframe element", () => {
		const ref = createRef<HTMLIFrameElement>()
		const { container } = render(<Iframe url="https://example.com" ref={ref} />)
		expect(ref.current).toBe(getIframe(container))
		expect(ref.current).toBeInstanceOf(HTMLIFrameElement)
	})

	it("fires onLoad and onError with the iframe as the event target", () => {
		const onLoad = vi.fn()
		const onError = vi.fn()
		const { container } = render(
			<Iframe url="https://example.com" onLoad={onLoad} onError={onError} />,
		)
		const iframe = getIframe(container)

		fireEvent.load(iframe)
		expect(onLoad).toHaveBeenCalledTimes(1)
		expect(onLoad.mock.calls[0]?.[0].target).toBe(iframe)
		expect(onLoad.mock.calls[0]?.[0].type).toBe("load")

		iframe.dispatchEvent(new Event("error"))
		expect(onError).toHaveBeenCalledTimes(1)
		expect(onError.mock.calls[0]?.[0].target).toBe(iframe)
	})

	it("passes native iframe attributes through", () => {
		const { container } = render(
			<Iframe
				url="https://example.com"
				id="my-iframe"
				className="frame"
				title="Demo"
				name="demo-frame"
				loading="lazy"
				referrerPolicy="no-referrer"
				fetchPriority="low"
				credentialless
			/>,
		)
		const iframe = getIframe(container)
		expect(iframe.id).toBe("my-iframe")
		expect(iframe.className).toBe("frame")
		expect(iframe.title).toBe("Demo")
		expect(iframe.name).toBe("demo-frame")
		expect(iframe.getAttribute("loading")).toBe("lazy")
		expect(iframe.getAttribute("referrerpolicy")).toBe("no-referrer")
		expect(iframe.getAttribute("fetchpriority")).toBe("low")
		expect(iframe.hasAttribute("credentialless")).toBe(true)
	})

	it("maps deprecated 1.x aliases", () => {
		const { container } = render(
			<Iframe
				url="https://example.com"
				referrerpolicy="origin"
				importance="high"
				allowpaymentrequest
			/>,
		)
		const iframe = getIframe(container)
		expect(iframe.getAttribute("referrerpolicy")).toBe("origin")
		expect(iframe.getAttribute("fetchpriority")).toBe("high")
		expect(iframe.getAttribute("allow")).toBe("payment")
	})

	it("prefers the modern alias names when both are passed", () => {
		const { container } = render(
			<Iframe
				url="https://example.com"
				referrerPolicy="same-origin"
				referrerpolicy="origin"
				fetchPriority="low"
				importance="high"
			/>,
		)
		const iframe = getIframe(container)
		expect(iframe.getAttribute("referrerpolicy")).toBe("same-origin")
		expect(iframe.getAttribute("fetchpriority")).toBe("low")
	})
})
