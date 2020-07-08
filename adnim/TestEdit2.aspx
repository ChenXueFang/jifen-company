<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="TestEdit.aspx.cs" Inherits="ACETemplate.adnim.TestEdit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="assets/css/bootstrap-editable.css" />
    <link rel="stylesheet" href="assets/css/chosen.css" />
    <link rel="stylesheet" href="assets/css/ace.min.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <form id="form1">
        <div class="page-content" vue="Test">

            <div class="row">
                <div class="col-xs-2 right" style="text-align: right">
                    <label class=" control-label no-padding-right" for="Text">Text</label>
                </div>
                <div class="col-xs-10 left">

                    <input type="text" id="Text" maxlength="50" v-model="Text" name="Text" placeholder="" class="col-xs-10 col-sm-5" />
                </div>
            </div>
            <div class="space-4"></div>

            <div class="row">
                <div class="col-xs-2 right" style="text-align: right">
                    <label class=" control-label no-padding-right" for="Type">Type</label>
                </div>
                <div class="col-xs-10 left">

                    <select v-model="Type" name="Type" class="width-80  chosen-select col-sm-2 " id="form-field-select-3" data-placeholder="Choose a ...">
                        <option v-for="item in  TypeSelect " v-bind:value="item.ID">{{item.Text}}</option>
                    </select>
                </div>
            </div>
            <div class="space-4"></div>

            <div class="row">
                <div class="col-xs-2 right" style="text-align: right">
                    <label class="control-label no-padding-right" for="NewsTitle">图片(35*35) </label>
                </div>
                <div class="col-xs-10 left">
                    <span class="profile-picture">
                        <img id="avatar" class="editable img-responsive" v-bind:src="Image" alt="上传图片" />
                    </span>
                    <input type="hidden" name="imgsrc" id="imgsrc" v-model="Image">
                </div>
            </div>

            <div class="row">
                <div class="col-xs-2 right" style="text-align: right">
                    <label class=" control-label no-padding-right" for="IsDelete">Is Delete</label>
                </div>
                <div class="col-xs-10 left">
                    <label>
                        <input id="IsDelete" name="IsDelete" v-model-checked="IsDelete" value="true" class="ace ace-switch ace-switch-5" type="checkbox" />
                        <span class="lbl"></span>
                    </label>
                </div>
            </div>
            <div class="space-4"></div>

            <div class="row">
                <div class="col-xs-2 right" style="text-align: right">
                    <label class=" control-label no-padding-right" for="UserId">User Id</label>
                </div>
                <div class="col-xs-10 left">
                    <input type="text" id="UserId" maxlength="9" v-model="UserId" name="UserId" placeholder="" class="col-xs-10 col-sm-2" />
                </div>
            </div>
            <div class="space-4"></div>

            <div class="row">
                <div class="col-xs-2 right" style="text-align: right">
                </div>
                <div class="col-xs-10 left">
                    <button type="submit" data-size="s" data-style="zoom-in" id="btn_Test" class="btn btn-primary btn-sm ladda-button">Send</button>
                </div>
            </div>
        </div>
    </form>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptBlock" runat="server">
    <script src="assets/js/ladda/js/spin.js"></script>
    <script src="assets/js/jquery.autosize.min.js"></script>
    <script src="assets/js/ladda/js/ladda.js"></script>
    <script src="assets/js/avalon/avalon.js"></script>
    <script src="assets/js/jquery.validate.min.js"></script>
    <script src="js/OperItem.js"></script>
    <script src="js/searchFiter.js"></script>
    <script src="assets/js/x-editable/bootstrap-editable.min.js"></script>
    <script src="assets/js/x-editable/ace-editable.min.js"></script>

    <script>
        var vm=null;

        $(function(){

            var id = <%=Id%>;
            if (id > 0) {
                $("#btn_Test").text("更新");

                LoadActivity();
            }
            else {
                LoadType();
                $("#btn_Test").text("添加");

            }

            function LoadType(){
                HttpAjax.ajaxget("handler/information.ashx?_op=TestTypeQuery",{page:1,rows:1000},function(data){
                    var d = data;
                    if (d.success) {
                        vm.TextTypeSelect=d.rows;
                        //如果需要用select2 开启下列代码
                        bindselect("Type");

                    }
                    else {
                        mygritter.errorgrit("错误", d.msg);
                        //  setTimeout(LoadArray, 300);
                    }

                })

            }

            function bindselect(name){
                jQuery(".chosen-select[name='"+name+"']").trigger("liszt:updated");
                jQuery(".chosen-select[name='"+name+"']").chosen().on("change", function (evt, params) {
                    eval("vm." +name+"= params.selected");
                });

            }
            function LoadActivity() {
                var datas = getSearch();
                datas.rows = 1;
                datas.needforeignkey=true;
                datas.fiters.rulesAdd("ID", "=", id);
                jQuery.ajax({
                    url: 'handler/information.ashx?_op=TestQuery',
                    type: 'GET',
                    dataType: "json",
                    data: getSearchParams(datas),
                    success: function (data) {
                        var d = data;
                        if (d.success) {
                            vm = jQuery.extend(vm, d.rows[0]);

                            //如果需要用select2 开启下列代码
                            bindselect("Type");

                        }
                        else {

                            mygritter.errorgrit("错误", d.msg);
                            //  setTimeout(LoadArray, 300);
                        }
                    },
                    error: function (err) {
                        mygritter.errorgrit("网络错误",err.statusText);

                    }

                });
            }

            vm= new Vue({
                el:"div[vue=Test]",
                data:{
                    ID:"",
                    Text:"",
                    Type:"",
                    TypeSelect:[],
                    Image:"",
                    Noedit:"",
                    IsDelete:"",
                    UserId:"",
                    NoEdit1:"",
                }
            });

            $('#form1').validate({
                errorElement: 'div',
                errorClass: 'help-block',
                focusInvalid: false,
                rules: {
                    ID: {
                        required:false,
                        digits:true,
                    },
                    Text: {
                        required:false,
                    },
                    Type: {
                        required:false,
                        digits:true,
                    },
                    Image: {
                        required:false,
                    },
                    Noedit: {
                        required:false,
                    },
                    IsDelete: {
                        required:false,
                    },
                    UserId: {
                        required:false,
                        digits:true,
                    },
                    NoEdit1: {
                        required:false,
                    },

                },

                messages: {
                    ID: {

                    },
                    Text: {

                    },
                    Type: {

                    },
                    Image: {

                    },
                    Noedit: {

                    },
                    IsDelete: {

                    },
                    UserId: {

                    },
                    NoEdit1: {

                    },

                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    // alert("s");
                    // $('.alert-danger', $('.login-form')).show();
                },

                highlight: function (e) {
                    // alert("sd");

                    $(e).closest('.row').removeClass('has-info').addClass('has-error');
                },

                success: function (e) {
                    $(e).closest('.row').removeClass('has-error').addClass('has-info');
                    $(e).remove();
                },

                errorPlacement: function (error, element) {
                    if (element.is(':checkbox') || element.is(':radio')) {
                        var controls = element.closest('div[class*="col-"]');
                        if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                        else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
                    }
                    else if (element.is('.select2')) {
                        error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
                    }
                    else if (element.is('.chosen-select')) {
                        error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
                    }
                    else if (element.is('.date-picker')) {
                        error.insertAfter(element.parent());
                    }
                    else error.insertAfter(element);
                },
                debug: true,

                submitHandler: function (form) {

                    var l = Ladda.create(document.querySelector('#btn_Test'));
                    l.start();
                    debugger;
                    var post = null;
                    if (id > 0) {
                        post = OperItem.EditOper(vm);

                    }

                    else {  post = OperItem.AddOper(vm); }
                    //post移除不需要绑定字段
                    var remove={
                        Noedit:"",
                        NoEdit1:"",
                        el:""
                    }
                    var newpost={};
                    $.extend(newpost,post);
                    jQuery.myPlugin.deleteproperty(newpost,remove);
                    debugger;
                    jQuery.ajax({
                        url: 'handler/information.ashx?_op=Test',
                        data:newpost,
                        type: 'POST',
                        dataType: "json",
                        success: function (data) {
                            l.stop();
                            var d = data;
                            if(d.success){
                                vm = jQuery.extend(vm, d.data);
                                $("#btn_Test").text("更新");
                                mygritter.successgrit("成功", "操作成功");
                                id=vm.ID;
                            }
                            else{
                                mygritter.errorgrit("失败", "操作失败");
                            }
                        },
                        error: function (err) {
                            mygritter.errorgrit("失败",err.status);
                            l.stop();
                        }

                    });
                },
                invalidHandler: function (form) {
                }

            });

            $('textarea[class*=autosize]').autosize({append: ""});

        })
    </script>

    <script type="text/javascript">
        jQuery(function ($) {

            //editables on first profile page
            jQuery.fn.editable.defaults.mode = 'inline';
            jQuery.fn.editableform.loading = "<div class='editableform-loading'><i class='light-blue icon-2x icon-spinner icon-spin'></i></div>";
            jQuery.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="icon-ok icon-white"></i></button>' +
                                        '<button type="button" class="btn editable-cancel"><i class="icon-remove"></i></button>';

            // *** editable avatar *** //
            try {//ie8 throws some harmless exception, so let's catch it

                //it seems that editable plugin calls appendChild, and as Image doesn't have it, it causes errors on IE at unpredicted points
                //so let's have a fake appendChild for it!
                if (/msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase())) Image.prototype.appendChild = function (el) { }

                var last_gritter
                $('#avatar').editable({
                    type: 'image',
                    name: 'avatar',
                    value: null,
                    image: {
                        //specify ace file input plugin's options here
                        btn_choose: 'Change Avatar',
                        droppable: true,
                        /**
                        //this will override the default before_change that only accepts image files
                        before_change: function(files, dropped) {
                            return true;
                        },
                        */

                        //and a few extra ones here
                        name: 'avatar',//put the field name here as well, will be used inside the custom plugin
                        max_size: 11000000,//~100Kb
                        on_error: function (code) {//on_error function will be called when the selected file has a problem
                            if (last_gritter) jQuery.gritter.remove(last_gritter);
                            if (code == 1) {//file format error
                                last_gritter = jQuery.gritter.add({
                                    title: 'File is not an image!',
                                    text: 'Please choose a jpg|gif|png image!',
                                    class_name: 'gritter-error gritter-center'
                                });
                            } else if (code == 2) {//file size rror
                                last_gritter = jQuery.gritter.add({
                                    title: 'File too big!',
                                    text: 'Image size should not exceed 100Kb!',
                                    class_name: 'gritter-error gritter-center'
                                });
                            }
                            else {//other error
                            }
                        },
                        on_success: function () {
                            jQuery.gritter.removeAll();
                        }
                    },
                    url: function (params) {
                        // ***UPDATE AVATAR HERE*** //
                        //You can replace the contents of this function with examples/profile-avatar-update.js for actual upload

                        //This is similar to the file-upload.html example
                        //Replace the code inside profile page where it says ***UPDATE AVATAR HERE*** with the code below

                        //please modify submit_url accordingly
                        var submit_url = 'handler/information.ashx?_op=TestUpload';

                        var deferred;

                        //if value is empty, means no valid files were selected
                        //but it may still be submitted by the plugin, because "" (empty string) is different from previous non-empty value whatever it was
                        //so we return just here to prevent problems
                        //var value = $('#avatar').next().find('input[type=hidden]:eq(0)').val();
                        //if (!value || value.length == 0) {
                        //    deferred = new jQuery.Deferred
                        //    deferred.resolve();
                        //    return deferred.promise();
                        //}

                        var $form = $('#avatar').next().find('.editableform:eq(0)')
                        var file_input = $form.find('input[type=file]:eq(0)');

                        ////user iframe for older browsers that don't support file upload via FormData & Ajax

                        var fd = null;
                        try {
                            fd = new FormData($form.get(0));
                        } catch (e) {
                            //IE10 throws "SCRIPT5: Access is denied" exception,
                            //so we need to add the key/value pairs one by one
                            fd = new FormData();
                            jQuery.each($form.serializeArray(), function (index, item) {
                                fd.append(item.name, item.value);
                            });
                            //and then add files because files are not included in serializeArray()'s result
                            $form.find('input[type=file]')
								.each(function () {
								    if (this.files.length > 0) fd.append(this.getAttribute('name'), this.files[0]);
								});
                        }

                        //if file has been drag&dropped , append it to FormData
                        if (file_input.data('ace_input_method') == 'drop') {
                            var files = file_input.data('ace_input_files');
                            if (files && files.length > 0) {
                                fd.append(file_input.attr('name'), files[0]);
                            }
                        }

                        deferred =jQuery.ajax({
                            url: submit_url,
                            type: 'POST',
                            processData: false,
                            contentType: false,
                            dataType: 'json',
                            data: fd,
                            xhr: function () {
                                var req = jQuery.ajaxSettings.xhr();
                                /*if (req && req.upload) {
                                    req.upload.addEventListener('progress', function(e) {
                                        if(e.lengthComputable) {
                                            var done = e.loaded || e.position, total = e.total || e.totalSize;
                                            var percent = parseInt((done/total)*100) + '%';
                                            //bar.css('width', percent).parent().attr('data-percent', percent);
                                        }
                                    }, false);
                                }*/
                                return req;
                            },
                            beforeSend: function () {
                                //bar.css('width', '0%').parent().attr('data-percent', '0%');
                            },
                            success: function () {
                                //bar.css('width', '100%').parent().attr('data-percent', '100%');
                            }

                        })

                        deferred.done(function (res) {

                            if (res.success == true) {
                                $('#avatar').get(0).src = res.data.SaveFileNamePath;
                                vm.SubjectPic = res.data.SaveFileNamePath;
                                mygritter.successgrit("上传", "图片上传成功");
                            }

                            else mygritter.errorgrit("上传", "图片上传失败");
                            ;
                        }).fail(function (res) {
                            mygritter.errorgrit("上传", "图片上传失败");
                        });

                        return deferred.promise();
                    },

                    success: function (response, newValue) {
                    }
                })
            } catch (e) { }

        });
    </script>
</asp:Content>