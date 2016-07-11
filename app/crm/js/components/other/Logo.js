import React from "react";
//custom
import config from "../../config";

let _CONFIG = config();

export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="login-logo">
				<a href="#/">
					<b>{_CONFIG._NAME_F}</b>
					CRM
				</a>
			</div>
        );
    }
}
