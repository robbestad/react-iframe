import React, { ComponentType } from "react"
import objectAssign from "object-assign"

import { IIframe } from "./types"

const Iframe: ComponentType<IIframe> = ({
	url,
	allowFullScreen,
	position,
	display,
	height,
	width,
	overflow,
	styles,
	onLoad,
	onMouseOver,
	onMouseOut,
	scrolling,
	id,
	frameBorder,
	ariaHidden,
	sandbox,
	allow,
	className,
	title,
	ariaLabel,
	ariaLabelledby,
	name,
	target,
	loading,
	importance,
	referrerpolicy,
	allowpaymentrequest,
	src,
	key
}: IIframe) => {
	const defaultProps = objectAssign({
		src: src || url,
		target: target || null,
		style: {
			position: position || null,
			display: display || "initial",
			overflow: overflow || null
		},
		scrolling: scrolling || null,
		allowpaymentrequest: allowpaymentrequest || null,
		importance: importance || null,
		sandbox: (sandbox && [...sandbox].join(" ")) || null,
		loading: loading || null,
		styles: styles || null,
		name: name || null,
		className: className || null,
		allowFullScreen: "allowFullScreen" || null,
		referrerpolicy: referrerpolicy || null,
		title: title || null,
		allow: allow || null,
		id: id || null,
		"aria-labelledby": ariaLabelledby || null,
		"aria-hidden": ariaHidden || null,
		"aria-label": ariaLabel || null,
		width: width || null,
		height: height || null,
		onLoad: onLoad || null,
		onMouseOver: onMouseOver || null,
		onMouseOut: onMouseOut || null,
		key: key || "iframe"
	})
	let props = Object.create(null)
	for (let prop of Object.keys(defaultProps)) {
		if (defaultProps[prop] != null) {
			props[prop] = defaultProps[prop]
		}
	}

	for (let i of Object.keys(props.style)) {
		if (props.style[i] == null) {
			delete props.style[i]
		}
	}

	if (props.styles) {
		for (let key of Object.keys(props.styles)) {
			if (props.styles.hasOwnProperty(key)) {
				props.style[key] = props.styles[key]
			}
			if (Object.keys(props.styles).pop() == key) {
				delete props.styles
			}
		}
	}

	if (allowFullScreen) {
		if ("allow" in props) {
			const currentAllow = props.allow.replace("fullscreen", "")
			props.allow = `fullscreen ${currentAllow.trim()}`.trim()
		} else {
			props.allow = "fullscreen"
		}
	}

	if (frameBorder >= 0) {
		if (!props.style.hasOwnProperty("border")) {
			props.style.border = frameBorder
		}
	}
	return <iframe {...props} />
}

export default Iframe
