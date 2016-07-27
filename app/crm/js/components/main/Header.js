import React from "react";
import { Link } from "react-router";
//actions
import UserActionCreators from "../../actions/UserActionCreators";
//store
import UserStore from "../../stores/UserStore";
//custom
import config from "../../config";
import _COMMON from "../../common";

let UserAction = new UserActionCreators({
    type1: "user"
});
let _CONFIG = config();

export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // TODO: jquery => react
        $(() => {
            $("[data-toggle=offcanvas]").on("click", (e) => {
                if ($(window).width() > (768 - 1)) {
                    $("body").toggleClass("sidebar-collapse");
                } else {
                    if ($("body").hasClass("sidebar-open")) {
                        $("body").removeClass("sidebar-open");
                        $("body").removeClass("sidebar-collapse")
                    } else {
                        $("body").addClass("sidebar-open");
                    }
                }
            });
            $(".content-wrapper").click(() => {
                if ($(window).width() <= (768 - 1) && $("body").hasClass("sidebar-open")) {
                    $("body").removeClass("sidebar-open");
                }
            });
            if ($("body").hasClass("fixed") && $("body").hasClass("sidebar-mini")) {
                $(".main-sidebar").hover(() => {
                    if ($("body").hasClass("sidebar-mini") && $("body").hasClass("sidebar-collapse") && $(window).width() > 768 - 1) {
                        $("body").removeClass("sidebar-collapse").addClass("sidebar-expanded-on-hover");
                    }
                }, () => {
                    if ($("body").hasClass("sidebar-mini") && $("body").hasClass("sidebar-expanded-on-hover") && $(window).width() > 768 - 1) {
                        if ($("body").hasClass("sidebar-expanded-on-hover")) {
                            $("body").removeClass("sidebar-expanded-on-hover").addClass("sidebar-collapse");
                        }
                    }
                });
            }
        });
    }
    render() {
        if (this.props.state.data) {
            let photo = _CONFIG._URL_API + "/file/" + (this.props.state.data.files && this.props.state.data.files.length ? this.props.state.data.files[0].id + "?" + this.props.state.data.files[0].name : false);
            let date = this.props.state.data.created_at ? _COMMON.dateFormat(this.props.state.data.created_at, "yyyy/MM/dd") : null;
            return (
                <header className="main-header">
                    <Link to={"/main"} className="logo">
                        <span className="logo-mini">
                            <b>{_CONFIG._NAME_S}</b>
                            CRM
                        </span>
                        <span className="logo-lg">
                            <b>{_CONFIG._NAME_F}</b>
                            CRM
                        </span>
                    </Link>
                    <nav className="navbar navbar-static-top" role="navigation">
                        <a href="javascript:void(0)" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                            <span className="sr-only">Toggle navigation</span>
                        </a>
                        <div className="navbar-custom-menu">
                            <ul className="nav navbar-nav">
                                <li className="dropdown user user-menu">
                                    <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">
                                        <img className="user-image" src={photo} />
                                        <span className="hidden-xs">{this.props.state.data.name}</span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="user-header">
                                            <img className="img-circle" src={photo} />
                                            <p>
                                                {this.props.state.data.name}
                                                <small>註冊日期 {date}</small>
                                            </p>
                                        </li>
                                        <li className="user-footer">
                                            <div className="pull-left">
                                                <Link to={"/main/profile"} className="btn btn-default btn-flat">帳號管理</Link>
                                            </div>
                                            <div className="pull-right">
                                                <a href="javascript:void(0)" className="btn btn-default btn-flat" onClick={this.handleClick}>登出</a>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            );
        } else {
            return (<div />);
        }
    }
    handleClick(e) {
        UserAction.userLogout();
    }
}
