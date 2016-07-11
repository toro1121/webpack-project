import React from "react";
import { Link } from "react-router";
// action
import TagActionCreators from "../../actions/TagActionCreators";
// store
import ClientStore from "../../stores/ClientStore";
import TagStore from "../../stores/TagStore";

let TagAction = new TagActionCreators({
    type1: "tag"
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            data: TagStore.getData("all")
        };
    }
    componentWillMount() {
        TagStore.addChangeListener(this.handleChange, "menu");
        TagAction.data("all");
    }
    componentWillUnmount() {
        TagStore.removeChangeListener(this.handleChange, "menu");
    }
    render() {
        let data = this.state.data;
        let tmp = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === data[i].parent_id) {
                tmp.push(data[i]);
            }
        }
        data = tmp;

        let s = (color) => {
            return {
                background: {
                    background: color
                },
                color: {
                    color: color
                }
            };
        }

        //無標籤數量
        tmp = ClientStore.getData("select");
        let noneTagNum = 0;
        for (let i in tmp) {
            if (!tmp[i].tag.length) {
                noneTagNum++;
            }
        }
        return (
            // TODO: 直接更改標籤顏色
            <ul className="sidebar-menu tag">
                <li className="header">
                    <button className="btn btn-default active">
                        <i className="fa fa-tag"></i>
                    </button>
                    {/* TODO: favorite tag in the menu.*/}
                    <button className="btn btn-default">
                        <i className="fa fa-star"></i>
                    </button>
                </li>
                <li>
                    <i className="fa"></i>
                    <span>
                        <Link to={"/main/client?id=none"} style={{color:"#999"}}>(無標籤)</Link>
                    </span>
                    <small className="label pull-right" style={{background:"#ccc"}}>{noneTagNum}</small>
                </li>
                {data.map((value, key) => {
                    let style = s("#" + value.color);
                    let query = {id:value.id};
                    return (
                        <li className={value.child.length ? "treeview" : ""} key={key}>
                            <i className={"fa fa-tag" + (value.child.length ? "s" : "")} style={style.color}></i>
                            <span>
                                <Link to={"/main/client"} query={query}>{value.name}</Link>
                            </span>
                            <small className="label pull-right" style={style.background}>{value.client.length}</small>
                            <ul className="treeview-menu">
                                {value.child.map((v, k) => {
                                    let style = s("#" + v.color);
                                    let query = {id:v.id};
                                    return (
                                        <li key={k}>
                                            <i className="fa"></i>
                                            <i className="fa fa-tag" style={style.color}></i>
                                            <span>
                                            <Link to={"/main/client"} query={query}>{v.name}</Link>
                                            </span>
                                            <small className="label pull-right" style={style.background}>{v.client.length}</small>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        );
    }
    handleChange(e) {
        this.setState({
            data: TagStore.getData("all")
        });
    }
}
