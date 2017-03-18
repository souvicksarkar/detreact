var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

function getAppState(){
	return {
		value: ''
	};
}

var SearchForm = React.createClass ({
	getInitialState: function(){
		return getAppState();
	},

    handleButtonClick: function() {
    	console.log("searchform submit");
		AppStore.load(this.state.value);
		//event.preventDefault();
    },

    haqndleSubmit: function(e){
		AppStore.load(this.state.value);
		e.preventDefault();
    },

    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    
	render: function() {
		return (
		  <form id="searchbox" onSubmit={this.haqndleSubmit}>
	        <label>
	          Query:
	          <input type="text" value={this.state.value} onChange={this.handleChange} />
	        </label>
	        <button type="button" onClick={this.handleButtonClick} >
	           submit
	        </button>
	      </form>
		);
	}
});

module.exports = SearchForm;