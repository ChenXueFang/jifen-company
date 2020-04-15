// var domainUrl = "http://hr.crmclick.com";//测试站
// var asseturl = "http://hr.crmclick.com/hrapi/";//测试站
var domainUrl = "";  //正式站
var asseturl = "/hrapi/";  //正式站
var startTime = "";
var endTime = "";
var keyword = '';
function getdesc(desc) {
	return desc.replace(/<[^>]+>/g, "").replace(/&nbsp;/ig, "");
}
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return "";
}

$(function () {
	addloading()
	if (!(localStorage.getItem("UserIdGuid") && localStorage.getItem("UserId"))) {
		getUserGuid()
	}
	else {
		addRecord()
	}
	if (getQueryString("uid") && getQueryString("uidguid")) {
		localStorage.setItem("UserId", getQueryString("uid"))
		localStorage.setItem("UserIdGuid", getQueryString("uidguid"));
	}
	if (localStorage.getItem("Cchecked") == null) {
		let blogIds=[11,14,15,16,17,18,21,22,24,25,26,27,28,29,36,37,39]
		if(blogIds.indexOf(window.hrpageid)>-1){
			blogShowCookie()
		}else{
			showCookie();
		}
		
	}
	$('body').on('click', '.cookie-popup-area .cookie-button-area button', function (e) {
		hideCookie();
		localStorage.setItem("Cchecked", true);
	})
	//头部
	$(".job-filter input").val("");
	$("body").on("click", "*", function (e) {
		if (!$(e.target).closest(".header-search,.bigger-search").length) {
			$(".header-search").hide();
			$('.phs-search-suggestions').hide();
		}
		if (!$(e.target).closest(".country-link").length && $('li.country-link .icon').hasClass('icon-up-arrow')) {
			openCountry();
		}
	});

	var flag = true;
	$('body').on('compositionstart', '.job-filter input', function () {
		flag = false;
	});
	$('body').on('compositionend', '.job-filter input', function () {
		flag = true;
	});
	$('body').on('input', '.job-filter input', function (e) {
		setTimeout(function () {
			if (flag) {
				keyword = e.currentTarget.value;
				// $(".job-filter input").val(e.currentTarget.value);
				
				if (e.currentTarget.value != "") {
					$.each($(".job-filter input"), function (index, item) {
						// debugger
						if(item.value==''){
							item.value=e.currentTarget.value;
						}
					})
					// $(this).parent().next().show()
					$('.phs-keysearch-clear').show()
				} else {
					$('.phs-keysearch-clear').hide()
				}
				searchConditionPosition();
				$('.phs-jobs-suggested').hide()
				$('.phs-categorys').hide()
				$('.phs-locations-suggested').hide()
				$('.phs-recentsearches-suggested').hide()
			}
		}, 0);
	});
	$('body').on('keyup', '.job-filter input', function (e) {
		if (event.keyCode == 13) {
			if (e.currentTarget.value) {
				gotoSearchPage(e.currentTarget.value)
				$(".job-filter input").val("");
			}
		}
	});

	//   $('body').on('click', '.clearInput', function (e) {
	$('body').on('click', '.phs-keysearch-clear', function (e) {
		$(".job-filter input").val("");
		keyword = ''
		$(e.currentTarget.parentElement.parentElement).hide();
		$('.phs-search-suggestions').hide();
	});
	$('body').on('click', '.clearInput', function (e) {
		if (e.currentTarget.parentElement.previousElementSibling.children[0].value == '') {
			// if($(".job-filter input").val()==''){
			$('.phs-keysearch-clear').click();
		} else {
			gotoSearchPage(e.currentTarget.parentElement.previousElementSibling.children[0].value)
			$(".job-filter input").val("");
		}
	});
})
// function showCookie() {
// 	$("body").prepend('<div class="cookie-popup-area"><div class="cookie-text-area sc-content"><p>We use cookies to offer you a better browsing experience, analyze sitetraffic, and personalize content. Read about how we use cookies and how you can control them by visiting our Cookie Settings page. If you continue to use this site, you consent to our use of cookies.</p></div><div class="cookie-button-area sc-content"><a href="/cookiesettings.html">Cookie Settings</a><button><i class="icon icon-check-mark"></i>Allow</button></div></div>')	
// 	var cookieHeight = $('.cookie-popup-area').outerHeight();
// 	$("body").css("padding-top", cookieHeight);
// 	$(window).resize(function () {
// 		var cookieHeight = $('.cookie-popup-area').outerHeight();
// 		$("body").css("padding-top", cookieHeight);
// 	});
// }
function blogShowCookie(){
	$("body").prepend('<div class="cookie-popup-area"><div class="cookie-text-area sc-content"><p>We use cookies to offer you a better browsing experience, analyze sitetraffic, and personalize content. Read about how we use cookies and how you can control them by visiting our Cookie Settings page. If you continue to use this site, you consent to our use of cookies.</p></div><div class="cookie-button-area sc-content"><a href="/cookiesettings.html">Cookie Settings</a><button><i class="icon icon-check-mark"></i>Allow</button></div></div>')	
		var cookieHeight = $('.cookie-popup-area').outerHeight();
		$("body").css("padding-top", cookieHeight);
		$(window).resize(function () {
			var cookieHeight = $('.cookie-popup-area').outerHeight();
			$("body").css("padding-top", cookieHeight);
		});
}
function hideCookie() {
	$("body").css("padding-top", 0);
	$("body .cookie-popup-area").remove();
}

