import React from "react";
import { hashHistory } from "react-router";
// action
import TagActionCreators from "../../../actions/TagActionCreators";
// stores
import TagStore from "../../../stores/TagStore";
// jsx
import { Control, Table } from "../../element/DataTable";

let TagAction = new TagActionCreators({
    type1: "tag",
    type2: window.location.hash.split(/\//)[2] == "tag" ? "item" : window.location.hash.split(/\//)[2]
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        let type = this.props.location.pathname.split(/\//)[2] == "tag" ? "item" : this.props.location.pathname.split(/\//)[2];
        let o = TagStore.getData(type, "list");
        o.type = type;
        o.config.columns = [{
            title: "名稱",
            prop: "name"
        }, type.match("item") ? {
            title: "顏色",
            prop: "color",
            width: 30,
            render: (val, row) => (<div style={{width:"100%",height:"30px",background:"#"+row.color,borderRadius:"3px",display:"table"}}></div>)
        } : false, {
            title: "修改時間",
            prop: "updated_at"
        }, {
            title: "修改者",
            prop: "user",
            className: "empty-cell",
            render: (val, row) => (<span>{row.user ? row.user.name : ""}</span>)
        }];
        o.config.button = {
            control: [type.match("item") ? {
                type: "back",
                name: "回上一頁",
                fn: () => {
                    this.handleClick("back", false);
                }
            } : false, "add", "del"],
            table: ["checkbox", {
                type: "control",
                button: ["edit", "del"]
            }]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = o;
    }
    componentWillReceiveProps() {
        setTimeout(() => {
            TagAction.data(this.props.location.pathname.split(/\//)[2] == "tag" ? "item" : this.props.location.pathname.split(/\//)[2], false, this.props.params.parent_id);
        }, 1);
    }
    componentWillMount() {
        TagStore.addChangeListener(this.handleChange);
        TagAction.data(this.state.type, false, this.props.params.parent_id);
    }
    componentWillUnmount() {
        TagStore.removeChangeListener(this.handleChange);
    }
    render() {
        return (
            <div className="row list">
                <Control state={this.state.config.button} handleClick={this.handleClick} />
                <div className="col-xs-12">
                    <div className="box">
                        <div className="box-body">
                            <Table
                                state={this.state}
                                handleClick={this.handleClick}
                                handleSort={TagAction.sort}
                                handleChangePage={TagAction.page}
                                handleSearch={TagAction.filter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleChange() {
        let type = this.props.location.pathname.split(/\//)[2] == "tag" ? "item" : this.props.location.pathname.split(/\//)[2];
        this.setState({
            type: type,
            config: this.state.config,
            data: TagStore.getData(type, "list").data
        });
    }
    handleClick(type, id, e) {
        switch (type) {
            case "back":
                hashHistory.push("/main/" + (this.state.type == "item" ? "tag" : this.state.type));
                break;
            case "add":
                hashHistory.push("/main/" + (this.state.type == "item" ? "tag" : this.state.type) + "/" + this.props.params.parent_id + "/add");
                break;
            case "edit":
                hashHistory.push("/main/" + (this.state.type == "item" ? "tag" : this.state.type) + "/" + this.props.params.parent_id + "/edit/" + id);
                break;
            case "del":
                TagAction.modal(id == "all" && !this.state.data.checkbox.length ? {
                    display: true,
                    message: "請先勾選欲刪除項目!",
                    button: ["ok"]
                } : {
                    display: true,
                    message: "Are you sure?",
                    button: [{
                        type: "ok",
                        fn: () => {
                            let ids = id == "all" ? this.state.data.checkbox : [id];
                            TagAction.del(ids, this.props.params.parent_id);
                            TagAction.modal({
                                display: false
                            });
                        }
                    }, "cancel"]
                });
                break;
            case "checkbox":
                TagAction.checkbox(id, e);
                break;
            case "link":
                break;
        }
    }
}
