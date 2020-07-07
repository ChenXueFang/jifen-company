    <%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="Aoplogedit.aspx.cs"  Inherits="ACETemplate.adnim.Aoplogedit" %>

    <asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	    <link rel="stylesheet" href="assets/css/bootstrap-editable.css" />
		<link rel="stylesheet" href="assets/css/chosen.css" />
        <link rel="stylesheet" href="assets/css/ace.min.css" />
		    <link href="css/element-ui.css" rel="stylesheet" />

	</asp:Content>
     <asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
         
<form id="form1">
 <div class="page-content" vue="AOPLog">


		
														
				<div class="row">
		  	<div class="col-xs-2 right" style="text-align: right">
		        <label class=" control-label no-padding-right" for="PageName">Page Name</label>
		    </div>
		    <div class="col-xs-10 left">
				

		    						<textarea  id="PageName" maxlength="255" v-model="PageName" name="PageName" placeholder="" class="col-xs-10 col-sm-5 autosize-transition" ></textarea>
						    </div>
		</div>
		<div class="space-4"></div>
				
												
														
				<div class="row">
		  	<div class="col-xs-2 right" style="text-align: right">
		        <label class=" control-label no-padding-right" for="AbsoluteUri">Absolute Uri</label>
		    </div>
		    <div class="col-xs-10 left">
				

		    						<textarea  id="AbsoluteUri" maxlength="2000" v-model="AbsoluteUri" name="AbsoluteUri" placeholder="" class="col-xs-10 col-sm-5 autosize-transition" ></textarea>
						    </div>
		</div>
		<div class="space-4"></div>
				
												
														
				<div class="row">
		  	<div class="col-xs-2 right" style="text-align: right">
		        <label class=" control-label no-padding-right" for="FromString">From String</label>
		    </div>
		    <div class="col-xs-10 left">
				

		    						<textarea  id="FromString" maxlength="4000" v-model="FromString" name="FromString" placeholder="" class="col-xs-10 col-sm-5 autosize-transition" ></textarea>
						    </div>
		</div>
		<div class="space-4"></div>
				
												
														
				<div class="row">
		  	<div class="col-xs-2 right" style="text-align: right">
		        <label class=" control-label no-padding-right" for="_Op">123</label>
		    </div>
		    <div class="col-xs-10 left">
				

		    					<input type="text" id="_Op" maxlength="50" v-model="_Op" name="_Op" placeholder="" class="col-xs-10 col-sm-5" />
						    </div>
		</div>
		<div class="space-4"></div>
				
												
								
				
								 <div class="row">
		    <div class="col-xs-2 right" style="text-align: right">
		        <label class=" control-label no-padding-right" for="CreateTime">Create Time</label>
		    </div>
		    <div class="col-xs-10 col-sm-2 left">
		        <div class="input-group">
				      <template>
				<div class="block ">                  
                <el-date-picker clearable v-model="CreateTime" type="date"  placeholder="select date" :picker-options="pickerOptions0"></el-date-picker>

                    <input type="hidden"  name="CreateTime"  v-model="CreateTime"/>
                  </div>
                    </template>    
		         </div>
		   </div>
		 
		  </div>
		  <div class="space-4"></div>
								
														
				<div class="row">
		  	<div class="col-xs-2 right" style="text-align: right">
		        <label class=" control-label no-padding-right" for="SessionID">Session ID</label>
		    </div>
		    <div class="col-xs-10 left">
				

		    					<input type="text" id="SessionID" maxlength="50" v-model="SessionID" name="SessionID" placeholder="" class="col-xs-10 col-sm-5" />
						    </div>
		</div>
		<div class="space-4"></div>
				
												
								
				<div class="row">
		  	<div class="col-xs-2 right" style="text-align: right">
		        <label class=" control-label no-padding-right" for="UserID">User ID</label>
		    </div>
		    <div class="col-xs-10 left">
				

		    					<input type="text" id="UserID" maxlength="10" v-model="UserID" name="UserID" placeholder="" class="col-xs-10 col-sm-5" />
						    </div>
		</div>
		<div class="space-4"></div>
				
												
														
				<div class="row">
		  	<div class="col-xs-2 right" style="text-align: right">
		        <label class=" control-label no-padding-right" for="IP">IP</label>
		    </div>
		    <div class="col-xs-10 left">
				

		    					<input type="text" id="IP" maxlength="50" v-model="IP" name="IP" placeholder="" class="col-xs-10 col-sm-5" />
						    </div>
		</div>
		<div class="space-4"></div>
				
												
								
				
									<div class="row">
					<div class="col-xs-2 right" style="text-align: right">
						<label class=" control-label no-padding-right" for="LevelInfo">Level Info</label>
					</div>
					<div class="col-xs-10 left">
										    	<input type="text" id="LevelInfo"   maxlength="9"  v-model="LevelInfo" name="LevelInfo" placeholder="" class="col-xs-10 col-sm-2" />

								</div>
				</div>
		   <div class="space-4"></div>
												
														
				<div class="row">
		  	<div class="col-xs-2 right" style="text-align: right">
		        <label class=" control-label no-padding-right" for="Result">Result</label>
		    </div>
		    <div class="col-xs-10 left">
				

		    						<textarea  id="Result" maxlength="255" v-model="Result" name="Result" placeholder="" class="col-xs-10 col-sm-5 autosize-transition" ></textarea>
						    </div>
		</div>
		<div class="space-4"></div>
				
												
	<div class="row">
		            <div class="col-xs-2 right" style="text-align: right">

		            </div>
                  <div class="col-xs-10 left">
					<button type="submit" data-size="s" data-style="zoom-in" id="btn_AOPLog" class="btn btn-primary btn-sm ladda-button">Send</button>
        			</div>
                </div>
