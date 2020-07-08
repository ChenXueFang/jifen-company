function ajaxFileUpload(eid) {
   
    if (!fileTypeVali($("#" + eid).val())) {
        return false;
    }
    $.ajaxFileUpload({
			    url: 'DoUpload.aspx',
			    secureuri: false,
			    fileElementId: eid,
			    dataType: 'json',
			    beforeCall: function ()
			    {
			        $("#upview").attr("src", "images/big_loading.gif").addClass("upload_loading").removeClass("preview");
			    },
			    success: function (data, status) {
			        if (data.result != "error") {
			            $("#upview").attr("src", data.result);
			            $("#upview").load(function () {
			                if ($(this).attr("src").indexOf("big_loading.gif") != -1)
			                    $("#upview").addClass("upload_loading").removeClass("preview");
			                else
			                    $("#upview").addClass("preview").removeClass("upload_loading");
			            });
			        } else {
			            alert(data.msg);
			        }
			    },
			    error: function (data, status, e) {
			        alert("上传失败！");
			        $("#upview").attr("src", "images/vode-upload.png").addClass("preview").removeClass("upload_loading");
			    }
			})
}


//上传时文件类型验证
function fileTypeVali(fileName)
{   
    if (fileName == "")
    {
       alert('请选择要导入的图片文件!');
      
        return false;
    }
    var type = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    if (type != ".jpeg" && type != ".gif" && type != ".bmp" && type != ".png" && type != ".jpg")
    {
        alert('只限于JPEG, GIF,PNG, BMP ,JPG文件!');
        return false;
    }
    return true;
}

//上传扫描二维码
function ajaxUploadQRcode(eid) {

    if (!fileTypeVali($("#" + eid).val())) {
        return false;
    }
    $.ajaxFileUpload({
        url: 'DoUploadQR.aspx?type=scanQRcode',
        secureuri: false,
        fileElementId: eid,
        dataType: 'json',
        beforeCall: function () {
            $("#viewQRcode").attr("src", "images/big_loading.gif").addClass("upload_loading").removeClass("preview");
        },
        success: function (data, status) {
            if (data.success == "true") {
                $("#uploadTip").html(data.msg);
                $("#viewQRcode").attr("src", data.url);
                $("#viewQRcode").load(function () {
                    if ($(this).attr("src").indexOf("big_loading.gif") != -1)
                        $("#viewQRcode").addClass("upload_loading").removeClass("preview");
                    else
                        $("#viewQRcode").addClass("preview").removeClass("upload_loading");
                });
            } else {
                $("#uploadTip").html(data.msg);
                //$("#viewQRcode").addClass("preview").removeClass("upload_loading");
                $("#viewQRcode").attr("src", "").addClass("preview").removeClass("upload_loading");//images/vode-upload.png
                alert(data.msg);
            }
        },
        error: function (data, status, e) {
            alert("上传失败！"+data.responseText);
            $("#viewQRcode").attr("src", "").addClass("preview").removeClass("upload_loading");//images/vode-upload.png
        }
    })
}