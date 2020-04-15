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
var id = request("PositionId"); //当前职位id
var jobType = request("jobType");
var isShare = request("isShare");
var userid = parseInt(localStorage.getItem("UserId"));
var TypeId = "";  //职位类型
var workCityCode = "";
var positionId = "";
var CollectionId = "";
var isCollection = "";
var ogUrlStudent= "";
var ogUrlProfessional= "";

$(function () {
    var useridInterval=setInterval(() => {
        if (parseInt(localStorage.getItem("UserId"))) {
            getJobDetail();
            clearInterval(useridInterval)
        }
    }, 200);
    // getJobDetail();  //获取职业详情  

    // 模态框自动打开
    // $("#exampleModalCenter").modal({
    //     keyboard: true
    // });

    //滚动定位事件
    $(window).scroll(function () {
        //获取滚动条的滑动距离
        var scroH = $(this).scrollTop();
        //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
        if (scroH >= 300) {
            $(".box_pro").css({ "position": "fixed", "top": "-45px", "left": "15%", "margin": "0 auto", "z-index": "99999" });
        }
        else {
            if (scroH >= 100) {
                $(".content2-left_icon").css({ "display": "none" });
                $(".content2-bottom").css({ "display": "none" });

                $(".content3-bottom").css({ "width": "100%", "height": " 125px", "background": "#ffffff", "z-index": " 99999", "display": "flex", "justify-content": "center", "align-items": "#center", "position": "fixed", "left": "0", "bottom": "0px" });
            } else {
                $(".content3-bottom").css({ "display": "none" });
                $(".content2-bottom").css({ "width": "100%", "height": "117px", "display": "flex", "justify-content": "center", "align-items": "#center" });
                $(".content2-left_icon").css({ "display": "block" });
                $(".box_pro").css({ "width": "70%", "height": "117px", "margin": "19% auto" });
                $(".box_content").css({ "height": "187px" });
            }
        }
    })

    // 右边email,邮箱订阅
    $(".emailBtn").click(function () {
        //验证邮箱
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if ($(".emailRightInp").val() == "") {
            $(".emailRightEmpty").css({ "display": "block" }).html("电邮地址不得留空");
        } else {
            if (reg.test($(".emailRightInp").val())) {
                let emailRightInp = $(".emailRightInp").val()
                // 邮箱验证成功，不显示提示语
                $(".emailRightEmpty").css({ "display": "none" });

                showLoading();
                // 邮箱获取类似职位通知接口
                let data = {
                    email: emailRightInp,
                    name: "",
                    positionId: positionId,
                    userId: userid
                }
                $.ajax({
                    type: "post",
                    url: domainUrl + "/hrapi/api/Email/Subscribe",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    dataType: 'JSON',
                    success: function (res) {
                        hideLoading()
                        if (res.state == 1) {
                            $("#successModalCenter").modal({ keyboard: true }); //显示失败模态框
                            setTimeout("$('#successModalCenter').modal('hide');$('.emailRightInp').val('')", 2500);//延时自动关闭
                        }else {
                            $("#failureModalCenter").modal({ keyboard: true }); //显示失败模态框
                            setTimeout("$('#failureModalCenter').modal('hide');$('.emailRightInp').val('')", 2500);//延时自动关闭
                        }
                    },
                    error: function (errors) {
                        hideLoading()
                        $("#failureModalCenter").modal({ keyboard: true }); //显示失败模态框
                        setTimeout("$('#failureModalCenter').modal('hide');$('.emailRightInp').val('')", 2500);//延时自动关闭
                    }
                });
            } else {
                $(".emailRightEmpty").css({ "display": "block" }).html("Please enter valid Email");
            }
        }
    })

    // 左边姓名邮箱验证，发送给朋友
    $(".subit").click(function () {
        var nameR = "", emailFriend = "";
        //验证邮箱
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if ($(".emailCon").val() == "") {
            $(".emailEmpty").css({ "display": "inline-block" }).html("电邮地址不得留空");
        } else {
            if (reg.test($(".emailCon").val())) {
                // 邮箱验证成功
                emailFriend = $(".emailCon").val();
                $(".emailEmpty").css({ "display": "none" });
            } else {
                $(".emailEmpty").css({ "display": "inline-block" }).html("请输入电邮地址");
            }
        }
        // 验证姓名
        if ($(".emailName").val() == "") {
            $(".emailNameEmpty").css({ "display": "inline-block" }).html(" 姓名不得留空");
        } else {
            nameR = $(".emailName").val()
            $(".emailNameEmpty").css({ "display": "none" });
        }

        // 名字和邮箱都正确时调接口
        if (nameR && emailFriend) {
            showLoading();
            // 邮箱发送给朋友接口
            let data = {
                email: emailFriend,
                name: nameR,
                positionId: positionId,
                userId: userid
            }
            $.ajax({
                type: "post",
                url: domainUrl + "/hrapi/api/Email/SendToFriend",
                contentType: "application/json",
                data: JSON.stringify(data),
                dataType: 'JSON',
                success: function (res) {
                    hideLoading()
                    if (res.state == 1) {
                        setTimeout('$(".emailCon").val("");$(".emailName").val("")', 1000);//s延时自动关闭
                    } else {
                        alert(res.msg)
                    }
                },
                error: function (errors) {
                    hideLoading()
                    setTimeout('$(".emailCon").val("");$(".emailName").val("")', 1000);//s延时自动关闭
                }
            });
        }
    })

    // 收藏，取消收藏职位接口
    $(".jobCollection").click(function () {
        showLoading();
        if (!localStorage.getItem("Cchecked")) {
            showCookie();
            return
        }
        if ($(".jobCollection").html()=="保存职位") {
            //保存职位,收藏职位接口
            let data = {
                positionId: positionId,
                userId: userid
            }
            $.ajax({
                type: "post",
                url: domainUrl + "/hrapi/api/PositionCollection/PostCollection",
                contentType: "application/json",
                data: JSON.stringify(data),
                dataType: 'JSON',
                success: function (res) {
                    hideLoading();
                    if (res.state == 1) {
                        if (res.rows.length == 0) {
                            return;
                        }
                        $(".jobCollection").html("职位已收藏")
                        CollectionId = res.rows[0].CollectionId
                        isCollection = 1;
                        getCollectionList(jobType)
                    } else {
                        alert(res.msg)
                    }
                },
                error: function (errors) {
                    hideLoading();
                }
            });
        } else if ($(".jobCollection").html()=="职位已收藏") {
            // 取消收藏职位接口
            let data = {
                collectionId: CollectionId
            }
            $.ajax({
                type: "post",
                url: domainUrl + "/hrapi/api/PositionCollection/Delete",
                contentType: "application/json",
                data: JSON.stringify(data),
                dataType: 'JSON',
                success: function (res) {
                    hideLoading();
                    if (res.state == 1) {
                        $(".jobCollection").html("保存职位")
                        // getJobDetail();  //获取职业详情
                        isCollection = 0;
                        getCollectionList(jobType)
                    } else {
                        alert(res.msg)
                    }
                },
                error: function (errors) {
                    hideLoading();
                }
            });
        }
    })
    // var jobType = getQueryString("jobType")  

    // 滚动定位导航中的email图标 按钮埋点
    $(".topEmail").click(function () {
        userLinkRecord(hrpageid, 'button', 'jobDetail-topEmail');
    })

    // 现在申请 按钮埋点
    $(".applyNowbutton").click(function () {
        userLinkRecord(hrpageid, 'button', 'jobDetail-applyNowButton')
    })

    // 通过Linkedln申请 按钮埋点
    $(".applyLinkedinbutton").click(function () {
        userLinkRecord(hrpageid, 'button', 'jobDetail-applyLinkedinButton')
    })

    // 已是飞利浦员工？在此申请 按钮埋点
    $(".applyPhilip").click(function () {
        userLinkRecord(hrpageid, 'button', 'jobDetail-applyPhilip')
    })

    // 观看视频 按钮埋点
    $(".look").click(function () {
        userLinkRecord(hrpageid, 'button', 'jobDetail-lookVideo')
    })

    // 这是什么意思 按钮埋点
    $(".whatMean").click(function () {
        userLinkRecord(hrpageid, 'button', 'whatMean')
    })

    // 健康关护全程 按钮埋点
    $(".healthCareAll").click(function () {
        userLinkRecord(hrpageid, 'button', 'jobDetail-healthCareAll')
    })

    // careersite@philips.com 按钮埋点
    $(".careersiteEmail").click(function () {
        userLinkRecord(hrpageid, 'button', 'jobDetail-careersiteEmail')
    })

    // 底部Career Site Cookie Settings 按钮埋点
    $(".cookieSettingsBtn").click(function () {
        userLinkRecord(hrpageid, 'button', 'cookieSettingsBtn')
    })

    // 底部Personal Information 按钮埋点
    $(".personalInformationBtn").click(function () {
        userLinkRecord(hrpageid, 'button', 'personalInformationBtn')
    })

    getVideos();

    // 类似工作查看更多
    $('.more').on('click', 'a', function () {
        pageSize += pageSize
        getSimilarJob();
    })

    var UserId = localStorage.getItem("UserId");
    // 领英分享（社会精英）
    $(".linkedin-professional").click(function () {
        window.open ("https://www.linkedin.com/sharing/share-offsite/?url=" + ogUrlProfessional);
        // 按钮埋点
        userLinkRecord(hrpageid, 'button', 'jobDetail-linkedin-icon')
    })
    // 领英分享（校园精英）
    $(".linkedin-student").click(function () {
        window.open ("https://www.linkedin.com/sharing/share-offsite/?url=" + ogUrlStudent);
        // 按钮埋点
        userLinkRecord(hrpageid, 'button', 'jobDetail-linkedin-icon')
    })


});

