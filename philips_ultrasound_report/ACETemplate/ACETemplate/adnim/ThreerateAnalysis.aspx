<%@ Page Language="C#" AutoEventWireup="true"  MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="OOHTargetGRID.aspx.cs" Inherits="ACETemplate.adnim.OOHTargetGRID" %>

<%@ Register Src="~/adnim/include/HeadNavigation.ascx" TagPrefix="uc1" TagName="HeadNavigation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<link href="css/element-ui.css" rel="stylesheet" />

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .headertop{
            height:50px
        }
        .Title{
            font-size:18px;
            margin-top:5px
        }
        .rightcon span{
            margin-left:20px;
            font-size:18px
        }
        .card{
            padding:20px;
	background-color: #ffffff;
	box-shadow: 0px 0px 10px 0px 
		rgba(0, 36, 56, 0.12);
	border-radius: 10px;
	border: solid 1px #e5e5e5;
    margin-top:20px
        }
        .card:nth-child(1){
            margin-top:0
        }
        .cardtitle{
            font-size:16px;

        }
        .carditem{
            margin-top:20px
        }
        .carditem:nth-child(1){
            margin-top:0
        }
        .tableitem{
            /*width:5%;*/
            /*display:inline-block;*/
            text-align:center;
            height:54px;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:16px
        }
        .topitem{
            text-align:center;
            margin-left:3%
        }
        .topitem:nth-child(1),.topitem:nth-child(2){
            margin-left:0
        }
        .topitem img{
            width:95%
        }
        .productitem{
            justify-content:flex-start;
            padding-left: 0.5%;
            margin-left: 1%;
            font-size:16px;
            height:30px
        }
        .numitem{
            width: 86px;
	        height: 26px;
	        border: solid 1px #cccccc
        }
        .blockdiv{
            /*background-color:#ff0000;*/
            height:30px;
            line-height:30px;
            color:#fff;
            font-size:12px;
            text-align: left;
            text-indent:5px
            /*padding-left: 10px;*/

        }
        .borderleft:nth-child(3n+1) .blockdiv{
            background-color:#6fb0ea;
        }
        .borderleft:nth-child(3n+2) .blockdiv{
            background-color:#2b7dbc;
        }
        .borderleft:nth-child(3n) .blockdiv{
            background-color:#c1e4ff
        }
        .borderleft span{
            font-size:12px;
            padding-left:10px
        }
        .areaname{
            background-color: #f5f5f5;
	        border: solid 1px #e6e6e6;
            padding:0 2px
        }
        .borderleft{
            justify-content:flex-start;
            border-left:1px solid #333333;
            margin-left:1%
        }
        .el-col-3 {
            width: 10%;
        }
        .el-col-9{
            width:30%
        }
        .fl{
            float:left
        }
        .fr{
            float:right
        }
    </style>
	<uc1:HeadNavigation runat="server" ID="HeadNavigation" Level2Name="报表管理" Level3Name="三率分析" />
	<div class="page-content">
		<div id="app" v-cloak style="margin-top:10px;margin-bottom:10px;padding:0;border:1px solid white">
            <div class="headertop">
                <div class="Title fl">三率分析</div>
               <%-- <div class="fr rightcon">
                    <span>区域：</span>
                    <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                    <span>经销商：</span>
                    <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </div>--%>
            </div>
			<div class="card">
                <div class="cardtitle">By Region & District</div>
                <div class="carditem">
                <el-row type="flex" align="middle" class="tableheader">
                  <el-col class="topitem" :span="3"></el-col>
                    <el-col class="topitem" :span="9">
                        <div>L3</div>
                        <img src="assets/images/braces.png"/>
                    </el-col>
                   <el-col class="topitem" :span="9">
                       <div>L2</div>
                       <img src="assets/images/braces.png"/>
                   </el-col>
                   <el-col class="topitem" :span="3">
                       <div>L1</div>
                       <%--<img src="assets/images/braces.png"/>--%>
                   </el-col>
                </el-row>
                
                <el-row type="flex" align="middle" class="tableheader">
                  <el-col class="tableitem" :span="3" style="height:30px"></el-col>
                   <el-col class="tableitem productitem" :span="3">覆盖率</el-col>
                   <el-col class="tableitem productitem" :span="3">渗透率</el-col>
                   <el-col class="tableitem productitem" :span="3">赢单率</el-col>
                   
                    <el-col class="tableitem productitem" :span="3">覆盖率</el-col>
                   <el-col class="tableitem productitem" :span="3">渗透率</el-col>
                   <el-col class="tableitem productitem" :span="3">赢单率</el-col>

                    <%--<el-col class="tableitem productitem" :span="2">覆盖率</el-col>--%>
                   <el-col class="tableitem productitem" :span="3">渗透率</el-col>
                   <%--<el-col class="tableitem productitem" :span="2">赢单率</el-col>--%>
                </el-row>
                <el-row type="flex" align="middle" v-for="item in datas" class="tablecontent">
                  <el-col class="tableitem areaname" :span="3">{{item.Province}}</el-col>
                    <%--L3--%>
                    <el-col class="tableitem borderleft" :span="3" >
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L3Coverage))}"></div><span>{{getfixed(item.L3Coverage)}}</span>
                     </el-col>
                    <el-col class="tableitem borderleft" :span="3">
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L3Penetration))}"></div><span>{{getfixed(item.L3Penetration)}}</span>
                     </el-col>
                    <el-col class="tableitem borderleft" :span="3" >
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L3WinRate))}"></div><span>{{getfixed(item.L3WinRate)}}</span>
                     </el-col>
                    <%--L2--%>
                    <el-col class="tableitem borderleft" :span="3" >
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L2Coverage))}"></div><span>{{getfixed(item.L2Coverage)}}</span>
                     </el-col>
                    <el-col class="tableitem borderleft" :span="3" >
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L2Penetration))}"></div><span>{{getfixed(item.L2Penetration)}}</span>
                     </el-col>
                    <el-col class="tableitem borderleft" :span="3" >
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L2WinRate))}"></div><span>{{getfixed(item.L2WinRate)}}</span>
                     </el-col>
                    <%--L1--%>
                    <el-col class="tableitem borderleft" :span="3" >
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L1Penetration))}"></div><span>{{getfixed(item.L1Penetration)}}</span>
                     </el-col>
                    <%--<el-col class="tableitem borderleft" :span="2" >
                     <div class="blockdiv" v-bind:style="{width:(50/(1)+'%'),backgroundColor:#2b7dbc}">40%</div>
                     </el-col>--%>
                </el-row>
              </div>
			</div>
            <div class="card">
                <div class="cardtitle">Rank by Dealer</div>
                <div class="carditem">
                <el-row type="flex" align="middle" class="tableheader">
                  <el-col class="topitem" :span="3"></el-col>
                    <el-col class="topitem" :span="9">
                        <div>L3</div>
                        <img src="assets/images/braces.png"/>
                    </el-col>
                   <el-col class="topitem" :span="9">
                       <div>L2</div>
                       <img src="assets/images/braces.png"/>
                   </el-col>
                   <%--<el-col class="topitem" :span="6">
                       <div>L1</div>
                       <img src="assets/images/braces.png"/>
                   </el-col>--%>
                </el-row>
                
                <el-row type="flex" align="middle" class="tableheader">
                  <el-col class="tableitem" :span="3" style="height:30px"></el-col>
                   <el-col class="tableitem productitem" :span="3">覆盖率</el-col>
                   <el-col class="tableitem productitem" :span="3">渗透率</el-col>
                   <el-col class="tableitem productitem" :span="3">赢单率</el-col>
                   
                    <el-col class="tableitem productitem" :span="3">覆盖率</el-col>
                   <el-col class="tableitem productitem" :span="3">渗透率</el-col>
                   <el-col class="tableitem productitem" :span="3">赢单率</el-col>

                    <%--<el-col class="tableitem productitem" :span="3">覆盖率</el-col>
                   <el-col class="tableitem productitem" :span="3">渗透率</el-col>
                   <el-col class="tableitem productitem" :span="3">赢单率</el-col>--%>
                </el-row>
                <el-row type="flex" align="middle" v-for="item in datas1" class="tablecontent">
                  <el-col class="tableitem areaname" :span="3">{{item.Dealer}}</el-col>
                    <%--L3--%>
                    <el-col class="tableitem borderleft" :span="3" >
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L3Coverage))}"></div><span>{{getfixed(item.L3Coverage)}}</span>
                     </el-col>
                    <el-col class="tableitem borderleft" :span="3" >
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L3Penetration))}"></div><span>{{getfixed(item.L3Penetration)}}</span>
                     </el-col>
                    <el-col class="tableitem borderleft" :span="3" >
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L3WinRate))}"></div><span>{{getfixed(item.L3WinRate)}}</span>
                     </el-col>
                    <%--L2--%>
                    <el-col class="tableitem borderleft" :span="3" >
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L2Coverage))}"></div><span>{{getfixed(item.L2Coverage)}}</span>
                     </el-col>
                    <el-col class="tableitem borderleft" :span="3" >
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L2Penetration))}"></div><span>{{getfixed(item.L2Penetration)}}</span>
                     </el-col>
                    <el-col class="tableitem borderleft" :span="3" >
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L2WinRate))}"></div><span>{{getfixed(item.L2WinRate)}}</span>
                     </el-col>
                    <%--L1--%>
                    <%--<el-col class="tableitem borderleft" :span="2" >
                     <div class="blockdiv" v-bind:style="{width:(getfixed(item.L1Penetration*100)+'%')}">{{getfixed(item.L1Penetration)}}%</div>
                     </el-col>--%>
                    <%--<el-col class="tableitem borderleft" :span="2" >
                     <div class="blockdiv" v-bind:style="{width:(50/(1)+'%'),backgroundColor:#2b7dbc}">40%</div>
                     </el-col>--%>
                </el-row>
			</div>
            </div>
        </div>
            </div>
	<!-- /.page-content -->

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptBlock" runat="server">

    	<script src="js/element.js"></script>
	<script>
		var vue = new Vue({
			el: "#app",
			data: {
			    datas: [],
			    datas1:[],
			},
			created: function() {
			    this.getdata()
			    this.getdata1()
			},
			methods: {
			    getdata() {
			        const loading = this.$loading({
			            lock: true,
			            text: ''
			        });
			        $.ajax({
			            url: 'handler/information.ashx?_op=QueryThreeRateProvince',
			            data: { year: sessionStorage.getItem("selectYear"), month: sessionStorage.getItem("selectMonth")},
			            type: 'POST',
			            dataType: "json",
			            success: function (data) {
			                loading.close()
			                if (data.success) {
			                    //vue.datas=data.data
			                    let USteam = {
			                        L1Penetration:0,L2Coverage: 0, L2Penetration: 0, L2WinRate: 0, L3Coverage: 0,
			                        L3Penetration: 0, L3WinRate: 0, Province: "US team"
			                    }
			                    //vue.datas1 = data.data
			                    _.forEach(data.data, function (item, index) {
			                        USteam.L1Penetration += item.L1Penetration ? parseFloat(item.L1Penetration) : 0;
			                        USteam.L2Coverage += item.L2Coverage ? parseFloat(item.L2Coverage) : 0;
			                        USteam.L2Penetration += item.L2Penetration ? parseFloat(item.L2Penetration) : 0;
			                        USteam.L2WinRate += item.L2WinRate ? parseFloat(item.L2WinRate) : 0;
			                        USteam.L3Coverage += item.L3Coverage ? parseFloat(item.L3Coverage) : 0;
			                        USteam.L3Penetration += item.L3Penetration ? parseFloat(item.L3Penetration) : 0;
			                        USteam.L3WinRate += item.L3WinRate ? parseFloat(item.L3WinRate) : 0;
			                    })
			                    vue.datas = data.data.concat(USteam)
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
			    getdata1() {
			        const loading = this.$loading({
			            lock: true,
			            text: ''
			        });
			        $.ajax({
			            url: 'handler/information.ashx?_op=QueryThreeRateDealer',
			            data: {year: sessionStorage.getItem("selectYear"), month: sessionStorage.getItem("selectMonth") },
			            type: 'POST',
			            dataType: "json",
			            success: function (data) {
			                loading.close()
			                if (data.success) {
			                    let USteam = {L2Coverage:0,L2Penetration:0,L2WinRate:0,L3Coverage:0,
                                L3Penetration:0,L3WinRate:0,Dealer:"US team"}
			                    //vue.datas1 = data.data
			                    _.forEach(data.data, function (item, index) {
			                        USteam.L2Coverage += item.L2Coverage ? parseFloat(item.L2Coverage):0;
			                        USteam.L2Penetration += item.L2Penetration ? parseFloat(item.L2Penetration) : 0;
			                        USteam.L2WinRate += item.L2WinRate ? parseFloat(item.L2WinRate) : 0;
			                        USteam.L3Coverage += item.L3Coverage ? parseFloat(item.L3Coverage) : 0;
			                        USteam.L3Penetration += item.L3Penetration ? parseFloat(item.L3Penetration) : 0;
			                        USteam.L3WinRate += item.L3WinRate ? parseFloat(item.L3WinRate) : 0;
			                    })
			                    vue.datas1 = data.data.concat(USteam)
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
			    getfixed(val) {
			        if (val == 'NA') {
			            return "0.00%";
			        }
			        return parseFloat(val * 100).toFixed(2) + "%"
			    }
			}
		})
    </script>

</asp:Content>
