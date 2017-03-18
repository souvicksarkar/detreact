var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var SimilarImagesStore = require('../stores/SimilarImagesStore');

var SimilarImageModuleUnit = React.createClass ({
	handleClick: function() {
		var data = {
			index: this.props.index,
			imgurls: SimilarImagesStore.getImages()
		}
		AppActions.newSearch(data);
	},

	render: function() {
		if(this.props.index < this.props.max){
			return (
				  <a className="sim" onClick={this.handleClick}> 
					<img src={this.props.thumbnail} />
				  </a>
			);
		} else {
			return null;
		}
	}
});

module.exports = SimilarImageModuleUnit;