// --------------------------------------------------
// 锚点，不改变url
function changeHash(idName) {
    document.querySelector(idName).scrollIntoView(true);
}

// 获取职业详情
function getJobDetail() {
    let data = {
        id: id,
        userId: parseInt(localStorage.getItem("UserId"))
    }
    $.ajax({
        type: "get",
        url: domainUrl + "/hrapi/api/Position/GetById",
        contentType: "application/json",
        data: data,
        dataType: 'JSON',
        success: function (res) {
            TypeId = res.data.TypeId
            jobType = res.data.JobType
            workCityCode = res.data.msgList.WorkCityCode
            positionId = res.data.PositionId
            CollectionId = res.data.msgList.CollectiId
            isCollection = res.data.msgList.IsCollection
            // 领英分享url（社会英才）
            var domainUrlLin = window.location.protocol+"//"+window.location.host;
            ogUrlProfessional = encodeURIComponent(domainUrlLin + '/jobDetail-professional-'+ positionId +'.html?PositionId=' + positionId);
            $(".ogUrlProfessional").attr("content", ogUrlProfessional)
            // 领英分享url（校园精英）
            ogUrlStudent = encodeURIComponent(domainUrlLin + '/jobDetail-student-'+ positionId +'.html?PositionId=' + positionId);
            $(".ogUrlStudent").attr("content", ogUrlStudent)
            // 领英分享title
            var ogTitle = res.data.PositionTitle+" in "+res.data.WorkCountry + '，' + res.data.WorkProvince + '，' + res.data.WorkCity+" | "+res.data.msgList.TypeName+" at Philips"
            // 领英分享描述
            $(".ogDescription").attr("content", "Apply for "+ogTitle)
            // '现在申请'链接
            $(".applyNowbutton").attr("href", res.data.url)
            //相似的工作    
            if (TypeId) { getSimilarJob(); }
            // 判断是否收藏
            if (isCollection == "0") {
                $(".jobCollection").html("保存职位")
            } else if (isCollection == "1") {
                $(".jobCollection").html("职位已收藏")
            }
            var postTime = res.data.PostTime.substring(0, 10);//2020-02-11
            var month = new Date(postTime).toDateString().split(" ")[1];//月
            var day = new Date(postTime).toDateString().split(" ")[2];//日
            var year = new Date(postTime).toDateString().split(" ")[3];//年
            // 职位详情
            $(".postTime").html('Posted on ' + month+' ' + day + 'th ' + year)
            $(".jobTitle").html(res.data.PositionTitle)
            $(".jobCity").html(res.data.WorkCity)
            $(".jobDesc").html(res.data.PositionDesc)
            $(".location").html('<span>' + res.data.WorkCountry + '，' + res.data.WorkProvince + '，' + res.data.WorkCity + '</span>')
            $(".WorkTime").html(res.data.WorkTime)
            $(".PositionCode").html(res.data.PositionCode)
        },
        error: function (errors) {
            $('.more').css({ "display": "none" })
        }
    });
}

