var videoArr = [];
function playVideo(videoElement, num) {
    num =num|| 0;
    if (videoArr.length) {
        var overLayElement = document.getElementById("video");
        var videoElement = document.getElementsByClassName("iframe-video")[0];
        overLayElement.classList.remove("hide-1");
        overLayElement.classList.add("show-1");
        videoElement.src = videoArr[num].VideoUrl;
        return
    }
    var data = {
        pageId: hrpageid,  //未定
        pageSize: 6,
        pageIndex: 1
    }
    var overLayElement = document.getElementById("video");
            overLayElement.classList.remove("hide-1");
            overLayElement.classList.add("show-1");
    $.ajax({
        type: "post",
        url: domainUrl+"/hrapi/api/Video/GetListBySC",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: 'JSON',
        success: function (res) {
            if (res.rows.length == 0) {
                return;
            }
            videoArr = res.rows.reverse();
            
            var videoElement = document.getElementsByClassName("iframe-video")[0];
            videoElement.src = videoArr[0].VideoUrl;
        },
        error: function (errors) {

        }
    });
    userLinkRecord(hrpageid,'button','playVieoButton'+hrpageid);
}
function closeVideo(getVal) {
    if (getVal.nodeName == 'DIV') {
        getVal.classList.remove("show-1");
        getVal.classList.add("hide-1");
        getVal.children[0].children[0].removeAttribute('src');
    } else {
        getVal.parentElement.parentElement.classList.remove("show-1");
        getVal.parentElement.parentElement.classList.add("hide-1");
        getVal.parentElement.parentElement.children[0].children[0].removeAttribute('src');
    }
    var videoElement = document.getElementsByClassName("iframe-video")[0];
    videoElement.currentTime = 0;
    videoElement.pause();
}

function getCarouse(blogParam) {
    let data = {
        pageId: hrpageid, //未定
        pageSize: 10,
        pageIndex: 1,
        sortName: "Sortum",
        sortOrder: "asc"
    }
    $.ajax({
        type: "post",
        url: domainUrl+"/hrapi/api/CarouselImage/GetListBySC",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: 'JSON',
        success: function (res) {
            if (res.rows.length == 0) {
                return;
            }
            let data = res.rows.filter(function (item) {
                return item.Status == 1;
            });
            if(data.length>0){
                let html = "", htmlLi = "";
            // debugger
            for (var i = 0; i < data.length; i++) {
                // 指示器
                htmlLi += '<li data-target="#carouselExampleIndicators" data-slide-to="' + i + '"></li>'
                // 轮播图
                html += '<div class="carousel-item">' +
                    '<div class="carouselitem">' +
                    '<div class="profile"><div class="profile-pic"><img src="' + data[i].PicUrl + '" alt=""></div>' +
                    '<div class="profile-info"><p>' +data[i].StaffMsg +
                    '</p><div class="title"><span class="content-name">' +data[i].StaffName +
                    '</span><span class="content-designation">' +data[i].StaffPosition +
                    '</span></div></div></div></div></div>'
            }
            $(".carousel-indicators").html(htmlLi)
            $(".carousel-inner").html(html)
            $(".carousel-inner div:first-child").addClass("active")
            $(".carousel-indicators li:first-child").addClass("active")
            }

            let datalearn = res.rows.filter(function (item) {
                return item.Status == 2;
            });
            if (datalearn.length > 0) {
                let html1='';
                for (var j = 0; j < datalearn.length; j++) {
                    let url = datalearn[j].URL ? datalearn[j].URL : "javascript:void(0)";
                    html1 += '<div class="col-sm-4 col-md-4 col-lg-4 outer">' +
                        '<a href="' + url + '" target="_blank"class="employee-item">' +
                        '<div class="img_item sc-content">' +
                        '<img class="img-responsive" src="' + datalearn[j].PicUrl + '">' +
                        '</div>' +
                        '<div class="text_item sc-content">' +
                        '<p class="text1">' + datalearn[j].StaffName + '</p>' +
                        '<p class="text2">' + datalearn[j].StaffMsg + ' <i class="icon icon-right-open"></i>' +
                        '</p>' +
                        '</div>' +
                        '</a></div>'
                }
                $(".reademore").show()
                $(".reademore .row").html(html1)
            }


            let dataBlog = res.rows.filter(function (item) {
                return item.Status == 3;
            });
            if(dataBlog.length>0){
                let blogPlace=blogParam || 0;
            // $.each(dataBlog, function (index, item) {
                // 跳转路径
                // if(item.SeoUrl){
                //     urlBlog = item.SeoUrl
                // }else{
                //     urlBlog = item.PageCode
                // }

                switch (blogPlace==0) {
                                    case false:
                                        $.each(dataBlog, function (index, item) {
                                            $(".inner-container .row .col-lg-4:nth-child(" + blogPlace + ")").after('<div class="col-sm-4 col-md-4 col-lg-4"><a href="' + item.URL + '" target="_blank" class="employee-item"><div class="img_item"><img class="img-responsive" src="' + item.PicUrl + '"></div><div class="text_item sc-content"><div class="text1">' + item.StaffName + '</div><div class="text2">' + item.StaffMsg + '<i class="icon icon-right-open"></i></div></div></a></div>')
                                            blogPlace++
                                        })
                                        break;
                                    default:
                                        $('.inner-container .row .col-lg-4').remove();
                                        $.each(dataBlog, function (index, item) {
                                            $(".inner-container .row").append('<div class="col-sm-4 col-md-4 col-lg-4"><a href="' + item.URL +'" target="_blank" class="employee-item"><div class="img_item"><img class="img-responsive" src="' + item.PicUrl + '"></div><div class="text_item sc-content"><div class="text1">' + item.StaffName + '</div><div class="text2">' + item.StaffMsg + '<i class="icon icon-right-open"></i></div></div></a></div>')
                                        })
                                }

                
            // })
            }
        },
        error: function (errors) {

        }
    });
}

