"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i]
			descriptor.enumerable = descriptor.enumerable || false
			descriptor.configurable = true
			if ("value" in descriptor) descriptor.writable = true
			Object.defineProperty(target, descriptor.key, descriptor)
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps)
		if (staticProps) defineProperties(Constructor, staticProps)
		return Constructor
	}
})()
var _react = require("react")
var _react2 = _interopRequireDefault(_react)
var _propTypes = require("prop-types")
var _propTypes2 = _interopRequireDefault(_propTypes)
var _objectAssign = require("object-assign")
var _objectAssign2 = _interopRequireDefault(_objectAssign)
function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function")
	}
}
function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
	}
	return call && (typeof call === "object" || typeof call === "function") ? call : self
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass)
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: { value: subClass, enumerable: false, writable: true, configurable: true }
	})
	if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass)
}
var Iframe = (function(_PureComponent) {
	_inherits(Iframe, _PureComponent)
	function Iframe() {
		_classCallCheck(this, Iframe)
		return _possibleConstructorReturn(this, (Iframe.__proto__ || Object.getPrototypeOf(Iframe)).apply(this, arguments))
	}
	_createClass(Iframe, [
		{
			key: "render",
			value: function render() {
				var props = {
					ref: "iframe",
					frameBorder: "0",
					src: this.props.url,
					target: "_parent",
					allowFullScreen: this.props.allowFullScreen || false,
					style: (0, _objectAssign2.default)(
						{},
						{
							position: this.props.position || "absolute",
							display: this.props.display || "block",
							height: this.props.height || "100%",
							width: this.props.width || "100%"
						},
						this.props.styles || {}
					),
					height: this.props.height || "100%",
					name: this.props.name || "",
					width: this.props.width || "100%"
				}
				return _react2.default.createElement(
					"iframe",
					(0, _objectAssign2.default)(
						props,
						this.props.id ? { id: this.props.id } : {},
						this.props.className ? { className: this.props.className } : {}
					)
				)
			}
		}
	])
	return Iframe
})(_react.PureComponent)
Iframe.propTypes = {
	url: _propTypes2.default.string.isRequired,
	id: _propTypes2.default.string,
	className: _propTypes2.default.string,
	width: _propTypes2.default.string,
	position: _propTypes2.default.string,
	display: _propTypes2.default.string,
	name: _propTypes2.default.string,
	height: _propTypes2.default.string,
	styles: _propTypes2.default.object,
	allowFullScreen: _propTypes2.default.bool
}
exports.default = Iframe
