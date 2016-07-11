import React from "react";
//vendor
// require("jquery-ui.css");
// require("colorpicker.css");

// FIXME: color picker
export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        $(() => {
            // $("#color").colorpicker({
            //     altField: "#color",
            //     parts: ["map", "bar"],
            //     layout: {
            //         map: [0, 0, 1, 1],
            //         bar: [1, 0, 1, 1]
            //     },
            //     part: {
            //         map: {
            //             size: 128
            //         },
            //         bar: {
            //             size: 128
            //         }
            //     }
            // });
        });
    }
    render() {
        return (
            <input type="text" className="form-control" id="color" defaultValue={this.props.value ? this.props.value : "ff0000"} />
        );
    }
}
