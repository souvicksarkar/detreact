var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var AnnotationsModuleUnit = React.createClass ({
	render: function() {
			return (
				  <a href="" target="_blank" className="aunit"> 
				   	<span>{this.props.text}</span> 
				  </a>
			);		
	}
});

module.exports = AnnotationsModuleUnit;