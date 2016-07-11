import { Dispatcher } from "flux";
//constants
import AppConstants from "../constants/AppConstants";

class DispatcherClass extends Dispatcher {
    handleServerAction(action) {
        this.dispatch({
            source: AppConstants.SERVER_ACTION,
            action: action
        });
    }
    handleViewAction(action) {
        this.dispatch({
            source: AppConstants.VIEW_ACTION,
            action: action
        });
    }
    handleRouterAction(path) {
        this.dispatch({
            source: AppConstants.ROUTER_ACTION,
            action: path
        });
    }
}

const AppDispatcher = new DispatcherClass();

export default AppDispatcher;
