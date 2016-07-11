import React from "react";
import { Link, hashHistory } from "react-router";
//actions
import UserActionCreators from "../actions/UserActionCreators";
//stores
import UserStore from "../stores/UserStore";
//custom
import _COMMON from "../common";
//jsx
import Logo from "./other/Logo";
import Message from "./other/Message";

let UserAction = new UserActionCreators({
    type1: "user"
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = UserStore.getData(false, true);
    }
    componentWillMount() {
        UserStore.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
        UserStore.removeChangeListener(this.handleChange);
    }
    render() {
        return (
            <div className="register-box">
                <Logo />
                <div className="register-box-body">
                    <Message message={this.state.message} />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group has-feedback">
                            <input type="text" className="form-control" placeholder="姓名" ref="name" />
                            <span className="glyphicon glyphicon-user form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="email" className="form-control" placeholder="帳號" ref="username" />
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="row">
                            <div className="col-xs-4 col-xs-offset-8">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">
                                    送出
                                </button>
                            </div>
                        </div>
                    </form>
                    <Link to={"/login"} className="text-center">回登入頁</Link>
                </div>
            </div>
        );
    }
    handleChange(e) {
        this.setState(UserStore.getData());
        if (this.state.bool) {
            hashHistory.push("/login");
        }
    }
    handleSubmit(e) {
        e.preventDefault();

        let o = this.state;
        let data = _COMMON.getInputData(this.refs);

        let bool = true;
        let i = 0;
        for (var key in data) {
            if (!data[key]) {
                bool = false;
                break;
            }
            i++;
        }
        if (bool) {
            UserAction.userForget(data);
        } else {
            o.message = "欄位填寫不完整!";
            $("input:eq(" + i + ")").focus();
        }

        this.setState(o);
    }
}
