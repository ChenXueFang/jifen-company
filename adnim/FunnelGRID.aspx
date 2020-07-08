<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="FunnelGRID.aspx.cs" Inherits="ACETemplate.adnim.FunnelGRID" %>

<%@ Register Src="~/adnim/include/HeadNavigation.ascx" TagPrefix="uc1" TagName="HeadNavigation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<link href="css/element-ui.css" rel="stylesheet" />

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

	<uc1:HeadNavigation runat="server" ID="HeadNavigation" />
	<div class="page-content">
		<div id="app" style="margin-top:10px;margin-bottom:10px;padding:0;border:1px solid white">
			<%--<el-form :inline="true" :model="Form" class="demo-form-inline"  style="margin:25px 0px 0px 0px;">--%>

                <img class="queryAndExportIcon" src="assets/images/tem2.png"  @click="downloadTemp" />
                   
                <input type="file" name="uploadFile" id="uploadFile" accept="application/vnd.ms-excel" style="width:160px;display:none" onchange="ChangeFile()" />

                <input type="button" value="上传文件" class="fm-button ui-state-default ui-corner-all fm-button-icon-right ui-reset btn btn-sm btn-info" onclick="jQuery('#uploadFile').click()" />
                <label id="path"></label>

                <img class="queryAndExportIcon" src="assets/images/daoru.png"  onclick="ImportExcel('uploadFile')" />
                		
			<%--</el-form>--%>
			<div style="clear:both"></div>

          <el-table ref="multipleTable"  v-bind:data="List.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                stripe >
        
            <el-table-column prop="OITSales"
                             label="OITSales"
                             width="120">
            </el-table-column>
            <el-table-column prop="Year"
                             label="Year"
                             width="120">
            </el-table-column>
            <el-table-column prop="Qtr"
                             label="Qtr"
                             width="95"
                             style="color:#EE534F">
            </el-table-column>
            <el-table-column prop="Month"
                             label="Month"
                             width="80">
            </el-table-column>
            <el-table-column prop="NewArea"
                             label="NewArea"
                             width="140">
            </el-table-column>
            <el-table-column prop="NewRegion"
                             label="NewRegion"
                             width="150">
            </el-table-column>
            <el-table-column prop="NewDistrict"
                             label="NewDistrict"
                             width="150">
            </el-table-column>
            <el-table-column prop="MAGName"
                             label="MAGName"
                             width="100">
            </el-table-column>
            <el-table-column prop="HospitalName"
                             label="HospitalName"
                             width="100">
            </el-table-column>
          
        </el-table>
      <el-pagination
            background
            layout="prev, pager, next"
          @current-change="current_change"
            v-bind:total="total">
         </el-pagination>

		</div>
	</div>
	<!-- /.page-content -->

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptBlock" runat="server">

      <script src="assets/js/myUpload/jquery.ajaxfileupload.js"></script>
    <script src="assets/js/myUpload/myFileUpload.js"></script>

    	<script src="js/element.js"></script>
	<script>

	    //文件名显示
	    function ChangeFile() {
	        var filepath = $("#uploadFile").val();
	        if (filepath != "") {

	            var names = filepath.split("\\");
	            var filename = $("#path").text(names[names.length - 1]);
	            return filename;
	        }

	    }

	    function ImportExcel(eid) {

	        $.ajaxFileUpload({
	            url: "handler/ImportHandler.ashx?_op=QueryFunnel",
	            secureuri: false,
	            fileElementId: eid,
	            dataType: 'json',
	            beforeCall: function () {
	                $("#loading").show();
	            },
	            success: function (data, status) {
	                if (data.success) {
	                  
	                   vue.List = data.data;
	                   vue.total = vue.List.length;
	                    //if (data.msg == "") {
	                    //    alert("导入成功");
	                    //} else {
	                    //    alert(data.msg);
	                    //}
	                } else {
	                    alert(data.msg);
	                }
	                $("#loading").hide();
	            },
	            error: function (data, status, e) {
	                //console.log(data, status, e);
	                //  alert("上传失败！");
	                $("#loading").hide();
	            }
	        })

	    }

		var vue = new Vue({
			el: "#app",
			data: {
			    pagesize: 10,//每页的数据条数
			    currentPage: 1,//默认开始页面
			    List: [],
			    total: 10,
			     
				Form: {

				}
			},
			created: function() {

			},
			methods: {
			    ImportExcel: function ()
			    {

			    },
			    current_change:function(currentPage){
			        this.currentPage = currentPage;
			    },
			    downloadTemp: function () {
			        window.location.href = "/Upload/TemExcel/OrderDetail.xlsx";
			    },
			    handleSelectionChange: function (val) {
			        //this.multipleSelection = val;
			    },
			    
			    hrefPage: function (num) {
			        this.index = num;
			    },
				Add: function() {
					jQuery(grid_selector).editGridRow("new", addoption);
				}
			}

		})
    </script>

</asp:Content>
