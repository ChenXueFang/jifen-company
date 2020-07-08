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
	border: solid 1px #e5e5e5
        }
        .cardtitle{
            font-size:16px;

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
        .productitem{
            justify-content:flex-start;
            padding-left: 1%;
            margin-left: 1%;
        }
        .numitem{
            width: 86px;
	        height: 26px;
	        border: solid 1px #cccccc
        }
        .blockdiv{
            background-color:#ff0000;
            height:30px;
            line-height:30px;
            color:#fff;
            font-size:12px;
            text-align: left;
            /*padding-left: 10px;*/

        }
        .areaname{
            background-color: #f5f5f5;
	        border: solid 1px #e6e6e6
        }
        .borderleft{
            justify-content:flex-start;
            border-left:1px solid #333333;
            margin-left:1%
        }
        .el-col-3 {
            width: 10%;
        }
        .fl{
            float:left
        }
        .fr{
            float:right
        }
        .borderleft span {
    font-size: 12px;
    padding-left: 10px;
}
    </style>
	<uc1:HeadNavigation runat="server" ID="HeadNavigation" Level2Name="报表管理" Level3Name="IB分析" />
	<div class="page-content">
		<div id="app" v-cloak style="margin-top:10px;margin-bottom:10px;padding:0;border:1px solid white">
            <div class="headertop">
                <div class="Title fl">IB指标表现</div>
              <%--  <div class="fr rightcon">
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
                <div class="cardtitle">累计IB反馈情况</div>
                <el-row type="flex" align="middle" class="tableheader" v-if="totaldata.length>0">
                  <el-col class="tableitem" :span="2"></el-col>
                    <el-col class="tableitem" :span="2">库存总数</el-col>
                    <el-col class="tableitem" :span="2">已反馈个数</el-col>
                    <el-col class="tableitem productitem" :span="2" v-for="item in products">{{item.productname}}</el-col>
                </el-row>
                <el-row type="flex" align="middle" v-for="item in totaldata" class="tablecontent">
                  <el-col class="tableitem areaname" :span="2">{{item.region}}</el-col>
                    <el-col class="tableitem" :span="2">
                        <div class="numitem">{{item.total}}</div>
                    </el-col>
                    <el-col class="tableitem" :span="2">
                        <div class="numitem">{{item.feedtotal}}</div>
                    </el-col>
                    <el-col class="tableitem borderleft" :span="2" v-for="(item1,index) in item.list">
                        <%--<template v-for="(item2,index2) in item1.product" v-if="item2.filedName=='IBReturn'">--%>
                     <div  class="blockdiv" v-bind:style="{width:(getfixed(item1.value)),backgroundColor:(index%2==0?'#2b7dbc':'#c1e4ff')}">
                     </div>
                        <span>{{getfixed(item1.value)}}</span>
                           <%-- </template>--%>
                       </el-col>
                </el-row>
               
			</div>
            <div class="card" style="margin-top:20px">
                <div class="cardtitle">2019年delivery截止到6月底安装反馈情况</div>
                <el-row type="flex" align="middle" class="tableheader" v-if="deliverydata.length>0">
                  <el-col class="tableitem" :span="2"></el-col>
                    <el-col class="tableitem" :span="2">库存总数</el-col>
                    <el-col class="tableitem" :span="2">已反馈个数</el-col>
                    <el-col class="tableitem productitem" :span="2" v-for="item in products">{{item.productname}}</el-col>
                </el-row>
                <el-row type="flex" align="middle" v-for="item in deliverydata" class="tablecontent">
                  <el-col class="tableitem areaname" :span="2">{{item.region}}</el-col>
                    <el-col class="tableitem" :span="2">
                        <div class="numitem">{{item.total}}</div>
                    </el-col>
                    <el-col class="tableitem" :span="2">
                        <div class="numitem">{{item.feedtotal}}</div>
                    </el-col>
                    <el-col class="tableitem borderleft" :span="2" v-for="(item1,index) in item.list">
                       <%-- <template v-for="(item2,index2) in item1.product" v-if="item2.filedName=='IBReturn'">--%>
                     <div  class="blockdiv" v-bind:style="{width:(getfixed(item1.value)),backgroundColor:(index%2==0?'#2b7dbc':'#c1e4ff')}">
                     </div>
                        <span>{{getfixed(item1.value)}}</span>
                          <%--  </template>--%>
                       </el-col>
                </el-row>
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
			    value:"",
			    products: [],
			    totaldata: [{list:[]}],
                deliverydata:[],
			    datas: [],
			    areas:[]
			},
			created: function() {
			    this.getdata()
			},
			methods: {
			    getdata() {
			        const loading = this.$loading({
			            lock: true,
			            text: ''
			        });
			        $.ajax({
			            url: 'handler/information.ashx?_op=QueryIB',
			            data: { year: sessionStorage.getItem("selectYear"), month: sessionStorage.getItem("selectMonth")},
			            type: 'POST',
			            dataType: "json",
			            success: function (data) {
			                loading.close()
			                if (data.success) {
                                let data1=[],data2=[]
			                    _.forEach(data.data, function (item, index) {
			                        let json = JSON.parse(item.JSON)
			                        let list = json.list
			                        _.forEach(list, function (item1, index1) {
			                            item1.value = json.region[0].list[index1]
			                            item1.region = json.region[0].region
			                            if (item1.type == "累计IB反馈情况") {
			                                data1.push(item1)
			                            }
			                            else {
			                                data2.push(item1)
			                            }
			                        })
			                    })
			                    data1 = _(data1).groupBy(item => item.region).map((items, region) => {
                                   return {
                                       region: region,
                                       list: items
                                   }
                               }).value()
			                    data2 = _(data2).groupBy(item => item.region).map((items, region) => {
			                        return {
			                            region: region,
			                            list: items
			                        }
			                    }).value()


			                    _.forEach(data1, function (item, index) {
			                        item.total = 0;
			                        item.feedtotal = 0;
                                    item.list = _(item.list).groupBy(item1 => item1.productname).map((items, productname) => {
                                           return {
                                               productname: productname,
                                               product: items
                                           }
                                    }).value()
                                    let returntotal=0
                                    _.forEach(item.list, function (item1, index1) {
                                        //每个产品总数
                                        item1.total = _.sumBy(_.filter(item1.product, function (item2) { return item2.filedName == "库存总数" }),
                                            function (pitem) { return pitem.value ? parseFloat(pitem.value) : 0; });
                                        item1.feedtotal = _.sumBy(_.filter(item1.product, function (item2) { return item2.filedName == "已反馈个数" }),
                                            function (pitem) { return pitem.value ? parseFloat(pitem.value) : 0; });
                                        item1.value = item1.total==0?0.00:(item1.feedtotal / item1.total)
                                    })
			                        //每个区域总数
                                    item.total = _.sumBy(item.list,
                                            function (titem) { return parseFloat(titem.total) ? parseFloat(titem.total) : 0; });
                                    item.feedtotal = _.sumBy(item.list,
                                            function (fitem) { return parseFloat(fitem.feedtotal) ? parseFloat(fitem.feedtotal) : 0; });
                                    returntotal = _.sumBy(item.list,
                                            function (ritem) { return parseFloat(ritem.value) ? parseFloat(ritem.value) : 0; });
                                    item.list.push(
                                        {
                                            product: [],
                                            productname: "Total",
                                            value: returntotal 
                                        })
                                    if (index == 0) {
                                        vue.products = item.list
                                    }
                                })
			                    _.forEach(data2, function (item, index) {
			                        item.total = 0;
			                        item.feedtotal = 0;
                                    item.list = _(item.list).groupBy(item1 => item1.productname).map((items, productname) => {
                                        return {
                                            productname: productname,
                                            product: items
                                        }
                                    }).value()
                                    let returntotal1 = 0
                                    _.forEach(item.list, function (item1, index1) {
                                        //每个产品总数
                                        item1.total = _.sumBy(_.filter(item1.product, function (item2) { return item2.filedName == "库存总数" }),
                                            function (pitem) { return pitem.value ? parseFloat(pitem.value) : 0; });
                                        item1.feedtotal = _.sumBy(_.filter(item1.product, function (item2) { return item2.filedName == "已反馈个数" }),
                                            function (pitem) { return pitem.value ? parseFloat(pitem.value) : 0; });
                                        item1.value =item1.total==0?0.00:(item1.feedtotal / item1.total)//IBRETUEN
                                    })
                                    //每个区域总数
                                    item.total = _.sumBy(item.list, function (titem) { return parseFloat(titem.total) ? parseFloat(titem.total) : 0; });//库存总数
                                    item.feedtotal = _.sumBy(item.list, function (fitem) { return parseFloat(fitem.feedtotal) ? parseFloat(fitem.feedtotal) : 0; });//已反馈个数
                                    returntotal1 = _.sumBy(item.list, function (ritem) { return parseFloat(ritem.value) ? parseFloat(ritem.value) : 0; });//IBRETUEN
                                    item.list.push(
                                        {
                                            product: [],
                                            productname: "Total",
                                            value: returntotal1
                                        })
			                    })
			                    vue.totaldata = data1;
			                    vue.deliverydata = data2;
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
			    },
			}

		})
    </script>

</asp:Content>
