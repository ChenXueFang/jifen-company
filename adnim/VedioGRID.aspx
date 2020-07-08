<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="VedioGrid.aspx.cs"  Inherits="ACETemplate.adnim.VedioGrid" %>

<%@ Register Src="~/adnim/include/HeadNavigation.ascx" TagPrefix="uc1" TagName="HeadNavigation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<link href="css/element-ui.css" rel="stylesheet" />
	<style>
		li[class*="item-"] {
			border: 0px solid #DDD !important;
			border-left-width: 0px !important;
		}
	</style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

	<uc1:HeadNavigation runat="server" ID="HeadNavigation" Level2Name="任务系统" Level3Name="模板管理" />
	<div class="page-content">
		<div id="app" class="pageform">
			<el-form :inline="true" :model="Form" class="demo-form-inline" @submit.prevent.stop.native="onSubmit" >

				<el-form-item v-bind:label="Form.Title.label">
					<el-input v-model="Form.Title.value" v-bind:placeholder="Form.Title.label"></el-input>
				</el-form-item>

				<el-form-item v-bind:label="Form.SubKnowledgeType.label">
					<el-cascader expand-trigger="hover" :options=" Form.SubKnowledgeType.values" v-model="Form.SubKnowledgeType.value" clearable>
					</el-cascader>
				</el-form-item>

				<el-form-item v-bind:label="Form.CreateTime.label">
					<el-date-picker v-model=" Form.CreateTime.value" format="yyyy/MM/dd" type="daterange" align="right" placeholder="选择日期范围">
					</el-date-picker>
				</el-form-item>

				<el-form-item>
                      <img class="queryAndExportIcon" src="assets/images/query.png"  @click="onSubmit" />	
				      <img class="queryAndExportIcon" src="assets/images/exportdata.png"  @click="onExport" />
				</el-form-item>
                  <img class="addData" src="assets/images/adddata.png" @click="Add" />
			</el-form>
		
			<div style="clear:both"></div>

              <el-dialog title="新增权限"   v-cloak :visible.sync="UserDg">
          <el-form :model="UserForm">
            <el-form-item label="权限名称"  label-width="400">
              <el-select filterable style="width:250px"  v-model="UserForm.authorityList" multiple placeholder="">
                 <el-option
                  v-for="item in PermisionList"
                  v-bind:key="item.TypeID"
                  v-bind:label="item.TypeName"
                  v-bind:value="item.TypeID">
                 </el-option>
      
              </el-select>
            </el-form-item>
          </el-form>
     
          <div slot="footer" class="dialog-footer">
            <el-button @click="UserDg = false">取 消</el-button>
            <el-button type="primary" @click="AddPermission()">确 定</el-button>
          </div>
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
		function geturl(data) {
		    //return `<a href='${data}' target='_blank'>查看视频</a>`
		    return "<a href='".concat(data, "' target='_blank'>查看视频</a>");
		}

		var grid_selector = "#grid-table";
		var pager_selector = "#grid-pager";

		var viewoption = {
		    //view record form
		    caption: '视频教学信息',
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
			window.open("VedioEdit.aspx?id=" + data, "_blank");
			//jQuery(grid_selector).editGridRow(data, eqoption);

		}

		function delRows1(data) {

			jQuery(grid_selector).delGridRow(data, deloption);
		}

		//  $(function () {
		var mygridinfo = {
			url: 'handler/information.ashx?_op=V_VedioQuery',
			editurl: 'handler/information.ashx?_op=Vedio',
			caption: ''
		}

		var edurl = 'SubKnowledgeType';
		if(edurl.indexOf(".") == -1) {
			edurl = 'handler/information.ashx?_op=' + edurl + "Query&rows=1000";
		}

		var editeq = {
			dataUrl: edurl,
			buildSelect: function(data) {

				var t = jQuery.parseJSON(data);
				var t2 = t.rows;
				//  JSON.parse(data);
				var t1 = mycustomfunction.getgridselecthtml(t2, 'ID', 'Name');
				var t3 = $(t1)
				setTimeout(function() {

					$(".chosen-select").trigger("liszt:updated");

					$(".chosen-select").chosen().on("change", function(evt, params) {

					});
					$(".chosen-container").width("80%");
				}, 10);
				return t3.prop('outerHTML');

			}
		};
		var selecteq = jQuery.extend(editeq, { sopt: ['eq'] });

		var deloption = {
		    //delete record form
		    caption: '视频教学删除',
		    bSubmit: "删除",
		    bCancel: "取消",
		    msg: '确定删除选中的记录吗？',
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
				sortname: "Sort",
				sortorder: "desc",
				// multiselect: true,
				//multikey: "ctrlKey",
				//multiboxonly: true,
				sortable: false,
				height: true,
				scrollOffset: 2,
				colNames: [
					'ID',
					'标题',
					'点击量',
					'分类',
					'描述',
					'创建时间',
					'视频地址',
					'视频封面(750*420px)',
					'视频列表图片(180*180px)',
					'子类名称',
					'Knowledge Type ID',
					'分类名称',
					'启用',
					'排序',
					'操作'
				],
				colModel: [
					//{
					//    name: 'myac', index: '', width: 150, fixed: true
					//},

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

					{ name: 'Title', index: 'Title', width: 120, searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw', 'ew'] }, editable: true },

					{
						name: 'ClickCount',
						index: 'ClickCount',
						width: 50,
						search: true,
						editable: true,
						editrules: { number: true },

						searchoptions: { sopt: ['eq', 'lt', 'gt', 'ge', 'le'] },
						searchtype: 'text',
						searchrules: { integer: true, required: true },

					},

					{
						name: 'SubKnowledgeType',
						index: 'SubKnowledgeType',
						width: 70,
						search: true,
						editable: true,
						editrules: { number: true },
                        hidden:true,
						edittype: "select",
						editoptions: editeq,
						searchoptions: selecteq,
						stype: 'select',

						searchrules: { integer: true, required: true },

					},

					{ name: 'Describe', index: 'Describe',hidden:true, width: 150, searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw', 'ew'] }, editable: true },

					{
						name: 'CreateTime',
						index: 'CreateTime',
						editable: true,
						width: 70,
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

					{ name: 'Url', index: 'Url', width: 70, formatter: geturl, searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw', 'ew'] }, editable: true, edittype: "textarea", editoptions: { rows: "5" } },

					{ name: 'ImageUrl', hidden: true, index: 'ImageUrl', width: 120, searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw', 'ew'] }, editable: true, edittype: "textarea", editoptions: { rows: "5" } },

					{ name: 'Thumb', hidden: true, index: 'Thumb', width: 120, searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw', 'ew'] }, editable: true, edittype: "textarea", editoptions: { rows: "5" } },
					{ name: 'subTypeName', index: 'subTypeName', width: 90, searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw', 'ew'] }, editable: true },

					{
						hidden: true,
						name: 'KnowledgeTypeID',
						index: 'KnowledgeTypeID',
						width: 70,
						search: true,
						editable: true,
						editrules: { number: true },

						searchoptions: { sopt: ['eq', 'lt', 'gt', 'ge', 'le'] },
						searchtype: 'text',
						searchrules: { integer: true, required: true },

					},

					{ name: 'TypeName', index: 'TypeName', width: 90, searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw', 'ew'] }, editable: true },

					{
						name: 'IsEnable',
						index: 'IsEnable',
						width: 50,
						search: true,
						searchoptions: {
							dataUrl: '/data/checkbox.html',
							sopt: ['eq']
						},
						stype: 'select',
						editable: true,
						edittype: "checkbox",
						editoptions: { value: "true:false" },
						unformat: aceSwitch2,
						formatter: aceSwitch1
					},
					{
						name: 'Sort',
						index: 'Sort',
						width: 50,
						search: true,
						editable: true,
						editrules: { number: true },

						searchoptions: { sopt: ['eq', 'lt', 'gt', 'ge', 'le'] },
						searchtype: 'text',
						searchrules: { integer: true, required: true },

					},
               
					{
						width: 70,
						viewable: false,
						sortable: false,
						formatter: function(data, v, row) {
							var key = row.ID
							var view = "<div title=\"\" style=\"float:left;cursor:pointer;display:;margin-left:5px; \" class=\"ui-pg-div ui-inline-edit\" id=\"jEditButton_1\" onclick=\"viewRows(".concat(key, ")\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover');\" data-original-title=\"\查看\"><span class=\"ui-icon icon-zoom-in grey\"></span></div>");
							var view1 = "<div title=\"\添加权限\"  style=\"float:left;margin-left:5px;\" onclick=\"vue.doshow(".concat(key, ",'").concat(row.AuthorityIdArr, "')\" class=\"ui-pg-div ui-inline-edit\"><span class=\"ui-icon icon-group \"></span></div>");
							return "<div style=\"margin-left:8px;\"><div title=\"\" style=\"float:left;cursor:pointer;\" class=\"ui-pg-div ui-inline-edit\" id=\"jEditButton_1\" onclick=\"editRows1(".concat(key, ")\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover');\" data-original-title=\"\编辑\"><span class=\"ui-icon ui-icon-pencil\"></span></div><div title=\"\" style=\"float:left;margin-left:5px;\" class=\"ui-pg-div ui-inline-del\" id=\"jDeleteButton_1\" onclick=\"delRows1(").concat(key, ")\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover');\" data-original-title=\"\删除\"><span class=\"ui-icon ui-icon-trash\"></span></div><div title=\"\" style=\"float:left;display:none\" class=\"ui-pg-div ui-inline-save\" id=\"jSaveButton_1\" onclick=\"jQuery.fn.fmatter.rowactions.call(this,'save');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover');\" data-original-title=\"Submit\"><span class=\"ui-icon ui-icon-disk\"></span></div><div title=\"\" style=\"float:left;display:none;margin-left:5px;\" class=\"ui-pg-div ui-inline-cancel\" id=\"jCancelButton_1\" onclick=\"jQuery.fn.fmatter.rowactions.call(this,'cancel');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover');\" data-original-title=\"Cancel\"><span class=\"ui-icon ui-icon-cancel\"></span></div>").concat(view).concat(view1, "</div>");
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

					//    var cl = ids[i];
					//    //var rowData = $("#grid-table").getRowData(cl);
					//    ed = '<button class="btn-minier btn-info" style="height:22px;width:50px;margin-left:5px;" type="button" onclick="editRow(' + cl + ')">编辑</button>';
					//    de = "<button class='btn-minier btn-danger' style='height:22px;width:50px;margin-left:5px;' type='button' onclick=\'delRow(" + cl + ")' >删除</button>";
					//    jQuery(grid_selector).jqGrid('setRowData', ids[i], { myac: ed + de });
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

		var addoption = {
			//new record form
			//closeAfterAdd: true,
			//recreateForm: true,
			//viewPagerButtons: false,
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
					//errorgrit("Error", data.msg);
					return [false, data.msg];
				}
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
				window.open("VedioEdit.aspx?id=" + rowKey, "_blank");
				//jQuery(grid_selector).editGridRow(rowKey, eqoption);
			} else {
				alert("No rows are selected");
			}
		}

		function style_edit_form(form) {

			form.parent().parent().parent().width('35%');

			form.find(':input').width('70%');

			form.find('input[name=CreateTime]').datepicker({ format: 'yyyy-mm-dd', autoclose: true });

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
			    UserDg: false,
			    PermisionList: [],
			    ObjectID:'',
			    UserForm: {
			        authorityList: [], //权限数组
			    },
				Form: {
					Title: { name: "Title", label: "标题", value: '', op: "like", data: "string" },
					SubKnowledgeType: { name: "SubKnowledgeType", label: "分类", value: '', values: [], op: "=", data: "cascader" },
					CreateTime: { name: "CreateTime", label: "创建时间", value: [], op: "", data: "date" },
				}
			},
			created: function() {

			
			},
			methods: {
			    GetPermissionList: function () {
			        var search = getSearch();
			        search.rows = 5000;
			        HttpAjax.ajaxget("handler/information.ashx?_op=PermissionTypeQuery", getSearchParams(search), function(data){
			            vue.PermisionList = data.rows;
			        }, function (){ alert("出错了，请刷新页面") })
			       
			    },
			    AddPermission: function () {

                    //objectTypeID:3 表示是视频教学
			        jQuery.ajax({
			            url: 'handler/information.ashx?_op=SavePermissionObject',
			            data: { objectID: vue.ObjectID, TypeArr: vue.UserForm.authorityList.join(','), ObjectTypeID:3 },
			            type: 'POST',
			            dataType: "json",
			            success: function (data) {
			                var d = data;
			                if (d.success) {
			                    mygritter.successgrit("成功", "操作成功");
			                    vue.UserDg = false;
			                } else {
			                    mygritter.errorgrit("失败", d.msg);
			                }
			                $("#grid-table").jqGrid().trigger("reloadGrid");			        
			            },
			            error: function (err) {
			                mygritter.errorgrit("失败", err.status);
			            }
			        });

			    },
				onSubmit:function() {
					var t1 = jQuery.SearchToSql(this.Form);
					jQuery("#grid-table").jqGrid("getGridParam", "postData").filters = JSON.stringify(t1);
					jQuery("#grid-table").jqGrid("setGridParam", { search: true }).trigger("reloadGrid", [{ page: 1 }]);
				},
				doshow: function (objectID, authorityIdArr) {
				    vue.UserDg = true;
				    vue.ObjectID = objectID;
				    if (authorityIdArr != "null") {
				        vue.SearchAuthority(authorityIdArr);
				    }
				},
				SearchAuthority:function(authorityIdArr){
				    jQuery.ajax({
				        url: 'handler/information.ashx?_op=SearchPermissionType',
				        data: { TypeIDArr: authorityIdArr },
				        type: 'POST',
				        dataType: "json",
				        success: function (data) {
				            var d = data;
				            if (d.success) {
				                vue.UserForm.authorityList = _.union(_.map(d.data, 'TypeID'));
				            } else {
				                mygritter.errorgrit("失败", d.msg);
				            }
				        },
				        error: function (err) {
				            mygritter.errorgrit("失败", err.status);
				        }
				    });
				},
				Add: function() {
					window.location.href = "VedioEdit.aspx"
					//jQuery(grid_selector).editGridRow("new", addoption);
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

				        url: " handler/information.ashx?_op=V_VedioQuery&IsExport=true",
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

				}
			}

		})
	</script>

</asp:Content>