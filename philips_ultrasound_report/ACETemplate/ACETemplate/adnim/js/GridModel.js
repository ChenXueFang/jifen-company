$.grid = {
    rowheight: 31,
    heigth: 391
}
//GRID string转换
var stringformatvalue = {};
function stringFomart(cellvalue, options, cell) {

    var n = "rowid" + options.rowId + options.colModel.name;
    eval("$.extend(stringformatvalue, {" + n + ":cellvalue  })");
    if (cellvalue == null)
        return "";
    if (cellvalue.length > 255)
        return cellvalue.substr(0, 255) + "..." + "<a  vn='" + n + "'  class='showall' gid='" + options.gid + "' rowid=" + options.rowId + " pos=" + options.pos + ">查看所有内容</a>";
    else
        return cellvalue;
}
$(document).on('click', '.showall', function () {
    unstringFomart1($(this).attr("gid"), $(this).attr("rowid"), $(this).attr("pos"), $(this).attr("vn"));
});
function unstringFomart1(gid, rowid, pos, n) {
    var v = eval("stringformatvalue." + n + "");
    // alert($("#" + gid).find("tr[id=" + rowid + "]").find("td").eq(pos).text());
    $("#" + gid).find("tr[id=" + rowid + "]").find("td:eq(" + pos + ")").text(v);

}
function unstringFomart(gid, rowid, pos) {
    var v = eval("stringformatvalue.rowid" + rowid.rowId + rowid.colModel.name);
    // alert($("#" + gid).find("tr[id=" + rowid + "]").find("td").eq(pos).text());
    //  $("#" + gid).find("tr[id=" + rowid + "]").find("td:eq(" + pos + ")").text(v);

    return v;

}


$.jgrid = $.extend($.jgrid, ajaxafter = function (data, data1, data2) {
    if (data != null) {
        try {
            if (!data.success)
                if (data.url != null && data.url != "") {
                    if (!window.parent) {
                        window.parent.location.href = "/adnim/login.aspx";
                    }
                    window.location.href = "/adnim/login.aspx";
                    //$.myApp.mainView.router.reloadPage('login.html');
                    return;
                }
        }
        catch (e) { }
    }



});



Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "H+": this.getHours(), //小时     
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


//加入输出sql
$.SearchToSql = function (obj) {
    var sql = [];
    var s = new getSearch();
    for (var v in obj) {
        var n=obj[v];
        switch (n.data) {
            case "string":
            case "string":
                if (n.value) {
                    s.fiters.rulesAdd(n.name, n.op, n.value);
                }
                break;
            case "select":
                if (n.value) {
                    if (n.value instanceof Array) {
                        if(n.value.length>0)
                            s.fiters.rulesAdd(n.name, 'in', n.value.join(","))
                        }
                    else
                        s.fiters.rulesAdd(n.name, n.op, n.value);
                }
                 
                break;
            case "cascader":
                if (n.value != null && n.value.length>0)
                    s.fiters.rulesAdd(n.name, n.op, n.value[n.value.length-1]);
                break;
            case "date":
                if (n.value != null && n.value.length == 2 && n.value[0] != null && n.value[1] != null) {

                    if (n.value[0].Format("yyyy-MM-dd") == n.value[1].Format("yyyy-MM-dd")) {
                        s.fiters.rulesAdd(n.name, "=", n.value[0].Format("yyyy-MM-dd"));
                    }
                    else {
                        s.fiters.rulesAdd(n.name, ">=", n.value[0].Format("yyyy-MM-dd"));
                        s.fiters.rulesAdd(n.name, "<", n.value[1].Format("yyyy-MM-dd"));
                    }
                }
                break;

            case "bool":
                if (n.value != null && n.value !== "") {
                    if (n.value == true) {
                        s.fiters.rulesAdd(n.name, "=", true);
                    }
                }
                break;
            case "bool1":
                if (n.value != null && n.value !== "") {
                    if (n.value == true) {
                        s.fiters.rulesAdd(n.name, "=", true);
                    }
                    else
                        s.fiters.rulesAdd(n.name, "=", false);
                }
                break;


        }
       
    }
    return s.fiters;

}