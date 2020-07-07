<%@ Page Language="C#" AutoEventWireup="true"  MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="UserListData.aspx.cs" Inherits="ACETemplate.adnim.OOHTargetGRID" %>

<%@ Register Src="~/adnim/include/HeadNavigation.ascx" TagPrefix="uc1" TagName="HeadNavigation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<link href="css/element-ui.css" rel="stylesheet" />

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .page-content {
            max-width: 1600px;
        }

        .top {
            font-size: 18px;
        }

        .table1 {
            font-size: 18px;
            max-width: 1550px;
            margin-top: 20px;
        }

        .el-table__header {
            color: #999999;
        }

        .el-table .cell {
            text-align: center;
        }

        .el-table__body .cell {
            color: #333;
        }

        .el-table__body-wrapper {
            border-left: 1px solid #e9e9e9;
            border-right: 1px solid #e9e9e9;
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

        .emailinput {
            width: 270px;
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

        .el-pagination {
            float: right;
            margin-top: 20px;
        }

        .addreight {
            width: 42%;
            margin-left: 2%;
            display: inline-block;
            background-color: #f8f8f8;
            padding: 25px 10px;
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

        .fr {
            float: right;
        }
    </style>
	<uc1:HeadNavigation runat="server" ID="HeadNavigation" />
	<div class="page-content">
		<div id="app" v-cloak style="margin-top:10px;margin-bottom:10px;padding:0;border:1px solid white">
           <div class="top">邮箱：<el-input class="emailinput" v-model="email"></el-input>
          <el-button type="primary" class="opbtn searchbtn" v-on:click="getUserlist">搜索</el-button>
           <el-button type="primary" class="opbtn newbtn" v-on:click="addUser" >+新增用户</el-button>
           </div>
            <el-table class="table1" :data="tableData" stripe style="width: 100%">
             <el-table-column prop="ID" label="NO" width="150"></el-table-column>
            <el-table-column prop="UserName" label="User name" width="220"></el-table-column>
            <el-table-column prop="Email" label="Email" width="220"></el-table-column>
            <el-table-column prop="Phone" label="Cell Phone" width="220"></el-table-column>
            <el-table-column prop="Job" label="Job Title" width="220"></el-table-column>
            <el-table-column prop="Password" label="Password" width="220"></el-table-column>
            <el-table-column  label="操作" width="300">
                <template slot-scope="scope">
                    <el-button type="primary" v-on:click="rowDelete(scope.row)" class="opbtn deletebtn">删除</el-button>
                    <el-button type="primary" v-on:click="rowEdit(scope.row)" class="opbtn editbtn">修改</el-button>
                 </template>
            </el-table-column>
        </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="pageindex" :page-sizes="[10, 20, 50, 100]" :hide-on-single-page="true"
                :page-size="10" layout="sizes, prev, pager, next" :total="tableData.length/pagesize">
             </el-pagination>
            <el-dialog center title="提示" :visible.sync="dialogdel" width="21%" top="15%">
              <span>是否确认要删除用户{{deleteitem.Name}}?</span>
              <span slot="footer" class="dialog-footer">
                <el-button class="cancelbtn" type="primary" v-on:click="dialogdel = false">取 消</el-button>
                <el-button class="confirmbtn" type="primary" v-on:click="Delete">是 的</el-button>
              </span>
            </el-dialog>
             <el-dialog center :title="addConfig.title" :visible.sync="dialogadd" width="45%" top="15%">
                 <div style="width:55%;display:inline-block">
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
                </el-form>
                     </div>
                 <div class="addreight">
                     <span class="text" style="width:50%;">报表</span>
                     <span class="text" style="width:45%;margin-left:2%">区域</span>
                     <div class="selectForm"><span>业务Dashboard</span>
                    <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>
                     <div class="selectForm"><span>By 区域业绩看版</span>
                    <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>
                     <div class="selectForm"><span>By 区域&Clinical业绩看版</span>
                    <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>
                     <div class="selectForm"><span>三率分析</span>
                    <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>
                     <div class="selectForm"><span>IB分析</span>
                    <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>
                     <div class="selectForm"><span>营销分析</span>
                    <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>
                 </div>
              <span slot="footer" class="dialog-footer">
                <el-button class="cancelbtn" type="primary" v-on:click="dialogadd = false">取 消</el-button>
                <el-button class="confirmbtn" type="primary" v-on:click="confirmUser">{{addConfig.confirmbtn}}</el-button>
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
	            Accountdata: {},
	            tableData: [{}],
	            value: "",
	            areas: [],
	            dialogadd: false,
	            dialogdel: false,
	            email: "",
	            deleteitem: "",
	            pagesize: 10,
	            pageindex: 1,
	            addConfig: {
	                type: "",
	                title: "",
	                confirmbtn: ""
	            }
	        },
	        dialogdel: false,
	        created: function () {
	            this.getUserlist()
	        },
	        methods: {
	            getUserlist: function () {
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
	                        loading.close()
	                        vue.tableData = data.rows
	                    },
	                    error: function (err) {
	                        loading.close()
	                        this.$message.error(err.msg)
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
	                console.log("新增用户");
	                return;
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
	                        vue.dialogadd = false;
	                    },
	                    error: function (err) {
	                        loading.close()
	                        vue.$message.error(err.msg)
	                    }
	                });
	            },
	            update: function () {
	                console.log("更新用户");
	                return;
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
	                        vue.dialogadd = false;
	                    },
	                    error: function (err) {
	                        loading.close()
	                        vue.$message.error(err.msg)
	                    }
	                });
	            },
	            handleSizeChange(val) {
	                this.pagesize = val
	                console.log(`每页 ${val} 条`);
	            },
	            handleCurrentChange(val) {
	                this.pageindex = val
	                console.log(`当前页: ${val}`);
	            }
	        }
	    })
    </script>

</asp:Content>
