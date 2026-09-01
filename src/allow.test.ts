import { describe, expect, it } from "vitest"

import { mergeAllow } from "./allow"

describe("mergeAllow", () => {
	it("returns undefined when nothing is provided", () => {
		expect(mergeAllow(undefined)).toBeUndefined()
		expect(mergeAllow(undefined, [])).toBeUndefined()
		expect(mergeAllow("")).toBeUndefined()
	})

	it("returns a lone extra token", () => {
		expect(mergeAllow(undefined, ["fullscreen"])).toBe("fullscreen")
	})

	it("prepends extras and joins with semicolons", () => {
		expect(mergeAllow("autoplay", ["fullscreen"])).toBe("fullscreen; autoplay")
	})

	it("does not duplicate an existing feature name", () => {
		const allow =
			"accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"

		expect(mergeAllow(allow, ["fullscreen"])).toBe(
			"accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture",
		)
	})

	it("treats `fullscreen *` as already present", () => {
		expect(mergeAllow("fullscreen *; autoplay", ["fullscreen"])).toBe("fullscreen *; autoplay")
	})

	it("strips leftover semicolons and trims tokens", () => {
		expect(mergeAllow("autoplay; ; encrypted-media ;", ["fullscreen"])).toBe(
			"fullscreen; autoplay; encrypted-media",
		)
	})

	it("can add multiple extras", () => {
		expect(mergeAllow("autoplay", ["fullscreen", "payment"])).toBe("fullscreen; payment; autoplay")
	})
})
