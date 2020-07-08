<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="AOPLogGrid.aspx.cs"  Inherits="ACETemplate.adnim.AOPLogGrid" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <link  href="http://unpkg.com/element-ui/lib/theme-default/index.css" rel="stylesheet" />

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
		<!-- /.page-header -->
	<div id="app">
<el-form :inline="true" :model="Form" class="demo-form-inline">
  <el-form-item v-bind:label="Form.User.label">
    <el-input v-model="Form.User.value" placeholder="审批人"></el-input>

  
  </el-form-item>
      <el-form-item v-bind:label="Form.StatusId.label">
				<el-switch v-model=" Form.StatusId.value" on-text="" off-text></el-switch>
			</el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="Form.Region.value" placeholder="活动区域">
       <el-option
      v-for="item in Form.Region.values"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
      <span class="demonstration">{{Form.CreateDate.label}}</span>
        <el-date-picker v-model=" Form.CreateDate.value" format="yyyy-MM-dd" type="daterange" align="right" placeholder="选择日期范围" >
    </el-date-picker>
  </el-form-item><el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
</div>
    
    	<div class="row">
			<div class="col-xs-12">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
				<!-- PAGE CONTENT ENDS -->
			</div>
			<!-- /.col -->
		</div>
		<!-- /.row -->
    <!-- /.page-content -->
    
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptBlock" runat="server">
   
<script src="assets/js/jqGrid/jquery.jqGrid.min.js"></script>
<script src="assets/js/jqGrid/i18n/grid.locale-cn.js"></script>
    <script src="js/element.js"></script>
<script src="js/GridModel.js"></script>
    <script>
        var vue = new Vue({
            el: "#app",
            data: {
                Form: {
                    User: { name:"PageName",label: "审批人", value: '', op: "like", data: "string" },
                    Region: {name:"LevelInfo", label: "region", value: '', op: "=", values: [], data: "select" },
                    CreateDate: { name: "CreateTime",  label: "创建日期", value: [], data: "date" },
                    StatusId: {name:"LevelInfo", label: "region", value: '', op: "=",  data: "string" },
              
                }
               


            },
            created: function () {

                jQuery.ajax({
                    url: '/data/Checkbox.json',
                    type: 'get',
                    dataType: "json",
                    success: function (data) {
                           // debugger;
                            vue.Form.Region.values = data;
                    },
                    error: function (err) {
                        mygritter.errorgrit("失败",err.status);
                    
                    }

                });
             
            },
            methods: {
                onSubmit() {
                    //alert(JSON.stringify( $("#grid-table").jqGrid("getGridParam", "postData")))
                    //var s = new getSearch();
                    //debugger;
                  var t=  $("#grid-table").jqGrid("getGridParam", "postData")
                  console.log(t)
                  var t1 = $.SearchToSql(this.Form);
                  $("#grid-table").jqGrid("getGridParam", "postData").filters = JSON.stringify(t1);

                  $("#grid-table").jqGrid("setGridParam", { search: true }).trigger("reloadGrid", [{ page: 1 }]);
                    //t.filters = {};
                    //
                    //alert(JSON.stringify(t1));
                    //console.log('submit!');
                }
            }

        })

    </script>
