$(function () {
    var firstNameR = "", lastNameR= "",emailR= "",categoryR ="",countryR="",checkedFormR = "";

    // 勾选框，This is required的显示状态
    $("#optIn").click(function () {
        if ($(this).prop("checked") == true) {
            checkedFormR = true
            $(".checkedNone").css({ "display": "none" })
        } else {
            checkedFormR = ""
            $(".checkedNone").css({ "display": "block" })
        }
    });

    // 表单验证，提交按钮
    $(".submit").click(function () {
        var myReg = /^[a-zA-Z\u4e00-\u9fa5 ]{1,20}$/;//验证输入的firstname、lastname
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;//验证邮箱

        // 勾选框
        if (!checkedFormR) {
            $(".checkedNone").css({ "display": "block" })
        }

        // firstName
        if ($("#firstName").val() == "") {
            $(".judge1").css({ "display": "block" }).html("Please Enter First Name");
        } else {
            $(".judge1").css({ "display": "none" });
            if (myReg.test($("#firstName").val())) {
                firstNameR = $("#firstName").val();
                $(".judge1").css({ "display": "none" });
            } else {
                $(".judge1").css({ "display": "block" }).html("Please enter valid First Name");
            }
        }
        // lastName
        if ($("#lastName").val() == "") {
            $(".judge2").css({ "display": "block" });
        } else {
            if (myReg.test($("#lastName").val())) {
                lastNameR = $("#lastName").val();
                $(".judge2").css({ "display": "none" });
            } else {
                $(".judge2").css({ "display": "block" }).html("Please enter valid Last Name.");
            }
        }
        // email
        if ($("#email").val() == "") {
            $(".judge3").css({ "display": "block" });
        } else {
            if (reg.test($("#email").val())) {
                emailR = $("#email").val();
                $(".judge3").css({ "display": "none" });
            } else {
                $(".judge3").css({ "display": "block" });
                $(".judge1").html("Please Enter valid Email Address")
            }
        }
         // category
         if ($("#category").val() == "") {
             $(".judge4").css({ "display": "block" });
             //当里面有值了就不显示下面的警告
             $('#category').change(function(){
                 $(".judge4").css({ "display": "none" });
             });
         } else {
             categoryR = $("#category").val();
             $(".judge4").css({ "display": "none" });
         }
         // country
         if ($("#country").val() == "") {
             $(".judge5").css({ "display": "block" });
             //当里面有值了就不显示下面的警告
             $('#country').change(function(){
                 $(".judge5").css({ "display": "none" });
             });
         } else {
             countryR = $("#country").val();
             $(".judge5").css({ "display": "none" });
         }
        // firstname的边输入边判断
        $("#firstName").on('input', function () {
            if (myReg.test($(this).val())) {
                $(".judge1").css({ "display": "none" });
            } else {
                if ($(this).val()) {
                    $(".judge1").css({ "display": "block" }).html("Please enter valid First Name");
                } else {
                    $(".judge1").html("Please enter First Name")
                }
            }
        })
        // lastname的边输入边判断
        $("#lastName").on('input', function () {
            if (myReg.test($(this).val())) {
                $(".judge2").css({ "display": "none" });
            } else {
                if ($(this).val()) {
                    $(".judge2").css({ "display": "block" }).html("Please enter valid Last Name");
                } else {
                    $(".judge2").html("Please enter Last Name")
                }

            }
        })
        // 邮箱的边输入边判断
        $("#email").on('input', function () {
            if (reg.test($(this).val())) {
                $(".judge3").css({ "display": "none" });
            } else {
                if ($(this).val()) {
                    $(".judge3").css({ "display": "block" }).html("Please Enter valid Email Address");
                } else {
                    $(".judge3").html("Please Enter Email Address")
                }
            }
        })

        // 表单提交接口
        if(firstNameR&&lastNameR&&emailR&&categoryR&&countryR&&checkedFormR){
            showLoading();
            let data = {
                userIdGuid: localStorage.getItem("UserIdGuid"),
                firstName: firstNameR,
                lastName: lastNameR,
                email: emailR,
                expertiseArea: categoryR,
                country: countryR,
                isRecive: checkedFormR
            }
            $.ajax({
                type: "post",
                url: domainUrl + "/hrapi/api/Users/PostRegistInfo",
                contentType: "application/json",
                data: JSON.stringify(data),
                dataType: 'JSON',
                success: function (res) {
                    hideLoading()
                    if(res.state==1){
                        $(".formSuccess").css({ "display": "block" });
                        $(".formContainer").css({ "display": "none" });
                        userLinkRecord(hrpageid, 'button', 'jointalentcommunity-submit')
                    }
                },
                error: function (errors) {
                    hideLoading()
                }
            });
        }
    })

    // 这是什么意思 按钮埋点
    $(".whatMean").click(function () {
        userLinkRecord(hrpageid, 'button', 'whatMean')
    })

    // 底部Career Site Cookie Settings 按钮埋点
    $(".cookieSettingsBtn").click(function () {
        userLinkRecord(hrpageid, 'button', 'cookieSettingsBtn')
    })

    // 底部Personal Information 按钮埋点
    $(".personalInformationBtn").click(function () {
        userLinkRecord(hrpageid, 'button', 'personalInformationBtn')
    })



});