Date.prototype.format = function(fmt) { 
	var o = { 
	   "M+" : this.getMonth()+1,                 //月份 
	   "d+" : this.getDate(),                    //日 
	   "h+" : this.getHours(),                   //小时 
	   "m+" : this.getMinutes(),                 //分 
	   "s+" : this.getSeconds(),                 //秒 
	   "q+" : Math.floor((this.getMonth()+3)/3), //季度 
	   "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
		   fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
	for(var k in o) {
	   if(new RegExp("("+ k +")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		}
	}
   return fmt; 
}  

function addRecord() {
	if (window.hrpageid) {
		userLinkRecord(window.hrpageid, "page", "")
		window.onload = function (e) {	
					
			endTime = localStorage.getItem("endTime");
			console.log(endTime)
			if(endTime){
				UserStayPageTime(localStorage.getItem("preHrpageid"),localStorage.getItem("prePositionId",getQueryString("PositionId")), localStorage.getItem("preStartTime"), endTime);
			}	
			localStorage.setItem("preStartTime", new Date().format("yyyy-MM-dd hh:mm:ss"))
			localStorage.setItem("preHrpageid", window.hrpageid)
			localStorage.setItem("prePositionId",getQueryString("PositionId"))
			localStorage.setItem("endTime", "")
		}
		window.onbeforeunload = function (e) {
			localStorage.setItem("endTime", new Date().format("yyyy-MM-dd hh:mm:ss"))
		}
	}
}
function getUserGuid() {
	$.ajax({
		type: "get",
		url: domainUrl + "/hrapi/api/Users/RegistUserInfo",
		contentType: "application/json",
		// data: JSON.stringify(data),
		dataType: 'JSON',
		success: function (res) {
			localStorage.setItem("UserId", res.data.UserId)
			localStorage.setItem("UserIdGuid", res.data.UserIdGuid);
			addRecord()
		},
		error: function (errors) {

		}
	});
}

function getdevice() {
	// 判断设备，移动端，pc端，ipad
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

	var devices = "";
	if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		console.log("phone端" + devices);
		return devices = "02"
	} else if (bIsIpad) {
		console.log("ipad端" + devices);
		return devices = "03"
	} else {
		console.log('pc端' + devices)
		return devices = "01"
	}
}


// 用户点击事件，数据埋点
function userLinkRecord(pageId, LinkType, LinkCode) {
	let data = {
		userId: localStorage.getItem("UserId"),
		pageId: pageId,
		Devices: getdevice(),//Devices：PC端是01，移动端02,平板是03
		PositionId: getQueryString("PositionId"),
		LinkType: LinkType,//"button"cc,page,
		LinkCode: LinkCode
	}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/UserLinkRecord/Post",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function (res) {

		},
		error: function (errors) {

		}
	});
}

