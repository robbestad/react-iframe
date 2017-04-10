"use strict";
var React = require("react");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");
var Iframe = createReactClass({
    displayName: "React-Iframe",

    propTypes: {
        url: PropTypes.string.isRequired,
        width: PropTypes.string,
        height: PropTypes.string
    },

    getDefaultProps:function(){
        return {
        height:'100%',
        width:'100%',
        position:'fixed'
        }
    },

    shouldComponentUpdate: function(nextProps) {
        return this.props.url !== nextProps.url;
    },

    render: function() {
        return (
            <iframe ref="iframe"
            frameBorder='0' 
            src={this.props.url}
            style={{position:this.props.position,height:this.props.height,width:this.props.width}}
            height={this.props.height} width={this.props.width}></iframe>
        )


    }
});

module.exports = Iframe;