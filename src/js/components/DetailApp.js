var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var SimilarImagesStore = require('../stores/SimilarImagesStore');
var PagesIncludingStore = require('../stores/PagesIncludingStore');
var AnnotationsStore = require('../stores/AnnotationsStore');
var VSButton = require('./VSButton');
var VSCropBox = require('./VSCropBox');

var Insights = require('./Insights');

function getAppState(){
	return {
		selectedImage: AppStore.getSelectedImage()
	};
}

var DetailApp = React.createClass ({
	getInitialState: function(){
		return getAppState();
	},

	componentDidMount: function() {
	    AppStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},

    goNext: function() {
        AppActions.moveNext(null);
    },

    goBack: function() {
        AppActions.movePrev(null);
    },
    
    // Update view state when change is received
	_onChange: function(){
		this.setState(getAppState(), ()=>{				
			SimilarImagesStore.load(this.state.selectedImage);
			PagesIncludingStore.load(this.state.selectedImage);
			AnnotationsStore.load(this.state.selectedImage);
		});
	},

	render: function() {
		if(this.props.initialized == true){
			return (
			  <div >
				<div >		
					<VSButton />
					<button type="button" className="iol_p" onClick={this.goBack}>
						Prev
					</button>
					<img src={this.state.selectedImage} className="mainimage" id="mainimage" />		
					<VSCropBox />					 
					<button type="button" className="iol_n" onClick={this.goNext}>
						Next
					</button>
					<Insights />
				</div>
			  </div>
			);
		} else {
			return null;
		}
	}
});

module.exports = DetailApp;