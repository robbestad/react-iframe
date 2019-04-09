const React = require("react")
const { PureComponent } = React
const PropTypes = require("prop-types")
const objectAssign = require("object-assign")
function noop() {}

const Iframe = class extends PureComponent {
	render() {
		const props = {
			ref: "iframe",
			src: this.props.url,
			target: "_parent",
			allowFullScreen: this.props.allowFullScreen || false,
			style: objectAssign(
				{},
				{
					position: this.props.position || "absolute",
					display: this.props.display || "block",
					height: this.props.height || "100%",
					width: this.props.width || "100%",
					overflow: this.props.overflow || "hidden"
				},
				this.props.styles || {}
			),
			height: this.props.height || "100%",
			name: this.props.name || "",
			width: this.props.width || "100%",
			onLoad: this.props.onLoad || noop,
			onMouseOver: this.props.onMouseOver || noop,
			onMouseOut: this.props.onMouseOut || noop
		}

		return React.createElement(
			"iframe",
			objectAssign(
				props,
				this.props.frameBorder ? { frameBorder: this.props.frameborder } : { frameBorder: 0 },
				this.props.scrolling ? { scrolling: this.props.scrolling } : { scrolling: "no" },
				this.props.id ? { id: this.props.id } : {},
				this.props.sandbox ? { sandbox: this.props.sandbox } : {},
				this.props.allow ? { allow: this.props.allow } : {},
				this.props.className ? { className: this.props.className } : {},
				this.props.title ? { title: this.props.title } : {},
				this.props.ariaHidden ? { "aria-hidden": "true" } : {}
			)
		)
	}
}
Iframe.propTypes = {
	url: PropTypes.string.isRequired,
	id: PropTypes.string,
	title: PropTypes.string,
	className: PropTypes.string,
	width: PropTypes.string,
	position: PropTypes.string,
	display: PropTypes.string,
	name: PropTypes.string,
	height: PropTypes.string,
	onLoad: PropTypes.func,
	sandbox: PropTypes.string,
	allow: PropTypes.string,
	onMouseOver: PropTypes.func,
	onMouseOut: PropTypes.func,
	styles: PropTypes.object,
	allowFullScreen: PropTypes.bool,
	ariaHidden: PropTypes.bool
}
export default Iframe
