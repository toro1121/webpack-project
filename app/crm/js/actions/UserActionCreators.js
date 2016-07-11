import assign from "object-assign";
// constants
import AppConstants from "../constants/AppConstants";
// action
import AppActionCreators from "./AppActionCreators";

export default class extends AppActionCreators {
    userStatus(data) {
        this.ajax({
            url: "/user/status",
            data: data
        }, AppConstants.USER_STATUS);
    }
    userLogin(data) {
        this.ajax({
            type: "POST",
            url: "/user/login",
            data: data
        }, AppConstants.USER_LOGINOUT);
    }
    userLogout(data) {
        this.ajax({
            url: "/user/logout",
            data: data
        }, AppConstants.USER_LOGINOUT);
    }
    userRegister(data) {
        this.ajax({
            type: "POST",
            url: "/user/register",
            data: data
        }, AppConstants.USER_REGISTER);
    }
    userForget(data) {
        this.ajax({
            type: "POST",
            url: "/user/forget",
            data: data
        }, AppConstants.USER_FORGET);
    }
}
