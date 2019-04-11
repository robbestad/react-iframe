"use strict"
var __importStar =
	(this && this.__importStar) ||
	function(mod) {
		if (mod && mod.__esModule) return mod
		var result = {}
		if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
		result["default"] = mod
		return result
	}
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, "__esModule", { value: true })
const react_1 = __importStar(require("react"))
// @ts-ignore
const object_assign_1 = __importDefault(require("object-assign"))
const Iframe = ({
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
	target
}) => {
	const iFrameRef = react_1.createRef()
	const defaultProps = object_assign_1.default({
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
		styles: styles || null,
		name: name || null,
		className: className || null,
		title: title || null,
		allow: allow || null,
		id: id || null,
		"aria-labelledby": ariaLabelledby || null,
		"aria-hidden": ariaHidden || null,
		"aria-label": ariaLabel || null,
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
	return react_1.default.createElement("iframe", Object.assign({}, props))
}
exports.default = Iframe