// function getBlog(param) {
//     let data = {
//         pageId: hrpageid,  //未定
//         pageSize: 6,
//         pageIndex: 1
//     }
//     $.ajax({
//         type: "post",
//         url: "http://hr.crmclick.com/hrapi/api/Page/GetBlogList",
//         contentType: "application/json",
//         data: JSON.stringify(data),
//         dataType: 'JSON',
//         success: function (res) {
//             if (!res.rows || res.rows.length == 0) {
//                 return;
//             }
//             switch (param==undefined) {
//                 case false:
//                     $.each(res.rows, function (index, item) {
//                         // 跳转路径
//                         if(item.SeoUrl){
//                             urlBlog = item.SeoUrl
//                         }else{
//                             urlBlog = item.PageCode
//                         }
//                         $(".inner-container .row .col-lg-4:nth-child(" + param + ")").after('<div class="col-sm-4 col-md-4 col-lg-4"><a href="' + urlBlog + '.html" target="_blank" class="employee-item"><div class="img_item"><img class="img-responsive" src="' + item.ListImg + '"></div><div class="text_item sc-content"><div class="text1">' + item.ListTitle + '</div><div class="text2">' + item.ListDesc + '<i class="icon icon-right-open"></i></div></div></a></div>')
//                         param++
//                     })
//                     break;
//                 default:
//                     $('.inner-container .row .col-lg-4').remove();
//                     $.each(res.rows, function (index, item) {
//                         if(item.SeoUrl){
//                             urlBlog = item.SeoUrl
//                         }else{
//                             urlBlog = item.PageCode
//                         }
//                         $('.inner-container .row').append('<div class="col-sm-4 col-md-4 col-lg-4"><a href="' + urlBlog + '.html?prePageid='+hrpageid+'" target="_blank" class="employee-item"><div class="img_item"><img class="img-responsive" src="' + item.ListImg + '"></div><div class="text_item sc-content"><div class="text1">' + item.ListTitle + '</div><div class="text2">' + item.ListDesc + '<i class="icon icon-right-open"></i></div></div></a></div>')
//                     })
//             }

//         },
//         error: function (errors) {

//         }
//     });
// }

$('.global-container .row').on('click', 'a', function (e) {
    // debugger
    userLinkRecord(hrpageid,'button','globalButton'+e.currentTarget.innerText)
})