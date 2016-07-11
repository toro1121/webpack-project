import assign from "object-assign";
//constants
import AppConstants from "../constants/AppConstants";
//dispatcher
import AppDispatcher from "../dispatcher/AppDispatcher";
//custom
import config from "../config";

let _CONFIG = config();

export default class {
    constructor(config) {
        if (config) {
            this.config = config;
            this.TYPE = config.type1.toUpperCase();
            this.config.type2 = typeof config.type2 != "undefined" ? config.type2 : false;
        }

        this.sort = this.sort.bind(this);
        this.filter = this.filter.bind(this);
    }
    ajax(options, actionType) {
        options.url = _CONFIG._URL_API + options.url;
        //如果env = develop
        // if (_CONFIG._ENV == "develop") {
        //     options.xhrFields = {
        //         withCredentials: true
        //     };
        //     options.data = assign({}, {
        //         env: _CONFIG._ENV
        //     }, options.data);
        // }
        $.ajax(assign({
            type: "GET",
            dataType: "json",
            success: (res) => {
                if (actionType) {
                    AppDispatcher.handleViewAction({
                        actionType: actionType,
                        res: res
                    });
                }
            }
        }, options));
    }
    modal(data) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.MODAL_STATUS,
            res: data
        });
    }
    data(id, tagId) {
        if (id) {
            this.ajax({
                url: "/" + this.config.type1 + "/" + id
            }, AppConstants[this.TYPE + "_DATA_ONE"]);
        } else {
            let setting = {
                url: "/" + this.config.type1
            };
            if (tagId) {
                setting.success = (res) => {
                    res.tagId = tagId;
                    AppDispatcher.handleViewAction({
                        actionType: AppConstants[this.TYPE + "_DATA_ALL"],
                        res: res
                    });
                }
            }
            this.ajax(setting, AppConstants[this.TYPE + "_DATA_ALL"]);
        }
    }
    add(data) {
        this.ajax({
            type: "POST",
            url: "/" + this.config.type1,
            data: data
        }, AppConstants[this.TYPE + "_ADD"]);
    }
    edit(data) {
        this.ajax({
            type: "PUT",
            url: "/" + this.config.type1 + "/" + data.id,
            data: data
        }, AppConstants[this.TYPE + "_EDIT"]);
    }
    del(id) {
        this.ajax({
            type: "DELETE",
            url: "/" + this.config.type1 + "/" + id,
            data: {
                id: id
            }
        }, AppConstants[this.TYPE + "_DATA_ALL"]);
    }
    file(file) {
        let data = new FormData();
        data.append("file", file);
        this.ajax({
            type: "POST",
            cache: false,
            processData: false,
            contentType: false,
            url: "/file",
            data: data
        });
    }
    sort(sortBy) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants[this.TYPE + (this.config.type2 ? "_" + this.config.type2.toUpperCase() : "") + "_DATA_SORT"],
            sortBy: sortBy
        });
    }
    page(currentPage) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants[this.TYPE + (this.config.type2 ? "_" + this.config.type2.toUpperCase() : "") + "_DATA_PAGE"],
            currentPage: currentPage
        });
    }
    filter(name, value) {
        let v = typeof value === "object" ? value.target.value : value;
        AppDispatcher.handleViewAction({
            actionType: AppConstants[this.TYPE + (this.config.type2 ? "_" + this.config.type2.toUpperCase() : "") + "_DATA_FILTER"],
            name: name,
            value: v
        });
    }
    checkbox(id, className) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants[this.TYPE + (this.config.type2 ? "_" + this.config.type2.toUpperCase() : "") + "_CHECKBOX"],
            id: id,
            className: className
        });
    }
}
