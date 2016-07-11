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
import Checkbox from "./element/Checkbox";

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
            <div className="login-box">
                <Logo />
                <div className="login-box-body">
                    <Message message={this.state.message} />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group has-feedback">
                            <input type="email" className="form-control" placeholder="帳號" ref="username" />
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="密碼" ref="password" />
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="row">
                            <div className="col-xs-8">
                                <div className="checkbox icheck">
                                    <label>
                                        <Checkbox id="cb" ref="remember" handleClick={this.handleClick} />
                                        &nbsp;&nbsp;記住我
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-4">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">
                                    登入
                                </button>
                            </div>
                        </div>
                    </form>

                    <Link to={"/forget"} className="text-center">忘記密碼</Link>
                    <br />
                    <Link to={"/register"} className="text-center">註冊</Link>
                </div>
            </div>
        );
    }
    handleChange(e) {
        this.setState(UserStore.getData());
    }
    handleSubmit(e) {
        e.preventDefault();

        let o = this.state;
        let data = _COMMON.getInputData(this.refs);

        let bool = true;
        let i = 0;
        for (var key in data) {
            if (!data[key] && key != "remember") {
                bool = false;
                break;
            }
            i++;
        }
        if (bool) {
            UserAction.userLogin(data);
        } else {
            o.message = "欄位填寫不完整!";
            $("input:eq(" + i + ")").focus();
        }

        this.setState(o);
    }
}