<script type="text/javascript">
    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";
    var stringformatvalue = {};

    $(function () {
        var mygridinfo = {
            url: 'handler/information.ashx?_op=aoplogquery',
            editurl: 'handler/information.ashx?_op=AOPLog',
            caption: 'AOPLOG'
        }
        var deloption = {
            //delete record form
            recreateForm: true,
            beforeShowForm: function (e) {
                var form = $(e[0]);
                if (form.data('styled')) return false;

                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                style_delete_form(form);

                form.data('styled', true);
            },
            afterSubmit: function (data, postdata) {
                debugger;
                var jsonResponse = jQuery.parseJSON(data.responseText);
                if (jsonResponse.success) {
                    return [true, ""];
                } else
                    // alert("afterSubmit");
                    return [false, "提交错误"]; //è¿å0è¡¨ç¤ºæ­£å¸¸
            },
        }

        function gridload() {


            jQuery(grid_selector).jqGrid({
                ajaxSelectOptions: {
                    type: "GET"
                },
                //direction: "rtl",
                datatype: "json",
                mytype: 'POST',
                url: mygridinfo.url,

                // multiselect: true,
                //multikey: "ctrlKey",
                //multiboxonly: true,
                sortable: false,
                height: $.grid.heigth,
                colNames: [

					'ID',
					'Page Name',
					'Absolute Uri',
					'From String',
					' Op',
					'Create Time',
					'Session ID',
					'User ID',
					'IP',
					'Level Info',
					'Result',
                ],
                colModel: [

                    {

                        name: 'ID', index: '', width: 80, fixed: true, sortable: false, resize: false,
                        formatter: 'actions',
                        key: true,
                        formatoptions: {
                            editformbutton: true,
                            delbutton: true,
                            delOptions: deloption,
                            // delOptions: { recreateForm: true, beforeShowForm: beforeDeleteCallback, afterSubmit: function () { return [false, "s"] } },
                        }
                    },


					{
					    name: 'PageName',
					    index: 'PageName',
					    width: 120,
					    formatter: stringFomart,
					    unformat: unstringFomart,
					    searchoptions: {
					        sopt: ['cn', 'eq', 'ne', 'bw', 'ew']
					    },
					    editable: true,
					    edittype: "textarea",
					    editoptions: {
					        rows: "5"
					    }
					},

					{
					    name: 'AbsoluteUri',
					    index: 'AbsoluteUri',
					    width: 120,
					    formatter: stringFomart,
					    unformat: unstringFomart,
					    searchoptions: {
					        sopt: ['cn', 'eq', 'ne', 'bw', 'ew']
					    },
					    editable: true,
					    edittype: "textarea",
					    editoptions: {
					        rows: "5"
					    }
					},

					{
					    name: 'FromString',
					    index: 'FromString',
					    width: 120,
					    formatter: stringFomart,
					    unformat: unstringFomart,
					    searchoptions: {
					        sopt: ['cn', 'eq', 'ne', 'bw', 'ew']
					    },
					    editable: true,
					    edittype: "textarea",
					    editoptions: {
					        rows: "5"
					    }
					},

					{
					    name: '_Op',
					    index: '_Op',
					    width: 90,
					    searchoptions: {
					        sopt: ['cn', 'eq', 'ne', 'bw', 'ew']
					    },
					    editable: true
					},

					{
					    name: 'CreateTime',
					    index: 'CreateTime',
					    editable: true,
					    width: 90,
					    search: true,
					    searchoptions: {
					        dataInit: searchdate,
					        attr: {
					            title: 'select date'
					        },
					        sopt: ['eq', 'lt', 'gt']
					    },
					    searchtype: 'text',
					    searchrules: {
					        required: true
					    },
					    formatter: 'date',
					    formatoptions: {
					        srcformat: 'Y-m-d H:i:s',
					        newformat: 'Y/m/d'
					    }
					},

					{
					    name: 'SessionID',
					    index: 'SessionID',
					    width: 90,
					    searchoptions: {
					        sopt: ['cn', 'eq', 'ne', 'bw', 'ew']
					    },
					    editable: true
					},

					{
					    name: 'UserID',
					    index: 'UserID',
					    width: 90,
					    searchoptions: {
					        sopt: ['cn', 'eq', 'ne', 'bw', 'ew']
					    },
					    editable: true
					},

					{
					    name: 'IP',
					    index: 'IP',
					    width: 90,
					    searchoptions: {
					        sopt: ['cn', 'eq', 'ne', 'bw', 'ew']
					    },
					    editable: true
					},

					{
					    name: 'LevelInfo',
					    index: 'LevelInfo',
					    width: 70,
					    search: true,
					    editable: true,
					    editrules: {
					        number: true
					    },

					    searchoptions: {
					        dataUrl: '/data/checkbox.html', sopt: ['eq']
					    }
		                , stype: 'select',
					    searchrules: {
					        integer: true,
					        required: true
					    },

					},

					{
					    name: 'Result',
					    index: 'Result',
					    width: 120,
					    formatter: stringFomart,
					    unformat: unstringFomart,
					    searchoptions: {
					        sopt: ['cn', 'eq', 'ne', 'bw', 'ew']
					    },
					    editable: true,
					    edittype: "textarea",
					    editoptions: {
					        rows: "5"
					    }
					},

                ],
                ondblClickRow: editRows,
                viewrecords: true,
                rowNum: 10,
                rowList: [10, 20, 50],
                pager: pager_selector,
                altRows: true,
                //toppager: true,

                //loadonce: true,

                loadComplete: function () {
                    var table = this;
                    var ids = jQuery(grid_selector).jqGrid('getDataIDs');

                    //    var cl = ids[i];
                    //    //var rowData = $("#grid-table").getRowData(cl);
                    //    ed = '<button class="btn-minier btn-info" style="height:22px;width:50px;margin-left:5px;" type="button" onclick="editRow(' + cl + ')">ç¼è¾</button>';
                    //    de = "<button class='btn-minier btn-danger' style='height:22px;width:50px;margin-left:5px;' type='button' onclick=\'delRow(" + cl + ")' >å é¤</button>";
                    //    jQuery(grid_selector).jqGrid('setRowData', ids[i], { myac: ed + de });
                    //

                    setTimeout(function () {
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

        var eqoption = {
            //edit record form
            //closeAfterEdit: true,
            recreateForm: true,
            beforeShowForm: function (e) {

                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                style_edit_form(form);
                //  aceSwitch(null, null, e);

            },
            afterSubmit: function (response, postdata) {
                var data = jQuery.parseJSON(response.responseText);
                if (data.success) {
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
        //navButtons
        jQuery(grid_selector).jqGrid('navGrid', pager_selector, { //navbar options
            edit: true,
            editicon: 'icon-pencil blue',
            add: true,
            //addfunc: function () { alert("d"); },

            addicon: 'icon-plus-sign purple',

            del: true,
            delicon: 'icon-trash red',
            search: true,
            searchicon: 'icon-search orange',

            refresh: true,
            refreshicon: 'icon-refresh green',

            view: true,
            viewicon: 'icon-zoom-in grey',
        },
			//eidtoptions
			eqoption, {
			    //new record form
			    //closeAfterAdd: true,
			    //recreateForm: true,
			    //viewPagerButtons: false,
			    closeAfterAdd: true,
			    recreateForm: true,
			    viewPagerButtons: false,
			    beforeShowForm: function (e) {
			        var form = $(e[0]);
			        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
			        style_edit_form(form);
			        //debugger;
			        // aceSwitch(null,null,e);
			    },
			    afterSubmit: function (response, postdata) {
			        var data = jQuery.parseJSON(response.responseText);
			        if (data.success) {
			            return true;
			        } else {
			            // mygritter.errorgrit("éè¯¯","");
			            return [false, "æä½å¤±è´¥"];
			        }
			    },
			},
            deloption,
			{

			    //search form
			    recreateForm: true,
			    afterShowSearch: function (e) {
			        var form = $(e[0]);
			        form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
			        style_search_form(form);
			        //   style_search_filters(form);

			    },
			    afterRedraw: function () {
			        style_search_filters($(this));
			    },
			    multipleSearch: true,

			    /**
				multipleGroup:true,
                    
				*/
			}, {
			    //view record form
			    recreateForm: true,
			    beforeShowForm: function (e) {
			        var form = $(e[0]);
			        form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
			    }
			}
		)

        //enable search/filter toolbar
        //jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})

        //switch element when editing inline
        function aceSwitch(cellvalue, options, cell) {
            setTimeout(function () {
                $(cell).find('input[type=checkbox]')
					.wrap('<label class="inline" />')
					.addClass('ace ace-switch ace-switch-5')
					.after('<span class="lbl"></span>');
            }, 0);
        }

        function aceSwitch1(cellvalue, options, cell) {

            var s = "";
            if (cellvalue == true) {
                return '<span class="label label-xlg label-primary arrowed-in-right arrowed-in"">YES</span>';

            } else {
                return '<span class="label  label-xlg label-grey arrowed-in-right arrowed-in"">NO</span>';

            }
            return s;
        }

        function aceSwitch2(cellvalue, options, cell) {
            // return "true";
            if (cellvalue == "YES") {
                return "true";
            }
            return "false";
            //return $(cellvalue).val();
        }

        function pickDate(cellvalue, options, cell) {
            setTimeout(function () {
                $(cell).find('input[type=text]')
					.datepicker({
					    format: 'yyyy-mm-dd',
					    autoclose: true
					});
            }, 0);
        }




        //function unstringFomart(cellvalue, options, cell) {
        //    debugger;

        //	var v = eval("stringformatvalue.rowid" + options.rowId + options.colModel.name);
        //	return v;

        //}

        function searchdate(cell) {

            setTimeout(function () {
                $(cell)
					.datepicker({
					    format: 'yyyy-mm-dd',
					    autoclose: true
					});
            }, 0);
        }

        function editRows() {
            var rowKey = jQuery(grid_selector).getGridParam("selrow");
            if (rowKey) {
                jQuery(grid_selector).viewGridRow(rowKey, eqoption);
            } else {
                alert("No rows are selected");
            }
        }

        function style_edit_form(form) {

            form.find('input[name=CreateTime]').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true
            });

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
            if (form.data('styled')) return false;

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
            $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
                var icon = $(this);
                var $class = jQuery.trim(icon.attr('class').replace('ui-icon', '')); //lost this

                if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
            })
        }

        function enableTooltips(table) {
            $('.navtable .ui-pg-button').tooltip({
                container: 'body'
            });
            $(table).find('.ui-pg-div').tooltip({
                container: 'body'
            });
        }

    });
</script>
    </asp:Content>