var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var AppStore = require('../stores/AppStore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');
var request = require('request');

var CHANGE_EVENT = 'change';
var URL= "https://www.bingapis.com/api/v6/images/details?&appid=&modules={0}&imgurl={1}&mkt=en-us&cal=0.1500646830530401&cat=0.15&car=0.8499353169469599&cab=0.85";

var _selectedIndex = 0;
var _MAX = 1;
var data = null;
function loadProductData(imgurl){
	if(AppStore.getModules().includes("tags")){
		var request_url = URL.replace("{0}", 'tags').replace("{1}", imgurl);
		console.log(request_url);
		request(request_url, (er, resp, body) => {
			var json = JSON.parse(body);
			data = json.imageTags;
			
			AnnotationsStore.emitChange();
		});
	}else{
		data=null;
		AnnotationsStore.emitChange();
	}
}

var AnnotationsStore = assign({}, EventEmitter.prototype, {
	load: function(imgurl){
		loadProductData(imgurl);
	},

	getData: function(){
		return data;
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
	    case AppConstants.LOAD:
		//  loadProductData(action.imgurl);
	      break;

	    case AppConstants.OPEN_INSIGHTS:
	      
	      break;
	    default:
	      return true;
	}

	AnnotationsStore.emitChange();
	return true;
});

module.exports = AnnotationsStore;