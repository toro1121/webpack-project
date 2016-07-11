import React from "react";
import { Link, hashHistory } from "react-router";
//action
import CompanyActionCreators from "../../actions/CompanyActionCreators";
//stores
import CompanyStore from "../../stores/CompanyStore";
import UserStore from "../../stores/UserStore";
//custom
import _COMMON from "../../common";
//jsx
import Select from "../element/Select";

let CompanyAction = new CompanyActionCreators({
    type1: "company"
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = CompanyStore.getData(false, true);
    }
    componentWillMount() {
        CompanyStore.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
        CompanyStore.removeChangeListener(this.handleChange);
    }
    render() {
        return (
            <div className="row">
	            <div className="col-xs-12">
					<div className="box">
						<div className="box-header with-border">
							<button type="submit" className="btn btn-default btn-sm" onClick={this.handleClick}>
								回上一頁
							</button>
							<h3 className="box-title"></h3>
						</div>
						<form className="form-horizontal" onSubmit={this.handleSubmit}>
							<div className="box-body">
                                <div className="col-sm-6">
		                            <div className="form-group">
		                                <label htmlFor="industry" className="col-sm-2 control-label">產業</label>
		                                <div className="col-sm-10">
			                                <Select type="industry" ref="industry" />
		                                </div>
		                            </div>
	                            </div>
                                <div className="col-sm-6">
									<div className="form-group">
										<label htmlFor="name" className="col-sm-2 control-label">
											<span className="require">*</span>
											名稱
										</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="name" placeholder="名稱" ref="name" />
										</div>
		                            </div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<label htmlFor="ename" className="col-sm-2 control-label">英文名稱</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="ename" placeholder="英文名稱" ref="ename" />
										</div>
		                            </div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<label htmlFor="sname" className="col-sm-2 control-label">簡稱</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="sname" placeholder="簡稱" ref="sname" />
										</div>
		                            </div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<label htmlFor="number" className="col-sm-2 control-label">統一編號</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="number" placeholder="統一編號" ref="number" />
										</div>
		                            </div>
								</div>
								<div className="col-sm-3">
									<div className="form-group">
										<label htmlFor="capital" className="col-sm-4 control-label">資本額</label>
										<div className="col-sm-8">
											<input type="text" className="form-control" id="capital" placeholder="資本額" ref="capital" />
										</div>
		                            </div>
								</div>
								<div className="col-sm-3">
									<div className="form-group">
										<label htmlFor="scale" className="col-sm-4 control-label">人力規模</label>
										<div className="col-sm-8">
											<input type="text" className="form-control" id="scale" placeholder="人力規模" ref="scale" />
										</div>
		                            </div>
								</div>
                                <div className="col-sm-3">
									<div className="form-group">
										<label htmlFor="phone" className="col-sm-4 control-label">電話</label>
										<div className="col-sm-8">
											<input type="text" className="form-control" id="phone" placeholder="電話" ref="phone" />
										</div>
		                            </div>
								</div>
								<div className="col-sm-3">
									<div className="form-group">
										<label htmlFor="fax" className="col-sm-4 control-label">傳真</label>
										<div className="col-sm-8">
											<input type="text" className="form-control" id="fax" placeholder="傳真" ref="fax" />
										</div>
		                            </div>
								</div>
                                <div className="col-sm-6">
									<div className="form-group">
										<label htmlFor="email" className="col-sm-2 control-label">Email</label>
										<div className="col-sm-10">
											<input type="mail" className="form-control" id="email" placeholder="Email" ref="email" />
										</div>
		                            </div>
								</div>
								<div className="col-sm-12">
									<div className="form-group">
										<label htmlFor="address" className="col-sm-1 control-label">地址</label>
										<div className="col-sm-11">
											<input type="text" className="form-control" id="address" placeholder="地址" ref="address" />
										</div>
		                            </div>
								</div>
								<div className="col-sm-12">
									<div className="form-group">
										<label htmlFor="website" className="col-sm-1 control-label">網址</label>
										<div className="col-sm-11">
											<input type="text" className="form-control" id="website" placeholder="網址" ref="website" />
										</div>
		                            </div>
								</div>
							</div>
							<div className="box-footer">
                                <div className="col-sm-12">
									<div className="form-group">
										<label htmlFor="remark" className="col-sm-1 control-label">備註</label>
										<div className="col-sm-11">
											<textarea className="form-control" rows="5" placeholder="備註" ref="remark"></textarea>
										</div>
									</div>
								</div>
							</div>
							<div className="box-footer">
								<button type="submit" className="btn btn-info btn-sm pull-right">
									新增
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
        );
    }
    handleChange(e) {
        this.setState(CompanyStore.getData());
        if (this.state.bool) {
            setTimeout(() => {
                CompanyAction.modal({
                    display: true,
                    message: this.state.message,
                    button: [{
                        type: "ok",
                        fn: () => {
                            hashHistory.push("/main/company");
                            CompanyAction.modal({
                                display: false
                            });
                        }
                    }]
                });
            }, 1);
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let data = _COMMON.getInputData(this.refs);
        if (data.name) {
            data.user_id = UserStore.getData("profile").data.id;
            CompanyAction.add(data);
        }
    }
    handleClick(e) {
        hashHistory.push("/main/company");
    }
}
