    <%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="TestEdit.aspx.cs"  Inherits="ACETemplate.adnim.TestEdit" %>
	<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
		    <link href="css/element-ui.css" rel="stylesheet" />
	<style>
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
    .el-upload__input {
    display: none !important;
	}
        </style>
	</asp:Content>
     <asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <div class="page-content" vue="Test" v-cloak>
      <el-form id="form1" :model="ruleForm" label-width="150px" :rules="rules" ref="ruleForm" label-position="right">

		
														
				
				
				  <el-form-item label="Text" prop="Text">   
		    					 <el-input v-model="ruleForm.Text" id="Text" v-bind:maxlength="50" name="Text"  v-bind:style="{width:width}" ></el-input>
			
								 </el-form-item>
		  
		<div class="space-4"></div>
				
												
								
				
									

				 <el-form-item label="测试类型" prop="Type">   
				
				 <el-select v-model="ruleForm.Type" clearable  placeholder="Choose a ...">
			 <el-option v-for="item in ruleForm.TestTypeSelect " :label="item.Text"
				 :value="item.ID"> </el-option>
			 </el-select>
		 
								  </el-form-item>
		   <div class="space-4"></div>
												
														
				
				
				  <el-form-item label="头像" prop="Image">   
		    					    <el-input type="textarea"   :autosize="{ minRows: 1, maxRows: 5}" v-model="ruleForm.Image" id="Image" v-bind:maxlength="250" name="Image"   v-bind:style="{width:width}"></el-input>
								 </el-form-item>
		  
		<div class="space-4"></div>
				
												
					
					
								
				
									

				 <el-form-item label="User Id" prop="UserId">   
								  <el-input-number v-model="ruleForm.UserId" id="UserId" v-bind:maxlength="9"  :min="0"  :max="1000000000"  name="UserId"  v-bind:style="{width:width}"></el-input-number>			
				  	
								  </el-form-item>
		   <div class="space-4"></div>
												
					
	<el-form-item label="类型" prop="TestTypes">
            <el-select v-model="ruleForm.Test_TypeSelectList" filterable multiple v-bind:style="{width:width}"  placeholder="请选择...">
      <el-option
        v-for="item in  ruleForm.TestTypeList"
        :key="item.ID"
        :label="item.Text"
        :value="item.ID">
      </el-option>
  
  </el-select>
          </el-form-item>
		    <div class="space-4"></div>


				    <el-form-item>
				     <el-button type="primary" :loading="IsLoading" @click="submitForm('ruleForm')" style="margin-left:12%;" >{{BtnText}}</el-button>
					</el-form-item>
        		
		</el-form>
</div>
</asp:Content>  
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptBlock" runat="server">
<script src="js/element.js"></script>
<script src="js/lodash.js"></script>
<script src="js/OperItem.js"></script>
<script src="js/searchFiter.js"></script>
<script>
	var vm=null;
