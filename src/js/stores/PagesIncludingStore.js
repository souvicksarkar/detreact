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
function loadProductData(imgurl){
	if(AppStore.getModules().includes("pagesincluding")){
		var request_url = URL.replace("{0}", 'pagesincluding').replace("{1}", imgurl);
		request(request_url, (er, resp, body) => {
			var json = JSON.parse(body);
			data = json.pagesIncluding;
			console.log("pagesincluding  "+data != null);
				
			PagesIncludingStore.emitChange();
		});
	}else{
		data = null;
		PagesIncludingStore.emitChange();
	}
}

var PagesIncludingStore = assign({}, EventEmitter.prototype, {
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

module.exports = PagesIncludingStore;