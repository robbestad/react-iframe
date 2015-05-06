var React = require('react');
var Iframe = require('../index');

var g = React.render( 
	<Iframe url ='http://www.vg.no' /> ,
	document.body
);

// update the gist after 5 seconds
setTimeout(function() {
	g.setProps({
		url: 'http://www.ap.no'
	});
}, 5000);