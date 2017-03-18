var React = require('react');
var Router = require('react-router');
var Route = require('react-router');
var hashHistory = require('react-router');
var Home = require('./Home');

var App = React.createClass({
	render: function(){
		return(
			<Home />
		);
	}
});

module.exports = App;