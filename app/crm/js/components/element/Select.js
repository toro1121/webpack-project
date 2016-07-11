import React from "react";
//action
import CompanyActionCreators from "../../actions/CompanyActionCreators";
import TagActionCreators from "../../actions/TagActionCreators";
//store
import CompanyStore from "../../stores/CompanyStore";
import TagStore from "../../stores/TagStore";

let CompanyAction = new CompanyActionCreators({
    type1: "company"
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        let data = this.getData(this.props.type);
        if (!data.length) {
            switch (this.props.type) {
                case "company_id":
                    CompanyAction.data();
                    break;
                case "group":
                case "industry":
                case "career":
                    new TagActionCreators({
                        type1: this.props.type
                    }).data(this.props.type);
                    break;
            }
        }

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            id: this.props.type == "group" ? "parent_id" : this.props.type,
            data: data
        };
    }
    componentWillMount() {
        if (this.props.type == "company_id") {
            CompanyStore.addChangeListener(this.handleChange);
        } else {
            TagStore.addChangeListener(this.handleChange);
        }
    }
    componentWillUnmount() {
        if (this.props.type == "company_id") {
            CompanyStore.removeChangeListener(this.handleChange);
        } else {
            TagStore.removeChangeListener(this.handleChange);
        }
    }
    render() {
        return (
            <select className="form-control" id={this.state.id} value={this.props.value} onChange={this.props.handleChange}>
                <option value="0">- 請選擇 -</option>
                {this.state.data.map((value, key) => {
                    return(
                        <option value={value.id} key={key}>
                            {value.name}
                        </option>
                    );
                })}
            </select>
        );
    }
    handleChange(e) {
        this.setState({
            data: this.getData(this.props.type)
        });
    }
    getData(type) {
        let data = [];
        switch (type) {
            case "company_id":
                data = CompanyStore.getData("select");
                break;
            case "group":
            case "industry":
            case "career":
                data = TagStore.getData(type, "select");
                break;
        }
        return data;
    }
}
