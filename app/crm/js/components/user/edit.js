import React from "react";
import update from "react-addons-update";
import { hashHistory } from "react-router";
//action
import UserActionCreators from "../../actions/UserActionCreators";
//store
import UserStore from "../../stores/UserStore";
//custom
import _COMMON from "../../common";
//jsx
import ReactDropzone from "../element/ReactDropzone";

let UserAction = new UserActionCreators({
    type1: "user"
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        let o = UserStore.getData(false, true);
        if (this.props.params.id) {
            o.data = UserStore.getDataById(this.props.params.id);
            if (!o.data.length) {
                UserAction.data(this.props.params.id);
            }
        } else {
            o.data = [UserStore.getData("profile").data];
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDrop = this.handleDrop.bind(this);

        this.state = o;
    }
    componentWillMount() {
        UserStore.addChangeListener(this.handleChange);
        UserStore.addChangeListener(this.handleChange, "status");
    }
    componentWillUpdate() {
        UserStore.removeChangeListener(this.handleChange, "status");
    }
    componentWillUnmount() {
        UserStore.removeChangeListener(this.handleChange);
    }
    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header with-border">
                            <button type="submit" className="btn btn-default btn-sm" onClick={this.handleClick}>
                                回上一頁
                            </button>
                            <h3 className="box-title"></h3>
                        </div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <input type="hidden" ref="id" value={this.state.data.length ? this.state.data[0].id : ""} />
                            <div className="box-header with-border">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="col-sm-1 control-label">帳號</label>
                                        <div className="col-sm-11">
                                            <input type="text" className="form-control" placeholder={this.state.data.length ? this.state.data[0].username : ""} disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-header with-border">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="password1" className="col-sm-2 control-label">密碼</label>
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" id="password1" placeholder="密碼" ref="password1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <input type="password" className="form-control" id="password2" placeholder="密碼 (再輸入一次)" ref="password2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-body">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="name" className="col-sm-2 control-label">照片</label>
                                        <div className="col-sm-10">
                                            {this.state.data.length ?
                                                <ReactDropzone options={{
                                                    file: this.state.data[0].files ? this.state.data[0].files : null,
                                                    multiple: false
                                                }} handleDrop={this.handleDrop} />
                                            : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="name" className="col-sm-2 control-label">姓名</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="name" placeholder="姓名" ref="name" value={this.state.data.length ? this.state.data[0].name : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="email" className="col-sm-2 control-label">備用信箱</label>
                                        <div className="col-sm-10">
                                            <input type="mail" className="form-control" id="email" placeholder="Email" ref="email" value={this.state.data.length ? this.state.data[0].email : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-footer">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="remark" className="col-sm-1 control-label">備註</label>
                                        <div className="col-sm-11">
                                            <textarea className="form-control" rows="5" id="remark" placeholder="備註" ref="remark" value={this.state.data.length ? this.state.data[0].remark : ""} onChange={this.handleChange}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-footer">
                                <button type="submit" className="btn btn-info btn-sm pull-right">
                                    修改
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    handleChange(e) {
        if (e) {
            this.setState(update(this.state, {
                data: [{
                    $merge: _COMMON.stateMerge(e)
                }]
            }));
        } else {
            let o = UserStore.getData();
            if (!this.props.params.id) {
                o.data = [UserStore.getData("profile").data];
            }
            this.setState(o);

            if (this.state.bool) {
                setTimeout(() => {
                    UserAction.modal({
                        display: true,
                        message: this.state.message,
                        button: ["ok"]
                    });
                }, 1);
            }
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let data = _COMMON.getInputData(this.refs);

        // TODO: profile edit error message.
        if (data.password1 && data.password2) {
            if (data.password1 == data.password2) {
                data.password = data.password1;
            } else {
                let message = "密碼不相符!";
                return;
            }
        }

        delete data.password1;
        delete data.password2;

        if (!this.props.params.id) {
            data.isProfile = true;
        }

        UserAction.edit(data);
    }
    handleClick(e) {
        if (this.props.params.id) {
            hashHistory.push("/main/user");
        } else if (!hashHistory.goBack()) {
            hashHistory.push("/main");
        }
    }
    handleDrop(files) {
        UserAction.file(files[0], this.state.data[0].id);
    }
}
