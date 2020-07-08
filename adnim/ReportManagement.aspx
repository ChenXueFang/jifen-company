<%@ Page Language="C#" AutoEventWireup="true"  MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="OOHTargetGRID.aspx.cs" Inherits="ACETemplate.adnim.OOHTargetGRID" %>

<%@ Register Src="~/adnim/include/HeadNavigation.ascx" TagPrefix="uc1" TagName="HeadNavigation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<link href="css/element-ui.css" rel="stylesheet" />

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .el-button--primary{
            padding:10px
        }
        .Content{
            max-width:1500px
        }
        .yearitem{
            display:inline-block;
            width: 130px;
	        height: 50px;
	        background-color: #ffffff;
	        box-shadow: 0px 0px 10px 0px 
		        rgba(0, 36, 56, 0.12);
	        border-radius: 10px;
	        border: solid 1px #999999;
            font-size:16px;
            line-height:50px;
            color:#999;
            text-align:center;
            margin:0 5px;
            cursor:pointer
        }
        .yearactive{
            color:#fff;
	        background-color: #438eb9;
	        border: solid 1px #e5e5e5
        }
        .monthtop{
            margin-top:20px;
            padding-bottom:10px;
            border-bottom:1px solid #e9e9e9
        }
        .monthitem{
            width: 70px;
	        height: 30px;
	        border-radius: 10px;
            text-align:center;
            display:inline-block;
            font-size:18px;
            color:#999999;
             cursor:pointer
        }
        .monthactive{
            color:#2b7dbc;
	        background-color: #d9eefb;
	        border: solid 1px #e5e5e5
        }
        .upload{
            margin-top:-15px
        }
        .upload .el-button--primary{
            width: 160px;
	        /*height: 40px;*/
	        background-color: #2b7dbc !important;
	        border-radius: 4px;
            font-size:18px;
            border-color: #2b7dbc !important;
        }
        .el-table__body-wrapper{
            border-left:1px solid #e9e9e9;
            border-right:1px solid #e9e9e9
        }
        .table1{
            font-size:18px;
            margin-top:20px
        }
        .el-table__header{
            color:#999999;
        }
        .el-table .cell{
            text-align:center
        }
        .el-table__body .cell{
            color:#333
        }
        .opbtn{
            border-radius: 4px;
            color:#fff;
            font-size: 18px;
        }
        .deletebtn.el-button--primary
        {
            width: 80px;
	        /*height: 34px;*/
	        background-color: #e73754;
            border-color:#e73754;
	        
        }
        .reportbtn.el-button--primary{
            /*/*width: 154px;*/
	        /*height: 34px;*/
	        background-color: #26ae59;
            border-color:#26ae59;
	        
        }
        .reasonbtn.el-button--primary{
            width: 120px;
	        /*height: 34px;*/
	        background-color: #2b7dbc;
            border-color:#2b7dbc;
	        
        }
        .uploadbtn.el-button--primary{
            /*width: 120px;*/
	        /*height: 34px;*/
	        background-color: #2b7dbc;
            border-color:#2b7dbc;
        }
        .el-dialog__header{
            background-color:#2b7dbc;
            padding: 0;
            line-height: 50px;
            font-size:18px
        }
        .el-dialog__header .el-dialog__title{
            color:#fff
        }
        .el-dialog__headerbtn{
            top:0;
            font-size:18px
        }
        .el-dialog__body{
            font-size:18px
        }
        .el-dialog__headerbtn .el-dialog__close,.el-dialog__headerbtn .el-dialog__close:hover{
            color:#fff
        }
        .confirmbtn.el-button--primary{
            background-color:#2b7dbc;
            border-color:#2b7dbc;
            margin-left:20px
        }
        .cancelbtn.el-button--primary{
            background-color:#bbbbbb;
            border-color:#bbbbbb;
        }

        .dialog-footer .el-button{
            width:140px
        }
        .fr{
            float:right
        }
        .wranning{
            color:#e73754
        }
    </style>
	<uc1:HeadNavigation runat="server" ID="HeadNavigation" Level2Name="数据管理" Level3Name="报告数据管理"  />
	<div class="page-content">
		<div id="app" v-cloak style="margin-top:10px;margin-bottom:10px;padding:0;border:1px solid white">
           <div class="Content">
            <div class="yeartop">
                <span class="yearitem" v-for="item in years" :class="{yearactive:choosedyear==item}" v-on:click="changeyear(item)">{{item}}</span>
            </div>
            <div class="monthtop">
                <span class="monthitem" v-for="item in month" :class="{monthactive:choosedmonth==item}" v-on:click="changemonth(item)">{{item}}月</span>
               <%-- <div class="upload fr">
                <input type="file" name="uploadFile" id="uploadFile" accept="application/vnd.ms-excel" style="width:160px;display:none" onchange="ChangeFile()" />
                <el-button type="primary" onclick="jQuery('#uploadFile').click()">+上传报表</el-button>
                <label id="path"></label>
               </div>--%>
            </div>
            <el-table class="table1" :data="tableData" stripe style="width: 100%">
            <el-table-column prop="ID" label="上传编号" width="225"></el-table-column>
            <el-table-column prop="TableName" label="数据报表类型" width="225"></el-table-column>
            <%--<el-table-column prop="Name" label="数据报表名称" width="220"></el-table-column>--%>
            <el-table-column prop="UploadTime" label="上传日期" width="225"></el-table-column>
            <el-table-column  label="状态" width="225">
                <template slot-scope="scope">
                   <div v-if="scope.row.IsGenerate=='False'">未生成</div>
                   <div v-else>生成成功</div>
                </template>
            </el-table-column>
            <el-table-column  label="操作" width="600">
                <template slot-scope="scope">
                    <el-button type="primary" class="opbtn reasonbtn" @click="downloadTemp(scope.row)" >下载模板</el-button>
                    <el-button type="primary" v-if="scope.row.ImportID&&scope.row.IsGenerate=='False'" v-on:click="createReport(scope.row)" class="opbtn reportbtn">生成发布的报告</el-button>
                    <el-button type="primary" v-if="scope.row.IsGenerate=='False'" class="opbtn uploadbtn" @click="uploadFile($event)" >+上传报表数据</el-button>
                    <el-button type="primary" v-if="scope.row.IsGenerate!='False'" v-on:click="rowDelete(scope.row)" class="opbtn deletebtn">删除</el-button>
                    <input type="file" name="uploadFile" class="uploadFile" accept="application/vnd.ms-excel" style="width:160px;display:none" @change="ChangeFile(scope.row,$event)" />
                    <%--<el-button type="primary" v-if="scope.row.Status==1"  v-on:click="viewReason(scope.row)" class="opbtn reasonbtn">上传报表</el-button>--%>
                 </template>
            </el-table-column>
  </el-table>
			</div>
            <el-dialog center title="提示" :visible.sync="dialogdel" width="400px" top="15%">
  <span>是否确认要删除报表{{choosedyear}}年{{choosedmonth}}月{{deleteitem.TableName}}?</span>
    <div class="wranning">【警告】删除数据，报表数据将丢失，如果要删除报表数据，请在输入框中输入“确认删除“
        <el-input v-model="delettext" placeholder="请输入内容"></el-input>
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button class="cancelbtn" type="primary" v-on:click="dialogdel = false">取 消</el-button>
    <el-button class="confirmbtn" type="primary" v-on:click="Delete">确 定</el-button>
  </span>
