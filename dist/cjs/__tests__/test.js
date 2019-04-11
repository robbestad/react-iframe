"use strict"
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
exports.__esModule = true
var react_1 = __importDefault(require("react"))
var iframe_1 = __importDefault(require("../iframe"))
var react_test_renderer_1 = __importDefault(require("react-test-renderer"))
test("Render default iframe", function() {
	var component = react_test_renderer_1["default"].create(
		react_1["default"].createElement(iframe_1["default"], { position: "relative", url: "http://www.foobar.com" })
	)
	var tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})
test("Render iframe with title", function() {
	var component = react_test_renderer_1["default"].create(
		react_1["default"].createElement(iframe_1["default"], {
			position: "relative",
			title: "A foobared iframe",
			url: "http://www.foobar.com",
			ariaHidden: true,
			ariaLabel: "someLabel",
			ariaLabelledby: "someId",
			allow: "encrypted-media",
			sandbox: "allow-scripts",
			allowFullScreen: false,
			className: "myIframeClass",
			frameBorder: 2,
			overflow: "auto",
			onLoad: function() {
				console.log("hello")
			},
			onMouseOut: function() {
				console.log("goodbye")
			},
			onMouseOver: function() {
				console.log("hi")
			},
			display: "inline-block",
			id: "myIframeId",
			name: "My Iframe name",
			scrolling: "yes",
			styles: { background: "red" },
			target: "_self"
		})
	)
	var tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})
//# sourceMappingURL=test.js.map
