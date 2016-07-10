import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    IndexRoute,
    hashHistory
}
from 'react-router';
import '../sass/main';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="wrapper">
                {this.props.children}
            </div>
        );
    }
}

import Example1 from './components/1';
import Example2 from './components/2';
import Example3 from './components/3';


ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="example1" component={Example1} />
            <Route path="example2" component={Example2} />
            <Route path="example3" component={Example3} />
        </Route>
    </Router>
), document.getElementsByTagName('section')[0]);
