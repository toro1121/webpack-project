//constants
import AppConstants from '../constants/AppConstants';
//dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';
//store
import AppStore from './AppStore';


let o = {};

class Store extends AppStore {
    getData() {
        return o;
    }
}

let store = new Store();

AppDispatcher.register(action => {
    switch (action.actionType) {
        case AppConstants.ADMIN_SHOP_DATA:
            o = action.res;
            break;
    }

    store.emitChange('change');
});

export default store;
