import React from "react";
import ReactDOM from "react-dom";
import {
    Router,
    Route,
    Redirect,
    IndexRoute,
    hashHistory
}
from "react-router";
//action
import UserActionCreators from "./actions/UserActionCreators";
//stores
import UserStore from "./stores/UserStore";
//jsx
import Modal from "./components/element/Modal";
//vendor
import "bootstrap/dist/css/bootstrap.min";
import "bootstrap/dist/js/bootstrap.min";
import "font-awesome/css/font-awesome.min";
import "admin-lte/dist/css/AdminLTE.min";
import "admin-lte/plugins/slimScroll/jquery.slimscroll.min";
import "../sass/fix";

let UserAction = new UserActionCreators({
    type1: "user"
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.RedirectByUserStatus = this.RedirectByUserStatus.bind(this);

        this.state = UserStore.getData("profile");
    }
    componentWillMount() {
        UserStore.addChangeListener(this.handleChange, "status");
        UserAction.userStatus();
        return this.RedirectByUserStatus();
    }
    componentDidUpdate() {
        return this.RedirectByUserStatus();
    }
    componentWillUnmount() {
        UserStore.removeChangeListener(this.handleChange, "status");
    }
    render() {
        return (
            <div>
                <Modal />
                {React.cloneElement(this.props.children, {state: this.state})}
            </div>
        );
    }
    handleChange() {
        this.setState(UserStore.getData("profile"));
    }
    RedirectByUserStatus() {
        let page = this.props.location.pathname.split(/\//)[1] ? this.props.location.pathname.split(/\//)[1] : "login";

        if (typeof this.state.status == "boolean") {
            if (page != "main" && this.state.status) {
                hashHistory.push("/main");
            } else if (page == "main" && !this.state.status) {
                hashHistory.push("/");
            }

            $("body").fadeIn();
        }

        //change website title
        let title = "Toro | CRM";
        switch (page) {
            case "login":
                title += " - 登入";
                break;
            case "register":
                title += " - 註冊";
                break;
        }
        $(document).find("title:first").text(title);

        //cahnge body style
        if (page == "main") {
            $("body").attr("class", "sidebar-mini fixed skin-black-light");
        } else {
            $("body").attr("class", "login-page");
        }
    }
}

import Login from "./components/Login";
import Register from "./components/Register";
import Forget from "./components/Forget";
import Main from "./components/Main";
import MainNotFound from "./components/main/NotFound";
import MainIndex from "./components/main/Index";
import UserEdit from "./components/user/edit";
import Client from "./components/client/list";
import ClientPage from "./components/client/page";
import ClientAdd from "./components/client/add";
import ClientEdit from "./components/client/edit";
import Company from "./components/company/list";
import CompanyPage from "./components/company/page";
import CompanyAdd from "./components/company/add";
import CompanyEdit from "./components/company/edit";
import TagGroup from "./components/tag/group/list";
import TagGroupAdd from "./components/tag/group/add";
import TagGroupEdit from "./components/tag/group/edit";
import TagItem from "./components/tag/item/list";
import TagItemAdd from "./components/tag/item/add";
import TagItemEdit from "./components/tag/item/edit";

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login} />

            <Route path="login" component={Login}></Route>
            <Route path="register" component={Register}></Route>
            <Route path="forget" component={Forget}></Route>

            <Route path="main" component={Main}>
                <IndexRoute component={MainIndex} />

                <Route path="user/edit/:id" component={UserEdit} />
                <Route path="profile" component={UserEdit} />

                <Route path="client" component={Client} />
                <Route path="client/page/:id" component={ClientPage} />
                <Route path="client/add" component={ClientAdd} />
                <Route path="client/edit/:id" component={ClientEdit} />

                <Route path="company" component={Company} />
                <Route path="company/page/:id" component={CompanyPage} />
                <Route path="company/add" component={CompanyAdd} />
                <Route path="company/edit/:id" component={CompanyEdit} />

                <Route path="tag" component={TagGroup} />
                <Route path="tag/add" component={TagGroupAdd} />
                <Route path="tag/edit/:id" component={TagGroupEdit} />

                <Route path="tag/:parent_id" component={TagItem} />
                <Route path="tag/:parent_id/add" component={TagItemAdd} />
                <Route path="tag/:parent_id/edit/:id" component={TagItemEdit} />
                <Route path="industry/:parent_id" component={TagItem} />
                <Route path="industry/:parent_id/add" component={TagItemAdd} />
                <Route path="industry/:parent_id/edit/:id" component={TagItemEdit} />
                <Route path="career/:parent_id" component={TagItem} />
                <Route path="career/:parent_id/add" component={TagItemAdd} />
                <Route path="career/:parent_id/edit/:id" component={TagItemEdit} />

                <Route path="*" component={MainNotFound} />
            </Route>
            <Route path="*" component={Login} />
        </Route>
    </Router>
), $("div#container")[0]);
