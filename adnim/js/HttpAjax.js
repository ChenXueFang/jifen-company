var HttpAjax = (function () {
    function HttpAjax() {
    }
    HttpAjax.ajaxget = function (url, params, callback, errorcallback, completecallback, ajaxneedload, self) {
        if (ajaxneedload == null || ajaxneedload == undefined) {
            ajaxneedload = true;
        }
        $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            data: params,
            success: function (data) {
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
                if (callback != null)
                    callback(data, self);
            },
            global: ajaxneedload,
            error: function (xhr) {
                if (ajaxneedload) {
                    console.log("xhr");
                    alert("网络故障");
                }
                if (errorcallback != null)
                    errorcallback(xhr);
            },
            complete: function () {
                if (completecallback != null)
                    completecallback();
            }
        });
    };
    HttpAjax.ajaxpost = function (url, params, callback, errorcallback, completecallback, ajaxneedload, self) {
        if (ajaxneedload == null || ajaxneedload == undefined) {
            ajaxneedload = true;
        }
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data: params,
            success: function (data) {
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
                if (callback != null)
                    callback(data, self);
            },
            global: ajaxneedload,
            error: function (xhr) {
                if (ajaxneedload) {
                    console.log("xhr");
                    alert("网络故障");
                }
                if (errorcallback != null)
                    errorcallback(xhr);
            },
            complete: function () {
                if (completecallback != null)
                    completecallback();
            }
        });
    };
    return HttpAjax;
}());
//# sourceMappingURL=HttpAjax.js.map