var id = <%=Id%>;
  vm= new Vue({
	el:"div[vue=Test]",
	data:{
	width:Screen.Width,
	ruleForm:{
						ID:id,
			
														Text:"",
													
			
																				    Type:"",
										
														TestTypeSelect:[],
						
			
														Image:"",
													
			
														Noedit:"",
													
			
										IsDelete:false,
									
			
																					UserId:0,
										
													
			
														NoEdit1:"",
													
			
				Test_TypeSelectList:[],
		TestTypeList:[],
		},
	  pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
	   IsLoading:false,
	    rules: {
									  			
					 										   							  			
					 							Text: [
									{ required: true, message: '请输入Text' },],
			
														   						 Type: [
					{ required: true, type:'number', message: '请输入测试类型', trigger: 'change' }, ],		
				  		   							  			
					 							Image: [
									{ required: true, message: '请输入头像' },],
			
														   							  			
					 							Noedit: [
									{ required: true, message: '请输入Noedit' },],
			
														   							  			
					 							IsDelete: [
									{ required: true, message: '请输入Is Delete' },],
			
														   							  			
					 							UserId: [
									{ required: true, message: '请输入User Id' },],
			
														   							  			
					 							NoEdit1: [
									{ required: true, message: '请输入No Edit1' },],
			
														   
					TestTypes: [
					{ type: 'array', required: false, message: '请至少选择一个类型', trigger: 'change' } ],		
			
				  },		 
	},
	created:function (){
	
   if (id <= 0) {
																			this.LoadType();	
																																			this.LoadTestType();
				}
else{
	this.LoadActivity();
}
	},
	 computed:{
            BtnText:function(){
                return this.ruleForm.ID>0?"修改":"添加"
            }
        },
	methods:{
		
		LoadActivity:function () {
                 var datas = getSearch();
                 datas.rows = 1;
				 datas.needforeignkey=true;
                 											datas.fiters.rulesAdd("ID", "=", id);
									 									 									 									 									 									 									 									                  jQuery.ajax({
                     url: 'handler/information.ashx?_op=TestQuery',
                     type: 'GET',
                     dataType: "json",
                     data: getSearchParams(datas),
                     success: function (data) {
                         var d = data;
                         if (d.success) {
                             jQuery.extend(vm.ruleForm, d.rows[0]);
                         }
                         else {
                             mygritter.errorgrit("错误", d.msg);
                         }
                     },
                     error: function (err) {
                           mygritter.errorgrit("网络错误",err.statusText);
                     }
                 });
             } ,
	 																														LoadType(){
						HttpAjax.ajaxget("handler/information.ashx?_op=TestTypeQuery",{page:1,rows:1000},function(data){
						var d = data;
						if (d.success) {
							vm.ruleForm.TestTypeSelect=d.rows;
						

						}
						else {
							mygritter.errorgrit("错误", d.msg);
							//  setTimeout(LoadArray, 300);
						}
						
							})
						
						},

																																																						
												 							 							 							 							 							 							 							 					LoadTestType(){
				HttpAjax.ajaxget("handler/information.ashx?_op=TestTypeQuery",{page:1,rows:1000},function(data){
						var d = data;
						if (d.success) {
							vm.ruleForm.TestTypeList=d.rows;
						}
						else {
							mygritter.errorgrit("错误", d.msg);
							//  setTimeout(LoadArray, 300);
						}
						})
			},
		
		 submitForm:function(formName) {
			    this.$refs[formName].validate((valid) => {
			        if (valid) {
			           
			            this.Save();
			        } else {
			            console.log('error submit!!');
			            return false;
			        }
			    });
			},
			Save:function(){
			
			    vm.IsLoading=true;
			    var post = null;
			    if (id > 0) {
			        post = OperItem.EditOper(getPost());
                        
			    }
			    else {  post = OperItem.AddOper(getPost()); }
			    //post移除不需要绑定字段
			   

			    jQuery.ajax({
			        url: 'handler/information.ashx?_op=Test',
			        data:post,
			        type: 'POST',
			        dataType: "json",
			        success: function (data) {
			            vm.IsLoading=false;
			            var d = data;
			            if(d.success){
							  					  				
			                					
							  								 					
							  								 					
							  				
							    d.data=_.omit(d.data, 'TestTypeSelect');  
								 								 					
							  								 					
							  								 					
							  								 					
							  								 					
							  								 								 
							    d.data=_.omit(d.data, 'Test_TypeSelectList');  
							   d.data=_.omit(d.data, 'TestTypeList');  
							
								                                 jQuery.extend(vm.ruleForm, d.data);
                            	
                                 mygritter.successgrit("成功", "操作成功");
								 								 										id=vm.ruleForm.ID;
																	 								 								 								 								 								 								 								 								 								 								 								 								 								 								 			            }
			            else{
			                mygritter.errorgrit("失败", "操作失败");
			            }
			        },
			        error: function (err) {
			            vm.IsLoading=false;
			            mygritter.errorgrit("失败",err.status);
			        }

			    });
			
			},
	}
	});
	
			function getPost(){
				var post={};
																		 							post.ID=vm.ruleForm.ID;			
														
																								 							post.Text=vm.ruleForm.Text;			
														
																								 							post.Type=vm.ruleForm.Type;			
														
																								 							post.Image=vm.ruleForm.Image;			
														
																																			 							post.IsDelete=vm.ruleForm.IsDelete;			
														
																								 							post.UserId=vm.ruleForm.UserId;			
														
																																	post.Test_TypeSelectList=JSON.stringify( vm.ruleForm.Test_TypeSelectList);
					
									return post;
			}

            </script>

	  
	    		
</asp:Content>  

