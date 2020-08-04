var urlApi = 'http://fr.philips.crmclick.com/tagmanage';
var wechatId = 3;
var openid = '';
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return "";
}

var endTime = '', startTime = '', pageStayTime = '';
var preTtypeCode = ''; //上一个页面code
window.onload = function (e) {
    openid = getQueryString('openid')
    // preTtypeCode = localStorage.getItem("preTtypeCode")
    endTime = localStorage.getItem("endTime");
    startTime = localStorage.getItem("preStartTime");

    if (openid && endTime) {
        pageStayTime = endTime - startTime //页面停留时长
        // localStorage.setItem("pageStayTime", pageStayTime) //页面停留时长
        RecordEvent(preTtypeCode, pageStayTime, 'time'); //页面时长埋点
    }

    localStorage.setItem("preStartTime", new Date().getTime())
    localStorage.setItem("endTime", "")
}
// 微信公众号网页中页面的加载事件
window.addEventListener('pageshow',
    function () {
        openid = getQueryString('openid')
        startTime = localStorage.getItem("preStartTime");
        localStorage.setItem("preStartTime", new Date().getTime())
    }
);

// 页面时长/页面点击数据埋点
var RecordEvent = function (typeCode, recordValue) {
    if (openid) {
        this.pageTime(typeCode, recordValue);
        this.btnEvent(typeCode, recordValue);
    }
}

// 首页页面时长
var pageTime = function (typeCode, recordValue) {
    var endTimeBtn = new Date().getTime()
    var indexStayTime = endTimeBtn - startTime
    if (indexStayTime && recordValue != '114') {
        var settings = {
            "url": urlApi + "/api/tRecord/Event",
            "method": "POST",
            "async": false,
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "openid": openid,
                "wechatId": wechatId,
                "typeCode": '1008',
                "recordValue": indexStayTime,
                "ext1": 'time',
                "ext2": recordValue, //按钮
                "ext3": typeCode,
            }),
        };

        $.ajax(settings).done(function (response) {

        });
    }
}
// 按钮事件
var btnEvent = function (typeCode, recordValue) {
    var settings = {
        "url": urlApi + "/api/tRecord/Event",
        "method": "POST",
        "async": false,
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "openid": openid,
            "wechatId": wechatId,
            "typeCode": typeCode,
            "recordValue": recordValue,
            "ext1": '',
            "ext2": '',
        }),
    };

    $.ajax(settings).done(function (response) {

    });
}
