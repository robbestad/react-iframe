import React, { useState, createRef, FunctionComponentElement } from "react"
// @ts-ignore
import objectAssign from "object-assign"

import { IIframe } from "../types"

const Iframe: FunctionComponentElement<IIframe>
	= ({
			 url, allowFullScreen, position, display,
			 height, width, overflow, styles, onLoad,
			 onMouseOver, onMouseOut, scrolling, id,
			 frameBorder, ariaHidden, sandbox, allow,
			 className, title, ariaLabel, ariaLabelledby,
			 name, target
		 }) => {

	const iFrameRef = createRef()

	const defaultProps = objectAssign({
		ref: iFrameRef,
		src: url,
		target: target || "_parent",
		allowFullScreen: allowFullScreen || false,
		style: {
			position: position || "absolute",
			display: display || "block",
			height: height || "100%",
			width: width || "100%",
			overflow: overflow || "hidden"
		},
		scrolling: scrolling || "no",
		frameBorder: frameBorder || 0,
		height: height || "100%",
		sandbox: sandbox || null,
		name: name || null,
		className: className || null,
		title: title || null,
		allow: allow || null,
		id: id || null,
		"aria-labelledby": ariaLabelledby || null,
		"aria-hidden": ariaHidden || null,
		width: width || "100%",
		onLoad: onLoad || null,
		onMouseOver: onMouseOver || null,
		onMouseOut: onMouseOut || null
	})
	let props = Object.create(null)
	for (let prop of Object.keys(defaultProps)) {
		if (defaultProps[prop] != null) {
			props[prop] = defaultProps[prop]
		}
	}
	return <iframe {...props}/>

}

export default Iframe
