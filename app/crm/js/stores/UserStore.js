import { EventEmitter } from "events";
import assign from "object-assign";
import { sort, filter } from "react-data-components/lib/utils";
//constants
import AppConstants from "../constants/AppConstants";
//dispatcher
import AppDispatcher from "../dispatcher/AppDispatcher";
//action
import UserActionCreators from "../actions/UserActionCreators";
// store
import { AppStore } from "./AppStore";
//custom
import config from "../config";

let UserAction = new UserActionCreators({
    type1: "user"
});
let _CONFIG = config();

let timer = false;
let o = {
    bool: null,
    message: null,
    data: {
        all: [],
        filter: [],
        page: [],
        one: []
    },
    profile: {
        status: null,
        data: {}
    },
    config: {
        keys: ["id"],
        sortBy: {
            prop: "updated_at",
            order: "descending"
        },
        pageNum: _CONFIG._NUM_PAGE,
        currentPage: 0,
        totalPages: 0,
        filterValue: {}
    }
};
o.config.filter = {
    search: {
        filter: (a, b) => {
            a = (a + "").toLowerCase().trim();
            b = (b + "").toLowerCase().trim();
            return b.indexOf(a) >= 0;
        }
    }
}

class UserStore extends AppStore {
    getData(arg1, arg2) {
        let v;
        switch (arg1) {
            case "list":
                v = {
                    config: o.config,
                    data: o.data
                };
                break;
            case "profile":
                v = o[arg1];
                break;
            default:
                v = {
                    bool: o.bool,
                    message: o.message,
                    data: o.data.one
                };
                if (arg2) {
                    v.bool = null;
                    v.message = null;
                }
        }
        return v;
    }
    getDataById(id) {
        if (!o.data.one.length || o.data.one[0].id != id) {
            o.data.one = [];
            for (var i = 0; i < o.data.all.length; i++) {
                if (o.data.all[i].id == id) {
                    o.data.one.push(o.data.all[i]);
                    break;
                }
            }
        }
        return o.data.one;
    }
}

let Store = new UserStore();

AppDispatcher.register((payload) => {
    let action = payload.action;
    switch (action.actionType) {
        case AppConstants.USER_STATUS:
            // o.message = action.res.message;
            o.profile.status = action.res.bool;
            o.profile.data = action.res.data;

            //10秒檢查一次登入狀態
            if (timer) {
                clearTimeout(timer);
                timer = false;
            }
            if (o.profile.status) {
                timer = setTimeout(() => {
                    UserAction.userStatus();
                }, 10000);
            }

            Store.emitChange("status");
            return true;
            break;
        case AppConstants.USER_LOGINOUT:
            o.message = action.res.message;
            o.profile.status = action.res.bool;
            o.profile.data = action.res.data;
            //檢查登入狀態
            UserAction.userStatus();
            Store.emitChange("status");
            // return true;
        case AppConstants.USER_REGISTER:
        case AppConstants.USER_FORGET:
            o.bool = action.res.bool;
            o.message = action.res.message;

            if (action.res.bool) {
                setTimeout(() => {
                    UserAction.modal({
                        display: true,
                        message: action.res.message,
                        button: ["ok"]
                    });
                }, 1);
            }
            break;
        case AppConstants.USER_ADD:
        case AppConstants.USER_EDIT:
            o.bool = action.res.bool;
            o.message = action.res.message;
            if (action.res.data) {
                o.data.one = action.res.data;
            }
            if (action.res.isProfile) {
                o.profile.data = action.res.data[0];
                Store.emitChange("status");
            }
            break;
        default:
    }

    if (action.actionType.match(/USER/)) {
        Store.emitChange("change");
    }

    return true;
});

export default Store;
