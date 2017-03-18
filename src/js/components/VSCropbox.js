var React = require('react');
var AppActions = require('../actions/AppActions');
var AnnotationsStore = require('../stores/AnnotationsStore');
var VSCropBox = React.createClass({
	getInitialState: function(){
		return ({
			visibility: false
		});
	},
	componentDidMount: function() {
	    AnnotationsStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AnnotationsStore.removeChangeListener(this._onChange);
	},

	// Update view state when change is received
	_onChange: function(){
		console.log("crop box _onChange");
		var data = AnnotationsStore.getData();
		if(data != null){
			var image = document.getElementById('mainimage');
			var cropwidth = image.offsetWidth * .70;
			var cropheight = image.offsetHeight * .85;
			var cropleft = image.offsetWidth * .15;
			var cropstyle = "top:30px;width:" + cropwidth + "px;height:" + cropheight + "px;left:"+cropleft;
			this.setState({
				visibility: true,
				style: {cropstyle}
			});
		}
	},
  render: function() {
  		if(this.state !== null && this.state.visibility === true){
		    return (
		    	<div id="crop_rect" className="cropRect" style={this.state.style}>
			      	<div className="content">
			      		<div className="left"></div>
			      		<div className="right"></div>
			      		<div className="top"></div>
			      		<div className="bottom"></div>
			      		<div className="leftTop"></div>
			      		<div className="rightTop"></div>
			      		<div className="leftBottom"></div>
			      		<div className="rightBottom"></div>
			      	</div>
		      	</div>
		      	)
		}else{
      		return null;
        }    
  }
});

module.exports = VSCropBox;