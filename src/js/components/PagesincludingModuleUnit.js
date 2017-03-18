var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var PagesincludingModuleUnit = React.createClass ({
	render: function() {
		if(this.props.index < this.props.max){
			return (
				  <a href={this.props.page} target="_blank" className="piunit"> 
				   <div id="pihead">
				   	<span>{this.props.text}</span> 
				   </div>
				   <div id="pibody">
				    <ul>
				    	<li>
				    	{this.props.page}
				    	</li>
				    	<li>
				    	{this.props.size}
				    	</li>
				    </ul>
				   </div>
				  </a>
			);
		} else {
			return null;
		}
	}
});

module.exports = PagesincludingModuleUnit;