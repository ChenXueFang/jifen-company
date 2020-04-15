var total = 0;
let param1 = {
    WorkCountryString: [],
    WorkProvinceString: [],
    WorkCityString: [],
    WorkTimeString: [],
    TypeIdString: [],
    positionTitlelike: '',
    pageSize: 50,
    pageIndex: 1,
    sortName: '',
    sortOrder: ''
},
    checkedArr = [],
    size = Math.ceil(total / param1.pageSize);
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
//输出参数

var TypeId = request("TypeId"),
    qcity = request("qcity"),
    temChoose = 0;
// param1.jobType = request("jobType");
param1.positionTitlelike = request("keywords");

if (TypeId) {
    $.ajax({
        type: "get",
        url: domainUrl + "/hrapi/api/PositionType/GetById?id=" + TypeId,
        contentType: "application/json",
        dataType: 'JSON',
        success: function (res) {
            $(".bannerBox img.bigImg").attr("src", res.data.BigImgUrl)
            $(".banner_text .text_h1").html(res.data.TypeName)
            $(".banner_text .text_p").html(res.data.Remark)
        },
        error: function (errors) {

        }
    });
} else {
    $(".bannerBox img.bigImg").attr("src", '/images/banner-search.jpg')
    $(".banner_text .text_h1").html('查找飞利浦职位')
    $(".banner_text .text_p").html('飞利浦为您提供的不只是一份工作，而是一个体现潜力和目标的机会。查找飞利浦职位，了解如何让职业生涯的下一步更有意义。')
}
if (param1.positionTitlelike != '') {
    $('.right_content').prepend('<div class="search-info"><h2><span>搜索</span><span>"' + param1.positionTitlelike + '"</span></h2></div>')
}

