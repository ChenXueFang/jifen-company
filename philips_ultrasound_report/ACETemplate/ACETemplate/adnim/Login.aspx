<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="ACETemplate.Login" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>登录 - <%=ACETemplate.SiteHelper.SiteName %></title>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- basic styles -->
    
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/font-awesome.min.css" />

    <!--[if IE 7]>
		  <link rel="stylesheet" href="assets/css/font-awesome-ie7.min.css" />
		<![endif]-->

    <!-- page specific plugin styles -->

    <!-- fonts -->

    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" />

    <!-- ace styles -->

    <link rel="stylesheet" href="assets/css/ace.min.css" />
    <link rel="stylesheet" href="assets/css/ace-rtl.min.css" />
    <link href="css/element-ui.css" rel="stylesheet" />
    <style type="text/css">
        .bground {
            background: url(assets/images/loginbg.png);
            filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
            background-size: 100% 100%;
            background-repeat:no-repeat
        }
        .main-container{
            margin-top:150px
        }
        .logo{
            width:70px
        }
        .title{
            font-size:30px;
            color:#2b7ab3
        }
        .login-container{
            width:680px
        }
        @media only screen and (max-width: 480px){
            .login-container {
                width: 98% !important;
            }
          }
        .login-box{
            background-color:#fff !important;
            	box-shadow: -1px 3px 8px 0px 
		rgba(16, 60, 83, 0.19) !important;
                margin-top:15px;
                border-radius:10px
        }
        .login-layout .widget-box .widget-main{
            background-color:#fff !important
        }
        .logintitle{
            font-size:22px;
            color:#333;
            margin: 10px 0 20px -10px;
        }
        .login-box input{
            width:86%;
            display:inline-block;
            font-size:18px;
            height:50px
        }
        .yzm{
            width:65% !important
        }
        .yzmcode{
            height:50px;
            float:right
        }
        .login-box .labeltext{
            width:13%;
            display:inline-block;
             font-size:18px
        }
        .remember{
            text-align:left
        }
        .loginbtn{
            width: 68%;
	        height: 54px;
	        background-color: #2b7ab3;
	        border-radius: 4px;
            display:block;
            margin:20px auto 30px
        }
        .remember{
            margin-left:13%
        }
        .lbl{
            vertical-align:text-bottom
        }

        .demonstration{
            width: 13%;
            display: inline-block;
            font-size: 18px;
        }
        .el-cascader .el-input .el-input__inner {
            width: 208%;
        }
        .el-input__suffix {
            right: -247px;
        }
        input[readonly] {
            background: #fff!important;
        }
    </style>

    <!--[if lte IE 8]>
		  <link rel="stylesheet" href="assets/css/ace-ie.min.css" />
		<![endif]-->

    <!-- inline styles related to this page -->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

    <!--[if lt IE 9]>
		<script src="assets/js/html5shiv.js"></script>
		<script src="assets/js/respond.min.js"></script>
		<![endif]-->
</head>
<script type="text/javascript">
			window.jQuery || document.write("<script src='assets/js/jquery-2.0.3.min.js'>"+"<"+"/script>");
		
            </script>
