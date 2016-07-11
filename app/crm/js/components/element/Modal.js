import React from "react";
//action
import AppActionCreators from "../../actions/AppActionCreators";
//store
import { Store as AppStore } from "../../stores/AppStore";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = AppStore.getModal();
    }
    componentWillMount() {
        AppStore.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
        AppStore.removeChangeListener(this.handleChange);
    }
    render() {
        return this.state.display ? (
            <div className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClick}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" dangerouslySetInnerHTML={{__html: this.state.title}}></h4>
                        </div>
                        <div className="modal-body">
                            <p>{this.state.message}</p>
                        </div>
                        <div className="modal-footer">
                            {this.state.button.map((value, key) => {
                                return (
                                    <button type="button" className={"btn " + value.class} onClick={value.fn} key={key}>{value.name}</button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        ) : <div />;
    }
    handleChange(e) {
        this.setState(AppStore.getModal());
    }
    handleClick(type, e) {
        AppActionCreators.modal({
            display: false
        });
    }
}