function collapse(e) {
    if (e.children[0].children[0].children[0].className.includes('icon-up-arrow')) {
        e.children[0].children[0].children[0].classList.remove("icon-up-arrow");
        e.children[0].children[0].children[0].classList.add("icon-down-arrow");
    } else {
        e.children[0].children[0].children[0].classList.remove("icon-down-arrow");
        e.children[0].children[0].children[0].classList.add("icon-up-arrow");
    }
}
$(".controls3").click(function () {
    $(".left_box").addClass("show-1")
    $(".popup-modal-backdrop").addClass("active")
});
$(".close_left,.bottom_search .primary-button").click(function () {
    $(".left_box").removeClass("show-1")
    $(".popup-modal-backdrop").removeClass("active")
});
$(function () {
    searchPosition();
})
function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}
function searchPosition() {
    let param = {
        positionTitlelike: param1.positionTitlelike,
        jobType: jobType,
        WorkCountryString: param1.WorkCountryString.join(','),
        WorkProvinceString: param1.WorkProvinceString.join(','),
        WorkCityString: param1.WorkCityString.join(','),
        WorkTimeString: param1.WorkTimeString.join(','),
        TypeIdString: param1.TypeIdString.join(','),
        pageSize: param1.pageSize,
        pageIndex: param1.pageIndex,
        sortName: param1.sortName,
        sortOrder: param1.sortOrder,
        UserId: Number(localStorage.getItem("UserId"))
    }
    $.ajax({
        type: "post",
        url: domainUrl + "/hrapi/api/Position/SearchPosition",
        contentType: "application/json",
        data: JSON.stringify(param),
        dataType: 'JSON',
        success: function (res) {
                $('.innerlabel ul li').remove();
                let checkboxNum = 1;
                $.each(res.data, function (index, item) {
                    let temp = item.resultList.sort(compare("PositionCount"))
                    switch (item.searchType) {
                        case '0':
                            $.each(temp, function (index, i) {
                                // $('.innerlabel1 ul').append("<li><label for='checkbox" + checkboxNum + "'><input type='checkbox' id='checkbox" + checkboxNum + "'><span class='checkbox-select'><i class='icon-selected'></i></span><span class='checkbox-unselect'></span><span class='text name'>" + i.TypeName + "</span><span class='text'>(" + i.PositionCount + ")</span></label></li>")
                                $('.innerlabel1 ul').append("<li><label for='" + i.TypeId + "'><input type='checkbox' id='" + i.TypeId + "'><span class='checkbox-select'><i class='icon-selected'></i></span><span class='checkbox-unselect'></span><span class='text name'>" + i.TypeName + "</span><span class='text'>(" + i.PositionCount + ")</span></label></li>")
                            })
                            break;
                        case '1':
                            $.each(temp, function (index, i) {
                                $('.innerlabel2 ul').append("<li><label for='" + i.TypeName + "'><input type='checkbox' id='" + i.TypeName + "'><span class='checkbox-select'><i class='icon-selected'></i></span><span class='checkbox-unselect'></span><span class='text name'>" + i.TypeName + "</span><span class='text'>(" + i.PositionCount + ")</span></label></li>")
                                checkboxNum++
                            })
                            break;
                        case '2':
                            $.each(temp, function (index, i) {
                                $('.innerlabel3 ul').append("<li><label for='" + i.TypeId + "'><input type='checkbox' id='" + i.TypeId + "'><span class='checkbox-select'><i class='icon-selected'></i></span><span class='checkbox-unselect'></span><span class='text name'>" + i.TypeName + "</span><span class='text'>(" + i.PositionCount + ")</span></label></li>")
                            })
                            break;
                        case '3':
                            $.each(temp, function (index, i) {
                                $('.innerlabel4 ul').append("<li><label for='" + i.TypeId + "'><input type='checkbox' id='" + i.TypeId + "'><span class='checkbox-select'><i class='icon-selected'></i></span><span class='checkbox-unselect'></span><span class='text name'>" + i.TypeName + "</span><span class='text'>(" + i.PositionCount + ")</span></label></li>")
                            })
                            break;
                        case '4':
                            $.each(temp, function (index, i) {
                                $('.innerlabel5 ul').append("<li><label for='" + i.TypeId + "'><input type='checkbox' id='" + i.TypeId + "'><span class='checkbox-select'><i class='icon-selected'></i></span><span class='checkbox-unselect'></span><span class='text name'>" + i.TypeName + "</span><span class='text'>(" + i.PositionCount + ")</span></label></li>")
                            })
                    }
                })

                 if(checkedArr.length>0){
                $.each(checkedArr, function (index, item) {
                    let tem = document.getElementById(item)
                    // $("#" + item).attr("checked", true)
                    if(tem){
                        tem.setAttribute("checked", true)
                    }
                })
            }

                if (temChoose == 0 && TypeId) {
                    $('.innerlabel1 ul #' + TypeId).click();
                    temChoose++
                } else if (temChoose == 0 && qcity) {
                    $('.innerlabel5 ul #' + qcity).click();
                    temChoose++
                }

            if (res.rows.length == 0 || !res.rows) {
                $('.right_content .list_block').html('<div class="no-result"><img src="/images/expire_job.png" ><h3>There are no jobs for your search criteria.</h3><p >Please search again.</p></div>')
                return
            }else{
                $('.right_content .list_block').html('<ul></ul>')
            }
            // $('.innerlabel1 ul #' + TypeId).click();
            $('.list_header p').html(res.total + '条结果')
            $('.controls1').html(res.total + ' 职位')
            $('.showing').html('Showing ' + (50 * (param1.pageIndex - 1) + 1) + ' - ' + (50 * (param1.pageIndex - 1) + res.rows.length) + ' of ' + res.total + ' 职位')
            if (res.total <= 50) {
                $('.result nav').addClass("hide-1")
            } else {
                $('.result nav').removeClass("hide-1")
                total = res.total
                size = Math.ceil(total / param1.pageSize)
                setpage(param1.pageIndex, size);
            }

            $('.list_block li').remove();
            $.each(res.rows, function (index, item) {
                item.PostTime = new Date(item.PostTime).toString().substring(4, 15)
                handerSearchRow(item )
            })
        },
        error: function (errors) {

        }
    });
}
$('.innerlabel ul').on('click', 'input', function () {
    param1.pageIndex=1;
    if (this.checked) {
        switch (this.parentElement.parentElement.parentElement.parentElement.className.split(' innerlabel')[1]) {
            case '1':
                param1.TypeIdString.push(this.id);
                break;
            case '2':
                param1.WorkTimeString.push(this.id);
                break;
            case '3':
                param1.WorkCountryString.push(this.id);
                break;
            case '4':
                param1.WorkProvinceString.push(this.id);
                break;
            case '5':
                param1.WorkCityString.push(this.id);
        }
        checkedArr.push(this.id)
        $(".keyword ul").append("<li class='" + this.id + "'>" + this.parentElement.children[3].innerText + "<i class='icon icon-cancel'></i></li>")
    } else {
        switch (this.parentElement.parentElement.parentElement.parentElement.className.split(' innerlabel')[1]) {
            case '1':
                param1.TypeIdString.remove(this.id);
                break;
            case '2':
                param1.WorkTimeString.remove(this.id);
                break;
            case '3':
                param1.WorkCountryString.remove(this.id);
                break;
            case '4':
                param1.WorkProvinceString.remove(this.id);
                break;
            case '5':
                param1.WorkCityString.remove(this.id);
        }

        checkedArr.remove(this.id)
        var box = document.getElementsByClassName(this.id)[0];
        box.remove();
    }
    searchPosition()
})
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
$('.keyword ul').on('click', '.icon-cancel', function () {
    $('.innerlabel ul #' + this.parentElement.className).click();
})
function search() {
    param1.positionTitlelike = $('.search_text').val()
    param1.pageIndex=1;
    searchPosition()
}
$('.search_text').keyup(function (event) {
    if (event.keyCode == 13) {
        search();
    }
});
function save(PositionId, e,jobType, collectionId = '') {
    if (!localStorage.getItem("Cchecked")) {
        showCookie();
        return
    }
    if (e.children[0].className.includes('hide-1')) {
        collectPosition(PositionId, jobType,e);

    } else {
        deletecollection(collectionId,jobType, e);
    }
}

