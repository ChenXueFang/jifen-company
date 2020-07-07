<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserListGrid.aspx.cs" Inherits="ACETemplate.adnim.UserListGrid" %>
<%@ Register Src="~/adnim/Header.ascx"  TagName="head" TagPrefix="user"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <user:head runat="server"></user:head>
</head>
	<body  class="page-content">
    <form id="form1" runat="server">
        
    <div >
	
        <!-- /.page-header -->

        <div class="row">
            <div class="col-xs-12">
                <table id="grid-table"></table>

                <div id="grid-pager"></div>

                <script type="text/javascript">
                    var $path_base = "/";//this will be used in gritter alerts containing images
                </script>
                <%--                                                         <input id="input-1a" type="file" class="file" data-show-preview="false">--%>
                <!-- PAGE CONTENT ENDS -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
  
                

        </div>
    
    </form>
</body>
</html>
    <script src="assets/js/jqGrid/jquery.jqGrid.min.js"></script>
    <script src="assets/js/jqGrid/i18n/grid.locale-en.js"></script>
    <script src="assets/js/jquery.gritter.min.js"></script>
    <script src="js/GridModel.js"></script>
     <script type="text/javascript">
        var grid_selector = "#grid-table";
        var pager_selector = "#grid-pager";
        var UploadCallBack;

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
        //$.ajax({
        //   url: 'handler/upload.ashx?_op=queryEmailIdentityType',
        //   //  contentType: "multipart/form-data",
        //   contentType: false,
        //   processData: false,
        //   type: 'POST',
        //   dataType: "json",
        //   success: function (data) {
        //       select1 = $(data);
        //       //开始加载数据
        //       // debugger                

        //   },
        //   error: function (err) {
        //       errorgrit("错误", "数据初始化失败，请刷新页面");
        //      // l.stop();
        //   }
        //       //   $("#dialog-message").dialog("open");

        //   });

        $(function () {
          
            //alert($.jgrid.ajaxafter)
            UploadCallBack = function (setting) {
                // alert(setting.data.JsonFileName);
                $(grid_selector).jqGrid("clearGridData");
               
                //    $(grid_selector).jqGrid("setGridParam", { loadonce: false, url: 'handler/upload.ashx?_op=queryupdateemail&filename=' + setting.data.JsonFileName }).trigger("reloadGrid", [{ page: 1 }]);  //重载JQGrid
                $(grid_selector).jqGrid('GridUnload');
                gridload(setting.data.JsonFileName);
                //alert("sd");
                // $(grid_selector).jqGrid("setGridParam", { url: 'handler/newshandler.ashx?_op=ADD' }).trigger("reloadGrid", [{ page: 1 }]);  //重载JQGrid

            };
            function showrole1(cellvalue, options, rowObject) {
              
                return (rowObject.UserRoles & 1) == 1 ? "true" : "false";

            }
            function showrole2(cellvalue, options, rowObject) {

                return (rowObject.UserRoles & 2) == 2 ? "true" : "false";

            }
            function showrole3(cellvalue, options, rowObject) {

                return (rowObject.UserRoles & 4) == 4 ? "true" : "false";

            }

            function showrole4(cellvalue, options, rowObject) {

                return (rowObject.UserRoles & 8) == 8 ? "true" : "false";

            }
            function status(cellvalue, options, rowObject) {
                if (rowObject.A == "") {
                    return "";

                }
                var labeltype = "";
                switch (cellvalue) {

                    case "1":
                        labeltype = '<span class="label label-sm label-success arrowed arrowed-right">可发送</span>';
                        break;
                    case "2":
                        labeltype = '<span class="label label-sm label-primary arrowed arrowed-right">跳过</span>';
                        break;
                    case "3":
                        labeltype = '<span class="label label-sm label-danger arrowed-in-right arrowed-in" >错误[未找到邮件]</span>';
                        break;
                }
                return labeltype;
            }
        
            function gridload(jsonfilename) {
                jQuery(grid_selector).jqGrid({
                    //direction: "rtl",
                    datatype: "json",
                    mytype: 'POST',
                    url: 'handler/newshandler.ashx?_op=userquery',
                    postData: {
                        name: ""
                    },
                    // multiselect: true,
                    //multikey: "ctrlKey",
                    //multiboxonly: true,
                    sortable: false,
                    height: $.grid.heigth,
                    colNames: ['','用户名',  '姓名', '用户权限','基础数据权限','发布权限', '数据维护权限', '创建时间', ''],
                    colModel: [
                        //{
                        //    name: 'myac', index: '', width: 150, fixed: true
                        //},
                        
                       { name: 'UserRoles', editable:false, hidden:true, index: 'UserRoles' },

                       { name: 'UserName', editable: true, editrules: { required: true } , sortable: false, index: 'UserName', width: 180 },
                       { name: 'RealName', editable: true,  index: 'RealName', width: 100 },
                       { name: 'Role1', edittype: "checkbox", editoptions: { value: "true:false" }, unformat: aceSwitch, editable: true, width: 150, sortable: false, formatter: showrole1, },

                       { name: 'Role2', edittype: "checkbox", editoptions: { value: "true:false" }, unformat: aceSwitch, editable: true, width: 100, sortable: false, formatter: showrole2},
                       { name: 'Role3', edittype: "checkbox", editoptions: { value: "true:false" }, unformat: aceSwitch, editable: true, sortable: false, width: 120, formatter: showrole3, },
                       { name: 'Role4', edittype: "checkbox", editoptions: { value: "true:false" }, unformat: aceSwitch, editable: true, sortable: false, width: 120, formatter: showrole4, },

                       { name: 'CreateDate', sortable: false, index: 'CreateDate', width: 90 },

                      { name: "ID", hidden: true, key: true }

                    ],
                    ondblClickRow:editRows,
                    viewrecords: true,
                    rowNum: 10,
                    rowList: [10, 20, 50],
                    pager: pager_selector,
                    altRows: true,
                    //toppager: true,

                   // loadonce: true,

                    loadComplete: function () {
                        var table = this;
                        var ids = jQuery(grid_selector).jqGrid('getDataIDs');
                  
                        //    var cl = ids[i];
                        //    //var rowData = $("#grid-table").getRowData(cl);
                        //    ed = '<button class="btn-minier btn-info" style="height:22px;width:50px;margin-left:5px;" type="button" onclick="editRow(' + cl + ')">编辑</button>';
                        //    de = "<button class='btn-minier btn-danger' style='height:22px;width:50px;margin-left:5px;' type='button' onclick=\'delRow(" + cl + ")' >删除</button>";
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

                    editurl:'handler/newshandler.ashx?_op=user',//nothing is saved
                    caption: "用户列表",


                    autowidth: true,
          
                    

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
                        alert(data.msg);
                        return [false];
                    }
                },
                //closeAfterAdd: true,//Closes the add window after add
                closeAfterEdit: true,
                closeOnEscape: true,//Closes the popup on pressing escape key
                reloadAfterSubmit: true,

            };
            //navButtons
            jQuery(grid_selector).jqGrid('navGrid', pager_selector,
                { 	//navbar options
                    edit: true,
                    editicon: 'icon-pencil blue',
                    add: true,
                    //addfunc: function () { alert("d"); },

                    addicon: 'icon-plus-sign purple',
                    searchicon: 'icon-search orange',

                    del: true,
                    delicon: 'icon-trash red',
                    search: false,
                    searchicon: 'icon-search orange',
               
                    refresh: true,
                    refreshicon: 'icon-refresh green',

                    //view: true,
                    //viewicon: 'icon-zoom-in grey',
                },
                //eidtoptions
               eqoption,
                {
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
                    }
                    ,
                    afterSubmit: function (response, postdata) {
                        var data = jQuery.parseJSON(response.responseText);
                        if (data.success) {
                            return true;
                        } else {
                            errorgrit("错误",data.msg);
                            return [false,data.msg];
                        }
                    }
                },
                {
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
                        // alert("afterSubmit");
                        var jsonResponse = $.parseJSON(data.responseText);
                        if (jsonResponse.success) {
                            return [true, ""];
                        }
                        else
                            // alert("afterSubmit");
                            return [false, "删除错误"]; //返回0表示正常
                    },
                },

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
                    }
                    ,
                    /**
                    multipleGroup:true,
                    
                    */
                },
                {
                    //view record form
                    recreateForm: true,
                    beforeShowForm: function (e) {
                        var form = $(e[0]);
                        form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
                    }
                }
            )


       

            jQuery(grid_selector).navButtonAdd(pager_selector, {
                caption: "重置密码",
                title: "重置密码",
                buttonicon: "ace-icon fa fa-globe blue",
                onClickButton: function () {
                    var s;
                    //多选获取
                    s = jQuery(grid_selector).jqGrid('getGridParam', 'selrow');
                    if (s == null) {
                        $.jgrid.info_dialog(
              "Warning",
                  '<div class="ui-state-waring">请选择行: </div>',
                   "",
           { buttonalign: 'center', styleUI: 'Bootstrap' }
              )

                    }
                   
                    else {
               
                        //var postData = $(grid_selector).jqGrid("getGridParam", "postData");

                        //var 
                        //$.extend(postData, {
                        //    //name: $("#Activity_Name").val()
                        //});
                        //$(grid_selector).jqGrid('setGridParam', {

                        //    "postData":postData}).trigger("reloadGrid");  //重载JQGrid

                        //通过 jqoper 类直接修改

                        var postData = { ID: s, Password: "111111" };

                        //   alert(jQuery.toJSON(uploadimport.data));
                        $.extend(postData, {oper:"edit"});

                        //   var gdata = JSON.stringify(postData);
                        $.ajax({
                            url: 'handler/newshandler.ashx?_op=user',
                            data: postData,
                            //  contentType: "multipart/form-data",
                            //  contentType: false,
                            // processData: false,
                            type: 'POST',
                            dataType: "json",
                            success: function (data) {
                                select1 = $(data);
                                successgrit("成功", "密码已恢复初始值");
                                //开始加载数据
                                // debugger                

                            },
                            error: function (err) {
                                errorgrit("错误", "网络故障");
                                // l.stop();
                            }
                            //   $("#dialog-message").dialog("open");

                        });

                        //通过grid 推送 
                     //   var postData = {ID:s,Password:111111};
                         
                     //   //   alert(jQuery.toJSON(uploadimport.data));
                     //   $.extend(postData, {});

                     ////   var gdata = JSON.stringify(postData);
                     //   $.ajax({
                     //       url: 'handler/upload.ashx?_op=userresetpassword&id='+s,
                     //       data: postData,
                     //      //  contentType: "multipart/form-data",
                     //    //  contentType: false,
                     //     // processData: false,
                     //      type: 'POST',
                     //      dataType: "json",
                     //      success: function (data) {
                     //          select1 = $(data);
                     //          successgrit("成功", "密码已恢复初始值");
                     //          //开始加载数据
                     //          // debugger                

                     //      },
                     //      error: function (err) {
                     //          errorgrit("错误","网络故障");
                     //         // l.stop();
                     //      }
                     //          //   $("#dialog-message").dialog("open");

                     //      });
                    }
                },
                position: "last"
            })
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

            function pickDate(cellvalue, options, cell) {
                setTimeout(function () {
                    $(cell).find('input[type=text]')
                            .datepicker({ format: 'yyyy-mm-dd', autoclose: true });
                }, 0);
            }

         
         
            function editRows() {
                var rowKey = jQuery(grid_selector).getGridParam("selrow");
                if (rowKey) {
                    jQuery(grid_selector).editGridRow(rowKey, eqoption);
                }
                else {
                    alert("No rows are selected");
                }
            }
            function style_edit_form(form) {
                //enable datepicker on "sdate" field and switches for "stock" field
                //form.find('input[name=sdate]').datepicker({ format: 'yyyy-mm-dd', autoclose: true })
                //    .end()

                form.find('input[name=Role1]')
                         .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');
                form.find('input[name=Role2]')
                     .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');
                form.find('input[name=Role3]')
                     .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

                form.find('input[name=Role4]')
                                  .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

                ////update buttons classes
                var buttons = form.next().find('.EditButton .fm-button');
                buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
                buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
                buttons.eq(1).prepend('<i class="icon-remove"></i>')

                buttons = form.next().find('.navButton a');
                buttons.find('.ui-icon').remove();
                buttons.eq(0).append('<i class="icon-chevron-left"></i>');
                buttons.eq(1).append('<i class="icon-chevron-right"></i>');
            }

            function style_delete_form(form) {
                var buttons = form.next().find('.EditButton .fm-button');
                buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
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
                    var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
                    if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
                })
                */
            }

            //replace icons with FontAwesome icons like above
            function updatePagerIcons(table) {
                var replacement =
                {
                    'ui-icon-seek-first': 'icon-double-angle-left bigger-140',
                    'ui-icon-seek-prev': 'icon-angle-left bigger-140',
                    'ui-icon-seek-next': 'icon-angle-right bigger-140',
                    'ui-icon-seek-end': 'icon-double-angle-right bigger-140'
                };
                $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
                    var icon = $(this);
                    var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

                    if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
                })
            }

            function enableTooltips(table) {
                $('.navtable .ui-pg-button').tooltip({ container: 'body' });
                $(table).find('.ui-pg-div').tooltip({ container: 'body' });
            }
          
        });
    

   
        function search() {
            var postData = $(grid_selector).jqGrid("getGridParam", "postData");

            $.extend(postData, {
                //name: $("#Activity_Name").val()
            });
            $(grid_selector).jqGrid("setGridParam", { search: true }).trigger("reloadGrid", [{ page: 1 }]);  //重载JQGrid
        }
        function add() {
            window.location = "news-detail.aspx";
        }
        function editRow(id) {
            window.location = "news-detail.aspx?Id=" + id;
        }

  
    
    </script>

