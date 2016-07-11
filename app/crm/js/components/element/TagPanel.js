import React from "react";
import { Link } from "react-router";
//action
import TagActionCreators from "../../actions/TagActionCreators";
//store
import TagStore from "../../stores/TagStore";
//jsx
import Checkbox from "../element/Checkbox";

let TagAction = new TagActionCreators({
    type1: "tag"
});

// TODO: tag panel.
export default class extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            data: TagStore.getData("all"),
            panel: TagStore.getPanel()
        };
    }
    componentWillMount() {
        TagStore.addChangeListener(this.handleChange);
        TagAction.data("all");
    }
    componentWillUnmount() {
        TagStore.removeChangeListener(this.handleChange);
    }
    render() {
        return (
            <ul className="tagPanel" style={this.state.panel.style}>
                <li onClick={this.handleClick.bind(this, "close")}>
                    <h5>
                        <i className="fa fa-tags"></i>
                        &nbsp;貼標籤
                    </h5>
                </li>
                <li>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-search"></i>
                        </span>
                        <input type="search" className="form-control" />
                        <span className="input-group-addon link">
                            <i className="fa fa-close"></i>
                        </span>
                    </div>
                </li>
                <div className="body">
                    {this.state.data.map((value, key) => {
                        return(
                            <li key={key}>
                                <span><Checkbox id={"checkbox_" + value.id} className={value.checked ? "checked" : ""} handleClick={this.handleClick} /></span>
                                <span>{value.name}</span>
                            </li>
                        );
                    })}
                </div>
                <li>
                    <Link to="tagGroupAdd">建立標籤</Link>
                </li>
                <li>
                    <Link to="tagGroup">管理標籤</Link>
                </li>
                <li>
                    <a href="javascript:void(0)" onClick={this.handleClick.bind(this, "save")}>套用</a>
                </li>
            </ul>
        );
    }
    handleChange(e) {
        this.setState({
            data: TagStore.getData("all"),
            panel: TagStore.getPanel()
        });
    }
    handleClick(type, e) {
        switch (type) {
            case "save":
                // TODO: client add tag.
                console.log("save");
            case "close":
                let o = this.state;
                o.panel.style.display = "none";
                this.setState(o);
                break;
        }
    }
}
