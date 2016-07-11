import React from "react";
//jsx
import Header from "./main/Header";
import Menu from "./main/Menu";
import Footer from "./main/Footer";
import ContentHeader from "./main/ContentHeader";
//vendor
import "admin-lte/dist/css/skins/_all-skins.min";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
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
}