// 获取类似的工作
var total = 0,
pageSize = 3
function getSimilarJob() {
    showLoading();
    let data = {
        typeId: TypeId,
        jobType: jobType,
        WorkCity: workCityCode,
        pageSize: pageSize,
        pageIndex: 1,
        noIncludeId: positionId
    }
    $.ajax({
        type: "post",
        url: domainUrl + "/hrapi/api/Position/GetListBySC",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: 'JSON',
        success: function (res) {
            hideLoading()
            if (res.rows.length == 0) {
                $(".similarJobBox").css({ "display": "none" })
                $('.more').css({ "display": "none" })
                return;
            }
            let data = res.rows;
            let htmlProfessional = "",htmlStudent="";
            for (var i = 0; i < data.length; i++) {
                htmlProfessional += '<li class="au-target"><a class="au-target" href="/jobDetail-professional-'+ data[i].PositionId +'.html?PositionId='+ data[i].PositionId +
                    '"><div class="title">'
                    + data[i].PositionTitle +
                    '</div><p>' + data[i].WorkCountry + '，' + data[i].WorkProvince + '，' + data[i].WorkCity + '</p></a></li>';

                htmlStudent += '<li class="au-target"><a class="au-target" href="/jobDetail-student-'+ data[i].PositionId +'.html?PositionId='+ data[i].PositionId +
                '"><div class="title">'
                + data[i].PositionTitle +
                '</div><p>' + data[i].WorkCountry + '，' + data[i].WorkProvince + '，' + data[i].WorkCity + '</p></a></li>';
            }
            $(".similarList-professional").html(htmlProfessional)
            $(".similarList-student").html(htmlStudent)
            total = res.total;
            if (pageSize >= total) {
                $('.more').css({ "display": "none" })
            }
        },
        error: function (errors) {
            hideLoading()
        }
    });    
}

// 获取视频接口
var VideoUrl = "";
function getVideos() {
    showLoading();
    let data = {
        pageId: hrpageid,
        pageSize: 10,
        pageIndex: 1
    }
    $.ajax({
        type: "post",
        url: domainUrl + "/hrapi/api/Video/GetListBySC",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: 'JSON',
        success: function (res) {
            hideLoading()
            if (res.rows.length == 0) {
                return;
            }
            let data = res.rows;
            VideoUrl = data[0].VideoUrl;
            $(".videoImgBg").attr("src", domainUrl + data[0].CoverImg)
        },
        error: function (errors) {
            hideLoading()
        }
    });
}
//播放视频
function playVideo() {
    var videosrc = VideoUrl;
    $(".overlay-video").show();
    $(".iframe-video").attr("src", videosrc)
    // 点击播放视频
    userLinkRecord(hrpageid, 'button', 'jobDetail-openVideo')
}
//关闭视频
function closeVideo() {
    $(".overlay-video").hide();
    $('video').trigger('pause');
}


