var React = require('react');
var AppActions = require('../actions/AppActions');
var Router = require('react-router');
var hashHistory = require('react-router');
var AppStore = require('../stores/AppStore');
var DetailApp = require('./DetailApp.js');
var SearchForm = require('./SearchForm');

var Home = React.createClass({
	getInitialState: function(){
		return ({
			initialized: false
		});
	},

	componentDidMount: function(){
		AppStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		AppStore.removeChangeListener(this._onChange);
	},

	render: function(){
		return(
			<div>
				<SearchForm />
				<DetailApp initialized={this.state.initialized} />
			</div>
		);
	},

	_onChange: function(){
		this.setState({
			initialized: true
		});
	}
});

module.exports = Home;