// 页面停留时间
function UserStayPageTime(pageId, positionId,startTime, endTime) {
	let data = {
		userId: localStorage.getItem("UserId"),
		pageId: pageId,
		Devices: getdevice(),//Devices：PC端是01，移动端02,平板是03
		PositionId: positionId,
		startTime: startTime,
		endTime: endTime,
	}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/UserStayPageTime/Post",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function (res) {
			// debugger
		},
		error: function (errors) {

		}
	});
}
function addloading() {
	var commonmodal = '<div class="modal" id="loadingModal">' +
		'<div class="modal-dialog">' +
		'<div class="commonModal">' +
		'<div class="spinner-border text-primary spinner-lg" role="status">' +
		'<span class="sr-only">Loading...</span>' +
		'</div>' +
		'</div>' +
		' </div>' +
		'</div>'
	$("body").append(commonmodal)
}

//展示loading框
function showLoading() {
	$('#loadingModal').modal({ backdrop: 'static', keyboard: false });
}
//隐藏掉loading框
function hideLoading() {
	setTimeout(function () {
		$('#loadingModal').modal('hide');
	}, 200)

}


// $("body").click(function (e) {
// 	if (!$(e.target).closest(".header-search,.bigger-search").length) {
// 	  $(".header-search").hide();
// 	  $('.phs-search-suggestions').hide();
// 	}
// 	if (!$(e.target).closest(".country-link").length && $('li.country-link .icon').hasClass('icon-up-arrow')) {
// 	  openCountry();
// 	}
//   });
function toggle_visibility() {
	if ($(".ph-navigation").hasClass("ph-mobile-navigation")) {
		$(".ph-navigation").removeClass("ph-mobile-navigation")
		$(".icon-menu").removeClass("icon-cancel")
	} else {
		$(".ph-navigation").addClass("ph-mobile-navigation")
		$(".icon-menu").addClass("icon-cancel")
	}
}
function toggle_visibility2() {
	$(".navbar-nav2").toggle();
	$(".navbar-nav3").hide()
	$(".navbar-nav4").hide()
}
function toggle_visibility3() {
	$(".navbar-nav3").toggle();
	$(".navbar-nav2").hide()
	$(".navbar-nav4").hide()
}
function toggle_visibility4() {
	$(".navbar-nav4").toggle();
	$(".navbar-nav3").hide()
	$(".navbar-nav2").hide()
	if ($('.visibility4 .icon').hasClass('icon-down-arrow')) {
		$(".visibility4 .icon").addClass("icon-up-arrow")
		$(".visibility4 .icon").removeClass("icon-down-arrow")

	} else {
		$(".visibility4 .icon").addClass("icon-down-arrow")
		$(".visibility4 .icon").removeClass("icon-up-arrow")
	}
}

function openSearch(e) {
	$(e.nextElementSibling).css('display', 'flex');
	if(keyword){
		return
	}
	$('.phs-keysearch-clear').hide();
}
function openSearchList() {
	$('.phs-search-suggestions').show()
	searchConditionPosition();
	// $('.phs-search-suggestions').css('display', 'table')
}