function collectPosition(positionId,jobType) {
    // debugger
    let data = {
        positionId: positionId,
        UserIdGuid: localStorage.getItem("UserIdGuid")
    }
    $.ajax({
        type: "post",
        url: domainUrl + "/hrapi/api/PositionCollection/PostCollection",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: 'JSON',
        success: function (res) {
            searchPosition()
            getCollectionList(jobType);
        },
        error: function (errors) {

        }
    });
}

function deletecollection(collectionId,jobType, e) {
    let data = {
        collectionId: collectionId
    }
    $.ajax({
        type: "post",
        url: domainUrl + "/hrapi/api/PositionCollection/Delete",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: 'JSON',
        success: function (res) {
            e.children[0].classList.remove("show-1");
            e.children[0].classList.add("hide-1");
            e.children[1].classList.remove("hide-1");
            e.children[1].classList.add("show-1");
            getCollectionList(jobType);
        },
        error: function (errors) {

        }
    });
}

var flag = true;
$('.innersearch input').on('compositionstart', function () {
    flag = false;
});
$('.innersearch input').on('compositionend', function () {
    flag = true;
});
$('.innersearch input').on('input', function (e) {
    setTimeout(function () {
        if (flag) {
            $.each(e.currentTarget.parentElement.parentElement.children[1].children[0].children, function (index, item) {
                let aa = item.innerText.split('(')[0]
                if (aa.indexOf(e.currentTarget.value) == -1) {
                    item.remove();
                    item.addClass('hide-1').removeClass('show-1');
                } else {
                    item.addClass('show-1').removeClass('hide-1');
                }
            })
        }
    }, 0);
});
function sortSelect() {
    if ($('select  option:selected').val() == 'Most Recent') {
        param1.sortName = 'PostTime'
        param1.sortOrder = 'desc'
    } else {
        param1.sortName = ''
        param1.sortOrder = ''
    }
    param1.pageIndex=1;
    searchPosition()
}
//分页事件
$('.pagination').on('click', '.num-li', function () {
    // debugger
    param1.pageIndex = parseInt($(this).text());
    setpage(param1.pageIndex, size);
    searchPosition()
});
//上一页
$('.pagination').on('click', '.Prev', function () {
    if (param1.pageIndex > 1) {
        param1.pageIndex = param1.pageIndex - 1;
        setpage(param1.pageIndex, size);
    }
    searchPosition()
});
//下一页
$('.pagination').on('click', '.Next', function () {
    if (param1.pageIndex < size) {
        param1.pageIndex = param1.pageIndex + 1;
        setpage(param1.pageIndex, size);
    }
    searchPosition()
});
$(document).on('mouseenter', '.pageMore1', function () {
    $('.pageMore1').hide();
    $('.pageMore2').show();
});
$(document).on('mouseleave', '.pageMore2', function () {
    $('.pageMore2').hide();
    $('.pageMore1').show();
});
$(document).on('mouseenter', '.pageMore3', function () {
    $('.pageMore3').hide();
    $('.pageMore4').show();
});
$(document).on('mouseleave', '.pageMore4', function () {
    $('.pageMore4').hide();
    $('.pageMore3').show();
});
$(document).on('click', '.pageMore2', function () {
    if (param1.pageIndex < size) {
        param1.pageIndex = param1.pageIndex + 3;
        setpage(param1.pageIndex, size);
    }
    searchPosition()
});
$(document).on('click', '.pageMore4', function () {
    if (param1.pageIndex > 1) {
        param1.pageIndex = param1.pageIndex - 3;
        setpage(param1.pageIndex, size);
    }
    searchPosition()
});

