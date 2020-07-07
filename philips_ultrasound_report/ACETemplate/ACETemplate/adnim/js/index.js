/// <reference path="jquery.d.ts" />
var Index = (function () {
    function Index(menuJson) {
        this.menulist = new Array();
    }
    Index.prototype.init = function (callback) {
        this.callback = callback;
        HttpAjax.ajaxget("handler/gobalhandler.ashx?_op=getmenu", "", this.initmenu, null, null, null, this);
    };
    Index.prototype.initmenu = function (data, self) {
        if (data.success) {
            var txt;
            var json;
            //
            txt = data.data;
            json = txt;
            for (var i = 0; i < json.length; i++) {
                for (var j = 0; j < json[i].Menu.length; j++) {
                    var m = new Menu(json[i].Menu[j].ID, json[i].Menu[j].Url, json[i].Menu[j].Title);
                    self.menulist.push(m);
                }
            }
            self.callback(json);
            //插入到对象里面
            //插入到列表里面
        }
    };
    Index.prototype.find = function (id) {
        for (var i = 0; i < this.menulist.length; i++) {
            if (this.menulist[i].id == id)
                return this.menulist[i];
        }
        return null;
    };
    return Index;
}());
var Menu = (function () {
    function Menu(id, url, title) {
        this.url = url;
        this.title = title;
        this.id = id;
    }
    return Menu;
}());
//# sourceMappingURL=index.js.map