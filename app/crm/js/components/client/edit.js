import React from "react";
import update from "react-addons-update";
import { hashHistory } from "react-router";
//action
import ClientActionCreators from "../../actions/ClientActionCreators";
//stores
import ClientStore from "../../stores/ClientStore";
import UserStore from "../../stores/UserStore";
//custom
import _COMMON from "../../common";
//jsx
import Select from "../element/Select";
import ReactSelect from "../element/ReactSelect";
import ReactDropzone from "../element/ReactDropzone";

let ClientAction = new ClientActionCreators({
    type1: "client"
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        let o = ClientStore.getData(false, true);
        o.data = ClientStore.getDataById(this.props.params.id);
        if (!o.data.length) {
            ClientAction.data(this.props.params.id);
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = o;
    }
    componentWillMount() {
        ClientStore.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
        ClientStore.removeChangeListener(this.handleChange);
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
                            <div className="box-body">
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label htmlFor="company_id" className="col-sm-4 control-label">公司</label>
                                        <div className="col-sm-8">
                                            <Select type="company_id" ref="company_id" value={this.state.data.length ? this.state.data[0].company_id : ""} handleChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label htmlFor="career" className="col-sm-4 control-label">職位</label>
                                        <div className="col-sm-8">
                                            <Select type="career" ref="career" value={this.state.data.length && this.state.data[0].career.length ? this.state.data[0].career[0].id : ""} handleChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label htmlFor="name" className="col-sm-4 control-label">
                                            <span className="require">*</span>
                                            姓名
                                        </label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="name" placeholder="姓名" ref="name" value={this.state.data.length ? this.state.data[0].name : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label htmlFor="ename" className="col-sm-4 control-label">英文名</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="ename" placeholder="英文名" ref="ename" value={this.state.data.length ? this.state.data[0].ename : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label htmlFor="phone" className="col-sm-4 control-label">電話</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="phone" placeholder="電話" ref="phone" value={this.state.data.length ? this.state.data[0].phone : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label htmlFor="mobile" className="col-sm-4 control-label">手機</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="mobile" placeholder="手機" ref="mobile" value={this.state.data.length ? this.state.data[0].mobile : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="email" className="col-sm-2 control-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="mail" className="form-control" id="email" placeholder="Email" ref="email" value={this.state.data.length ? this.state.data[0].email : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="address" className="col-sm-1 control-label">地址</label>
                                        <div className="col-sm-11">
                                            <input type="text" className="form-control" id="address" placeholder="地址" ref="address" value={this.state.data.length ? this.state.data[0].address : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="tag" className="col-sm-1 control-label">標籤</label>
                                        <div className="col-sm-11">
                                            <ReactSelect ref="tag" value={this.state.data.length ? this.state.data[0].tag : []} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*
                            <div className="box-footer">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="remark" className="col-sm-1 control-label">名片</label>
                                        <div className="col-sm-11">
                                            <ReactDropzone options={{
                                                id: this.state.data[0].id,
                                                file: this.state.data[0].file,
                                                multiple: true
                                            }} handleDrop={this.handleDrop} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            */}
                            <div className="box-footer">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="remark" className="col-sm-1 control-label">備註</label>
                                        <div className="col-sm-11">
                                            <textarea className="form-control" rows="5" placeholder="備註" ref="remark" defaultValue={this.state.data.length ? this.state.data[0].remark : ""}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-footer">
                                <button type="submit" className="btn btn-info btn-sm pull-right">
                                    編輯
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
            this.setState(ClientStore.getData());
            if (this.state.bool) {
                setTimeout(() => {
                    ClientAction.modal({
                        display: true,
                        message: this.state.message,
                        button: [{
                            type: "ok",
                            fn: () => {
                                if (!hashHistory.goBack()) {
                                    hashHistory.push("/main/client");
                                }
                                ClientAction.modal({
                                    display: false
                                });
                            }
                        }]
                    });
                }, 1);
            }
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let data = _COMMON.getInputData(this.refs);
        if (data.name) {
            data.user_id = UserStore.getData("profile").data.id;
            ClientAction.edit(data);
        }
    }
    handleClick(e) {
        if (!hashHistory.goBack()) {
            hashHistory.push("/main/client");
        }
    }
    handleDrop(files) {
        ClientAction.file(this.state.data[0].id, files[0]);
    }
}
