var blogArticleType = "", blogList = "", urlBlog = "", articleType = "", listState = "";
$(function () {
    // 获取轮播图
    getCarouse();

    // 获取blog
    getBlog();

    // 菜单按钮
    $(".menuBtn").click(function (event) {
        event.stopPropagation();//设置阻止冒泡实现点击空白处不影响
        if (listState) {
            $(".options").css({ "display": "none" });//内容隐藏
            listState = ""
        } else {
            $(".options").css({ "display": "block" });//内容显示
            listState = 1
        }
        if (!blogList) {
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
                    if (res.rows && res.rows.length == 0) {
                        $('.more').css({ "display": "none" })
                        return;
                    }
                    // 显示更难多
                    total = res.rows.length;
                    if (pageSize > total) {
                        $('.more').css({ "display": "none" })
                    }
                    blogList = res.rows;
                },
                error: function (errors) {

                }
            });
        }
    });
    $(".options").click(function (event) {
        event.stopPropagation();//设置阻止冒泡实现点击空白处不影响
    });
    // 点击空白处的方法
    $(document).click(function () {
        $(".options").css({ "display": "none" });//内容隐藏
    });

    // 点击下拉列表，改变按钮中的文字
    $(".optionsLi").click(function () {
        showLoading();
        setTimeout(hideLoading(), 1000);//5s延时自动关闭
        $('.more').css({ "display": "none" })

        var list = blogList;//所有的数据
        var list01 = [];//用来装active为01的
        var list02 = [];//用来装active为02的
        var html = "";
        for (var i = 0; i < list.length; i++) {
            // 博客类型
            if (list[i].ArticleType == "01") {
                list01.push(list[i])   //员工故事01
                articleType = "员工故事";
            } else if (list[i].ArticleType == "02") {
                list02.push(list[i])  //职场建议02
                articleType = "职场建议";
            }
        }
        userLinkRecord(hrpageid, 'button', 'blogMenu' + blogArticleType)
        // 更换按钮内容
        var pro = $(this).html();
        $(".menuBtnCon").html(pro);
        // 点击样式
        $(this).addClass("optionsLiActive").siblings().removeClass("optionsLiActive");
        // 菜单选择
        if ($(".menuBtnCon").html() == "所有话题") {
            blogArticleType = "";
            for (var i = 0; i < list.length; i++) {
                // 博客类型
                if (list[i].ArticleType == "01") {
                    articleType = "员工故事";
                } else if (list[i].ArticleType == "02") {
                    articleType = "职场建议";
                }
                // 跳转路径判断
                if (list[i].SeoUrl) {
                    urlBlog = list[i].SeoUrl
                } else {
                    urlBlog = list[i].PageCode
                }
                // 博客日期
                var blogTime = list[i].CreatedTime.substring(0, 10);
                html += '<li class="col-lg-4 col-md-6 col-sm-12">' +
                    '<div class="blog-list-item">' +
                    '<a class="blog-list-item-link au-target" href="' + urlBlog + '.html"><div class=" sc-content">' +
                    '<img class="img-fluid au-target ae-img" src="'
                    + list[i].ListImg + '"></div>' +
                    '<div class="information au-target">' +
                    '<div class="article-info">' +
                    '<div class="info-header row">' +
                    '<p class="blogType col-lg-5 col-md-5 col-sm-12">' + articleType + '</p>' +
                    '</div>' +
                    '<div class="article-name sc-content" style="word-break: break-word;">'
                    + list[i].ListTitle +
                    '</div>' +
                    '<div class="article-description sc-content" style="word-break: break-word;">' +
                    '<p>' + list[i].ListDesc +
                    '</p></div></div></div></a></div></li>'
            }
            $(".blogList").html(html)
        } else if ($(".menuBtnCon").html() == "员工故事") {
            blogArticleType = "01"
            for (var i = 0; i < list01.length; i++) {
                // 博客类型
                if (list01[i].ArticleType == "01") {
                    articleType = "员工故事";
                } else if (list01[i].ArticleType == "02") {
                    articleType = "职场建议";
                }
                // 跳转路径判断
                if (list01[i].SeoUrl) {
                    urlBlog01 = list01[i].SeoUrl
                } else {
                    urlBlog01 = list01[i].PageCode
                }
                // 博客日期
                var blogTime = list01[i].CreatedTime.substring(0, 10);

                html += '<li class="col-lg-4 col-md-6 col-sm-12">' +
                    '<div class="blog-list-item">' +
                    '<a class="blog-list-item-link au-target" href="' + urlBlog01 + '.html"><div class=" sc-content">' +
                    '<img class="img-fluid au-target ae-img" src="'
                    + list01[i].ListImg + '"></div>' +
                    '<div class="information au-target">' +
                    '<div class="article-info">' +
                    '<div class="info-header row">' +
                    '<p class="blogType col-lg-5 col-md-5 col-sm-12">' + articleType + '</p>' +
                    '</div>' +
                    '<div class="article-name sc-content" style="word-break: break-word;">'
                    + list01[i].ListTitle +
                    '</div>' +
                    '<div class="article-description sc-content" style="word-break: break-word;">' +
                    '<p>' + list01[i].ListDesc +
                    '</p></div></div></div></a></div></li>'
            }
            $(".blogList").html(html)

        } else if ($(".menuBtnCon").html() == "职场建议") {
            blogArticleType = "02";
            for (var i = 0; i < list02.length; i++) {
                // 博客类型
                if (list02[i].ArticleType == "01") {
                    articleType = "员工故事";
                } else if (list02[i].ArticleType == "02") {
                    articleType = "职场建议";
                }
                // 跳转路径判断
                if (list02[i].SeoUrl) {
                    urlBlog02 = list02[i].SeoUrl
                } else {
                    urlBlog02 = list02[i].PageCode
                }
                // 博客日期
                var blogTime = list02[i].CreatedTime.substring(0, 10);

                html += '<li class="col-lg-4 col-md-6 col-sm-12">' +
                    '<div class="blog-list-item">' +
                    '<a class="blog-list-item-link au-target" href="' + urlBlog02 + '.html"><div class=" sc-content">' +
                    '<img class="img-fluid au-target ae-img" src="'
                    + list02[i].ListImg + '"></div>' +
                    '<div class="information au-target">' +
                    '<div class="article-info">' +
                    '<div class="info-header row">' +
                    '<p class="blogType col-lg-5 col-md-5 col-sm-12">' + articleType + '</p>' +
                    '</div>' +
                    '<div class="article-name sc-content" style="word-break: break-word;">'
                    + list02[i].ListTitle +
                    '</div>' +
                    '<div class="article-description sc-content" style="word-break: break-word;">' +
                    '<p>' + list02[i].ListDesc +
                    '</p></div></div></div></a></div></li>'
            }
            $(".blogList").html(html)
        }
    });

    // 底部Career Site Cookie Settings 按钮埋点
    $(".cookieSettingsBtn").click(function () {
        userLinkRecord(hrpageid, 'button', 'cookieSettingsBtn')
    })

    // 底部Personal Information 按钮埋点
    $(".personalInformationBtn").click(function () {
        userLinkRecord(hrpageid, 'button', 'personalInformationBtn')
    })

    // 查看更多
    $('.more').click(function () {
        pageSize += pageSize
        getBlog();
    })

})

