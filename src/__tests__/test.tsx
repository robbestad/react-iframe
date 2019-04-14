import React from "react"
import Iframe from "../iframe"
import renderer from "react-test-renderer"

test("Render default iframe", () => {
	const component = renderer.create(
		<Iframe position="relative" url="http://www.foo.com"  src="http://www.foobar.com"/>
	)
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})

test("Render iframe with title", () => {
	const component = renderer.create(
		<Iframe position="relative"
						title="A foobared iframe"
						url="http://www.foobar.com"
						src="http://www.foo.com"
						ariaHidden={true}
						ariaLabel="someLabel"
						ariaLabelledby="someId"
						allow="encrypted-media"
						sandbox="allow-scripts"
						allowFullScreen={false}
						className="myIframeClass"
						frameBorder={0}
						overflow="auto"
						loading="eager"
						onLoad={()=>{console.log("hello")}}
						onMouseOut={()=>{console.log("goodbye")}}
						onMouseOver={()=>{console.log("hi")}}
						display="inline-block"
						id="myIframeId"
						name="My Iframe name"
						scrolling="yes"
						styles={{background: "red"}}
						target="_self"
		/>
	)
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})


test("Render with allowFullscreen bool", () => {
	const component = renderer.create(
		<Iframe allowFullScreen={false}
				allow="fullscreen"
				frameBorder={1} url="http://www.foobar.com"/>
	)
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})


test("Render with allow attribute", () => {
	const component = renderer.create(
		<Iframe allowFullScreen={true}
				allow="fullscreen autoplay"
				frameBorder={1} url="http://www.foobar.com"/>
	)
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})
