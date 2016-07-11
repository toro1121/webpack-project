import assign from "object-assign";

export default function() {
    let o = assign({}, _CONFIG, {
        _NAME_F: "Toro",
        _NAME_S: "T",
        _VERSION: "0.1.0",

        // dataTable一頁幾筆資料
        _NUM_PAGE: 15
    });

    // switch (o._ENV) {
    //     case "develop":
    //         o._HOST = "192.168.99.99";
    //         break;
    //     case "deploy":
    //         o._HOST = "192.168.99.99";
    //         break;
    //     default:
    // }

    o._HOST = "crm.test.com";
    o._URL_API = "//" + o._HOST + "/api";

    return o;
}
