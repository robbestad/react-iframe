import {
	forwardRef,
	useCallback,
	useLayoutEffect,
	useRef,
	type CSSProperties,
	type IframeHTMLAttributes,
	type Ref,
} from "react"

import { mergeAllow } from "./allow"
import { normalizeSandbox, type SandboxValue } from "./sandbox"

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
	if (typeof ref === "function") {
		ref(value)
	} else if (ref) {
		ref.current = value
	}
}

type FetchPriority = "high" | "low" | "auto"

type NativeIframeProps = Omit<
	IframeHTMLAttributes<HTMLIFrameElement>,
	"sandbox" | "src" | "srcDoc" | "onError"
>

type LayoutShortcuts = {
	/** Applied as `style.display` when set. */
	display?: CSSProperties["display"]
	/** Applied as `style.position` when set. */
	position?: CSSProperties["position"]
	/** Applied as `style.overflow` when set. */
	overflow?: CSSProperties["overflow"]
	/**
	 * Applied as `style.border` when set and neither `style.border` nor
	 * `styles.border` is provided. Prefer CSS `style={{ border: 0 }}`.
	 */
	frameBorder?: number | string
}

type Conveniences = LayoutShortcuts & {
	/**
	 * Alias for `src`. Ignored when `src` or `srcDoc` is set.
	 * Kept for 1.x compatibility.
	 */
	url?: string
	src?: string
	srcDoc?: string
	/** Merged into `style`. Inline `style` wins over `styles` over layout shortcuts. */
	styles?: CSSProperties
	sandbox?: SandboxValue | readonly SandboxValue[]
	fetchPriority?: FetchPriority
	/**
	 * Load the frame in a credentialless (ephemeral) context.
	 * React does not yet treat this as a boolean attribute, so `true` is
	 * emitted as the empty HTML boolean `credentialless=""`.
	 */
	credentialless?: boolean
	/**
	 * @deprecated Use `referrerPolicy`.
	 */
	referrerpolicy?: IframeHTMLAttributes<HTMLIFrameElement>["referrerPolicy"]
	/**
	 * @deprecated Use `fetchPriority`.
	 */
	importance?: FetchPriority
	/**
	 * @deprecated Use `allow="payment"`.
	 */
	allowpaymentrequest?: boolean
	/**
	 * Native `error` event. React does not emit iframe `onError` as a
	 * synthetic event (only img / link / media).
	 */
	onError?: (event: Event) => void
}

type WithUrl = { url: string; src?: string; srcDoc?: string }
type WithSrc = { src: string; url?: string; srcDoc?: string }
type WithSrcDoc = { srcDoc: string; url?: string; src?: string }

export type IframeProps = NativeIframeProps & Conveniences & (WithUrl | WithSrc | WithSrcDoc)

function mergeStyle(
	shortcuts: CSSProperties,
	styles: CSSProperties | undefined,
	style: CSSProperties | undefined,
): CSSProperties | undefined {
	const merged: CSSProperties = { ...shortcuts, ...styles, ...style }
	return Object.keys(merged).length > 0 ? merged : undefined
}

export const Iframe = forwardRef<HTMLIFrameElement, IframeProps>(function Iframe(
	{
		url,
		src,
		srcDoc,
		styles,
		style,
		sandbox,
		allow,
		allowFullScreen,
		display,
		position,
		overflow,
		frameBorder,
		referrerPolicy,
		referrerpolicy,
		fetchPriority,
		importance,
		allowpaymentrequest,
		credentialless,
		onError,
		...rest
	},
	ref,
) {
	const nodeRef = useRef<HTMLIFrameElement | null>(null)
	const onErrorRef = useRef(onError)

	useLayoutEffect(() => {
		onErrorRef.current = onError
	}, [onError])

	// Keep the host ref callback stable so React does not call it with
	// `null` on every parent render when `ref` is an inline function.
	const setRef = useCallback((node: HTMLIFrameElement | null) => {
		nodeRef.current = node
	}, [])

	useLayoutEffect(() => {
		assignRef(ref, nodeRef.current)
		return () => assignRef(ref, null)
	}, [ref])

	useLayoutEffect(() => {
		const node = nodeRef.current
		if (!node) {
			return
		}
		// React attaches iframe `load` but not `error` (img/link/media only).
		const listener = (event: Event) => {
			onErrorRef.current?.(event)
		}
		node.addEventListener("error", listener)
		return () => node.removeEventListener("error", listener)
	}, [])

	const extras: string[] = []
	if (allowFullScreen) {
		extras.push("fullscreen")
	}
	if (allowpaymentrequest) {
		extras.push("payment")
	}

	const shortcutStyle: CSSProperties = {}
	if (position != null) {
		shortcutStyle.position = position
	}
	if (display != null) {
		shortcutStyle.display = display
	}
	if (overflow != null) {
		shortcutStyle.overflow = overflow
	}
	if (frameBorder != null && Number(frameBorder) >= 0) {
		shortcutStyle.border = frameBorder as CSSProperties["border"]
	}

	const resolvedSrcDoc = srcDoc
	const resolvedSrc = resolvedSrcDoc ? undefined : (src ?? url)
	const resolvedSandbox = normalizeSandbox(sandbox)
	const resolvedAllow = mergeAllow(allow, extras)
	const resolvedStyle = mergeStyle(shortcutStyle, styles, style)
	const resolvedReferrerPolicy = referrerPolicy ?? referrerpolicy
	const resolvedFetchPriority = fetchPriority ?? importance

	const iframeProps: IframeHTMLAttributes<HTMLIFrameElement> & {
		fetchPriority?: FetchPriority
		credentialless?: string
	} = {
		src: resolvedSrc,
		srcDoc: resolvedSrcDoc,
		sandbox: resolvedSandbox,
		allow: resolvedAllow,
		allowFullScreen: allowFullScreen || undefined,
		referrerPolicy: resolvedReferrerPolicy,
		style: resolvedStyle,
		...rest,
	}

	if (resolvedFetchPriority) {
		iframeProps.fetchPriority = resolvedFetchPriority
	}
	if (credentialless) {
		iframeProps.credentialless = ""
	}

	return <iframe ref={setRef} {...(iframeProps as IframeHTMLAttributes<HTMLIFrameElement>)} />
})

Iframe.displayName = "Iframe"
