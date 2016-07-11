import React from "react";
import { Link, hashHistory } from "react-router";
//action
import ClientActionCreators from "../../actions/ClientActionCreators";
//stores
import ClientStore from "../../stores/ClientStore";
//jsx
import { Control } from "../element/DataTable";

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

        this.state = o;
    }
    componentWillMount() {
        ClientStore.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
        ClientStore.removeChangeListener(this.handleChange);
    }
    render() {
        let state = {
            control: ["back", {
                type: "custom",
                name: "編輯",
                class: "btn-default",
                fn: () => {
                    hashHistory.push("/main/client/edit/" + this.props.params.id);
                }
            }, {
                type: "custom",
                name: "刪除",
                class: "btn-default",
                fn: () => {
                    ClientAction.modal({
                        display: true,
                        message: "Are you sure?",
                        button: [{
                            type: "ok",
                            fn: () => {
                                ClientAction.del([this.props.params.id]);
                                if (!hashHistory.goBack()) {
                                    hashHistory.push("/main/client");
                                }
                                ClientAction.modal({
                                    display: false
                                });
                            }
                        }, "cancel"]
                    });
                }
            }]
        };
        return (
            <div className="row">
                <Control state={state} handleClick={this.handleClick} />
                <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header with-border" style={{verticalAlign:"bottom"}}>
                            <h3 className="box-title">
                                &nbsp;&nbsp;
                                <i className="fa fa-user"></i>
                                &nbsp;&nbsp;
                                {this.state.data.length ? this.state.data[0].name : ""}
                            </h3>
                        </div>
                        <div className="box-body">
                            <div className="col-sm-3">
                                <div className="form-group field">
                                    <label className="col-sm-4 control-label">公司</label>
                                    <div className="col-sm-8">
                                        {this.state.data[0].company ?
                                            <Link to={"/main/company/page/" + this.state.data[0].company.id}>{this.state.data[0].company.name}</Link>
                                        : null}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group field">
                                    <label className="col-sm-4 control-label">職位</label>
                                    <div className="col-sm-8">
                                        {this.state.data.length && this.state.data[0].career.length ?
                                            <Link to={"/main/client?id=" + this.state.data[0].career[0].id}>{this.state.data[0].career[0].name}</Link>
                                        : null}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group field">
                                    <label className="col-sm-4 control-label">姓名</label>
                                    <div className="col-sm-8">{this.state.data.length ? this.state.data[0].name : ""}</div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group field">
                                    <label className="col-sm-4 control-label">英文名</label>
                                    <div className="col-sm-8">{this.state.data.length ? this.state.data[0].ename : ""}</div>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="col-sm-3">
                                <div className="form-group field">
                                    <label className="col-sm-4 control-label">電話</label>
                                    <div className="col-sm-8">{this.state.data.length ? this.state.data[0].phone : ""}</div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group field">
                                    <label className="col-sm-4 control-label">手機</label>
                                    <div className="col-sm-8">{this.state.data.length ? this.state.data[0].mobile : ""}</div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group field">
                                    <label className="col-sm-2 control-label">Email</label>
                                    <div className="col-sm-10">
                                        {this.state.data.length ? <a href={"mailto:" + this.state.data[0].email}>{this.state.data[0].email}</a> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="col-sm-12">
                                <div className="form-group field">
                                    <label className="col-sm-1 control-label">地址</label>
                                    <div className="col-sm-11">{this.state.data.length ? this.state.data[0].address : ""}</div>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="col-sm-12">
                                <div className="form-group field">
                                    <label className="col-sm-1 control-label">備註</label>
                                    <div className="col-sm-11">
                                        <pre>{this.state.data.length ? this.state.data[0].remark : ""}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleChange(e) {
        this.setState(ClientStore.getData());
    }
    handleClick(type, id, e) {
        if (hashHistory.goBack()) {
            hashHistory.push("/main/client");
        }
    }
}
