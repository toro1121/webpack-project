//constant
import AppConstants from '../constants/AppConstants';
//dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';

var _CONFIG = require('../../../config')();

export default {
    ajax: (options, actionType) => {
        options.url = _CONFIG._URL_API + options.url;

        // cross domain
        // options.xhrFields = {
        //     withCredentials: true
        // };

        $.ajax(Object.assign({
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if (actionType) {
                    AppDispatcher.dispatch({
                        actionType: actionType,
                        res: res
                    });
                }
            }.bind(this)
        }, options));
    }
};
