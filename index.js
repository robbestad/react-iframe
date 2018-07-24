const React = require("react");
const { PureComponent, createElement } = React;
const PropTypes = require("prop-types");
function noop() {}

const Iframe = class extends PureComponent {
	render() {
		const { url: src, allowFullScreen, name, styles, position, display, height, width, onLoad, id, className } = this.props;
		const props = {
			ref: "iframe",
			frameBorder: "0",
			src,
			target: "_parent",
			allowFullScreen,
			style: {
				position,
				display,
				height,
				width,
				...styles,
			},
			height,
			name,
			width,
			onLoad,
		};

		return createElement("iframe", { ...props, ...(id ? { id } : {}), ...(className ? { className } : {}) });
	}
};
Iframe.propTypes = {
	url: PropTypes.string.isRequired,
	id: PropTypes.string,
	className: PropTypes.string,
	width: PropTypes.string,
	position: PropTypes.string,
	display: PropTypes.string,
	name: PropTypes.string,
	height: PropTypes.string,
	onLoad: PropTypes.func,
	styles: PropTypes.object,
	allowFullScreen: PropTypes.bool,
};

Iframe.defaultProps = {
	url: PropTypes.string.isRequired,
	id: PropTypes.string,
	className: PropTypes.string,
	position: "absolute",
	display: "block",
	name: "",
	height: "100%",
	width: "100%",
	onLoad: noop,
	styles: {},
	allowFullScreen: false,
};

export default Iframe;
