ar React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var Icon = require('../../image/logo.svg');

function getAppState(){
	return {

	}
}

var VSButton = React.createClass({
  render: function() {
    return (
      <span dangerouslySetInnerHTML={{ __html: Icon }} />
    )
  }
});

module.exports = VSButton;