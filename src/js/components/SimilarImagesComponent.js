var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var SimilarImageModuleUnit = require('./SimilarImageModuleUnit');
var SimilarImagesStore = require('../stores/SimilarImagesStore');

function getAppState(){
	var data = SimilarImagesStore.getData();
	var value = data != null ? data.value: null;
	return {
		units: value,
		max: 10
	};
}

var SimilarImagesComponent = React.createClass ({
	getInitialState: function(){
		return getAppState();
	},	

	componentDidMount: function() {
	    SimilarImagesStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SimilarImagesStore.removeChangeListener(this._onChange);
	},

	// Update view state when change is received
	_onChange: function(){
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
			return (
				  <li className="similarimages">
					<h2> Similar Images</h2>
					{this.state.units.map((unit, index) => <SimilarImageModuleUnit page={unit.hostPageUrl} thumbnail={unit.thumbnailUrl} text={unit.name} index={index} max={this.state.max} key={index} />)}
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

module.exports = SimilarImagesComponent;