import React from 'react';
import {
    Link
}
from 'react-router';
//actions
import UserActionCreators from '../actions/UserActionCreators';
//stores
import UserStore from '../stores/UserStore';
//custom
import _COMMON from '../common';
//jsx
import Logo from './other/Logo';
import Message from './other/Message';
import Checkbox from './element/Checkbox';

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
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="密碼" ref="password1" />
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="密碼(再次確認)" ref="password2" />
                            <span className="glyphicon glyphicon-log-in form-control-feedback"></span>
                        </div>
                        <div className="row">
                            <div className="col-xs-8">
                                <div className="checkbox icheck">
                                    <label>
                                        <Checkbox id="cb" ref="agree" handleClick={this.handleClick} />
                                        &nbsp;&nbsp;我同意&nbsp;
                                        <a href="#">條款</a>
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-4">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">
                                    註冊
                                </button>
                            </div>
                        </div>
                    </form>
                    <Link to={'/login'} className="text-center">已經有帳號</Link>
                </div>
            </div>
        );
    }
    handleChange(e) {
        this.setState(UserStore.getData());
        if (this.state.bool) {
            this.history.pushState(null, '/login');
        }
    }
    handleSubmit(e) {
        e.preventDefault();

        var o = this.state;
        var data = _COMMON.getInputData(this.refs);
        data.email = data.username;

        var bool = true;
        var i = 0;
        for (var key in data) {
            if (!data[key]) {
                bool = false;
                break;
            }
            i++;
        }
        if (data.agree) {
            delete data.agree;
            if (bool) {
                if (data.password1 && data.password2) {
                    if (data.password1 == data.password2) {
                        data.password = data.password1;
                        delete data.password1;
                        delete data.password2;

                        UserActionCreators.userRegister(data);
                    } else {
                        o.message = '密碼不相符!';
                    }
                }
            } else {
                o.message = '欄位填寫不完整!';
                $('input:eq(' + i + ')').focus();
            }
        } else {
            o.message = '未勾選我同意條款!'
        }

        this.setState(o);
    }
}
