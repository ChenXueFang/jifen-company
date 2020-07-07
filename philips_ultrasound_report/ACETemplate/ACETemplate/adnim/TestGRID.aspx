<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="TestGrid.aspx.cs"  Inherits="ACETemplate.adnim.TestGrid" %>



<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   <link  href="css/element-ui.css" rel="stylesheet" />

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


	<div >
		<div id="app" style="padding:0;border:1px solid white" >
<el-form :inline="true" :model="Form" class="demo-form-inline"  @submit.prevent.stop.native="onSubmit" style="margin:25px 0px 0px 0px;">
									
			   									
			   																																<el-form-item  v-bind:label="Form.Type.label">
								<el-select v-model="Form.Type.value" clearable filterable  
																			multiple
																	>
								   <el-option
								  v-for="item in Form.Type.values"
								  :label="item.Text"
								  :value="item.ID">
								</el-option>
								</el-select>
								</el-form-item>
																																		
			   									
			   									
			   									
			   									
			   									
			   
	<el-form-item>
    <el-button type="primary" @click="onSubmit" style="border-radius:0;">查询</el-button>
  </el-form-item>
</el-form>
   
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
	</div>
    <!-- /.page-content -->

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptBlock" runat="server">
    <script src="assets/js/jqGrid/jquery.jqGrid.min.js"></script>
    <script src="assets/js/jqGrid/i18n/grid.locale-cn.js"></script>
	<script src="js/element.js"></script>
    <script src="js/GridModel.js"></script>


    <script type="text/javascript">
        var grid_selector = "#grid-table";
        var pager_selector = "#grid-pager";

		        var viewoption = {
            //view record form
            recreateForm: true,
            beforeShowForm: function (e) {
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
            closeOnEscape: true,//Closes the popup on pressing escape key
            reloadAfterSubmit: true,

        };

        function viewRows(data) {
            jQuery(grid_selector).viewGridRow(data, viewoption);

        }

        function editRows1(data) {

            jQuery(grid_selector).editGridRow(data, eqoption);

        }

        function delRows1(data) {
          
            jQuery(grid_selector).delGridRow(data, deloption);
        }

      
      //  $(function () {
        	var mygridinfo = {
		    url: 'handler/information.ashx?_op=TestQuery',
		    editurl: 'handler/information.ashx?_op=Test',
		    caption:''
				}
			 			 																														
						var edurl= 'TestType';
						if(edurl.indexOf(".") == -1) {
							edurl = 'handler/information.ashx?_op=' + edurl + "Query&rows=1000";
						}

			    var editeq = {
                dataUrl: edurl,
                buildSelect: function (data) {

                    var t = jQuery.parseJSON(data);
                    var t2 = t.rows;
                    //  JSON.parse(data);
                    var t1 = mycustomfunction.getgridselecthtml(t2, 'ID', 'Text');
                    var t3 = $(t1)
                    setTimeout(function () {

                        $(".chosen-select").trigger("liszt:updated");

                        $(".chosen-select").chosen().on("change", function (evt, params) {
                        
                        });
                        $(".chosen-container").width("80%");
                    }, 10);
                    return t3.prop('outerHTML');

                }
            };
            var selecteq = jQuery.extend(editeq, { sopt: ['eq'] });

																																									
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
																							'Text',
																							'测试类型',
																							'头像',
																							'Noedit',
																																		'User Id',
																							'No Edit1',
																
                    ],
                    colModel: [
                        //{
                        //    name: 'myac', index: '', width: 150, fixed: true
                        //},
                                      			
			                          			 		       	                    	{ name: 'ID', index: 'ID', width: 90, hidden: true, key: true , formatter: 'actions',
                        key: true,
                        formatoptions: {
                            editformbutton:true,
                            delbutton:true,
                            delOptions: deloption,
                         
                        }},

							
	                    				
                    			
			                          			 		       									                  			                     			                     														                     		
			                     					                     				{   name: 'Text', index: 'Text', width: 90 ,searchoptions: {sopt:['cn', 'eq', 'ne', 'bw', 'ew']},editable: true},
																					                     			              
		                     		                     	                    
										
                    			
			                          			 		       									                  			                     			                     															                     			{   name: 'Type', index: 'Type', width: 70, search: true, editable: true,editrules:{number:true},
												
																														    edittype: "select",
													 editoptions: editeq,
													searchoptions: selecteq
                          				    		,stype: 'select',
											
												                          				    	                          				    		 searchrules:{integer:true,required:true},
                          				    	                
                							},
		                     					                     			              
		                     		                     	                    
										
                    			
			                          			 		       									                  			                     			                     														                     		
			                     					                     				{   name: 'Image', index: 'Image', width: 90 ,searchoptions: {sopt:['cn', 'eq', 'ne', 'bw', 'ew']},editable: true},
																					                     			              
		                     		                     	                    
										
                    			
			                          			 			 		       									                  			                     			                     														                     		
			                     					                     				{   name: 'Noedit', index: 'Noedit', width: 90 ,searchoptions: {sopt:['cn', 'eq', 'ne', 'bw', 'ew']},editable: false},
																					                     			              
		                     		                     	                    
										
                    			
			                          			 		       								                    
										
                    			
			                          			 		       									                  			                     			                     															                     			{   name: 'UserId', index: 'UserId', width: 70, search: true, editable: true,editrules:{number:true},
												
																										searchoptions: {sopt: ['eq', 'lt' ,'gt','ge','le']}
                          				    	,searchtype: 'text',
												                          				    	                          				    		 searchrules:{integer:true,required:true},
                          				    	                
                							},
		                     					                     			              
		                     		                     	                    
										
                    			
			                          			 			 		       									                  			                     			                     														                     		
			                     					                     				{   name: 'NoEdit1', index: 'NoEdit1', width: 90 ,searchoptions: {sopt:['cn', 'eq', 'ne', 'bw', 'ew']},editable: false},
																					                     			              
		                     		                     	                    
										
                              

                    ],
                   // ondblClickRow:editRows,
                    viewrecords: true,
                    rowNum: 10,
                    rowList: [10, 20, 50],
                    pager: pager_selector,
                    altRows: true,
                    //toppager: true,

                    //loadonce: true,

                    loadComplete: function (res) {
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

                    editurl:mygridinfo.editurl,//nothing is saved
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
			            //errorgrit("Error", data.msg);
			            return [false, data.msg];
			        }
			    }
			}

          
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
                        return [false,"操作失败"];
                    }
                },
                //closeAfterAdd: true,//Closes the add window after add
                closeAfterEdit: true,
                closeOnEscape: true,//Closes the popup on pressing escape key
                reloadAfterSubmit: true,
				viewPagerButtons: false,
            };



            //navButtons
            jQuery(grid_selector).jqGrid('navGrid', pager_selector,
                { 	//navbar options
                    edit: false,
                    editicon: 'icon-pencil blue',
                    add: true,
                    //addfunc: function () { alert("d"); },

                    addicon: 'icon-plus-sign purple',

                    del: true,
                    delicon: 'icon-trash red',
                    search: false,
                    searchicon: 'icon-search orange',
               
                    refresh: true,
                    refreshicon: 'icon-refresh green',

                    view: true,
                    viewicon: 'icon-zoom-in grey',
                },
                //eidtoptions
			   eqoption,
               addoption,
             
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
                    }
                    ,
                                        multipleSearch: true,

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
			        //return '<span class="label label-xlg label-primary arrowed-in-right arrowed-in"">YES</span>';
					 return '<span >YES</span>';

			    }
			    else {
			       // return '<span class="label  label-xlg label-grey arrowed-in-right arrowed-in"">NO</span>';
				    return '<span >NO</span>';
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
                            .datepicker({ format: 'yyyy-mm-dd', autoclose: true });
                }, 0);
            }
			
		
           function searchdate(cell) {

		            setTimeout(function () {
		                $(cell)
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

			
                form.parent().parent().parent().width('35%');

                form.find(':input').width('70%');
            	
            	  		                  			                                         		                  			                                         		                  			                                         		                  			                                         		                  			                                         		                  			                                             	 form.find('input[name=IsDelete]')
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
                    var $class = .trim(icon);
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
                    var $class = jQuery.trim(icon.attr('class').replace('ui-icon', '')); //lost this

                    if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
                })
            }

            function enableTooltips(table) {
                $('.navtable .ui-pg-button').tooltip({ container: 'body' });
                $(table).find('.ui-pg-div').tooltip({ container: 'body' });
            }		
          
       // });    
    </script>

		<script>
	var vue=new Vue({
	   el:"#app",
	   data:{
		   Form:{	
			   									
			   									
			   																																Type:{name:"Type",label: "测试类型", 
								value: 
																[],
																values:[], op: "=", data: "select" },
																																		
			   									
			   									
			   									
			   									
			   									
			   			 }
	   },
	   created: function () {
			
			  													
																													
					var url = 'TestType';
						if(url.indexOf(".") == -1) {
							url = 'handler/information.ashx?_op=' + url + "Query&rows=1000";
						}
					  jQuery.ajax({
								url: url,
								type: 'get',
								dataType: "json",
								success: function (data) {
									vue.Form.Type.values = data.rows||data;
								},
								error: function (err) {
									mygritter.errorgrit("失败",err.status);
                    
								}

							});
					
									
																																									
																		
              
             
            },
            methods: {
                onSubmit() {
                  var t1 =jQuery.SearchToSql(this.Form);
                  jQuery("#grid-table").jqGrid("getGridParam", "postData").filters = JSON.stringify(t1);
                  jQuery("#grid-table").jqGrid("setGridParam", { search: true }).trigger("reloadGrid", [{ page: 1 }]);
                },
				Add:function(){
				 jQuery(grid_selector).editGridRow("new", addoption);
				}
            }
	   
	})
	
	</script>



     </asp:Content>