<body class="login-layout bground">
    <div class="main-container" id="app">
        <div class="main-content">
            <div class="row">
                <div class="col-sm-10 col-sm-offset-1">
                    <div class="login-container">
                        <div class="center">
                            <img class="logo" src="assets/images/logo1.png"/>
                            <h1>
                                <%--<i class="icon-leaf green"></i>--%>
                                <span class="title"><%=ACETemplate.SiteHelper.SiteName %></span>
                             
                            </h1>
                        </div>

                        <div class="space-6"></div>

                        <div class="position-relative">
                            <div id="login-box" class="login-box visible widget-box no-border">
                                <div class="widget-body">
                                    <div class="widget-main">
                                        <%--<h4 class="header blue lighter bigger">
                                            <i class="icon-coffee green"></i>
                                            Please Enter Your Information
                                        </h4>--%>
                                        <div class="logintitle">用户登录</div>
                                        <div class="space-6"></div>

                                        <form>
                                            <fieldset>
                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
                                                        <span class="labeltext">用户名：</span>
                                                        <input type="text" class="form-control" value="" placeholder="请输入用户名" id="UserName" />
                                                        <%--<i class="icon-user"></i>--%>
                                                    </span>
                                                </label>

                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
                                                        <span class="labeltext">密码：</span>
                                                        <input type="password"  value="" class="form-control" placeholder="请输入密码"  id="Password"/>
                                                        <%--<i class="icon-lock"></i>--%>
                                                    </span>
                                                </label>
                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
                                                        <span class="labeltext">验证码：</span>
                                                        <input  value="" class="form-control yzm" placeholder="请输入图片验证码"  id="code"/>
                                                        <%--<img class="yzmcode" src="assets/images/logo.png"/>--%>
                                                        <img src="VCode.aspx" style="width:115px;height:50px; margin-right:-5px; margin-top:1px;" alt="点击刷新" id="imgValidateCode" />
                                                    </span>
                                                </label>
                                                <label class="block clearfix">
                                                    <common-cascader v-on:cascader='cascader' class="cascader"/>
                                                </label>
                                                <div class="space"></div>

                                                <div class="clearfix">
                                                    <label class="inline remember">
                                                        <input id="remember" type="checkbox" class="ace" style="display:none;"/>
                                                        <span class="lbl">记住密码</span>
                                                    </label>

                                                    <button type="button" class="btn btn-sm btn-primary loginbtn" onclick="return login();">
                                                        <%--<i class="icon-key"></i>--%>
                                                        立即登录
                                                    </button>
                                                </div>

                                                <div class="space-4"></div>
                                            </fieldset>
                                        </form>

                                    </div>
                                    <!-- /widget-main -->

                                </div>
                                <!-- /widget-body -->
                            </div>
                            <!-- /login-box -->

                            <div id="forgot-box" class="forgot-box widget-box no-border">
                                <div class="widget-body">
                                    <div class="widget-main">
                                        <h4 class="header red lighter bigger">
                                            <i class="icon-key"></i>
                                            Retrieve Password
                                        </h4>

                                        <div class="space-6"></div>
                                        <p>
                                            Enter your email and to receive instructions
                                        </p>

                                        <form>
                                            <fieldset>
                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
                                                        <input type="email" class="form-control" placeholder="Email" />
                                                        <i class="icon-envelope"></i>
                                                    </span>
                                                </label>

                                                <div class="clearfix">
                                                    <button type="button" class="width-35 pull-right btn btn-sm btn-danger">
                                                        <i class="icon-lightbulb"></i>
                                                        Send Me!
                                                    </button>
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>
                                    <!-- /widget-main -->

                                    <div class="toolbar center">
                                        <a href="#" onclick="show_box('login-box'); return false;" class="back-to-login-link">Back to login
												<i class="icon-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                                <!-- /widget-body -->
                            </div>
                            <!-- /forgot-box -->

                            <div id="signup-box" class="signup-box widget-box no-border">
                                <div class="widget-body">
                                    <div class="widget-main">
                                        <h4 class="header green lighter bigger">
                                            <i class="icon-group blue"></i>
                                            New User Registration
                                        </h4>

                                        <div class="space-6"></div>
                                        <p>Enter your details to begin: </p>

                                        <form>
                                            <fieldset>
                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
                                                        <input type="email" class="form-control" placeholder="Email" />
                                                        <i class="icon-envelope"></i>
                                                    </span>
                                                </label>

                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
                                                        <input type="text" class="form-control" placeholder="Username" />
                                                        <i class="icon-user"></i>
                                                    </span>
                                                </label>

                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
                                                        <input type="password" class="form-control" placeholder="Password" />
                                                        <i class="icon-lock"></i>
                                                    </span>
                                                </label>

                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
                                                        <input type="password"  class="form-control" placeholder="Repeat password" />
                                                        <i class="icon-retweet"></i>
                                                    </span>
                                                </label>

                                                <label class="block">
                                                    <input type="checkbox" class="ace" />
                                                    <span class="lbl">I accept the
															<a href="#">User Agreement</a>
                                                    </span>
                                                </label>

                                                <div class="space-24"></div>

                                                <div class="clearfix">
                                                    <button type="reset" class="width-30 pull-left btn btn-sm">
                                                        <i class="icon-refresh"></i>
                                                        Reset
                                                    </button>

                                                    <button type="button" class="width-65 pull-right btn btn-sm btn-success">
                                                        Register
															<i class="icon-arrow-right icon-on-right"></i>
                                                    </button>
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>

                                    <div class="toolbar center">
                                        <a href="#" onclick="show_box('login-box'); return false;" class="back-to-login-link">
                                            <i class="icon-arrow-left"></i>
                                            Back to login
                                        </a>
                                    </div>
                                </div>
                                <!-- /widget-body -->
                            </div>
                            <!-- /signup-box -->
                        </div>
                        <!-- /position-relative -->
                    </div>
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
    </div>
    <!-- /.main-container -->

    <!-- basic scripts -->

    <!--[if !IE]> -->

    <script src="assets/js/jquery-2.0.3.min.js"></script>

    <!-- <![endif]-->

    <!--[if IE]>
