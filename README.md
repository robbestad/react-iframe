# React Iframe

Simple React component for including an iframed page.

Total component weight: 2.58 KB

![Youtube in an iframe](screenshot.PNG)

## Usage

    import Iframe from 'react-iframe'
    <Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
            width="450px"
            height="450px"
            display="initial"
            position="relative"
            allowFullScreen/>
            
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
