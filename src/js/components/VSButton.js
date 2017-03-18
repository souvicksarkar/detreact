var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var VSButton = React.createClass({
	visualSearch: function() {
		var params = {
			cal: 0.1500646830530401,
			cat: 0.15,
			car: 0.8499353169469599,
			cab:0.85
		};

        AppActions.visualSearch(params);
    },

  render: function() {
    return (
      	<svg width="32px" height="32px" viewBox="0 0 32 32" id="icon" onClick={this.visualSearch}>
			<defs>
				<filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="vs_filter">
					<feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1">
					</feOffset>
					<feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1">
					</feGaussianBlur>
					<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1">
					</feColorMatrix>
					<feMerge>
						<feMergeNode in="shadowMatrixOuter1">
						</feMergeNode>
						<feMergeNode in="SourceGraphic">
						</feMergeNode>
					</feMerge>
				</filter>
			</defs>
			<g id="visual-search" fill="#fff">
				<g id="Group" filter="url(#vs_filter)" transform="translate(3.000000, 3.000000)">
					<polygon points="1.625 24.375 1.625 21.125 0 21.125 0 26 4.875 26 4.875 24.375">
					</polygon>
					<polygon points="1.625 1.625 4.875 1.625 4.875 0 0 0 0 4.875 1.625 4.875">
					</polygon>
					<polygon points="24.375 1.625 24.375 4.875 26 4.875 26 0 21.125 0 21.125 1.625">
					</polygon>
					<polygon points="24.375 24.375 21.125 24.375 21.125 26 26 26 26 21.125 24.375 21.125">
					</polygon>
					<rect x="8.125" y="0" width="3.25" height="1.625">
					</rect>
					<rect x="14.625" y="0" width="3.25" height="1.625">
					</rect>
					<rect x="8.125" y="24.375" width="3.25" height="1.625">
					</rect>
					<rect x="14.625" y="24.375" width="3.25" height="1.625">
					</rect>
					<rect x="24.375" y="8.125" width="1.625" height="3.25">
					</rect>
					<rect x="24.375" y="14.625" width="1.625" height="3.25">
					</rect>
					<rect x="0" y="8.125" width="1.625" height="3.25">
					</rect>
					<rect x="0" y="14.625" width="1.625" height="3.25">
					</rect>
					<path d="M15.35625,14.1375 L15.35625,14.1375 C15.925,13.325 16.25,12.35 16.25,11.375 C16.25,11.13125 16.25,10.96875 16.16875,10.725 C15.925,8.9375 14.7875,7.475 13.1625,6.825 C12.59375,6.6625 12.025,6.5 11.375,6.5 C10.31875,6.5 9.425,6.825 8.6125,7.39375 C8.20625,7.71875 7.8,8.125 7.475,8.53125 C6.90625,9.34375 6.5,10.31875 6.5,11.375 C6.5,12.59375 6.9875,13.73125 7.8,14.625 C8.69375,15.6 9.99375,16.25 11.375,16.25 C12.43125,16.25 13.40625,15.925 14.21875,15.35625 L18.44375,19.58125 L19.58125,18.44375 L15.35625,14.1375 L15.35625,14.1375 Z M11.375,14.625 C9.5875,14.625 8.125,13.1625 8.125,11.375 C8.125,9.5875 9.5875,8.125 11.375,8.125 C13.1625,8.125 14.625,9.5875 14.625,11.375 C14.625,13.1625 13.1625,14.625 11.375,14.625 L11.375,14.625 Z">
					</path>
				</g>
			</g>
		</svg>
    )
  }
});

module.exports = VSButton;