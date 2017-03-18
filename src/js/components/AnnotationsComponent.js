var React = require('react');
var AppActions = require('../actions/AppActions');
var AnnotationsModuleUnit = require('./AnnotationsModuleUnit');
var AnnotationsStore = require('../stores/AnnotationsStore');

function getAppState(){
	var data = AnnotationsStore.getData();
	var value = data != null ? data.value: null;
	return {
		units: value,
		max: 10
	};
}

var AnnotationsComponent = React.createClass ({
	getInitialState: function(){
		return getAppState();
	},	

	componentDidMount: function() {
	    AnnotationsStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AnnotationsStore.removeChangeListener(this._onChange);
	},

	// Update view state when change is received
	_onChange: function(){
		console.log("Annotations _onChange");
		this.setState(getAppState());
	},

	handleChange: function(){
		var n = this.state.max;
		this.setState({
			max: n + 10
		 });
	},

	render: function() {
		if(this.state != null && this.state.units != null) {
		console.log("Annotations render");
			return (
				  <li className="Annotations">
		            {this.state.units.map((unit, index) => <AnnotationsModuleUnit text={unit.name} key={index} />)}					
				  </li>				
			);
		} else {
			return null;
		}
	}
});

module.exports = AnnotationsComponent;