//分页
function pagelist(curr, size) {
    var list = [];
    if (size < 7) {
        for (var r = 1; r < size + 1; r++) {
            list.push(r);
        }
    } else {
        if (curr < 4) {
            list = [1, 2, 3, 4, '···', size];
        } else {
            if (curr > size - 3) {
                list = [1, '···', size - 3, size - 2, size - 1, size];
            } else {
                list = [1, '···', curr - 1, curr, curr + 1, '···', size];
            }
        }
    }
    return list;
}
//页面按钮渲染
function setpage(curr, size) {
    var list = pagelist(curr, size);
    $(".pagination").empty();
    if (curr == 1) {
        $(".pagination").append('<li class="page-item hide-1 Prev"><a class="page-link" href="#" tabindex="-1" aria-disabled="true"><i class="icon icon-left-arrow"></i>Prev </a></li>');
    } else {
        $(".pagination").append('<li class="page-item Prev"><a class="page-link" href="#" tabindex="-1" aria-disabled="true"><i class="icon icon-left-arrow"></i>Prev </a></li>');
    }
    for (var q = 0; q < list.length; q++) {
        if (list[q] == curr) {
            $(".pagination").append('<li class="page-item num-li active"><a class="page-link" href="#">' + list[q] + '</a></li>');

        } else {
            if (list[q] == '···' && list[q - 1] > curr) {
                $(".pagination").append('<li class="page-item pageMore1"><a class="page-link" href="#">' + list[q] + '</a></li><li class="page-item pageMore2" style="display:none"><a class="page-link" href="#">》</a></li>');
            } else if (list[q] == '···' && list[q + 1] < curr) {
                $(".pagination").append('<li class="page-item pageMore3"><a class="page-link" href="#">' + list[q] + '</a></li><li class="page-item pageMore4" style="display:none"><a class="page-link" href="#">《</a></li>');
            } else {
                $(".pagination").append('<li class="page-item num-li"><a class="page-link" href="#">' + list[q] + '</a></li>');
            }
        }
    }
    if (curr == size) {
        $(".pagination").append('<li class="page-item Next hide-1"><a class="page-link" href="#">Next <i class="icon icon-arrow-right"></i></a></li>');
    } else {
        $(".pagination").append('<li class="page-item Next"><a class="page-link" href="#">Next <i class="icon icon-arrow-right"></i></a></li>');
    }
}