import React from "react";
import RDC from "react-data-components";
import assign from "object-assign";
//jsx
import Checkbox from "./Checkbox";
//vendor
import "react-data-components/css/table-twbs";

export class Control extends React.Component {
    constructor(props) {
        super(props);

        let o = this.props.state;
        o.type = typeof o.type == "undefined" ? "none" : o.type;

        let defaultButton = [{
            type: "add",
            name: "新增",
            class: "btn-default",
            fn: () => {
                this.props.handleClick("add", false);
            }
        }, {
            type: "del",
            name: "多筆刪除",
            class: "btn-default",
            fn: () => {
                this.props.handleClick("del", "all");
            }
        }, {
            type: "back",
            name: "回上一頁",
            class: "btn-default",
            fn: () => {
                this.props.handleClick("back", false);
            }
        }];
        let button = [];

        for (var i = 0; i < o.control.length; i++) {
            if (typeof o.control[i] === "string" || typeof o.control[i] === "object") {
                if (o.control[i].type == "custom") {
                    button.push(assign({
                        class: "btn-default",
                        fn: () => {}
                    }, o.control[i]));
                } else {
                    for (var j = 0; j < defaultButton.length; j++) {
                        if (o.control[i] == defaultButton[j].type) {
                            button.push(defaultButton[j]);
                            break;
                        } else if (o.control[i].type == defaultButton[j].type) {
                            button.push(assign(defaultButton[j], o.control[i]));
                            break;
                        }
                    }
                }
            }
        }
        delete o.control;
        o.button = button;

        this.handleClick = this.handleClick.bind(this);

        this.state = o;
    }
    render() {
        return (
            <div className="col-xs-12">
                <div className={"box " + (this.state.type ? this.state.type == "none" ? "none" : "slideDown" : "slideUp")}>
                    <div className="box-header with-border">
                        {this.state.button.map((value, key) => {
                            return (
                                <button className={"btn btn-sm " + value.class} onClick={value.fn} key={key}>{value.name}</button>
                            );
                        })}
                        <div className="box-tools pull-right">
                            <button className="btn btn-box-tool" data-widget="collapse" onClick={this.handleClick}>
                                <i className="fa"></i>
                            </button>
                        </div>
                    </div>
                    <div className="box-body">
                    </div>
                </div>
            </div>
        );
    }
    handleClick(e) {
        this.setState({
            type: this.state.type ? false : true
        });
    }
}

export class Table extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        let o = this.props.state;
        let defaultButton = [{
            type: "checkbox",
            position: "left",
            title: <Checkbox id="all" handleClick={this.handleClick} data={o.data.page} checkbox={o.data.checkbox} />,
            className: "cb",
            width: 40,
            render: (val, row) => (
                <Checkbox id={"checkbox_" + row.id} className={row.checked ? "checked" : ""} handleClick={this.handleClick} data={o.data.page} checkbox={o.data.checkbox} />
            )
        }, {
            type: "control",
            position: "right",
            title: "",
            defaultButton: [{
                type: "view",
                name: <i className="glyphicon glyphicon-log-in"></i>,
                class: "btn-default",
                fn: (id, e) => {
                    this.handleClick("view", id);
                }
            }, {
                type: "edit",
                name: <i className="glyphicon glyphicon-cog"></i>,
                class: "btn-default",
                fn: (id, e) => {
                    this.handleClick("edit", id);
                }
            }, {
                type: "del",
                name: <i className="glyphicon glyphicon-trash"></i>,
                class: "btn-default",
                fn: (id, e) => {
                    this.handleClick("del", id);
                }
            }]
        }];

        if (o.config.button && o.config.button.table) {
            //處理table columns
            for (var i in o.config.columns) {
                if (!o.config.columns[i]) {
                    delete o.config.columns[i];
                }
            }

            var columns = assign([], o.config.columns);
            for (var i = 0; i < o.config.button.table.length; i++) {
                if (typeof o.config.button.table[i] === "string") {
                    for (var j = 0; j < defaultButton.length; j++) {
                        if (o.config.button.table[i] == defaultButton[j].type) {
                            if (defaultButton[j].position == "left") {
                                columns.splice(0, 0, defaultButton[j]);
                            } else {
                                columns.push(defaultButton[j]);
                            }
                            break;
                        }
                    }
                } else if (typeof o.config.button.table[i] === "object") {
                    for (var j = 0; j < defaultButton.length; j++) {
                        if (o.config.button.table[i].type == defaultButton[j].type) {
                            let tmp = assign(defaultButton[j], o.config.button.table[i]);

                            if (tmp.button.length) {
                                let button = [];
                                for (var k = 0; k < tmp.button.length; k++) {
                                    if (typeof tmp.button[k] === "string") {
                                        for (var l = 0; l < tmp.defaultButton.length; l++) {
                                            if (tmp.button[k] == tmp.defaultButton[l].type) {
                                                button.push(tmp.defaultButton[l]);
                                                break;
                                            }
                                        }
                                    }
                                }

                                if (button.length) {
                                    tmp.render = (val, row) => (
                                        <span>
                                            {button.map((value, key) => {
                                                return (<button className={"btn btn-sm " + value.class} onClick={value.fn.bind(this, row.id)} key={key}>{value.name}</button>);
                                            })}
                                        </span>
                                    );
                                }
                            }

                            if (tmp.position == "left") {
                                columns.splice(0, 0, tmp);
                            } else {
                                columns.push(tmp);
                            }
                            break;
                        }
                    }
                }
            }
        }

        return (
            <div>
                <div className="col-xs-4">
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-search"></i>
                        </span>
                        <input type="search" className="form-control" value={o.config.filterValue["search"]} onChange={this.props.handleSearch.bind(this, "search")} />
                        <span className="input-group-addon link" onClick={this.handleClick.bind(this, "clear")}>
                            <i className="fa fa-close"></i>
                        </span>
                    </div>
                </div>
                <div className="col-xs-8">
                    <RDC.Pagination className="pagination pull-right" currentPage={o.config.currentPage} totalPages={o.config.totalPages} onChangePage={this.props.handleChangePage} />
                </div>
                <div className="col-xs-12">
                    <RDC.Table className="table table-bordered table-hover" columns={columns} keys={o.config.keys} dataArray={o.data.page} sortBy={o.config.sortBy} onSort={this.props.handleSort} />
                </div>
                <div className="col-xs-8 col-xs-offset-4">
                    <RDC.Pagination className="pagination pull-right" currentPage={o.config.currentPage} totalPages={o.config.totalPages} onChangePage={this.props.handleChangePage} />
                </div>
            </div>
        );
    }
    handleClick(type, id, e) {
        if (type == "clear") {
            $("input[type=search]").val("");
            this.props.handleSearch("search", "");
        } else {
            this.props.handleClick(type, id, e);
        }
    }
}
