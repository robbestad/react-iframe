import React from "react"
import Iframe from "../iframe"
import renderer from "react-test-renderer"
test("Render default iframe", function() {
	var component = renderer.create(React.createElement(Iframe, { position: "relative", url: "http://www.foobar.com" }))
	var tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})
test("Render iframe with title", function() {
	var component = renderer.create(
		React.createElement(Iframe, {
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
