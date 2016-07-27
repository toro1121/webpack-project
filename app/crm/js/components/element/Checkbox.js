import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            className: ""
        };
    }
    render() {
        let label, input;
        if (this.props.id.match(/^cb/)) {
            label = <label htmlFor={this.props.id} className={this.state.className}></label>;
            input = <input type="checkbox" id={this.props.id} onClick={this.handleClick} />;
        } else {
            let checkedNum = 0;
            let className = false;

            if (this.props.data) {
                for (let i = 0; i < this.props.data.length; i++) {
                    for (let j = 0; j < this.props.checkbox.length; j++) {
                        if (this.props.data[i].id == this.props.checkbox[j]) {
                            checkedNum++;
                            break;
                        }
                    }
                }

                if (this.props.id == "all") {
                    className = "";
                    if (checkedNum) {
                        if (this.props.data.length > checkedNum) {
                            className = "checkNotAll";
                        } else if (this.props.data.length == checkedNum) {
                            className = "checkAll";
                        }
                    }
                }
            }
            label = <label htmlFor={this.props.id} className={typeof className === "string" ? className : this.props.className}></label>;
            input = <input type="checkbox" id={this.props.id} onClick={this.handleClick.bind(this, this.props.id, className)} />;
        }
        return (
            <div className="cb">
                {label}
                {input}
            </div>
        );
    }
    handleClick(id, className, e) {
        if (this.props.id.match(/^cb/)) {
            if (this.state.className == "checked") {
                this.setState({
                    className: ""
                });
            } else {
                this.setState({
                    className: "checked"
                });
            }
        } else {
            id = id.split(/\_/).length > 1 ? id.split(/\_/)[1] : id;
            this.props.handleClick("checkbox", id, className);
        }
    }
}
