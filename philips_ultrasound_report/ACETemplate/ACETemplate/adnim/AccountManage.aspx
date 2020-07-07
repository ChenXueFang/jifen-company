<%@ Page Language="C#" AutoEventWireup="true"  MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="OOHTargetGRID.aspx.cs" Inherits="ACETemplate.adnim.OOHTargetGRID" %>

<%@ Register Src="~/adnim/include/HeadNavigation.ascx" TagPrefix="uc1" TagName="HeadNavigation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<link href="css/element-ui.css" rel="stylesheet" />

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
       form{
           width:500px;
           font-size:18px;
           color:#666666
       }
       .confirm.el-button--primary{
	        /*height: 34px;*/
	        background-color: #2b7dbc;
            border-color:#2b7dbc;
            font-size:18px;
            float:right;
            margin-top:20px
	        
        }
    </style>
	<uc1:HeadNavigation runat="server" ID="HeadNavigation" />
	<div class="page-content">
		<div id="app" v-cloak style="margin-top:10px;margin-bottom:10px;padding:0;border:1px solid white">
           
            <el-form label-position="right" label-width="100px" :model="Accountdata">
  <el-form-item label="User name">
    <el-input v-model="Accountdata.name"></el-input>
  </el-form-item>
  <el-form-item label="Email">
    <el-input v-model="Accountdata.region"></el-input>
  </el-form-item>
  <el-form-item label="Cell Phone">
    <el-input v-model="Accountdata.type"></el-input>
  </el-form-item>
<el-form-item label="Job Title">
    <el-input v-model="Accountdata.type"></el-input>
  </el-form-item>
<el-form-item label="Role">
    <el-input v-model="Accountdata.type"></el-input>
  </el-form-item>
<el-form-item label="Password">
    <el-input v-model="Accountdata.type"></el-input>
  </el-form-item>
                <el-button size="medium" type="primary"  class="confirm">更新并保存</el-button>
</el-form>

            <el-dialog center title="提示" :visible.sync="dialog" width="21%" top="15%">
  <span>情确认修改</span>
  <span slot="footer" class="dialog-footer">
    <el-button class="cancelbtn" type="primary" v-on:click="dialog = false">取 消</el-button>
    <el-button class="confirmbtn" type="primary" v-on:click="confirm">是 的</el-button>
  </span>
</el-dialog>
             
		</div>
	</div>
	<!-- /.page-content -->

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptBlock" runat="server">

      <script src="assets/js/myUpload/jquery.ajaxfileupload.js"></script>
    <script src="assets/js/myUpload/myFileUpload.js"></script>

    	<script src="js/element.js"></script>
	<script>
		var vue = new Vue({
			el: "#app",
			data: {
			    Accountdata:{

			    },
			    dialog: false,
			},
			created: function () {
			   
			},
			methods: {
			    getReport: function () {
			      const loading=this.$loading({
			            lock: true,
			            text: '加载中'
			        });
			        $.ajax({
			            url: 'handler/information.ashx?_op=AOPLog',
			            data: post,
			            type: 'POST',
			            dataType: "json",
			            success: function (data) {
			                loading.close()
			            },
			            error: function (err) {
			                loading.close()
			                this.$message.error(err.msg)
			            }

			        });
			    },
			    confirm: function () {

			    }
			    
			}

		})
    </script>

</asp:Content>
