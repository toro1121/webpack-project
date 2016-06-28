import React from 'react';

import '../../sass/1';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
	        <nav className="example1">
	            <ul>
	                <li><a href="javascript:void(0)">LINK 1</a></li>
	                <li><a href="javascript:void(0)">LINK 2</a></li>
	                <li><a href="javascript:void(0)">LINK 3</a></li>
	                <li><a href="javascript:void(0)">LINK 4</a></li>
	                <li><a href="javascript:void(0)">LINK 5</a></li>
	            </ul>
	        </nav>
        );
    }
}
