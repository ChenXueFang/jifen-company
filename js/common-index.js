function showCookie() {
	$("body").prepend('<div class="cookie-popup-area"><div class="cookie-text-area sc-content"><p>We use cookies to offer you a better browsing experience, analyze sitetraffic, and personalize content. Read about how we use cookies and how you can control them by visiting our Cookie Settings page. If you continue to use this site, you consent to our use of cookies.</p></div><div class="cookie-button-area sc-content"><a href="/cookiesettings.html">Cookie Settings</a><button><i class="icon icon-check-mark"></i>Allow</button></div></div>')	
	var cookieHeight = $('.cookie-popup-area').outerHeight();
	$("body").css("padding-top", cookieHeight);
	$(window).resize(function () {
		var cookieHeight = $('.cookie-popup-area').outerHeight();
		$("body").css("padding-top", cookieHeight);
	});
}