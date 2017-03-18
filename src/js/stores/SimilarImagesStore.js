var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var AppStore = require('../stores/AppStore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');
var request = require('request');

var CHANGE_EVENT = 'change';
var URL= "https://www.bingapis.com/api/v6/images/details?&q=cats&appid=&modules={0}&imgurl={1}&mkt=en-us";

var _selectedIndex = 0;
var _MAX = 1;
var data = null;
var _images = null;
function loadProductData(imgurl){
	if(AppStore.getModules().includes("similarimages")){
		var request_url = URL.replace("{0}", 'similarimages').replace("{1}", imgurl);
		console.log(request_url);
		request(request_url, (er, resp, body) => {
			var json = JSON.parse(body);
			data = json.visuallySimilarImages;
			_images = data.value.map((image) => image.contentUrl);
			SimilarImagesStore.emitChange();
		});
	}else{
		data=null;
		SimilarImagesStore.emitChange();
	}
}

var SimilarImagesStore = assign({}, EventEmitter.prototype, {
	load: function(imgurl){
		loadProductData(imgurl);
	},

	getData: function(){
		return data;
	},

	getImages: function(){
		return _images;
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
	    case AppConstants.VISUAL_SEARCH:
	      	var params=action.params;
	      	URL = URL + "&cal=" + params.cal + "&cat=" + params.cat + "&car=" + params.car + "&cab=" + params.cab;
	      break;
	    default:
	      return true;
	}

	SimilarImagesStore.emitChange();
	return true;
});

module.exports = SimilarImagesStore;