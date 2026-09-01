/**
 * Merge Permissions-Policy `allow` tokens.
 * Feature names are de-duplicated; extras (e.g. "fullscreen") are prepended.
 */
export function mergeAllow(
	allow: string | undefined,
	extras: readonly string[] = [],
): string | undefined {
	const tokens = (allow ?? "")
		.split(";")
		.map((part) => part.trim())
		.filter(Boolean)

	const names = new Set(
		tokens.map((token) => token.split(/\s+/)[0]).filter((name): name is string => Boolean(name)),
	)

	const prefix: string[] = []
	for (const extra of extras) {
		const name = extra.split(/\s+/)[0]
		if (name && !names.has(name)) {
			prefix.push(extra)
			names.add(name)
		}
	}

	const merged = [...prefix, ...tokens]
	return merged.length > 0 ? merged.join("; ") : undefined
}
