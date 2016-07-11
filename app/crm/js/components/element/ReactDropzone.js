import React from "react";
import Dropzone from "react-dropzone";
//custom
import config from "../../config";

let _CONFIG = config();

export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let opt = this.props.options;
        let photo = _CONFIG._URL_API + "/file/" + (opt.file && opt.file.length ? opt.file[0].id + "?" + opt.file[0].name : "false");
        return (
            <div className="dropzone">
                <div className="uploader">
                    <Dropzone multiple={typeof opt.multiple == "boolean" ? opt.mutiple : false} onDrop={this.props.handleDrop}>
                        <div>把圖片拖曳至此，或是點擊上傳圖片。</div>
                    </Dropzone>
                </div>
                {opt.multiple ?
                <div className="imageShowArea"></div>
                :
                <img src={photo} />}
            </div>
        );
    }
    handleChange(e) {}
    handleClick(type, id, e) {}
}
