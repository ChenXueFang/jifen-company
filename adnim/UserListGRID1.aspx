<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="UserListGrid1.aspx.cs"  Inherits="ACETemplate.adnim1.UserListGrid" %>

<%@ Register Src="~/adnim/include/HeadNavigation.ascx" TagPrefix="uc1" TagName="HeadNavigation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<link href="css/element-ui.css" rel="stylesheet" />

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .el-button--primary{
            padding:10px
        }
        .opbtn {
            border-radius: 4px;
            color: #fff;
            font-size: 18px;
        }

        .deletebtn.el-button--primary {
            width: 80px;
            /*height: 34px;*/
            background-color: #e73754;
            border-color: #e73754;
        }

        .editbtn.el-button--primary {
            width: 80px;
            /*height: 34px;*/
            background-color: #43b978;
            border-color: #43b978;
        }

        .searchbtn.el-button--primary {
            width: 80px;
            /*height: 34px;*/
            background-color: #2b7dbc;
            border-color: #2b7dbc;
            margin-left: 10px;
        }

        .newbtn.el-button--primary {
            width: 160px;
            /*height: 34px;*/
            background-color: #2b7dbc;
            border-color: #2b7dbc;
            float: right;
            margin-right: 80px;
        }
        .el-dialog__header {
            background-color: #2b7dbc;
            padding: 0;
            line-height: 50px;
            font-size: 18px;
        }

            .el-dialog__header .el-dialog__title {
                color: #fff;
            }

        .el-dialog__headerbtn {
            top: 0;
            font-size: 18px;
        }

        .el-dialog__body {
            font-size: 18px;
            text-align: center !important;
        }

        .el-dialog__headerbtn .el-dialog__close, .el-dialog__headerbtn .el-dialog__close:hover {
            color: #fff;
        }

        .confirmbtn.el-button--primary {
            background-color: #2b7dbc;
            border-color: #2b7dbc;
            margin-left: 20px;
        }

        .cancelbtn.el-button--primary {
            background-color: #bbbbbb;
            border-color: #bbbbbb;
        }

        .dialog-footer .el-button {
            width: 140px;
        }
        .addreight {
            width: 42%;
            margin-left: 2%;
            display: inline-block;
            background-color: #f8f8f8;
            padding: 33px 10px 20px;
        }

        .selectForm {
            text-align: center;
            margin-top: 10px;
        }

            .selectForm:nth-child(1) {
                margin-top: 0px;
            }

            .selectForm span {
                width: 50%;
                display: inline-block;
                text-align: right;
                vertical-align: middle;
            }

            .selectForm .el-select {
                width: 45%;
                margin-left: 2%;
            }

        .addreight .text {
            font-size: 14px;
            color: #2b7dbc;
            display: inline-block;
        }
		.formLeft .el-form-item__content {
			display: flex;
		}
		.el-dialog--center .el-dialog__body {
			display: flex;
		}
		.el-switch {
			margin-top: 10px;
		}
    </style>
	<uc1:HeadNavigation runat="server" ID="HeadNavigation" Level2Name="系统管理" Level3Name="系统用户管理" />
	<div class="page-content">
		<div id="app" v-cloak class="pageform">
			<el-form :inline="true" :model="Form" class="demo-form-inline" @submit.prevent.stop.native="onSubmit" >

				<el-form-item v-bind:label="Form.UserName.label">
					<el-input v-model="Form.UserName.value" v-bind:placeholder="Form.UserName.label"></el-input>
				</el-form-item>
                <el-button type="primary" class="opbtn searchbtn" v-on:click="onSubmit">搜索</el-button>
                <el-button type="primary" class="opbtn newbtn" v-on:click="addUser" >+新增用户</el-button>
				<%--<el-form-item>
                          <img class="queryAndExportIcon" src="assets/images/query.png"  @click="onSubmit" />
				</el-form-item>
                       <img class="addData" src="assets/images/adddata.png" @click="Add" />--%>
			</el-form>
			<div style="clear:both"></div>
            <el-dialog center title="提示" :visible.sync="dialogdel" width="21%" top="15%">
              <span>是否确认要删除用户{{deleteitem.Name}}?</span>
              <span slot="footer" class="dialog-footer">
                <el-button class="cancelbtn" type="primary" v-on:click="dialogdel = false">取 消</el-button>
                <el-button class="confirmbtn" type="primary" v-on:click="Delete">是 的</el-button>
              </span>
            </el-dialog>
             <el-dialog center :title="addConfig.title" :visible.sync="dialogadd" width="45%" top="15%">
                 <div style="width:55%;display:inline-block" class="formLeft">
                 <el-form label-position="right" label-width="100px" :model="Accountdata">
                  <el-form-item label="用户名">
                    <el-input v-model="Accountdata.UserName"></el-input>
                  </el-form-item>
                  <el-form-item label="Email">
                    <el-input v-model="Accountdata.Email"></el-input>
                  </el-form-item>
                  <el-form-item label="Cell Phone">
                    <el-input v-model="Accountdata.CellPhone"></el-input>
                  </el-form-item>
                <el-form-item label="Job Title">
                    <el-input v-model="Accountdata.JobTitle"></el-input>
                  </el-form-item>
                <el-form-item label="Password" v-if="addConfig.type=='add'">
                    <el-input v-model="Accountdata.Password" type="password"></el-input>
                  </el-form-item>
                  <el-form-item label="用户权限">
                           <el-switch id="Role1" name="Role1" v-model="Accountdata.Role1">
                  </el-form-item>
                       <el-form-item label="数据权限">
                           <el-switch id="Role2" name="Role2" v-model="Accountdata.Role2">
                  </el-form-item>
                      <el-form-item label="报表权限">
                    <el-switch id="Role3" name="Role3" v-model="Accountdata.Role3">
                  </el-form-item>
                </el-form>
                     </div>
                 <div class="addreight">
                     <span class="text" style="width:50%;">报表</span>
                     <span class="text" style="width:45%;margin-left:2%">区域</span>
             <%--        <div class="selectForm"><span>业务Dashboard</span>
                    <el-select v-model="DashboardKey" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>--%>
                     <div class="selectForm"><span>By 区域业绩看版</span>
                    <el-select v-model="AreaKey" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>
                          <div class="selectForm"><span>By 产品业绩看版</span>
                    <el-select v-model="ProductKey" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>
                     <div class="selectForm"><span>By 区域&Clinical业绩看版</span>
                    <el-select v-model="ClinicalKey" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>
                     <div class="selectForm"><span>三率分析</span>
                    <el-select v-model="ThreeKey" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>
                     <div class="selectForm"><span>IB分析</span>
                    <el-select v-model="IBkey" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>
                     <div class="selectForm"><span>营销分析</span>
                    <el-select v-model="Promotion" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>
                 </div>
              <span slot="footer" class="dialog-footer">
                <el-button class="cancelbtn" type="primary" v-on:click="dialogadd = false">取 消</el-button>
                <el-button class="confirmbtn" type="primary" v-on:click="confirmUser">{{addConfig.confirmbtn}}</el-button>
              </span>
            </el-dialog>
		</div>

		<!-- /.page-header -->
		<div class="row">
			<div class="col-xs-12">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
				<!-- PAGE CONTENT ENDS -->
			</div>
			<!-- /.col -->
		</div>
        
            
		<!-- /.row -->
           <div id="loading" style="display:none;position:fixed !important;position:absolute;top:0;left:0;height:100%; width:100%; z-index:9999; background: url(assets/images/myloading.gif) no-repeat center center ; opacity:0.6; filter:alpha(opacity=60);font-size:14px;line-height:20px;"></div>
	</div>
        
	<!-- /.page-content -->

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptBlock" runat="server">
	<script src="assets/js/jqGrid/jquery.jqGrid.min.js"></script>
	<script src="assets/js/jqGrid/i18n/grid.locale-cn.js"></script>
	<script src="js/element.js"></script>
	<script src="js/GridModel.js"></script>

	<script src="js/page/bootpag.js"></script>
	<script src="js/page/NewPage.js"></script>

	<script type="text/javascript">
		var grid_selector = "#grid-table";
		var pager_selector = "#grid-pager";

		var viewoption = {
		    //view record form
		    caption:'用户信息',
			recreateForm: true,
			beforeShowForm: function(e) {
				var form = $(e[0]);
				form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
				//  form.find("tr:eq(3)").hide();
				form.parent().parent().parent().width('35%');

				form.find(':input').width('30%');
			}
		}
		var eqoption = {
			//edit record form
		    //closeAfterEdit: true,
			recreateForm: true,
			beforeShowForm: function(e) {

				var form = $(e[0]);
				form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
				style_edit_form(form);
				//  aceSwitch(null, null, e);

			},
			afterSubmit: function(response, postdata) {
				var data = jQuery.parseJSON(response.responseText);
				if(data.success) {
					return true;
				} else {
					//alert(data.msg);
					return [false, data.msg];
				}
			},
			//closeAfterAdd: true,//Closes the add window after add
			closeAfterEdit: true,
			closeOnEscape: true, //Closes the popup on pressing escape key
			reloadAfterSubmit: true,
		  

		};

		function viewRows(data) {
			jQuery(grid_selector).viewGridRow(data, viewoption);

			var objectArr = [];
			$(".EditTable tbody tr").each(function (index, ele) {
			    if (ele.style.display != "none") {
			        objectArr.push(ele);
			    }
			})
			for (var i = 0; i < objectArr.length; i++) {
			    if (i % 2 != 0) {
			        console.log($(objectArr[i]));
			        $(objectArr[i]).css({
			            "background-color": "#f7f7f7"
			        })
			    }
			}
		}

		function editRows1(data) {

			jQuery(grid_selector).editGridRow(data, eqoption);

		}

		function delRows1(data) {

			jQuery(grid_selector).delGridRow(data, deloption);
		}

		function showrole1(cellvalue, options, rowObject) {

		    return (rowObject.UserRoles & 1) == 1 ? "true" : "false";

		}
		function showrole2(cellvalue, options, rowObject) {

		    return (rowObject.UserRoles & 2) == 2 ? "true" : "false";

		}
		function showrole3(cellvalue, options, rowObject) {

		    return (rowObject.UserRoles & 4) == 4 ? "true" : "false";

		}

		//  $(function () {
		var mygridinfo = {
		    url: 'handler/newshandler.ashx?_op=userquery',
		    editurl: 'handler/information.ashx?_op=UserList',
			caption: ''
		}
		//重置密码
		function ResetRows(id) {

		    //var s;
		    //多选获取
		    //  s = jQuery(grid_selector).jqGrid('getGridParam', 'selrow');
		    if (id == null) {
		        $.jgrid.info_dialog(
      "Warning",
          '<div class="ui-state-waring">请选择一行: </div>',
           "",
            { buttonalign: 'center', styleUI: 'Bootstrap' }
         )

		    }

		    else {

		      

		        //通过 jqoper 类直接修改

		        var postData = { ID: id };

		        //   alert(jQuery.toJSON(uploadimport.data));
		        $.extend(postData, { oper: "edit" });

		        //   var gdata = JSON.stringify(postData);
		        $.ajax({
		            url: 'handler/newshandler.ashx?_op=resetpassword',
		            data: postData,
		            //  contentType: "multipart/form-data",
		            //  contentType: false,
		            // processData: false,
		            type: 'POST',
		            dataType: "json",
		            success: function (data) {
		                select1 = $(data);
		                mygritter.successgrit("成功", "重置密码成功");
		                //开始加载数据
		                // debugger                

		            },
		            error: function (err) {
                        //err.status
		                mygritter.errorgrit("失败","重置密码失败");
		                // l.stop();
		            }
		        });
		    }

		    //   position: "last"

		    //jQuery(grid_selector).delGridRow(data, deloption);
		}

		var deloption = {
		    //delete record form
		    caption: '用户删除',
		    bSubmit: "删除",
		    bCancel: "取消",
		    msg:'确定删除选中的记录吗？',
			recreateForm: true,
			beforeShowForm: function(e) {
				var form = $(e[0]);
				if(form.data('styled')) return false;

				form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
				style_delete_form(form);

				form.data('styled', true);
			},
			afterSubmit: function(data, postdata) {
				debugger;
				var jsonResponse = jQuery.parseJSON(data.responseText);
				if(jsonResponse.success) {
					return [true, ""];
				} else
					// alert("afterSubmit");
					return [false, "提交错误"]; //è?????0è?¨?¤o?-￡???
			},
		}

		function gridload() {
			jQuery(grid_selector).jqGrid({
				ajaxSelectOptions: { type: "GET" },
				//direction: "rtl",
				datatype: "json",
				mytype: 'POST',
				url: mygridinfo.url,
				postData: {
					name: ""
				},
				// multiselect: true,
				//multikey: "ctrlKey",
				//multiboxonly: true,
				sortable: false,
				height: true,
				scrollOffset: 2,
				colNames: [
					'ID',
					'用户名',
					'姓名',
                    '用户权限',
                    '数据维护',
                    '报表权限',
					'Password',
					'User Roles',
					'Modify Date',
					'创建时间',
					'Status Id',
					'操作'
				],
				colModel: [
					
					{
						name: 'ID',
						index: 'ID',
						width: 90,
						hidden: true,
						key: true,
						formatter: 'actions',
						key: true,
						formatoptions: {
							editformbutton: true,
							delbutton: true,
							delOptions: deloption,

						}
					},

					{ name: 'UserName', index: 'UserName', width: 90, searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw', 'ew'] }, editable: true },

					{ name: 'RealName', index: 'RealName', width: 90, searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw', 'ew'] }, editable: true },

                       { name: 'Role1', edittype: "checkbox", editoptions: { value: "true:false" }, unformat: aceSwitch, editable: true, width: 150, sortable: false, formatter: showrole1, },

                       { name: 'Role2', edittype: "checkbox", editoptions: { value: "true:false" }, unformat: aceSwitch, editable: true, width: 100, sortable: false, formatter: showrole2 },
                       { name: 'Role3', edittype: "checkbox", editoptions: { value: "true:false" }, unformat: aceSwitch, editable: true, width: 100, sortable: false, formatter: showrole3 },

					{ name: 'Password', index: 'Password', width: 90, searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw', 'ew'] }, editable: false,hidden:true, },

					{
						name: 'UserRoles',
						index: 'UserRoles',
						width: 70,
						search: true,
						editable: false,
						editrules: { number: true },
						hidden: true,
						searchoptions: { sopt: ['eq', 'lt', 'gt', 'ge', 'le'] },
						searchtype: 'text',
						searchrules: { integer: true, required: true },

					},

					{
						name: 'ModifyDate',
						index: 'ModifyDate',
						editable: false,
						width: 90,
						search: true,
						searchoptions: {
							dataInit: searchdate,
							attr: { title: 'select date' },
							sopt: ['eq', 'lt', 'gt']
						},
						hidden: true,
						searchtype: 'text',
						searchrules: { required: true },
						formatter: 'date',
						formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y/m/d' }
					},

					{
						name: 'CreateDate',
						index: 'CreateDate',
						editable: false,
						width: 90,
						search: true,
						searchoptions: {
							dataInit: searchdate,
							attr: { title: 'select date' },
							sopt: ['eq', 'lt', 'gt']
						},
						searchtype: 'text',
						searchrules: { required: true },
						formatter: 'date',
						formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y/m/d' }
					},

					{
						name: 'StatusId',
						index: 'StatusId',
						width: 70,
						search: true,
						editable: false,
						editrules: { number: true },
                        hidden:true,
						searchoptions: { sopt: ['eq', 'lt', 'gt', 'ge', 'le'] },
						searchtype: 'text',
						searchrules: { integer: false, required: false },

					},

					{
						width: 90,
						viewable: false,
						sortable: false,
						formatter: function (data, v, row) {

						  //  var key = row.ID

						    //var view = `<div title="" style="float:left;cursor:pointer;display:;margin-left:5px; " class="ui-pg-div ui-inline-edit" id="jEditButton_1" onclick="viewRows(${row.ID})" onmouseover="jQuery(this).addClass('ui-state-hover');" onmouseout="jQuery(this).removeClass('ui-state-hover');" data-original-title="Edit selected row"><span class="ui-icon icon-zoom-in grey"></span></div>`

						    var view = "<div title=\"\" style=\"float:left;cursor:pointer;display:;margin-left:5px; \" class=\"ui-pg-div ui-inline-edit\" id=\"jEditButton_1\" onclick=\"viewRows(" + row.ID + ")\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover');\" data-original-title=\"查看\"><span class=\"ui-icon icon-zoom-in grey\"></span></div>";

						    //return `<div style="margin-left:8px;"><div title="" style="float:left;cursor:pointer;" class="ui-pg-div ui-inline-edit" id="jEditButton_1" onclick="editRows1(${row.ID})" onmouseover="jQuery(this).addClass('ui-state-hover');" onmouseout="jQuery(this).removeClass('ui-state-hover');" data-original-title="Edit selected row"><span class="ui-icon ui-icon-pencil"></span></div><div title="" style="float:left;margin-left:5px;" class="ui-pg-div ui-inline-del" id="jDeleteButton_1" onclick="delRows1(${row.ID})" onmouseover="jQuery(this).addClass('ui-state-hover');" onmouseout="jQuery(this).removeClass('ui-state-hover');" data-original-title="Delete selected row"><span class="ui-icon ui-icon-trash"></span></div><div title="" style="float:left;display:none" class="ui-pg-div ui-inline-save" id="jSaveButton_1" onclick="jQuery.fn.fmatter.rowactions.call(this,'save');" onmouseover="jQuery(this).addClass('ui-state-hover');" onmouseout="jQuery(this).removeClass('ui-state-hover');" data-original-title="Submit"><span class="ui-icon ui-icon-disk"></span></div>`
                            //   + `<div title="" style="float:left;display:none;margin-left:5px;" class="ui-pg-div ui-inline-cancel" id="jCancelButton_1" onclick="jQuery.fn.fmatter.rowactions.call(this,'cancel');" onmouseover="jQuery(this).addClass('ui-state-hover');" onmouseout="jQuery(this).removeClass('ui-state-hover');" data-original-title="Cancel"><span class="ui-icon ui-icon-cancel"></span></div>${view}</div><div  class="ui-pg-div ui-pg-button ui-corner-all" style="margin-top:3px;" title data-original-title="reset passwords" onclick="ResetRows(${row.ID})" ><span class="ui-icon ace-icon fa fa-globe blue"></span>reset password confirm</div>`

						    return "<div style=\"margin-left:8px;\"><div title=\"\" style=\"float:left;cursor:pointer;\" class=\"ui-pg-div ui-inline-edit\" id=\"jEditButton_1\" onclick=\"GetEdit(" + row.ID + ")\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover');\" data-original-title=\"编辑\"><span class=\"ui-icon ui-icon-pencil\"></span></div><div title=\"\" style=\"float:left;margin-left:5px;\" class=\"ui-pg-div ui-inline-del\" id=\"jDeleteButton_1\" onclick=\"delRows1(" + row.ID + ")\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover');\" data-original-title=\"删除\"><span class=\"ui-icon ui-icon-trash\"></span></div><div title=\"\" style=\"float:left;display:none\" class=\"ui-pg-div ui-inline-save\" id=\"jSaveButton_1\" onclick=\"jQuery.fn.fmatter.rowactions.call(this,'save');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover');\" data-original-title=\"Submit\"><span class=\"ui-icon ui-icon-disk\"></span></div>"
                                + "<div title=\"\" style=\"float:left;display:none;margin-left:5px;\" class=\"ui-pg-div ui-inline-cancel\" id=\"jCancelButton_1\" onclick=\"jQuery.fn.fmatter.rowactions.call(this,'cancel');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover');\" data-original-title=\"Cancel\"><span class=\"ui-icon ui-icon-cancel\"></span></div>" + view + "</div><div  class=\"ui-pg-div ui-pg-button ui-corner-all\" style=\"margin-top:3px;\" title data-original-title=\"重置密码\" onclick=\"ResetRows(" + row.ID + ")\" ><span class=\"ui-icon ace-icon fa fa-globe blue\"></span></div>";
						}

					},

				],
				// ondblClickRow:editRows,
				viewrecords: true,
				rowNum: 10,
				rowList: [10, 20, 50],
				pager: pager_selector,
				altRows: true,
				//toppager: true,

				//loadonce: true,

				loadComplete: function(res) {
					var table = this;
					var ids = jQuery(grid_selector).jqGrid('getDataIDs');

				
					if (ids == 0 || ids == null) {
					    if ($(".norecords").html() == null) {
					        jQuery(grid_selector).parent().append("<div class=\"norecords\">暂无数据</div>");
					    }
					} else {
					    $(".norecords").css("display", "none");
					}


					$(this).jqGrid("initPagination", res);

					setTimeout(function() {
						//    updatePagerIcons(table);
						styleCheckbox(table);
						updateActionIcons(table);
						updatePagerIcons(table);
						enableTooltips(table);
					}, 0);
				},

				editurl: mygridinfo.editurl, //nothing is saved
				caption: mygridinfo.caption,
				autowidth: true

			});
		}

		gridload();

		function GetEdit(id)
		{
		    vue.addConfig = {
		        type: "edit",
		        title: "修改用户",
		        confirmbtn: "保存"
		    }
		    vue.Accountdata.ID = id;
		    vue.LoadActivity();
		    vue.dialogadd = true;

		}

		var addoption = {
			//new record form
			//closeAfterAdd: true,
			//recreateForm: true,
		    //viewPagerButtons: false,
		    addCaption: '用户信息',
		    bCancel: '取消',
		    bSubmit:'保存',
			closeAfterAdd: true,
			recreateForm: true,
			viewPagerButtons: false,
			beforeShowForm: function(e) {
				var form = $(e[0]);
				form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
				style_edit_form(form);
				//debugger;
				// aceSwitch(null,null,e);
			},
			afterSubmit: function(response, postdata) {
				var data = jQuery.parseJSON(response.responseText);
				if(data.success) {
					return true;
				} else {
				    mygritter.errorgrit("Error", data.msg);
					return [false, data.msg];
				}
			}
		}

		var eqoption = {
			//edit record form
		    //closeAfterEdit: true,
		    editCaption: '用户信息',
		    bCancel: '取消',
		    bSubmit: '保存',
			recreateForm: true,
			beforeShowForm: function(e) {

				var form = $(e[0]);
				form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
				style_edit_form(form);
				//  aceSwitch(null, null, e);

			},
			afterSubmit: function(response, postdata) {
				var data = jQuery.parseJSON(response.responseText);
				if(data.success) {
					return true;
				} else {
				    //alert(data.msg);
				   // mygritter.errorgrit("Error", data.msg);
					return [false, "操作失败"];
				}
			},
			//closeAfterAdd: true,//Closes the add window after add
			closeAfterEdit: true,
			closeOnEscape: true, //Closes the popup on pressing escape key
			reloadAfterSubmit: true,
			viewPagerButtons: false,
		};

		//navButtons
		jQuery(grid_selector).jqGrid('navGrid', pager_selector, { //navbar options
				edit: false,
				editicon: 'icon-pencil blue',
				add: false,
				//addfunc: function () { alert("d"); },

				addicon: 'icon-plus-sign purple',

				del: false,
				delicon: 'icon-trash red',
				search: false,
				searchicon: 'icon-search orange',

				refresh: false,
				refreshicon: 'icon-refresh green',

				view: false,
				viewicon: 'icon-zoom-in grey',
			},
			//eidtoptions
			addoption,
			eqoption,
			deloption, {

				//search form
				recreateForm: true,
				afterShowSearch: function(e) {
					var form = $(e[0]);
					form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
					style_search_form(form);
					//   style_search_filters(form);

				},
				afterRedraw: function() {
					style_search_filters($(this));
				},
				multipleSearch: true,

				/**
				multipleGroup:true,
                    
				*/
			}, {
				//view record form
				recreateForm: true,
				beforeShowForm: function(e) {
					var form = $(e[0]);
					form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
				}
			}
		)

		//enable search/filter toolbar
		//jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})

		//switch element when editing inline
		function aceSwitch(cellvalue, options, cell) {
			setTimeout(function() {
				$(cell).find('input[type=checkbox]')
					.wrap('<label class="inline" />')
					.addClass('ace ace-switch ace-switch-5')
					.after('<span class="lbl"></span>');
			}, 0);
		}

		function aceSwitch1(cellvalue, options, cell) {

			var s = "";
			if(cellvalue == true) {
				//return '<span class="label label-xlg label-primary arrowed-in-right arrowed-in"">YES</span>';
				return '<span >YES</span>';

			} else {
				// return '<span class="label  label-xlg label-grey arrowed-in-right arrowed-in"">NO</span>';
				return '<span >NO</span>';
			}
			return s;
		}

		function aceSwitch2(cellvalue, options, cell) {
			// return "true";
			if(cellvalue == "YES") {
				return "true";
			}
			return "false";
			//return $(cellvalue).val();
		}

		function pickDate(cellvalue, options, cell) {
			setTimeout(function() {
				$(cell).find('input[type=text]')
					.datepicker({ format: 'yyyy-mm-dd', autoclose: true });
			}, 0);
		}

		function searchdate(cell) {

			setTimeout(function() {
				$(cell)
					.datepicker({ format: 'yyyy-mm-dd', autoclose: true });
			}, 0);
		}

		function editRows() {
			var rowKey = jQuery(grid_selector).getGridParam("selrow");
			if(rowKey) {
				jQuery(grid_selector).editGridRow(rowKey, eqoption);
			} else {
				alert("No rows are selected");
			}
		}

		function style_edit_form(form) {

			form.parent().parent().parent().width('35%');

			form.find(':input').width('70%');

			form.find('input[name=ModifyDate]').datepicker({ format: 'yyyy-mm-dd', autoclose: true });

			form.find('input[name=CreateDate]').datepicker({ format: 'yyyy-mm-dd', autoclose: true });

			form.find('input[name=Role1]')
                      .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');
			form.find('input[name=Role2]')
                 .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

			form.find('input[name=Role3]')
                 .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

			//enable datepicker on "sdate" field and switches for "stock" field
			//form.find('input[name=sdate]').datepicker({ format: 'yyyy-mm-dd', autoclose: true })
			//    .end()

			//form.find('input[name=Role1]')
			// .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');
			//form.find('input[name=Role2]')
			//.addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');
			// form.find('input[name=Role3]')
			// .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');
			////update buttons classes
			var buttons = form.next().find('.EditButton .fm-button');
			buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove(); //ui-icon, s-icon
			buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
			buttons.eq(1).prepend('<i class="icon-remove"></i>')

			buttons = form.next().find('.navButton a');
			buttons.find('.ui-icon').remove();
			buttons.eq(0).append('<i class="icon-chevron-left"></i>');
			buttons.eq(1).append('<i class="icon-chevron-right"></i>');
		}

		function style_delete_form(form) {
			var buttons = form.next().find('.EditButton .fm-button');
			buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove(); //ui-icon, s-icon
			buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
			buttons.eq(1).prepend('<i class="icon-remove"></i>')
		}

		function style_search_filters(form) {
			form.find('.delete-rule').val('X');
			form.find('.add-rule').addClass('btn btn-xs btn-primary');
			form.find('.add-group').addClass('btn btn-xs btn-success');
			form.find('.delete-group').addClass('btn btn-xs btn-danger');
		}

		function style_search_form(form) {
			var dialog = form.closest('.ui-jqdialog');
			var buttons = dialog.find('.EditTable')
			buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'icon-retweet');
			buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'icon-comment-alt');
			buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'icon-search');
		}

		function beforeDeleteCallback(e) {
			var form = $(e[0]);
			if(form.data('styled')) return false;

			form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
			style_delete_form(form);

			form.data('styled', true);
		}

		function beforeEditCallback(e) {
			var form = $(e[0]);
			form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
			style_edit_form(form);
		}

		function styleCheckbox(table) {
			/**
                    $(table).find('input:checkbox').addClass('ace')
                    .wrap('<label />')
                    .after('<span class="lbl align-top" />')
            
            
                    $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
                    .find('input.cbox[type=checkbox]').addClass('ace')
                    .wrap('<label />').after('<span class="lbl align-top" />');
                */
		}

		//unlike navButtons icons, action icons in rows seem to be hard-coded
		//you can change them like this in here if you want
		function updateActionIcons(table) {
			/**
			var replacement = 
			{
			    'ui-icon-pencil' : 'icon-pencil blue',
			    'ui-icon-trash' : 'icon-trash red',
			    'ui-icon-disk' : 'icon-ok green',
			    'ui-icon-cancel' : 'icon-remove red'
			};
			$(table).find('.ui-pg-div span.ui-icon').each(function(){
			    var icon = $(this);
			    var $class = .trim(icon);
			    if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
			})
			*/
		}

		//replace icons with FontAwesome icons like above
		function updatePagerIcons(table) {
			var replacement = {
				'ui-icon-seek-first': 'icon-double-angle-left bigger-140',
				'ui-icon-seek-prev': 'icon-angle-left bigger-140',
				'ui-icon-seek-next': 'icon-angle-right bigger-140',
				'ui-icon-seek-end': 'icon-double-angle-right bigger-140'
			};
			$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function() {
				var icon = $(this);
				var $class = jQuery.trim(icon.attr('class').replace('ui-icon', '')); //lost this

				if($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
			})
		}

		function enableTooltips(table) {
			$('.navtable .ui-pg-button').tooltip({ container: 'body' });
			$(table).find('.ui-pg-div').tooltip({ container: 'body' });
		}

		// });
	</script>

	<script>
		var vue = new Vue({
			el: "#app",
			data: {
				Form: {
					UserName: { name: "UserName", label: "用户名", value: '', op: "like", data: "string" },

				},
				dialogadd: false,
				dialogdel: false,
				deleteitem: "",
				addConfig: {
				    type: "",
				    title: "",
				    confirmbtn: "",
				},
				Accountdata: {
				    ID:0,
				    UserName: "",
				    Password: "",
				    Email: "",
				    CellPhone: "",
				    JobTitle: "",
				    Role1:false,
				    Role2:false,
				    Role3:false,

				},
				DashboardKey: "",
				AreaKey: "",
				ClinicalKey: "",
				ThreeKey: "",
				IBkey: "",
				Promotion: "",
			    ProductKey:"",
				areas: [{
				    value: 'East',
				    label: '东区'
				}, {
				    value: 'South',
				    label: '南区'
				}, {
				    value: 'West',
				    label: '西区'
				}, {
				    value: 'North',
				    label: '北区'
				},
                {
                    value: 'All',
                    label: '全部'
                },
				],
			},
			created: function() {

			},
			methods: {
				onSubmit:function() {
					var t1 = jQuery.SearchToSql(this.Form);
					jQuery("#grid-table").jqGrid("getGridParam", "postData").filters = JSON.stringify(t1);
					jQuery("#grid-table").jqGrid("setGridParam", { search: true }).trigger("reloadGrid", [{ page: 1 }]);
				},
				LoadActivity: function () {
				  
				    jQuery.ajax({
				        url: 'handler/information.ashx?_op=GetUserInfo',
				        type: 'GET',
				        dataType: "json",
				        data: { id:vue.Accountdata.ID},
				        success: function (data) {
				            var d = data;
				            if (d.success) {
				                if (d.data)
				                {
				                    jQuery.extend(vue.Accountdata, d.data);
				                    vue.AreaKey = d.data.AreaKey;
				                    vue.Promotion = d.data.Promotion;
				                    vue.ProductKey = d.data.ProductKey;
				                    vue.IBkey = d.data.IBkey;
				                    vue.ThreeKey = d.data.ThreeKey;
				                    vue.ClinicalKey = d.data.ClinicalKey;
				                    vue.Accountdata.Role1 = (d.data.UserRoles & 1) == 1?true : false;
				                    vue.Accountdata.Role2 = (d.data.UserRoles & 2) == 2?true : false;
				                    vue.Accountdata.Role3 = (d.data.UserRoles & 4) == 4?true : false;

				                }
				                

				            } else {

				                mygritter.errorgrit("错误", d.msg);

				            }
				        },
				        error: function (err) {
				            mygritter.errorgrit("网络错误", err.statusText);

				        }

				    });
				},
				onExport: function ()
				{
				    var t1 = jQuery.SearchToSql(this.Form);
				    var datas = getSearch();
				    datas.rows = 10000;
				    datas.page = 1;
				    datas.fiters = t1;
				    $("#loading").show();
				    $.ajax({
				       
				        url: " handler/newshandler.ashx?_op=userquery&IsExport=true",
				        type: "get",
				        data: getSearchParams(datas),
				        dataType: "json",
				        success: function (res) {
				            $("#loading").hide();
				            if (res.success) {
				                alert(res.msg);
				                window.location.href = res.url;
				            }
				            else {
				                alert(res.msg);
				            }
				        }
				    });
				},
				rowDelete: function (item) {
				    this.dialogdel = true;
				    this.deleteitem = item;
				},
				Delete: function () {
				    const loading = this.$loading({
				        lock: true,
				        text: '加载中'
				    });
				    $.ajax({
				        url: 'handler/newshandler.ashx?_op=userquery',
				        data: { name: "", rows: this.pagesize, page: this.pageindex, sidx: "", sord: "asc" },
				        type: 'get',
				        dataType: "json",
				        success: function (data) {
				            loading.close();
				            vue.dialogdel = false;
				        },
				        error: function (err) {
				            loading.close()
				            vue.$message.error(err.msg)
				        }

				    });
				},
				rowEdit: function () {
				    this.addConfig = {
				        type: "update",
				        title: "修改用户信息/权限",
				        confirmbtn: "更新并保存"
				    }
				    this.dialogadd = true;
				},
				addUser: function () {
				    this.addConfig = {
				        type: "add",
				        title: "新增用户",
				        confirmbtn: "保存"
				    }
				    this.dialogadd = true;
				},
				confirmUser: function () {
				    if (this.addConfig.type == "add") {
				        this.add();
				    } else {
				        this.update();
				    }
				},
				add: function () {
				 
				    const loading = this.$loading({
				        lock: true,
				        text: '加载中'
				    });
				    $.ajax({
				        url: 'handler/information.ashx?_op=SaveInfoUser',
				        data: getPost(),
				        type: 'POST',
				        dataType: "json",
				        success: function (data) {
				            loading.close();
				            vue.dialogadd = false;
				        },
				        error: function (err) {
				            loading.close()
				            vue.$message.error(err.msg)
				        }
				    });
				},
				update: function () {
				   
				    const loading = this.$loading({
				        lock: true,
				        text: '加载中'
				    });
				    $.ajax({
				        url: 'handler/information.ashx?_op=SaveInfoUser',
				        data: getPost(),
				        type: 'POST',
				        dataType: "json",
				        success: function (data) {
				            loading.close();
				            vue.dialogadd = false;
				        },
				        error: function (err) {
				            loading.close()
				            vue.$message.error(err.msg)
				        }
				    });
				},


			}

		})
		function getPost() {
		    var post = {};
		    post.ID = vue.Accountdata.ID;

		    post.UserName = vue.Accountdata.UserName;

		    post.CellPhone = vue.Accountdata.CellPhone;

		    post.JobTitle = vue.Accountdata.JobTitle;

		    post.Email = vue.Accountdata.Email;

		    post.Password = vue.Accountdata.Password;

		    post.Promotion = vue.Promotion;

		    //post.DashboardKey = vue.DashboardKey;

		    post.IBkey = vue.IBkey;

		    post.ThreeKey = vue.ThreeKey;

		    post.AreaKey = vue.AreaKey;

		    post.ClinicalKey = vue.ClinicalKey;

		    post.ProductKey = vue.ProductKey;

		    post.Role1 = vue.Accountdata.Role1;

		    post.Role2 = vue.Accountdata.Role2;

		    post.Role3 = vue.Accountdata.Role3;

		    return post;
		}
	</script>

</asp:Content>