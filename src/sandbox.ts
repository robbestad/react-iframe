export type SandboxToken =
	| "allow-downloads"
	| "allow-downloads-without-user-activation"
	| "allow-forms"
	| "allow-modals"
	| "allow-orientation-lock"
	| "allow-pointer-lock"
	| "allow-popups"
	| "allow-popups-to-escape-sandbox"
	| "allow-presentation"
	| "allow-same-origin"
	| "allow-scripts"
	| "allow-storage-access-by-user-activation"
	| "allow-top-navigation"
	| "allow-top-navigation-by-user-activation"
	| "allow-top-navigation-to-custom-protocols"

export type SandboxValue = SandboxToken | (string & {})

/**
 * Normalize `sandbox` so a string is left intact (spreading a string into
 * characters was a 1.x bug) and an array is joined with spaces.
 *
 * An empty string is preserved: it enables the sandbox with no permissions.
 */
export function normalizeSandbox(
	sandbox: SandboxValue | readonly SandboxValue[] | undefined,
): string | undefined {
	if (sandbox == null) {
		return undefined
	}
	if (typeof sandbox === "string") {
		return sandbox
	}
	return sandbox.join(" ")
}
