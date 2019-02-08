import Iframe from "../index"
import React from "react"
import { expect } from "chai"
import { configure, render, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

describe("<Iframe />", () => {
	let wrapper
	let wrapperWithSandboxFalse
	let wrapperWithoutSandbox
	let wrapperWithTitle
	let wrapperWithAriaHidden

	before(() => {
		wrapper = shallow(
			<Iframe
				url="http://www.youtube.com/embed/xDMP3i36naA"
				width="750px"
				height="450px"
				display="initial"
				allow="encrypted-media"
				position="relative"
				name="iframe-name"
				id="iframe-id"
				className="myClass"
				sandbox="allow-scripts"
				allowFullScreen
			/>
		)

		wrapperWithSandboxFalse = shallow(
			<Iframe
				url="http://www.youtube.com/embed/xDMP3i36naA"
				width="750px"
				height="450px"
				display="initial"
				position="relative"
				name="iframe-name"
				id="iframe-id"
				className="myClass"
				sandbox={false}
				allowFullScreen
			/>
		)

		wrapperWithoutSandbox = shallow(
			<Iframe
				url="http://www.youtube.com/embed/xDMP3i36naA"
				width="750px"
				height="450px"
				display="initial"
				position="relative"
				name="iframe-name"
				id="iframe-id"
				className="myClass"
				allowFullScreen
			/>
		)

		wrapperWithTitle = shallow(<Iframe url="http://www.youtube.com/embed/xDMP3i36naA" title="Accessible title" />)

		wrapperWithAriaHidden = shallow(<Iframe url="http://www.youtube.com/embed/xDMP3i36naA" ariaHidden={true} />)
	})

	it("renders an iframe with id `#iframe-id`", () => {
		expect(wrapper.find("#iframe-id").length).to.equal(1)
	})

	it("renders an iframe with class `.myClass`", () => {
		expect(wrapper.find(".myClass").length).to.equal(1)
	})

	it("renders an iframe with height `450px`", () => {
		expect(wrapper.getElement().props.style.height).to.equal("450px")
	})

	it("renders an iframe with width `750px`", () => {
		expect(wrapper.getElement().props.style.width).to.equal("750px")
	})

	it("renders an iframe with url `http://www.youtube.com/embed/xDMP3i36naA`", () => {
		expect(wrapper.getElement().props.src).to.equal("http://www.youtube.com/embed/xDMP3i36naA")
	})

	it("renders an iframe with name `iframe-name`", () => {
		expect(wrapper.getElement().props.name).to.equal("iframe-name")
	})

	it("renders an iframe with sandbox `allow-scripts`", () => {
		expect(wrapper.getElement().props.sandbox).to.equal("allow-scripts")
	})

	it("renders an iframe with allow `encrypted-media`", () => {
		expect(wrapper.getElement().props.allow).to.equal("encrypted-media")
	})

	it("renders an iframe without the allow property if excluded", () => {
		expect(wrapperWithoutSandbox.getElement().props.allow).to.equal(undefined)
	})

	it("renders an iframe without the sandbox property if set to false", () => {
		expect(wrapperWithSandboxFalse.getElement().props.sandbox).to.equal(undefined)
	})

	it("renders an iframe without the sandbox property if not set", () => {
		expect(wrapperWithoutSandbox.getElement().props.sandbox).to.equal(undefined)
	})

	it("renders an iframe with position `relative`", () => {
		expect(wrapper.getElement().props.style.position).to.equal("relative")
	})

	it("renders an iframe with display `Accessible title`", () => {
		expect(wrapperWithTitle.getElement().props.title).to.equal("Accessible title")
	})

	it("renders an iframe with aria-hidden `true`", () => {
		console.log(wrapperWithAriaHidden.getElement().props)
		expect(wrapperWithAriaHidden.getElement().props["aria-hidden"]).to.equal("true")
	})
})