//   var flag = true;
//   $('.job-filter input').on('compositionstart', function () {
// 	flag = false;
//   });
//   $('.job-filter input').on('compositionend', function () {
// 	flag = true;
//   });
//   $('.job-filter input').on('input', function (e) {
// 	setTimeout(function () {
// 	  if (flag) {
// 		keyword = e.currentTarget.value;
// 		if (e.currentTarget.value != "") {
// 		  // $(this).parent().next().show()
// 		  $('.phs-keysearch-clear').show()
// 		} else {
// 		  $('.phs-keysearch-clear').hide()
// 		}
// 		searchPosition();
// 		$('.phs-jobs-suggested').hide()
// 		$('.phs-categorys').hide()
// 		$('.phs-locations-suggested').hide()
// 		$('.phs-recentsearches-suggested').hide()
// 	  }
// 	}, 0);
//   });

//   $('.phs-keysearch-clear').click(function (e) {
// 	$(".job-filter input").val("");
// 	$(e.currentTarget.parentElement.parentElement).hide();
// 	$('.phs-search-suggestions').hide();
//   });
function openCountry() {
	if ($('li.country-link .icon').hasClass('icon-down-arrow')) {
		$("li.country-link .icon").addClass("icon-up-arrow")
		$("li.country-link .icon").removeClass("icon-down-arrow")
		$("li.country-link").addClass("active")

	} else {
		$("li.country-link .icon").addClass("icon-down-arrow")
		$("li.country-link .icon").removeClass("icon-up-arrow")
		$("li.country-link").removeClass("active")
	}
	$('li.country-link ul.menupanel').toggle()
}
function compare(property) {
	return function (a, b) {
		var value1 = a[property];
		var value2 = b[property];
		return value2 - value1;
	}
}
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
function searchConditionPosition() {
	
	let param = {
		keyword: keyword,
		UserId: Number(localStorage.getItem("UserId")),
		jobtype:jobtype
	}
	$.ajax({
		type: "get",
		url: domainUrl + "/hrapi/api/Position/SearchConditionPosition",
		contentType: "application/json",
		data: param,
		dataType: 'JSON',
		success: function (res) {
			$('.phs-categorys ul li,.phs-jobs-suggested ul li,.phs-locations-suggested ul li,.phs-recentsearches-suggested ul li').remove();
			let temp = res.data.sort(compare("TypeCount"))
			handleHeaderSearch(res.data);
		},
		error: function (errors) {
		}
	});
}
function getCollectionList(JobType) {
	let data = {
		UserIdGuid: localStorage.getItem("UserIdGuid"),
		UserId: localStorage.getItem("UserId"),
		pageSize: 9999,
		pageIndex: 1,
		sortName: "CreatedTime",
		sortOrder: "desc",
		MPPositionIdJobType: JobType
	}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/PositionCollection/GetCollection",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function (res) {
			let data = res.rows.length;
			if (data > 0) {
				$('.pc_header .header_nav .nav_links .starLi a i,.mobile_header_icons .starLi a i').removeClass('icon-star-empty')
				$('.pc_header .header_nav .nav_links .starLi a i,.mobile_header_icons .starLi a i').addClass('icon-star')
				$('.pc_header .header_nav .nav_links .starLi a .starNums,.mobile_header_icons .starLi a .starNums').remove();
				$('.pc_header .header_nav .nav_links .starLi a,.mobile_header_icons .starLi a').append('<span class="starNums">' + data + '</span>')
			} else {
				$('.pc_header .header_nav .nav_links .starLi a i,.mobile_header_icons .starLi a i').removeClass('icon-star')
				$('.pc_header .header_nav .nav_links .starLi a i,.mobile_header_icons .starLi a i').addClass('icon-star-empty')
				$('.pc_header .header_nav .nav_links .starLi a .starNums,.mobile_header_icons .starLi a .starNums').remove();
			}
		},
		error: function (errors) {

		}
	});
}

function showWeixin() {
	$('.weixinPop').show()
	$('.weixinBox').show()
}

function closeWeixin() {
	$('.weixinPop').hide()
	$('.weixinBox').hide()
}