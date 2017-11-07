import Iframe from "../index"
import React from 'react';
import { expect } from 'chai';
import { configure, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<Iframe />', () => {
  let wrapper

  before(() => {
    wrapper = shallow(<Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
                              width="750px"
                              height="450px"
                              display="initial"
                              position="relative"
                              name="iframe-name"
                              id="iframe-id"
                              className="myClass"
                              allowFullScreen/>
    )

  })


  it('renders an iframe with id `#iframe-id`', () => {
    expect(wrapper.find('#iframe-id').length).to.equal(1)
  });

  it('renders an iframe with class `.myClass`', () => {
    expect(wrapper.find('.myClass').length).to.equal(1)
  });

  it('renders an iframe with height `450px`', () => {
    expect(wrapper.getElement().props.style.height).to.equal("450px")
  });

  it('renders an iframe with width `750px`', () => {
    expect(wrapper.getElement().props.style.width).to.equal("750px")
  });

  it('renders an iframe with url `http://www.youtube.com/embed/xDMP3i36naA`', () => {
    expect(wrapper.getElement().props.src).to.equal("http://www.youtube.com/embed/xDMP3i36naA")
  });

  it('renders an iframe with name `iframe-name`', () => {
    expect(wrapper.getElement().props.name).to.equal("iframe-name")
  });

  it('renders an iframe with position `relative`', () => {
    expect(wrapper.getElement().props.style.position).to.equal("relative")
  });

  it('renders an iframe with display `initial`', () => {
    expect(wrapper.getElement().props.style.display).to.equal("initial")
  });


});

