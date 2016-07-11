import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <p className="login-box-msg" dangerouslySetInnerHTML={{__html: this.props.message}}></p>
        );
    }
}
