var jobtype='03'
function showCookie() {
	$("body").prepend('<div class="cookie-popup-area"><div class="cookie-text-area sc-content"><p>We use cookies to offer you a better browsing experience, analyze sitetraffic, and personalize content. Read about how we use cookies and how you can control them by visiting our Cookie Settings page. If you continue to use this site, you consent to our use of cookies.</p></div><div class="cookie-button-area sc-content"><a href="/cookiesettings-student.html">Cookie Settings</a><button><i class="icon icon-check-mark"></i>Allow</button></div></div>')	
	var cookieHeight = $('.cookie-popup-area').outerHeight();
	$("body").css("padding-top", cookieHeight);
	$(window).resize(function () {
		var cookieHeight = $('.cookie-popup-area').outerHeight();
		$("body").css("padding-top", cookieHeight);
	});
}

function handleHeaderSearch(data){
	$.each(data, function (index, i) {
		switch (i.searchType) {
		  case "0":
			$('.phs-jobs-suggested').show()
			$('.phs-jobs-suggested ul').append('<li><a href="/jobDetail-student-'+ i.TypeId +'.html?PositionId='+i.TypeId+'"><div class="phs-job-title"><span>'+i.TypeName+'</span></div><div class="phs-job-info"><span>'+i.Area+ '</span><span class="phs-job-category">'+i.PTName+'</span></div></a></li>')
			break;
		  case "1":
			$('.phs-categorys').show()
			$('.phs-categorys ul').append('<li><a href="/search-results-student.html?TypeId=' + i.TypeId + '"><span>' + i.TypeName + '</span><span class="phs-jobs-count">' + i.TypeCount + '</span></a></li>')
			break;
			case "2":
			$('.phs-locations-suggested').show()
			$('.phs-locations-suggested ul').append('<li><a href="/search-results-student.html?qcity='+i.TypeId+'"><span>'+i.TypeName+'</span><span class="phs-jobs-count">'+i.TypeCount+'</span></a></li>')
			break;
			case "3":
			$('.phs-recentsearches-suggested').show()
			$('.phs-recentsearches-suggested ul').append(' <li><a href="/search-results-student.html?keyword='+i.TypeName+'"><span>'+i.TypeName+'</span></a></li>')
		}
		
	  })
}
function gotoSearchPage(keywords){
	window.location.href='/search-results-student.html?keywords='+keywords;
}
$(function(){
	var useridInterval=setInterval(() => {
        if (parseInt(localStorage.getItem("UserId"))) {
			getCollectionList('03')
			clearInterval(useridInterval)
        }
    }, 200);
})
