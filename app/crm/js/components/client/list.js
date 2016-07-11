import React from "react";
import { Link, hashHistory } from "react-router";
//action
import ClientActionCreators from "../../actions/ClientActionCreators";
//stores
import ClientStore from "../../stores/ClientStore";
//jsx
import { Control, Table } from "../element/DataTable";
import TagPanel from "../element/TagPanel";

let ClientAction = new ClientActionCreators({
    type1: "client"
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        let o = ClientStore.getData("list");
        o.config.columns = [{
            title: "姓名",
            prop: "name",
            render: (val, row) => (<Link to={"/main/client/page/" + row.id}>{row.name}</Link>)
        }, {
            title: "公司",
            render: (val, row) => (row.company ? <Link to={"/main/company/page/" + row.company.id}>{row.company.name}</Link> : "")
        }, {
            title: "職位",
            render: (val, row) => (row.career.length ? <Link to={"/main/client?id=" + row.career[0].id}>{row.career[0].name}</Link> : "")
        }, {
            title: "電話",
            prop: "phone"
        }, {
            title: "手機",
            prop: "mobile"
        }, {
            title: "Mail",
            prop: "email",
            render: (val, row) => (<a href={"mailto:" + row.email}>{row.email}</a>)
        }, {
            title: "標籤",
            className: "tag",
            render: (val, row) => <div className="tag">{row.tag.map((value, key) => {
                let style = {
                    background: "#" + value.color
                };
                let query = {id:value.id};
                return (<span key={key} style={style}><Link to={"/main/client"} query={query}>{value.name}</Link></span>);
            })}</div>
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
            control: [
                // TODO: 多筆貼標籤
                // {
                //     type: "custom",
                //     name: <span><i className="fa fa-tags"></i>&nbsp;貼標籤</span>,
                //     class: "btn-info",
                //     fn(e) {
                //         this.handleClick("tag", false, e);
                //     }.bind(this)
                // },
                "add", "del"
            ],
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
            ClientAction.data(false, this.props.location.query.id);
        }, 1);
    }
    componentWillMount() {
        ClientStore.addChangeListener(this.handleChange);
        ClientAction.data(false, this.props.location.query.id);
    }
    componentWillUnmount() {
        ClientStore.removeChangeListener(this.handleChange);
    }
    render() {
        return (
            <div className="row list tag">
                <TagPanel />
                <Control state={this.state.config.button} handleClick={this.handleClick} />
                <div className="col-xs-12">
                    <div className="box">
                        <div className="box-body">
                            <Table
                                state={this.state}
                                handleClick={this.handleClick}
                                handleSort={ClientAction.sort}
                                handleChangePage={ClientAction.page}
                                handleSearch={ClientAction.filter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleChange(e) {
        this.setState(ClientStore.getData("list"));
    }
    handleClick(type, id, e) {
        switch (type) {
            case "add":
                hashHistory.push("/main/client/add");
                break;
            case "edit":
                hashHistory.push("/main/client/edit/" + id);
                break;
            case "del":
                ClientAction.modal(id == "all" && !this.state.data.checkbox.length ? {
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
                            ClientAction.del(ids);
                            ClientAction.modal({
                                display: false
                            });
                        }
                    }, "cancel"]
                });
                break;
            case "checkbox":
                ClientAction.checkbox(id, e);
                break;
            case "tag":
                if (this.state.data.checkbox.length) {
                    let obj = e.target.tagName == "BUTTON" ? $(e.target) : $(e.target).parents("button:first");
                    ClientAction.tagPanel("style", {
                        display: "block",
                        top: obj.position().top + 3,
                        left: obj.position().left + 100
                    });
                } else {
                    ClientAction.modal({
                        display: true,
                        message: "請先勾選欲標籤客戶!",
                        button: ["ok"]
                    });
                }
                break;
        }
    }
}