<script src="assets/js/jquery-2.0.3.min.js"></script>
<![endif]-->

    <!--[if !IE]> -->

    <script type="text/javascript">
        window.jQuery || document.write("<script src='assets/js/jquery-2.0.3.min.js'>" + "<" + "/script>");
    </script>

    <!-- <![endif]-->

    <!--[if IE]>
<script type="text/javascript">
 window.jQuery || document.write("<script src='assets/js/jquery-1.10.2.min.js'>"+"<"+"/script>");
</script>
<![endif]-->

    <script type="text/javascript">
        if ("ontouchend" in document) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>" + "<" + "/script>");
    </script>
    	<link rel="stylesheet" href="assets/css/jquery.gritter.css" />
    <link rel="stylesheet" href="assets/css/font-awesome.min.css" />

    <!-- inline scripts related to this page -->
    <script src="assets/js/date-time/bootstrap-datepicker.min.js"></script>
    <script src="assets/js/jquery.hotkeys.min.js"></script>
    <script src="assets/js/bootstrap-wysiwyg.min.js"></script>
    <script src="assets/js/jquery.gritter.min.js"></script>
    <script src="js/vue.min.js"></script>
    <script src="js/element.js"></script>
    <script src="js/lodash.js"></script>
    <!--引入公共组件,年月选择-->
	<script type="text/javascript" src="component/cascader.js"></script>

    <script type="text/javascript">
    var selectYear = null
    var selectMonth = null
    var vue = new Vue({
			el: "#app",
			data: {
				
			},
			created: function () {
				
			},
			methods: {
				cascader(year,month){
                    // console.log(year,'year')
                    // console.log(month,'month')
                    selectYear = year
                    selectMonth = month
                },
			}

        })
        
        function show_box(id) {
            jQuery('.widget-box.visible').removeClass('visible');
            jQuery('#' + id).addClass('visible');
        }
        var errorgrit = function (title, text) {
            $.gritter.add({
                title: title,
                text: text,
                class_name: 'gritter-error ' + ' gritter-light',
                time: '5000',

            });

            // return false;
        }

        function DoFresh() {
            $("#imgValidateCode").attr("src", "VCode.aspx?random=" + Math.random());
        }
        $("#imgValidateCode").click(function () {
            $("#imgValidateCode").attr("src", "VCode.aspx?random=" + Math.random());
        });
        function login()
        { 
            if ($("#UserName").val() == "" || $("#Password").val() == "") {

                errorgrit("错误", "请输入用户名和密码");
                return;
            }
            else if ($("#code").val() == "") {

                errorgrit("错误", "请输入验证码");
                return;
            }else if (!selectYear) {
                errorgrit("错误", "请选择报表年月");
                return;
            }
            var s = {
                username: $("#UserName").val(),
                password: $("#Password").val(),
                code: $("#code").val()
            };
            $.ajax({
                type: "post",
                url: "handler/GobalHandler.ashx?_op=login",
                data: s,
                //data: { ProductID: $obj.attr("itemid"), Num: $quantity.val() },
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        // 年月选择
                        if (selectYear&&selectMonth ) {
                            sessionStorage.setItem("selectYear" , selectYear)
                            sessionStorage.setItem("selectMonth" , selectMonth )
                        }
                        
                        if ($('#remember').is(':checked')) {
                            localStorage.setItem("username", $("#UserName").val())
                            localStorage.setItem("pwd", $("#Password").val())
                        }
                        else {
                            localStorage.removeItem("username")
                            localStorage.removeItem("pwd")
                        }
                        
                        if (!window.parent) {
                            window.location = "UserListGrid1.aspx";
                        }
                        else
                            window.parent.location.href = "UserListGrid1.aspx";

                    }
                    else {
                        errorgrit("错误", data.msg);
                        DoFresh();
                    }
                  
                },
                error: function () {
                    errorgrit("错误", "数据加载出错,请刷新页面");
                    DoFresh();
                }
            });


            return false;
        }
        $(function(){
            if(localStorage.getItem("username")){
                $("#UserName").val(localStorage.getItem("username"))
                $("#Password").val(localStorage.getItem("pwd"))
                $('#remember').prop('checked', true)  // 选中
            }
        })

    </script>
</body>
</html>
