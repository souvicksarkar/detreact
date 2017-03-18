var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var PagesIncludingComponent = require('./PagesIncludingComponent');
var SimilarImagesComponent = require('./SimilarImagesComponent');
var AnnotationsComponent = require('./AnnotationsComponent');

var Insights = React.createClass ({
	render: function() {
		return (
		  <ul className="insights">
		    <AnnotationsComponent />
			<SimilarImagesComponent />
			<PagesIncludingComponent />
		  </ul>
		);
	}
});

module.exports = Insights;