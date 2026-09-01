import { describe, expect, it } from "vitest"

import { normalizeSandbox } from "./sandbox"

describe("normalizeSandbox", () => {
	it("leaves a string intact (regression: 1.x spread strings into characters)", () => {
		expect(normalizeSandbox("allow-scripts")).toBe("allow-scripts")
		expect(normalizeSandbox("allow-scripts allow-same-origin")).toBe(
			"allow-scripts allow-same-origin",
		)
	})

	it("joins arrays with spaces", () => {
		expect(normalizeSandbox(["allow-scripts", "allow-same-origin"])).toBe(
			"allow-scripts allow-same-origin",
		)
	})

	it("preserves an empty sandbox (max restrictions)", () => {
		expect(normalizeSandbox("")).toBe("")
		expect(normalizeSandbox([])).toBe("")
	})

	it("returns undefined when omitted", () => {
		expect(normalizeSandbox(undefined)).toBeUndefined()
	})
})
