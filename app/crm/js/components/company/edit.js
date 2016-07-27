import React from "react";
import update from "react-addons-update";
import { hashHistory } from "react-router";
//action
import CompanyActionCreators from "../../actions/CompanyActionCreators";
//stores
import CompanyStore from "../../stores/CompanyStore";
import UserStore from "../../stores/UserStore";
//custom
import _COMMON from "../../common";
//jsx
import Select from "../element/Select";

let CompanyAction = new CompanyActionCreators({
    type1: "company"
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        let o = CompanyStore.getData(false, true);
        o.data = CompanyStore.getDataById(this.props.params.id);
        if (!o.data.length) {
            CompanyAction.data(this.props.params.id);
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = o;
    }
    componentWillMount() {
        CompanyStore.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
        CompanyStore.removeChangeListener(this.handleChange);
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
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="industry" className="col-sm-2 control-label">產業</label>
                                        <div className="col-sm-10">
                                            <Select type="industry" ref="industry" value={this.state.data.length && this.state.data[0].industry.length ? this.state.data[0].industry[0].id : ""} handleChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="name" className="col-sm-2 control-label">
                                            <span className="require">*</span>
                                            名稱
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="name" placeholder="名稱" ref="name" value={this.state.data.length ? this.state.data[0].name : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="ename" className="col-sm-2 control-label">英文名稱</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="ename" placeholder="英文名稱" ref="ename" value={this.state.data.length ? this.state.data[0].ename : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="sname" className="col-sm-2 control-label">簡稱</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="sname" placeholder="簡稱" ref="sname" value={this.state.data.length ? this.state.data[0].sname : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="number" className="col-sm-2 control-label">統一編號</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="number" placeholder="統一編號" ref="number" value={this.state.data.length ? this.state.data[0].number : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label htmlFor="capital" className="col-sm-4 control-label">資本額</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="capital" placeholder="資本額" ref="capital" value={this.state.data.length ? this.state.data[0].capital : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label htmlFor="scale" className="col-sm-4 control-label">人力規模</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="scale" placeholder="人力規模" ref="scale" value={this.state.data.length ? this.state.data[0].scale : ""} onChange={this.handleChange} />
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
                                        <label htmlFor="fax" className="col-sm-4 control-label">傳真</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="fax" placeholder="傳真" ref="fax" value={this.state.data.length ? this.state.data[0].fax : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="email" className="col-sm-2 control-label">Mail</label>
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
                                        <label htmlFor="website" className="col-sm-1 control-label">網址</label>
                                        <div className="col-sm-11">
                                            <input type="text" className="form-control" id="website" placeholder="網址" ref="website" value={this.state.data.length ? this.state.data[0].website : ""} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
            this.setState(CompanyStore.getData());
            if (this.state.bool) {
                setTimeout(() => {
                    CompanyAction.modal({
                        display: true,
                        message: this.state.message,
                        button: [{
                            type: "ok",
                            fn: () => {
                                if (!hashHistory.goBack()) {
                                    hashHistory.push("/main/company");
                                }
                                CompanyAction.modal({
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
            CompanyAction.edit(data);
        }
    }
    handleClick(e) {
        if (!hashHistory.goBack()) {
            hashHistory.push("/main/company");
        }
    }
}