</el-dialog>
             <el-dialog center title="上传失败" :visible.sync="dialogreason" width="400px" top="15%">
  <span>失败原因：{{errMsg}}</span>
  <span slot="footer" class="dialog-footer">
    <%--<el-button class="cancelbtn" type="primary" v-on:click="dialogVisible = false">取 消</el-button>--%>
    <el-button class="confirmbtn" type="primary" v-on:click="dialogreason = false">确 定</el-button>
  </span>
</el-dialog>
            <el-dialog center title="生成发布报告" :visible.sync="dialogtime" width="400px" top="15%">
  <div>年份：<span style="margin-left:20px">{{choosedyear}}</span></div>
   <div>月份：<span style="margin-left:20px">{{choosedmonth}}</span></div>
    <el-input style="margin-top:10px" v-if="chooseditem.TableName == 'RealTime'" v-model="rate" placeholder="请输入汇率"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button class="cancelbtn" type="primary" v-on:click="dialogtime = false">取 消</el-button>
    <el-button class="confirmbtn" type="primary" v-on:click="createConfirm">确 定</el-button>
  </span>
</el-dialog>
		</div>
	</div>
	<!-- /.page-content -->

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptBlock" runat="server">

      <%--<script src="assets/js/myUpload/jquery.ajaxfileupload.js"></script>--%>
    <%--<script src="assets/js/myUpload/myFileUpload.js"></script>--%>

    	<script src="js/element.js"></script>
	<script>
		var vue = new Vue({
			el: "#app",
			data: {
			    years: [],
			    month: [],
			    choosedyear: "",
			    choosedmonth: "1",
			    tableData: [],
			    dialogdel: false,
			    dialogreason: false,
			    dialogtime: false,
			    errMsg:"",
			    delettext:"",
			    deleteitem: "",
			    chooseditem: "",
			    rate:""
			    //pagesize: 10,//每页的数据条数
			    //currentPage: 1,//默认开始页面
			    //List: [],
			    //total: 10,
			     
				//Form: {

				//}
			},
			created: function () {
			    this.years = [new Date().getFullYear() - 1, new Date().getFullYear()];
			    this.choosedyear = this.years[0]
			    for (var i = 0; i < 12; i++) {
			        this.month.push(i + 1);
			    }
			    this.getReport()
			},
			methods: {
			    getReport: function () {
			      const loading=this.$loading({
			            lock: true,
			            text: '加载中'
			      });
			        $.ajax({
			            url: 'handler/information.ashx?_op=ImportReport_Query',
			            data: {year:this.choosedyear, month: this.choosedmonth },
			            type: 'POST',
			            dataType: "json",
			            success: function (data) {
			                loading.close()
			                if (data.success) {
			                    vue.tableData = data.data
			                } else {
			                    vue.$message.error(data.msg)
			                }
			            },
			            error: function (err) {
			                loading.close()
			                vue.$message.error(err.msg)
			            }
			        });
			    },
			    changeyear:function(item){
			        this.choosedyear = item;
			        this.month=[]
			        if (item == new Date().getFullYear()) {//当年
			            var currmonth = new Date().getMonth()+1
			            for (var i = 0; i < currmonth; i++) {
			                this.month.push(i + 1);
			            } 
			        } else {
			            for (var i = 0; i < 12; i++) {
			                this.month.push(i + 1);
			            }
			        }
			        this.choosedmonth = this.month[0];
			        this.getReport()
			    },
			    changemonth: function (item) {
			        this.choosedmonth = item;
			        this.getReport()
			    },
			    downloadTemp: function (item) {

			        var domain = window.location.host;
			        if (item.TableName == "OrderDetail") {
			            if (domain != "localhost") {
			                window.location.href = "../Upload/TemExcel/OrderDetail.xlsx";
			            } else {
			                window.location.href = "/Upload/TemExcel/OrderDetail.xlsx";
			            }			         
			        }
			        else if (item.TableName == "OOH") {
			            if (domain != "localhost") {
			                window.location.href = "../Upload/TemExcel/OOH.xlsx";
			            } else {
			                window.location.href = "/Upload/TemExcel/OOH.xlsx";
			            }
			        }
			        else if (item.TableName == "Funnel") {
			            if (domain != "localhost") {
			                window.location.href = "../Upload/TemExcel/FunnelDetail.xlsx";
			            }else{
			                window.location.href = "/Upload/TemExcel/FunnelDetail.xlsx";
			            }
			        }
			        else if (item.TableName == "FCSTN2M") {
			            if (domain != "localhost") {
			                window.location.href = "../Upload/TemExcel/FCSTN2MDetail.xlsx";
			            } else {
			                window.location.href = "/Upload/TemExcel/FCSTN2MDetail.xlsx";
			            }
			        }
			        else if (item.TableName == "FCSTCM") {
			            if (domain != "localhost") {
			                window.location.href = "../Upload/TemExcel/FCSTCMDetail.xlsx";
			            } else {
			                window.location.href = "/Upload/TemExcel/FCSTCMDetail.xlsx";
			            }
			        }
			        else if (item.TableName == "ThreeRateDealer") {
			            if (domain != "localhost") {
			                window.location.href = "../Upload/TemExcel/ThreeRateDealer.xlsx";
			            } else {
			                window.location.href = "/Upload/TemExcel/ThreeRateDealer.xlsx";
			            }
			        }
			        else if (item.TableName == "ThreeRateProvince") {
			            if (domain != "localhost") {
			                window.location.href = "../Upload/TemExcel/ThreeRateProvince.xlsx";
			            } else {
			                window.location.href = "/Upload/TemExcel/ThreeRateProvince.xlsx";
			            }
			        }
			        else if (item.TableName == "IB") {
			            if (domain != "localhost") {
			                window.location.href = "../Upload/TemExcel/IB.xlsx";
			            } else {
			                window.location.href = "/Upload/TemExcel/IB.xlsx";
			            }
			        }
			        else if (item.TableName == "OrderYearMonth") {
			            if (domain != "localhost") {
			                window.location.href = "../Upload/TemExcel/OrderYearMonth.xlsx";
			            } else {
			                window.location.href = "/Upload/TemExcel/OrderYearMonth.xlsx";
			            }
			        }
			        else if (item.TableName == "RealTime") {
			            if (domain != "localhost") {
			                window.location.href = "../Upload/TemExcel/Realtime.xlsx";
			            } else {
			                window.location.href = "/Upload/TemExcel/Realtime.xlsx";
			            }
			        } else if (item.TableName == "FCSTAccuracy")
			        {
			            if (domain != "localhost") {
			                window.location.href = "../Upload/TemExcel/FCSTAccuracy.xlsx";
			            } else {
			                window.location.href = "/Upload/TemExcel/FCSTAccuracy.xlsx";
			            }
			        }
			    },
			    uploadFile(obj) {
			        $(obj.currentTarget).parent().find(".uploadFile").click()
			    },
			    rowDelete: function (item) {
			        this.delettext=""
			        this.dialogdel = true;
			        this.deleteitem = item;
			    },
			    Delete:function(){
			        if (!this.delettext || this.delettext != "确认删除") {
			            this.$message("输入内容不正确");
			            return;
			        }
			        this.dialogdel = false;
			        const loading = this.$loading({
			            lock: true,
			            text: ''
			        });
			        if (this.deleteitem.TableName == "OrderDetail") {
			            queryUrl = "DeleteOrderDetail";
			        }
			        else if (this.deleteitem.TableName == "OOH") {
			            queryUrl = "DeleteOOH";
			        }
			        else if (this.deleteitem.TableName == "Funnel") {
			            queryUrl = "DeleteFunnel";
			        }
			        else if (this.deleteitem.TableName == "FCSTN2M") {
			            queryUrl = "DeleteFCSTN2M";
			        }
			        else if (this.deleteitem.TableName == "FCSTCM") {
			            queryUrl = "DeleteFCSTCM";
			        }
			        else if (this.deleteitem.TableName == "ThreeRateDealer") {
			            queryUrl = "DeleteThreeRateDealer";
			        }
			        else if (this.deleteitem.TableName == "ThreeRateProvince") {
			            queryUrl = "DeleteRateProvince";
			        }
			        else if (this.deleteitem.TableName == "IB") {
			            queryUrl = "DeleteIB";
			        }
			        else if (this.deleteitem.TableName == "OrderYearMonth") {
			            queryUrl = "DeleteOrderYearMonth";
			        }
			        else if (this.deleteitem.TableName == "RealTime") {
			            queryUrl = "DeleteRealTime";
			        } else if (this.deleteitem.TableName == "FCSTAccuracy")
			        {
			            queryUrl = "DeleteFCSTAccuracy";
			        }

			        $.ajax({
			            url: 'handler/information.ashx?_op=' + queryUrl,
			            data: { year: this.choosedyear, month: this.choosedmonth, batchID: this.deleteitem.BatchID},
			            type: 'POST',
			            dataType: "json",
			            success: function (data) {
			                loading.close()
			                if (data.success) {
			                    vue.getReport()
			                } else {
			                    vue.$message.error(data.msg)
			                }
			            },
			            error: function (err) {
			                loading.close()
			                vue.$message.error(err.msg)
			            }
			        });
			    },
			    createReport: function (item) {
			        this.chooseditem = item;
			        this.dialogtime = true;
			    },
			    createConfirm: function () {
			        var loading = null;

			        let data={ year: this.choosedyear, month: this.choosedmonth}

			        if (this.chooseditem.TableName == "OrderDetail") {
			            for (var i = 0; i < this.tableData.length; i++) {
			                if ((this.tableData[i].TableName == "OOH" || this.tableData[i].TableName == "Funnel"
                                || this.tableData[i].TableName == "FCSTN2M" || this.tableData[i].TableName == "FCSTCM")
                                && this.tableData[i].IsGenerate == "False") {
			                    this.$message("请先生成OOH数据报告、Funnel数据报告、FCSTN2M数据报告、FCSTCM数据报告")
			                    return;
			                }
			            }
			            loading = this.$loading({
			                lock: true,
			                text: '正在生成报告。。'
			            });
			            queryUrl = "OrderDetailGenerate"
			        }
			        else if (this.chooseditem.TableName == "RealTime") {
                        if(this.rate==""){
                            this.$message("请输入汇率")
                            return;
                        }
			            for (var i = 0; i < this.tableData.length; i++) {
			                if (this.tableData[i].TableName == "OrderYearMonth" &&this.tableData[i].IsGenerate == "False") {
			                    this.$message("请先生成OrderYearMonth数据报告")
			                    return;
			                }
			            }
			            loading = this.$loading({
			                lock: true,
			                text: '正在生成报告。。'
			            });
			            queryUrl = "GenerateRealTime"
			            data.rate=this.rate
			        }
			        else {
			            loading = this.$loading({
			                lock: true,
			                text: '正在生成报告。。'
			            });
			            if (this.chooseditem.TableName == "OOH") {
			                queryUrl = "GenerateOOH";
			            }
			            else if (this.chooseditem.TableName == "Funnel") {
			                queryUrl = "GenerateFunnel";
			            }
			            else if (this.chooseditem.TableName == "FCSTN2M") {
			                queryUrl = "GenerateFCSTN2M";
			            }
			            else if (this.chooseditem.TableName == "FCSTCM") {
			                queryUrl = "GenerateFCSTCM";
			            }
			            else if (this.chooseditem.TableName == "ThreeRateDealer") {
			                queryUrl = ""
			            }
			            else if (this.chooseditem.TableName == "ThreeRateProvince") {
			                queryUrl = ""
			            }
			            else if (this.chooseditem.TableName == "IB") {
			                queryUrl = ""
			            }
			            else if (this.chooseditem.TableName == "OrderYearMonth") {
			                queryUrl = "GenerateOrderYearMonth"
			            }
			            //else if (this.chooseditem.TableName == "RealTime") {
			            //    queryUrl = "GenerateRealTime"
			            //}
			        }
			        $.ajax({
			            url: 'handler/information.ashx?_op=' + queryUrl,
			            data:data ,
			            type: 'POST',
			            dataType: "json",
			            success: function (data) {
			                loading.close()
			                if (data.success) {
			                    vue.dialogtime = false;
			                    vue.getReport()
			                } else {
			                    vue.$message.error(data.msg)
			                }
			            },
			            error: function (err) {
			                loading.close()
			                vue.$message.error(err.msg)
			            }
			        });
			    },
			    //viewReason: function (item) {

			    //},
			    ChangeFile(item,obj) {
			        const loading = this.$loading({
			            lock: true,
			            text: '上传中'
			        });
			        var file = $(obj.currentTarget)[0].files[0]
			        $(obj.currentTarget).val("")
                    var queryUrl=""
			        if (item.TableName == "OrderDetail") {
			            queryUrl = "QueryOrderDetail"
			        }
			        else if (item.TableName == "OOH") {
			            queryUrl = "QueryOOHTarget"
			        }
			        else if (item.TableName == "Funnel") {
			            queryUrl = "QueryFunnel"
			        }
			        else if (item.TableName == "FCSTN2M") {
			            queryUrl = "QueryFCSTN2M"
			        }
			        else if (item.TableName == "FCSTCM") {
			            queryUrl = "QueryFCSTCM"
			        }
			        else if (item.TableName == "ThreeRateDealer") {
			            queryUrl = "ImportThreeRateDealer"
			        }
			        else if (item.TableName == "ThreeRateProvince") {
			            queryUrl = "ImportThreeRateProvince"
			        }
			        else if (item.TableName == "IB") {
			            queryUrl = "ImportIB"
			        }
			        else if (item.TableName == "OrderYearMonth") {
			            queryUrl = "OrderYearMonthImport"
			        }
			        else if (item.TableName == "RealTime") {
			            queryUrl = "RealTimeImport"
			        } else if (item.TableName == "FCSTAccuracy")
			        {
			            queryUrl = "QueryFCSTAccuracy";
			        }
			        var sendData = new FormData();
			        sendData.append('year', this.choosedyear);
			        sendData.append('month', this.choosedmonth);
			        sendData.append('file', file);
			        $.ajax({
			            url: 'handler/ImportHandler.ashx?_op=' + queryUrl,
			            data: sendData,
			            type: 'POST',
			            dataType: "json",
			            processData: false,
			            contentType: false,
			            success: function (data) {
			                loading.close()
			                if (data.success) {
			                    vue.getReport()
			                } else {
			                    vue.dialogreason = true
			                    vue.errMsg = data.msg;
			                    vue.$message.error(data.msg)
			                }
			            },
			            error: function (err) {
			                loading.close()
			                vue.$message.error(err.msg)
			            }
			        });
			        },
			}

		})
    </script>

</asp:Content>
