var React = require('react');
var AppActions = require('../actions/AppActions');
var PagesincludingModuleUnit = require('./PagesincludingModuleUnit');
var PagesIncludingStore = require('../stores/PagesIncludingStore');

function getAppState(){
	var data = PagesIncludingStore.getData();
	var value = data != null ? data.value: null;
	return {
		units: value,
		max: 10
	};
}

var PagesIncludingComponent = React.createClass ({
	getInitialState: function(){
		return getAppState();
	},	

	componentDidMount: function() {
	    PagesIncludingStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		PagesIncludingStore.removeChangeListener(this._onChange);
	},

	// Update view state when change is received
	_onChange: function(){
		console.log("pagesIncluding _onChange");
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
		console.log("pagesIncluding render");
			return (
				  <li className="pagesincluding">
					<h2>Pages Including</h2>
		            {this.state.units.map((unit, index) => <PagesincludingModuleUnit page={unit.hostPageUrl} text={unit.name} size={unit.contentSize} index={index} max={this.state.max} key={index} />)}
					<button onClick={this.handleChange} className="seemore">
						See More
					</button>
				  </li>				
			);
		} else {
			return null;
		}
	}
});

module.exports = PagesIncludingComponent;