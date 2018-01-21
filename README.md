# React Iframe

Simple React component for including an iframed page.

![Youtube in an iframe](screenshot.PNG)

## Usage

```jsx
import Iframe from 'react-iframe'
<Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
        width="450px"
        height="450px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen/>
```
            
### Properties

**url** **(required)** - *string* the iframe url

**position** _(optional)_ - *string* defaults to "absolute".

**id** _(optional)_ - *string* if set, adds the id parameter with the given value.

**className** _(optional)_ - *string* if set, adds the class parameter with the given value.

**display** _(optional)_ - *string* defaults to "block"

**height** _(optional)_ - *string* (1px > any number above 0, or 1% to 100%)

**width** _(optional)_ - *string* (1px > any number above 0, or 1% to 100%)

**allowFullScreen** _(optional)_ - if set, applies the allowFullScreen param

**styles** _(optional)_ - add any additional styles here. Will (intentionally) override any of the props 
above. For instance:

```jsx
<Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
            position="absolute"
            width="100%"
            id="myId"
            className="myClassname"
            height="100%"
            styles={{height: "25px"}}
            allowFullScreen/>
```

will set the height to 25px even though it was specified as 100% in the props.

# Development

All code resides in `index.js`. Deploy with either `npm run release`, `npm run release-minor` or `npm run release-major`
