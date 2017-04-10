# React IFrame

Simple React component for including an iframed page.

![Youtube in an iframe](screenshot.PNG)

## Usage

    const Iframe = require("react-iframe");
    <Iframe url="http://www.youtube.com/embed/xDMP3i36naA" width="50%" height="50%" allowFullScreen/>

or 

    import Iframe from 'react-iframe'
    <Iframe url="http://www.youtube.com/embed/xDMP3i36naA" width="500px" height="500px" allowFullScreen/>

### Properties

**position** - *string* defaults to "absolute".

**display** - *string* defaults to "block"

**height** - *string* (1px > any number above 0, or 1% to 100%)

**width** - *string* (1px > any number above 0, or 1% to 100%)

**allowFullScreen** - if set, applies the allowFullScreen param

**styles** - add any additional styles here. Will (intentionally) override any of the props 
above. For instance:

    <Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
                position="absolute"
                width="100%"
                height="100%"
                styles={{height: "25px"}}
                allowFullScreen/>

will set the height to 25px even though it was specified as 100% in the props.
