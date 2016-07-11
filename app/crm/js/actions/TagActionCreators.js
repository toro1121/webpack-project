import assign from "object-assign";
// constants
import AppConstants from "../constants/AppConstants";
// action
import AppActionCreators from "./AppActionCreators";

export default class extends AppActionCreators {
    data(type, id, parent_id) {
        if (type == "all") {
            this.ajax({
                url: "/tag"
            }, AppConstants["TAG_DATA_ALL"]);
        } else if (parent_id) {
            if (id) {
                this.ajax({
                    url: "/tag/" + type + "/" + parent_id + "/" + id
                }, AppConstants["TAG_" + type.toUpperCase() + "_DATA_ONE"]);
            } else {
                this.ajax({
                    url: "/tag/" + type + "/" + parent_id
                }, AppConstants["TAG_" + type.toUpperCase() + "_DATA_ALL"]);
            }
        } else if (id) {
            this.ajax({
                url: "/tag/" + type + "/" + id
            }, AppConstants["TAG_" + type.toUpperCase() + "_DATA_ONE"]);
        } else {
            this.ajax({
                url: "/tag/" + type
            }, AppConstants["TAG_" + type.toUpperCase() + "_DATA_ALL"]);
        }
    }
    del(id, parent_id) {
        this.ajax({
            type: "DELETE",
            url: "/tag/" + id,
            data: {
                parent_id: parent_id,
                id: id
            }
        }, AppConstants["TAG_" + this.config.type2.toUpperCase() + "_DATA_ALL"]);
    }
}
