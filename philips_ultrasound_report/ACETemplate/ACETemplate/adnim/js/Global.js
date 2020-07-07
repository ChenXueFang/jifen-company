
//对象的
jQuery.fn.deleteproperty = function (params, delparams) {
    jQuery.each(delparams, function (i1, val1) {
        try {
            eval("delete params." + i1);
        }
        catch (e) { }
        //text = text + "Key:" + i + ", Value:" + val;  
    })
};

//插件方式
jQuery.myPlugin = {
    //对象上移除
    deleteproperty: function (params, delparams) {
        jQuery.each(delparams, function (i1, val1) {
            try {
                eval("delete params." + i1);
            }
            catch (e) { }
            //text = text + "Key:" + i + ", Value:" + val;  
        })
    },
    //移除属性，产生新对象
    removeproperty: function (params, delparams) {
        var news = {};
        jQuery.each(params, function (i, val) {
            var flag = false;
            jQuery.each(delparams, function (i1, val1) {
                if (i == i1) {
                    flag = true;
                }
                //text = text + "Key:" + i + ", Value:" + val;  
            });
            if (!flag) {
                eval("news." + i + "=val");
            }
        });
        return news;
    }
    //
    ,
    errorgrit: function (title, text) {
        $.gritter.add({
            title: title,
            text: text,
            class_name: 'gritter-error ' + ' gritter-light',
            time: '5000',
        });

        // return false;
    },
    successgrit: function (title, text) {

        $.gritter.add({
            title: title,
            text: text,
            class_name: 'gritter-success ' + ' gritter-light',
            time: '5000',

        });
        // return false;
    }

}
$.extend($.myPlugin, {
    arraymerge: function (array1, array2, protery) {
        for (var i = 0; i < array2.length; i++) {
            var flag = false
            for (var z = 0; z < array1.length; z++) {
                if (eval("array1[z]." + protery) == eval("array2[i]." + protery)) {
                    flag = true;
                    break;
                }
            }
            if (!flag)
                array1.push(array2[i]);
        }
    }

})

$.extend($.myPlugin, {
    arrayremove: function (array, protery, val) {
        for (var i = 0; i < array.length; i++) {
            var flag = false
            if (eval("array[i]." + protery) == val) {
                flag = true;
                array.splice(i, 1);

            }
        }

    }
}

);



var mycustomfunction = {
    getgridselecthtml: function (data, key, value) {
        var txt = "";
        for (var y = 0; y < data.length; y++) {
            var tt = data[y];
            var text = "";
            var vals = "";
            jQuery.each(tt, function (i, val) {
                if (i == key) {
                    vals = val;
                }
                if (i == value)
                    text = val;
                //text = text + "Key:" + i + ", Value:" + val;  
            });
            txt += "<option value='" + vals + "'>" + text + "</option>"
        }
        return "<select>" + txt + "</select>";

    }
    ,
    //获取外键内容
    getforeignvalue: function (data, key, value, defaultvalue) {
        if (data == null)
            return defaultvalue;
        for (var y = 0; y < data.length; y++) {
            var tt = data[y];
            var text = "";
            var vals = "";
            jQuery.each(tt, function (i, val) {
                if (i == key) {
                    vals = val;
                }
                if (i == value)
                    text = val;
                //text = text + "Key:" + i + ", Value:" + val;  
            });
            if (vals == defaultvalue) {
                return text;
            }
        }
        return defaultvalue;

    }
    ,
    vation:{
        vationString:function(value, colname, minlength, maxlength) {

            var n = $.trim(value);
            if (n.length < minlength || n.length > maxlength) {
                return "colname["+colname+"] length between "+minlength+" and "+maxlength;

            }
            return "";
        }
    }
    ,
    //移除属性，生成新对象
    removeproperty :function (params, delparams) {
    var news={};
    jQuery.each(params, function(i, val) {
        var flag=false;
        jQuery.each(delparams, function(i1, val1) {
            if(i == i1) {
                flag = true;
            }
            //text = text + "Key:" + i + ", Value:" + val;  
        });
        if(!flag){
            eval("news."+i+"=val");
        }
    });
    return news;
}
    ,
    //元对象删除属性
    deleteproperty:function (params, delparams) {
        jQuery.each(delparams, function(i1, val1) {
            try {
                eval(" delete params." + i1);
            }
            catch (e) { }
            //text = text + "Key:" + i + ", Value:" + val;  
        });

}
   
}




