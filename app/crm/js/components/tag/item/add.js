import React from "react";
import update from "react-addons-update";
import { hashHistory } from "react-router";
// action
import TagActionCreators from "../../../actions/TagActionCreators";
// stores
import TagStore from "../../../stores/TagStore";
import UserStore from "../../../stores/UserStore";
// custom
import _COMMON from "../../../common";
// jsx
import Select from "../../element/Select";
import Input_colorpicker from "../../element/Input_colorpicker";

let TagAction = new TagActionCreators({
    type1: "tag",
    type2: window.location.hash.split(/\//)[2] == "tag" ? "item" : window.location.hash.split(/\//)[2]
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        let type = this.props.location.pathname.split(/\//)[2] == "tag" ? "item" : this.props.location.pathname.split(/\//)[2];
        let o = TagStore.getData(type, false, true);
        o.type = type;
        o.data = [{
            parent_id: this.props.params.parent_id
        }];

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = o;
    }
    componentWillMount() {
        TagStore.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
        TagStore.removeChangeListener(this.handleChange);
    }
    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header with-border">
                            <button type="button" className="btn btn-default btn-sm" onClick={this.handleClick}>
                                回上一頁
                            </button>
                            <h3 className="box-title"></h3>
                        </div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className="box-body">
                                {this.state.type == "item" ?
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="parent_id" className="col-sm-1 control-label">群組</label>
                                        <div className="col-sm-11">
                                            <Select type="group" ref="parent_id" value={this.state.data.length ? this.state.data[0].parent_id : ""} handleChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div> : <input type="hidden" value={this.state.data.length ? this.state.data[0].parent_id : ""} ref="parent_id" />}
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="name" className="col-sm-1 control-label">名稱</label>
                                        <div className="col-sm-11">
                                            <input type="text" className="form-control" id="name" placeholder="名稱" ref="name" />
                                        </div>
                                    </div>
                                </div>
                                {this.state.type == "item" ?
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="color" className="col-sm-1 control-label">顏色</label>
                                        <div className="col-sm-11">
                                            <Input_colorpicker ref="color" />
                                        </div>
                                    </div>
                                </div>
                                : ""}
                            </div>
                            <div className="box-footer">
                                <button type="submit" className="btn btn-info btn-sm pull-right">
                                    新增
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
            let o = TagStore.getData(this.state.type);
            o.type = this.state.type;
            this.setState(o);
            if (this.state.bool) {
                setTimeout(() => {
                    TagAction.modal({
                        display: true,
                        message: this.state.message,
                        button: [{
                            type: "ok",
                            fn: () => {
                                hashHistory.push("/main/" + (this.state.type == "item" ? "tag" : this.state.type) + "/" + this.state.data[0].parent_id);
                                TagAction.modal({
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
            data.tagType = this.state.type;
            TagAction.add(data);
        }
    }
    handleClick(e) {
        hashHistory.push("/main/" + (this.state.type == "item" ? "tag" : this.state.type) + "/" + this.state.data[0].parent_id);
    }
}
