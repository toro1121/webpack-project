import React from "react";
import { Link, hashHistory } from "react-router";
//action
import CompanyActionCreators from "../../actions/CompanyActionCreators";
//stores
import CompanyStore from "../../stores/CompanyStore";
//jsx
import { Control, Table } from "../element/DataTable";

let CompanyAction = new CompanyActionCreators({
    type1: "company"
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        let o = CompanyStore.getData("list");
        o.config.columns = [{
            title: "名稱",
            prop: "name",
            render: (val, row) => (<Link to={"/main/company/page/" + row.id}>{row.name}</Link>)
        }, {
            title: "產業",
            render: (val, row) => (row.industry.length ? <Link to={"/main/company?id=" + row.industry[0].id}>{row.industry[0].name}</Link> : "")
        }, {
            title: "電話",
            prop: "phone"
        }, {
            title: "地址",
            prop: "address"
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
                button: ["edit", "del"]
            }]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = o;
    }
    componentWillReceiveProps() {
        setTimeout(() => {
            CompanyAction.data(false, this.props.location.query.id);
        }, 1);
    }
    componentWillMount() {
        CompanyStore.addChangeListener(this.handleChange);
        CompanyAction.data(false, this.props.location.query.id);
    }
    componentWillUnmount() {
        CompanyStore.removeChangeListener(this.handleChange);
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
                                handleSort={CompanyAction.sort}
                                handleChangePage={CompanyAction.page}
                                handleSearch={CompanyAction.filter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleChange(e) {
        this.setState(CompanyStore.getData("list"));
    }
    handleClick(type, id, e) {
        switch (type) {
            case "add":
                hashHistory.push("/main/company/add");
                break;
            case "edit":
                hashHistory.push("/main/company/edit/" + id);
                break;
            case "del":
                CompanyAction.modal(id == "all" && !this.state.data.checkbox.length ? {
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
                            CompanyAction.del(ids);
                            CompanyAction.modal({
                                display: false
                            });
                        }
                    }, "cancel"]
                });
                break;
            case "checkbox":
                CompanyAction.checkbox(id, e);
                break;
        }
    }
}
