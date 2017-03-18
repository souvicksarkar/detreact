var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  moveNext: function(callbackfn) {
    AppDispatcher.handleAction({
      actionType: AppConstants.MOVE_NEXT,
      callback: callbackfn
    })
  },

  movePrev: function(callbackfn) {
    AppDispatcher.handleAction({
      actionType: AppConstants.MOVE_PREV,
      callback: callbackfn
    })
  },

  visualSearch: function(data) {
    AppDispatcher.handleAction({
      actionType: AppConstants.VISUAL_SEARCH,
      params: data
    })
  },

  newSearch: function(data) {
    AppDispatcher.handleAction({
      actionType: AppConstants.NEW_SEARCH,
      data: data
    })
  },

  openInsights: function(sku) {
    AppDispatcher.handleAction({
      actionType: AppConstants.OPEN_INSIGHTS,
      sku: sku
    })
  }
	
}

module.exports = AppActions;