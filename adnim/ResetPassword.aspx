<%@ Page Title="" Language="C#" MasterPageFile="~/adnim/SiteAdmin.Master" AutoEventWireup="true" CodeBehind="ResetPassword.aspx.cs" Inherits="Web.adnim.ResetPassword" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link  rel="stylesheet" href="assets/bootstrap-fileinput/css/fileinput.min.css"/>
   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<%--  <button class="btn btn-lg btn-success">
												<i class="icon-file"></i>
												Success
											</button>--%>

      <div class="page-content" ms-controller="NewsView">
        <div class="page-header">
            <h1>重置密码 </h1>
        </div>
        <!-- /.page-header -->

        <div class="row">
            <div class="col-xs-12">
                <!-- PAGE CONTENT BEGINS -->

                    <input type="hidden" id="NewsID" name="NewsID" runat="server"/>
                    <div class="form-group">
                        <label class="col-sm-1 control-label no-padding-right" for="NewsTitle">原密码 </label>

                        <div class="col-sm-9">
                            <input type="password" id="password" name="NewsTitle"  placeholder="原密码"  class="col-xs-10 col-sm-5" />
                        </div>
                    </div>
                <br />

                  

                <br />
                    <div class="space-4"></div>

                    <div class="form-group">
                        <label class="col-sm-1 control-label no-padding-right" for="ComeFrome">新密码 </label>

                        <div class="col-sm-9">
                            <input type="password" id="newpassword" name="ComeFrome" placeholder="新密码" class="col-xs-10 col-sm-5" />
                        </div>
                    </div>
                <br />

                   <br />
                    <div class="space-4"></div>

                    <div class="form-group">
                        <label class="col-sm-1 control-label no-padding-right" for="ComeFrome">重复密码 </label>

                        <div class="col-sm-9">
<input type="password" id="repassword" placeholder="重复密码" class="col-xs-10 col-sm-5" />
                        </div>
                    </div>
                <br />
                        <div class="space-4"></div>

                    <div class="form-group">
                        <label class="col-sm-1 control-label no-padding-right" for="ComeFrome"> </label>

                        <div class="col-sm-9">
                                          <button type="button" id="btn-uploadfile_u" data-size="s" data-style="zoom-in" class="btn btn-purple btn-sm ladda-button">
        更新
	<i class="icon-key icon-on-right bigger-110"></i>
    </button> </div>
                    </div>
                <br />


                <script type="text/javascript">
                    var $path_assets = "assets";//this will be used in loading jQuery UI if needed!
                </script>

                <!-- PAGE CONTENT ENDS -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.page-content -->

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptBlock" runat="server">
    <script src="assets/js/date-time/bootstrap-datepicker.min.js"></script>
    <script src="assets/js/jquery.hotkeys.min.js"></script>
    <script src="assets/js/bootstrap-wysiwyg.min.js"></script>
    <script src="assets/js/avalon.js"></script>
    <script src="/adnim/assets/js/ladda/js/spin.js"></script>


<script src="/adnim/assets/js/ladda/js/ladda.js"></script>
    <script type="text/javascript">
        var op = "add";
        var errorgrit = function (title, text) {
            $.gritter.add({
                title: title,
                text: text,
                class_name: 'gritter-error ' + ' gritter-light',
                time: '5000',

            });

            // return false;
        }
        var successgrit = function (title, text) {

            $.gritter.add({
                title: title,
                text: text,
                class_name: 'gritter-success ' + ' gritter-light',
                time: '5000',

            });

            // return false;
        }
        $("#btn-uploadfile_u").click(function(){
        
            var lb = Ladda.create(this);

            if ($("#password").val().length ==0) {
                errorgrit("错误", "请输入原密码");
                return false;
            }
            if ($("#newpassword").val().length < 5) {
                errorgrit("错误", "新密码的长度在5-20之间");
                return false;
            }
            if ($("#newpassword").val() != $("#repassword").val()) {
                errorgrit("错误", "2次密码必须一致");
                return false;
            }
            var s = {
                password: $("#password").val(),
                newpassword: $("#newpassword").val()
            };
            lb.start();
            $.ajax({
                type: "post",
                url: "handler/Gobalhandler.ashx?_op=usermodifypassword",
                data:s,
                //data: { ProductID: $obj.attr("itemid"), Num: $quantity.val() },
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        successgrit("成功", "更新成功");
                    }
                    else {
                        errorgrit("错误", "更新失败");
                  
                     

                    }
                    lb.stop();
                },
                error: function () {
                    lb.stop();
                    errorgrit("错误", "数据加载出错,请刷新页面");
   
                }
            });
        })

    </script>

    </asp:Content>