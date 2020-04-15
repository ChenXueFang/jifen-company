if(localStorage.getItem("Cchecked")=='false'){
    $("#checkbox2").prop("checked",false);
}
$(".phs-checkbox2").click(function () {
    if ($("#checkbox2")[0].checked) {
        $('.value').html('enabled!')
        localStorage.setItem("Cchecked", true);
    } else {
        $('.value').html('disabled!')
        localStorage.setItem("Cchecked", false);
    }
    $("body").css("padding-top", 0);
    $("body .cookie-popup-area").remove();
    userLinkRecord(hrpageid, 'button', 'cookieButton' + $("#checkbox2")[0].checked)
});