</div>
</form>
</asp:Content>  
    <asp:Content ID="Content3" ContentPlaceHolderID="ScriptBlock" runat="server">
    <script src="assets/js/ladda/js/spin.js"></script>
    <script src="assets/js/jquery.autosize.min.js"></script>
    <script src="assets/js/ladda/js/ladda.js"></script>
		<script src="js/element.js"></script>

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
               $("#btn_AOPLog").text("更新");

              LoadActivity();
             }
             else {
																																																																																																							                 $("#btn_AOPLog").text("添加");

             }
   
   																																																																																																				
   function bindselect(name){
																																																																																																										
                              

   }          
   function LoadActivity() {
                 var datas = getSearch();
                 datas.rows = 1;
				 datas.needforeignkey=true;
                 											datas.fiters.rulesAdd("ID", "=", id);
									 									 									 									 									 									 									 									 									 									 									                  jQuery.ajax({
                     url: 'handler/information.ashx?_op=AOPLogQuery',
                     type: 'GET',
                     dataType: "json",
                     data: getSearchParams(datas),
                     success: function (data) {
                         var d = data;
                         if (d.success) {
                             vm = jQuery.extend(vm, d.rows[0]);

							    																																																																																																																																																																																	
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
	el:"div[vue=AOPLog]",
	data:{
						ID:id,
			
										PageName:"",
									
										AbsoluteUri:"",
									
										FromString:"",
									
										_Op:"",
									
										CreateTime:"",
									
										SessionID:"",
									
										UserID:"",
									
										IP:"",
									
										LevelInfo:"",
									
										Result:"",
									
		  pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
	}
	});
	
      $('#form1').validate({
	      ignore: ".chosen-search input",
                errorElement: 'div',
                errorClass: 'help-block',
                focusInvalid: false,
                rules: {
                									ID: {
								                        				  required:false,
                       			  								                        			                    		  },
													PageName: {
								                        				  required:false,
                       			  								                        			                    		  },
													AbsoluteUri: {
								                        				  required:false,
                       			  								                        			                    		  },
													FromString: {
								                        				  required:false,
                       			  								                        			                    		  },
													_Op: {
								                        				  required:false,
                       			  								                        			                    		  },
													CreateTime: {
								                        			  	required: true,
                       			  	                       			  								                        			                    		  },
													SessionID: {
								                        				  required:false,
                       			  								                        			                    		  },
													UserID: {
								                        				  required:false,
                       			  								                        			                    		  },
													IP: {
								                        				  required:false,
                       			  								                        			                    		  },
													LevelInfo: {
								                        				  required:false,
                       			  								                        				  										digits:true,
									  									  
									  
                      			                        			                    		  },
													Result: {
								                        				  required:false,
                       			  								                        			                    		  },
						
                 
                },

                messages: {
                	                    ID: {
       					
                    },
                                        PageName: {
       					
                    },
                                        AbsoluteUri: {
       					
                    },
                                        FromString: {
       					
                    },
                                        _Op: {
       					
                    },
                                        CreateTime: {
       					
                    },
                                        SessionID: {
       					
                    },
                                        UserID: {
       					
                    },
                                        IP: {
       					
                    },
                                        LevelInfo: {
       					
                    },
                                        Result: {
       					
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
                	
                	    var l = Ladda.create(document.querySelector('#btn_AOPLog'));
                   		l.start();
                    var post = null;
                    if (id > 0) {
                        post = OperItem.EditOper(getPost());
                        
                        }
                    else {  post = OperItem.AddOper(getPost()); }
                   		//post移除不需要绑定字段
							var remove={
																																																																																																																																																											}
						jQuery.myPlugin.deleteproperty(post,remove);

                        jQuery.ajax({
                        url: 'handler/information.ashx?_op=AOPLog',
                        data:post,
                        type: 'POST',
                        dataType: "json",
                        success: function (data) {
                            l.stop();
                            var d = data;
                            if(d.success){
                                vm = jQuery.extend(vm, d.data);
                            	$("#btn_AOPLog").text("更新");
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
                        	$('.date-picker').datepicker({autoclose:true}).next().on(ace.click_event, function(){
					$(this).prev().focus();
				});

                        
             $('textarea[class*=autosize]').autosize({append: ""});

            
            })

			function getPost(){
				var post={};
																		post.ID=vm.ID;
																								post.PageName=vm.PageName;
																								post.AbsoluteUri=vm.AbsoluteUri;
																								post.FromString=vm.FromString;
																								post._Op=vm._Op;
																								post.CreateTime=vm.CreateTime;
																								post.SessionID=vm.SessionID;
																								post.UserID=vm.UserID;
																								post.IP=vm.IP;
																								post.LevelInfo=vm.LevelInfo;
																								post.Result=vm.Result;
															return post;
			}

            </script>


                      	  <script src="assets/js/date-time/bootstrap-datepicker.min.js"></script>
                  
	    		
</asp:Content>  

