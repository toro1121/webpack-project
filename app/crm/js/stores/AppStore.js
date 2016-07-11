import { EventEmitter } from "events";
import assign from "object-assign";
//constants
import AppConstants from "../constants/AppConstants";
//dispatcher
import AppDispatcher from "../dispatcher/AppDispatcher";
//action
import AppActionCreators from "../actions/AppActionCreators";

let AppAction = new AppActionCreators();

let CHANGE_EVENT = "change";
let o = {
    modal: {
        display: false,
        title: "訊息",
        message: null,
        button: [],
    }
};

class AppStore extends EventEmitter {
    // constructor() {
    //     super();
    // }
    getModal() {
        return o.modal;
    }
    emitChange(type) {
        this.emit(type ? type : "change");
    }
    addChangeListener(callback, type) {
        this.on(type ? type : "change", callback);
    }
    removeChangeListener(callback, type) {
        this.removeListener(type ? type : "change", callback);
    }
}

let Store = new AppStore();

AppDispatcher.register((payload) => {
    let action = payload.action;
    switch (action.actionType) {
        case AppConstants.MODAL_STATUS:
            o.modal = assign(o.modal, action.res);

            let defaultButton = [{
                type: "ok",
                name: "確認",
                class: "btn-info",
                fn: () => {
                    AppAction.modal({
                        display: false
                    });
                }
            }, {
                type: "cancel",
                name: "取消",
                class: "btn-default",
                fn: () => {
                    AppAction.modal({
                        display: false
                    });
                }
            }];
            let button = [];

            for (var i = 0; i < o.modal.button.length; i++) {
                if (typeof o.modal.button[i] === "string" || typeof o.modal.button[i] === "object") {
                    if (o.modal.button[i].type == "custom") {
                        button.push(assign({
                            class: "btn-default",
                            fn: () => {}
                        }, o.modal.button[i]));
                    } else {
                        for (let j = 0; j < defaultButton.length; j++) {
                            if (o.modal.button[i] == defaultButton[j].type) {
                                button.push(defaultButton[j]);
                                break;
                            } else if (o.modal.button[i].type == defaultButton[j].type) {
                                button.push(assign(defaultButton[j], o.modal.button[i]));
                                break;
                            }
                        }
                    }
                }
            }
            o.modal.button = button;

            Store.emitChange();
            break;
    }

    return true;
});

export { AppStore, Store };
