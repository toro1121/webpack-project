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
            <footer className="main-footer">
				<div className="pull-right hidden-xs">
					<b>Version</b> 
					&nbsp;{_CONFIG._VERSION}
				</div>
				<strong>
					Copyright &copy; 2014-2015&nbsp;
					<a href={_CONFIG._URL_GITHUB} target="_blank">{_CONFIG._NAME_F}</a>
					.&nbsp;
				</strong>
				All rights reserved.
			</footer>
        );
    }
}
