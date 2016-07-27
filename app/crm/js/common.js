import ReactDOM from "react-dom";
//dispatcher
import AppDispatcher from "./dispatcher/AppDispatcher";

class common {
    stateMerge(e) {
        let field = $(e.target).attr("id");
        let merge = {};
        merge[field] = e.target.value;
        return merge;
    }
    getInputData(data) {
            let tmp = {};
            for (var key in data) {
                let x = data[key].tagName ? data[key] : ReactDOM.findDOMNode(data[key]);
                x = x.tagName.match(/INPUT|SELECT|TEXTAREA/) ? x : $(x).find("input, select")[0];
                if (x.tagName.match(/INPUT|SELECT|TEXTAREA/)) {
                    tmp[key] = x.type.match(/checkbox/) ? x.checked : x.value.trim();
                }
            }
            return tmp;
        }
        // FIXME: 更新時需要清理sessionStorage
    storageInit(type) {
        if (!window.sessionStorage[type]) {
            window.sessionStorage.setItem(type, JSON.stringify({}));
        }
    }
    storageLoad(type) {
        for (var i in JSON.parse(window.sessionStorage[type]));
        return i ? JSON.parse(window.sessionStorage[type]) : false;
    }
    storageSave(type, data) {
        window.sessionStorage.setItem(type, JSON.stringify(data));
    }
    dateFormat(date, format) {
        date = new Date(date);
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        let week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(format)) {
            format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return format;
    }
}

export default new common();
