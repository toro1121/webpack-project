import React from "react";
import Select from "react-select";
//store
import TagStore from "../../stores/TagStore";
//vendor
import "react-select/dist/react-select.min.css";

// TODO: 共用
export default class extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            options: this.getOptions(TagStore.getData("all"))
        };
    }
    componentWillMount() {
        TagStore.addChangeListener(this.handleChange, "menu");
    }
    componentWillUnmount() {
        TagStore.removeChangeListener(this.handleChange, "menu");
    }
    render() {
        let value = [];
        if (this.props.value) {
            for (let key in this.props.value) {
                value.push(this.props.value[key].id);
            }
        }
        return (
            <Select placeholder="標籤" multi options={this.state.options} value={value} />
        );
    }
    handleChange(e) {
        this.setState({
            options: this.getOptions(TagStore.getData("all"))
        });
    }
    getOptions(data) {
        let v = [];
        for (let key in data) {
            v.push({
                value: data[key].id,
                label: data[key].name
            });
        }
        return v;
    }
}
