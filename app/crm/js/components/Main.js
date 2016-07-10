import React from 'react';
//jsx
var Header = require('./main/Header');
var Menu = require('./main/Menu');
var Footer = require('./main/Footer');
var ContentHeader = require('./main/ContentHeader');
//vendor
import 'admin-lte/dist/css/skins/_all-skins.min';

module.exports = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                <Header state={this.props.state} />
                <Menu />
                <div className="content-wrapper">
                    <ContentHeader routes={this.props.routes} location={this.props.location} />
                    <section className="content">
                        {this.props.children}
                    </section>
                </div>
                <Footer />
                <div className="control-sidebar-bg"></div>
            </div>
        );
    }
});
