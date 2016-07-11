import assign from "object-assign";
// constants
import AppConstants from "../constants/AppConstants";
// dispatcher
import AppDispatcher from "../dispatcher/AppDispatcher";
// action
import AppActionCreators from "./AppActionCreators";

export default class extends AppActionCreators {
    tagPanel(type, data) {
        switch (type) {
            case "style":
                let actionType = AppConstants.TAG_PANEL;
                break;
        }
        AppDispatcher.handleViewAction({
            actionType: actionType,
            data: data
        });
    }
}
