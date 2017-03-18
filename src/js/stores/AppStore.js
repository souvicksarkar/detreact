var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');
var request = require('request');

var CHANGE_EVENT = 'change';
var URL = "https://www.bingapis.com/api/v6/images/search?q={0}&mkt=en-us&appid=";

var _selectedIndex = 0;
var _imgUrls = [];
var _modules = ["similarimages","pagesincluding"];
var _MAX = 100;
var data = null;
function loadProductData(query){
	var request_url = URL.replace("{0}", query);
	console.log(request_url);
	request(request_url, (er, resp, body) => {
		var json = JSON.parse(body);
		data = json.value;
		_imgUrls = data.map((r) => r.contentUrl);
		AppStore.emitChange();
	});
}

var AppStore = assign({}, EventEmitter.prototype, {
	load: function(query){
	console.log("AppStore load");
		if(query != null){
			loadProductData(encodeURIComponent(query));
		}
	},

	getSelectedImage: function(){
		return _imgUrls[_selectedIndex];
	},

	getModules: function(){
		return _modules;
	},

	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on('change', callback);
	},
	removeChangeListener: function(callback){
		this.removeListener('change', callback);
	}
});

AppDispatcher.register(function(payload){
	var action = payload.action;
	console.log("in dispatcher, actiontype :"+action.actionType);
	switch(action.actionType){
	    case AppConstants.MOVE_NEXT:
	      var selectedIndex = _selectedIndex == _MAX ? _selectedIndex : _selectedIndex + 1;
	      if(selectedIndex != _selectedIndex){
	      	_selectedIndex = selectedIndex;
		  }
	      break;

	    case AppConstants.MOVE_PREV:
	      var selectedIndex = _selectedIndex == 0 ? _selectedIndex : _selectedIndex - 1;
	      if(selectedIndex != _selectedIndex){
	      	_selectedIndex = selectedIndex;
		  }
	      break;

	    case AppConstants.VISUAL_SEARCH:
	      var i = _modules.indexOf("pagesincluding");
		  if(i != -1) {
		      _modules.splice(i, 1);
		  }
	      _modules.push("tags");
	      break;

	    case AppConstants.NEW_SEARCH:
	      _selectedIndex = action.data.index;
	      _imgUrls = action.data.imgurls;
	      break;
	    default:
	      return true;
	}

	AppStore.emitChange();
	return true;
});

module.exports = AppStore;