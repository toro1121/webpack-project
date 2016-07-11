import React from "react";
import { Link, hashHistory } from "react-router";
//action
import TagActionCreators from "../../../actions/TagActionCreators";
//stores
import TagStore from "../../../stores/TagStore";
//jsx
import { Control, Table } from "../../element/DataTable";

let TagAction = new TagActionCreators({
    type1: "tag",
    type2: "group"
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        let o = TagStore.getData("group", "list");
        let style = (color) => {
            return {
                width: "100%",
                height: "30px",
                background: "#" + color,
                borderRadius: "3px",
                display: "table"
            };
        };
        o.config.columns = [{
            title: "名稱",
            prop: "name",
            render: (val, row) => (
                <Link to={"/main/tag/" + row.id}>
                    {row.name}
                    &nbsp;&nbsp;
                    <span style={{color:"#ccc"}}>( {row.child.length} )</span>
                </Link>
            )
        }, {
            title: "顏色",
            prop: "color",
            width: 30,
            render: (val, row) => (
                <div style={style(val)}></div>
            )
        }, {
            title: "修改時間",
            prop: "updated_at"
        }, {
            title: "修改者",
            prop: "user",
            className: "empty-cell",
            render: (val, row) => (<span>{row.user ? row.user.name : ""}</span>)
        }];
        o.config.button = {
            control: ["add", "del"],
            table: ["checkbox", {
                type: "control",
                button: ["view", "edit", "del"]
            }]
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)

        this.state = o;
    }
    componentWillMount() {
        TagStore.addChangeListener(this.handleChange);
        TagAction.data("group");
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
        this.setState(TagStore.getData("group", "list"));
    }
    handleClick(type, id, e) {
        switch (type) {
            case "view":
                hashHistory.push("/main/tag/" + id);
                break;
            case "add":
                hashHistory.push("/main/tag/add");
                break;
            case "edit":
                hashHistory.push("/main/tag/edit/" + id);
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
                            TagAction.del(ids);
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
