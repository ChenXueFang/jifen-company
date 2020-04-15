// var domainUrl = "http://hr.crmclick.com";//测试站
var domainUrl = "";  //正式站
// 接收页面传过来的参数
function request(paras) {
    var url = decodeURI(location.href);
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}
//定义接收到的参数
var ListPageId = request("prePageid"); //接收上一个页面的pageid

$(document).ready(function () {
    // 跳转栏点击边框样式
    // $(".article-button a").click(function () {
    //     $(".article-button a").css({ "border": "1px dashed #000" }).siblings().css({ "border": "none" });
    // });

    // 获取blog
    getBlog();
    // 获取跳转栏链接
    getPreNext();

    // 跳转栏BLOG HOME PAGE 按钮埋点
    $(".blogHomeBtn").click(function () {
        userLinkRecord(hrpageid, 'button', 'blogDetail-blogHomeBtn')
    })

    // 跳转栏上一篇 按钮埋点
    $(".preBtn").click(function () {
        userLinkRecord(hrpageid, 'button', 'blogDetail-preBtn')
    })

    // 跳转栏下一篇 按钮埋点
    $(".nextBtn").click(function () {
        userLinkRecord(hrpageid, 'button', 'blogDetail-nextBtn')
    })

    // 底部Personal Information 按钮埋点
    $(".personalInformationBtn").click(function () {
        userLinkRecord(hrpageid, 'button', 'personalInformationBtn')
    })

    // 底部Career Site Cookie Settings 按钮埋点
    $(".cookieSettingsBtn").click(function () {
        userLinkRecord(hrpageid, 'button', 'cookieSettingsBtn')
    })

    // 底部Personal Information 按钮埋点
    $(".personalInformationBtn").click(function () {
        userLinkRecord(hrpageid, 'button', 'personalInformationBtn')
    })


})


// 随机获取数据
function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

// 删除数组中某一个数据
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

// 获取推荐的blog
function getBlog() {
    let data = {
        pageSize: 100,
        pageIndex: 1,
        sortName: "PageId",
        sortOrder: "asc"
    }
    $.ajax({
        type: "post",
        url: domainUrl + "/hrapi/api/Page/GetBlogListBySC",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: 'JSON',
        success: function (res) {
            
            if (res.rows.length == 0) {
                return;
            }
            let blogDdata = res.rows;
            for (var k = 0; k < blogDdata.length; k++) {
                // 当前博客
                if(blogDdata[k].PageId==hrpageid){
                    blogDdata.remove(blogDdata[k])
                }
            }
            let data = getRandomArrayElements(blogDdata, 3);
            let html = "";
            for (var i = 0; i < data.length; i++) {
                // 博客类型
                var articleType = "";
                if (data[i].ArticleType == "01") {
                    articleType = "员工故事";
                } else if (data[i].ArticleType == "02") {
                    articleType = "职场建议";
                }
                // 跳转路径
                if(data[i].SeoUrl){
                    urlBlog = data[i].SeoUrl
                }else{
                    urlBlog = data[i].PageCode 
                }
                // 博客日期
                var blogTime = data[i].CreatedTime.substring(0, 10);

                html += '<li class="col-lg-4 col-md-6 col-sm-12">' +
                    '<div class="blog-list-item">' +
                    '<a class="blog-list-item-link au-target" href="'
                    + urlBlog + '.html">' +
                    '<div class=" sc-content">' +
                    '<img class="img-fluid au-target ae-img" src="'
                    + data[i].ListImg + '">' +
                    '</div>' +
                    '<div class="information au-target">' +
                    '<div class="article-info">' +
                    '<div class="info-header row">' +
                    '<p class="blogType col-lg-5 col-md-5 col-sm-12">' + articleType + '</p>' +
                    '</div>' +
                    '<div class="article-name sc-content" style="word-break: break-word;">'
                    + data[i].ListTitle +
                    '</div>' +
                    '<div class="article-description sc-content" style="word-break: break-word;">' +
                    '<p>' + data[i].ListDesc +
                    '</p></div></div></div></a></div></li>'
            }
            $(".blogList").html(html)
        },
        error: function (errors) {
            
        }
    });
}

//跳转栏接口
function getPreNext() {
    let data = {
        pageId: hrpageid,
        pageSize: 1,
        pageIndex: 1
    }
    $.ajax({
        type: "post",
        url: domainUrl + "/hrapi/api/Page/GetPevNextBlog",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: 'JSON',
        success: function (res) {
            if (res.state == 1) {
                let prePath = res.data.prveBolg;
                let nextPath = res.data.nextBolg;
                // 员工博客主页
                $(".blogHomeBtn").attr("href", '/blog.html');
                // 上一篇
                if (prePath) {
                    $(".article-previous").css({ "display": "block" }).attr("href", domainUrl + prePath + '.html');
                } else {
                    $(".article-previous").css({ "display": "none" });
                }
                // 下一篇
                if (nextPath) {
                    $(".article-next").css({ "display": "block" }).attr("href", domainUrl + nextPath + '.html');
                } else {
                    $(".article-next").css({ "display": "none" });
                    $(".article-previous").css({ "float": "right" });
                }
            }
        },
        error: function (errors) {

        }
    });
}