// 获取blog
var total = 0, pageSize = 9;
function getBlog() {
    showLoading();
    if ($(".menuBtnCon").html == "所有话题") {
        blogArticleType = ""
    } else if ($(".menuBtnCon").html == "员工故事") {
        blogArticleType = "01"
    } else if ($(".menuBtnCon").html == "职场建议") {
        blogArticleType = "02"
    }

    let data = {
        pageSize: pageSize,
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
            hideLoading();
            if (res.rows && res.rows.length == 0) {
                $('.more').css({ "display": "none" })
                return;
            }
            // 显示更难多
            total = res.rows.length;
            if (pageSize > total) {
                $('.more').css({ "display": "none" })
            }
            // blogList = res.rows;
            let data = res.rows;
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
                if (data[i].SeoUrl) {
                    urlBlog = data[i].SeoUrl
                } else {
                    urlBlog = data[i].PageCode
                }
                // 博客日期
                var blogTime = data[i].CreatedTime.substring(0, 10);

                html += '<li class="col-lg-4 col-md-6 col-sm-12">' +
                    '<div class="blog-list-item">' +
                    '<a class="blog-list-item-link au-target" href="' + urlBlog + '.html"><div class=" sc-content">' +
                    '<img class="img-fluid au-target ae-img" src="'
                    + data[i].ListImg + '"></div>' +
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
            hideLoading();
        }
    });
}

// 获取轮播图
function getCarouse() {
    showLoading();
    let data = {
        pageId: hrpageid,
        pageSize: 10,
        pageIndex: 1,
        sortName: "SortNum",
        sortOrder: "desc",
        status: 1
    }
    $.ajax({
        type: "post",
        url: domainUrl + "/hrapi/api/CarouselImage/GetListBySC",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: 'JSON',
        success: function (res) {
            hideLoading();
            if (res.rows.length == 0) {
                return;
            }
            let data = res.rows;
            let html = "", htmlLi = "";
            for (var i = 0; i < data.length; i++) {
                // 指示器
                htmlLi += '<li data-target="#demo" data-slide-to="' + i + '"></li>'
                // 轮播图
                html += '<div class="carousel-item">' +
                    '<div class="bannerBox container-fluid blogBannerBox">' +
                    '<div class=""><img class="col-12 bigImg img-fluid" src="' + data[i].PicUrl + '" alt=""></div>' +
                    '<div class="slick-list">' +
                    ' <div class="blog-list-item-info blogBox container au-target">' +
                    '<div class="blog-header">FEATURED ARTICLE</div>' +
                    '<div class="blog-title">' +
                    '<h1 class="au-target">' + data[i].StaffMsg + '</h1>' +
                    '</div>' +
                    '<a href="' + data[i].URL + '">阅读故事</a>' +
                    '</div></div></div></div>'
            }
            $(".carousel-indicators").html(htmlLi)
            $(".carousel-inner").html(html)
            $(".carousel-inner div:first-child").addClass("active")
            $(".carousel-indicators li:first-child").addClass("active")
        },
        error: function (errors) {
            hideLoading();
        }
    });
}


