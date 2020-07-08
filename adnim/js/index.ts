/// <reference path="jquery.d.ts" />

class Index {
    menu: string;
     menulist: Array<Menu>;
    callback: any;
    constructor(menuJson: string) {
        this.menulist = new Array<Menu>();
    }

    init(callback) {
        this.callback = callback;
        HttpAjax.ajaxget("handler/gobalhandler.ashx?_op=getmenu", "", this.initmenu, null, null, null, this);
    }
    initmenu(data, self) {
        if (data.success) {
            var txt: any;
            var json: Array<any>;
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
       
    }
    find(id: string): Menu {

        for (let i = 0; i < this.menulist.length; i++) {
            if (this.menulist[i].id == id)
                return this.menulist[i];

        }
        return null;
       
    }

}
class Menu {
    url: string;
    title: string;
    id: string;
    constructor(id: string,url: string, title: string) {
        this.url = url;
        this.title = title;
        this.id = id;
    }

}