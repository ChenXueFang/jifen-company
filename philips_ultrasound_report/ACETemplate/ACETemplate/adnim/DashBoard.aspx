
<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="DashBoard.aspx.cs" Inherits="ACETemplate.adnim.DashBoard" %>

<%@ Register Src="~/adnim/include/HeadNavigation.ascx" TagPrefix="uc1" TagName="HeadNavigation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<link href="css/element-ui.css" rel="stylesheet" />
	<link href="css/dashBoard.css" rel="stylesheet" />
	<link href="css/productChart.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

	<uc1:HeadNavigation runat="server" ID="HeadNavigation" Level2Name="报表管理" Level3Name="业务DashBoard" />
	<div class="page-content">
		<div id="app" style="margin-top:10px;margin-bottom:10px;padding:0;border:1px solid white" v-cloak>
			<p class="titleBox">业务Dashboard</p> 
	<%--	  <el-date-picker
      v-model="dateRange"
      type="daterange"
      range-separator="至" prefix-icon='none'
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
		  <el-button>切换</el-button>--%>
		  <!-- <div class="rightOperate">
			<el-radio v-model="radio" label="1">图标</el-radio>
			<el-radio v-model="radio" label="2">数据</el-radio>
			<span>导出<img style="height: 12px;margin-left: 2px;vertical-align: unset;" src="assets/images/download.png" /></span>
			<span>添加备注<i class="el-icon-edit"></i></span>
		  </div> -->
			<div class="reportArea">
				<div>
					<p class="titleBox">核心指标表现</p>
					<el-row :gutter="20">
						<el-col :span="12">
							<div>
								<div id="chart1" class="chart chartHalf"></div>
								<div class="chartText">
									<div><span>To go</span><span>{{chart1Date.toGo}}</span></div>
									<div><span>Funnel</span><span>{{chart1Date.Funnel}}</span></div>
								</div>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<div id="chart2" class="chart chartHalf"></div>
								<div class="chartText">
									<div><span>To go</span><span>{{chart2Date.toGo}}</span></div>
									<div><span>OOH</span><span>{{chart2Date.ooh}}</span></div>
								</div>
							</div>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<div>
								<div id="chart3" class="chart"></div>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="chatMapBox">
								<div id="chart4" class="chart chatMap"></div>
								<div id="chart5" class="chart chatMap"></div>
								<div id="chart6" class="chart chatMap"></div>
							</div>
						</el-col>
					</el-row>
					<p class="titleBox">区域表现</p>
					<el-row :gutter="20">
						<el-col :span="24">
							<div class="tableBox">
								<!-- OIT -->
						
								<table class="charOneTable" cellspacing="0" cellpadding="0">
									<!-- 标题 -->
									<tr>
										<td>Zone</td>
										<td colspan="3">OIT</td>
										<td>Trans rate</td>
										<td colspan="3">Sales</td>
										<td>Weight</td>
										<td>Rank</td>
										<!-- <td>目标完成中达标</td> -->
										<td>目标完成率</td>
										<td>目标增长率</td>
										<td>同比增长率>0</td>
										<td>同比增长率&lt;0</td>
										<!-- <td>销售完成Top5</td>
										<td>销售增长Top5</td>
										<td>金额Top5 fummel list</td> -->
									</tr>
									<!-- 空行间距 -->
									<!-- <tr height="20px"></tr> -->
									<!-- 刻度线 -->
									<tr height='13px'>
										<td colspan="1"></td>
										<td  colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png" /></td>
										<td colspan="1"></td>
										<td colspan="3"  class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
									</tr>
									<!-- 一行数据 -->
									<tr v-for="(item,index) in tableDate">
										<td><div class="typeName">{{item.Zone}}</div></td>
										<!-- 正负轴 -->
										<td colspan="3">
											<!-- :max="maxOITHtA" :min="minOITHtA" -->
											<common-plus-minus :plus-minus="item.OIT" :max="maxOITHtA" :min="minOITHtA"/>
											<!-- <div class="plus-minusBox">
												<div class="plus-minus-data plus-minus-dataLeft">
													<template v-if="item.OIT&lt;0">
														<div class="leftNum">{{item.OIT}}</div>
													<button class="leftBlock" :style="'width:' + Math.abs(item.OIT/100*62) + 'px'"></button>
													</template>
												</div>
												<div class="plus-minus-line"></div>
												<div class="plus-minus-data">
													<template v-if="item.OIT>0">
														<button class="rightBlock" :style="'width:' + Math.abs(item.OIT/100*62) + 'px'"></button>
														<span class="leftNum">{{item.OIT}}</span>
													</template>
												</div>
											</div> -->
										</td>
										<td><div class="numBox">{{item.rate}}</div></td>
										<!-- 正负轴 -->
										<td colspan="3">
											<common-plus-minus :plus-minus="item.Sales" :max="maxSaleHtA" :min="minSaleHtA"/>
											<!-- <div class="plus-minusBox">
												<div class="plus-minus-data plus-minus-dataLeft">
													<template v-if="item.Sales&lt;0">
														<div class="leftNum">{{item.Sales}}</div>
														<button class="leftBlock" :style="'width:' + Math.abs(item.Sales/100*62) + 'px'"></button>
													</template>
												</div>
												<div class="plus-minus-line"></div>
												<div class="plus-minus-data">
													<template v-if="item.Sales>0">
														<button class="rightBlock" :style="'width:' + Math.abs(item.Sales/100*62) + 'px'"></button>
														<span class="leftNum">{{item.Sales}}</span>
													</template>
												</div>
											</div> -->
										</td>
										<td><div class="numBox">{{item.weight}}</div></td>
										<td><div class="numBox">{{item.rank}}</div></td>
										<td><div class="numBox blue">{{item.target}}</div></td>
										<td><div class="numBox blue">{{item.rise}}</div></td>
										<td><div class="numBox blue">{{item.a}}</div></td>
										<td><div class="numBox blue">{{item.b}}</div></td>
										<!-- <td><div class="numBox yellow">{{item.e}}</div></td>
										<td><div class="numBox yellow">{{item.f}}</div></td>
										<td><div class="numBox yellow">{{item.g}}</div></td> -->
									</tr>
								</table>
								<!-- OIT end-->
							</div>
						</el-col>
					</el-row>
					<!-- top5 -->
					<el-row :gutter="20">
						<el-col :span="24">
							<div class="tableBox">
								<!-- topTableData1: [{
									names:['安徽','上海'],
									value:[20,30], -->

									<!-- // names:['安徽','上海'],
						// value:[20,30],
						安徽:'20',
						shanghai:'30', -->
								<el-table
								:data="topCompData">
								<el-table-column label="销售完成Top5">
									<el-table-column
									:prop="item" v-for="(item,index) in topCompData[0].names"
									:label="item">
									</el-table-column>
								</el-table-column>
							</el-table>
							<el-table
								:data="topRiseData">
								<el-table-column label="销售增长Top5">
									<el-table-column
									:prop="item" v-for="(item,index) in topRiseData[0].names"
									:label="item">
									</el-table-column>
								</el-table-column>
							</el-table>
							<el-table
								:data="topFunnelData">
								<el-table-column label="金额fummel list Top5">
									<el-table-column
									:prop="item" v-for="(item,index) in topFunnelData[0].names"
									:label="item">
									</el-table-column>
								</el-table-column>
							</el-table>
							</div>
						</el-col>
					</el-row>
					<p class="titleBox">产品表现</p>
					<el-row :gutter="20">
						<el-col :span="12">
							<div>
								<div id="chart7" class="chart chartScatter"></div>
								<div id="chart8" class="chart chartScatter"></div>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content bg-purple">
								<div id="chart9" class="chart chartScatter"></div>
								<div id="chart10" class="chart chartScatter"></div>
							</div>
						</el-col>
					</el-row>
					<p class="titleBox">区域临床应用表现</p>
					<el-row :gutter="20">
						<el-col :span="24">
							<div class="tableBox">
								<div id="chart11" class="chart chartBottom"></div>
								<div id="chart12" class="chart chartBottom"></div>
								<div id="chart13" class="chart chartBottom"></div>
								<div id="chart14" class="chart chartBottom"></div>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
	</div>
	<!-- /.page-content -->

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptBlock" runat="server">

	<script src="assets/js/myUpload/jquery.ajaxfileupload.js"></script>
	<script src="assets/js/myUpload/myFileUpload.js"></script>

	<script src="js/element.js"></script>
	<!-- <script src="js/echarts/echarts.min.js"></script> -->
	<!-- <script src="https://cdn.jsdelivr.net/npm/echarts@4.5.0/dist/echarts.min.js"></script> -->
	<!-- <script src="js/echarts.js"></script> -->
	<script src="js/echats.4.7.0.min.js"></script>
	<!-- <script src="js/echarts/china.js"></script> -->
	<script src="js/echarts/echarts.china.js"></script>
	<!--引入公共组件,正负轴-->
	<script type="text/javascript" src="component/plus-minus.js"></script>

	<script>
		var chart1 = '',
		chart2 = '',
		chart3 = '',
		chart4 = '',
		chart5 = '',
		chart6 = '',
		chart7='',
		chart8 = '',
		chart9 = '',
		chart10 = '',
		chart11='',
		chart12 = '',
		chart13 = '',
		chart14 = '';
		window.onresize = function () {
			chart1.resize();
			chart2.resize();
			chart3.resize();
			chart4.resize();
			chart5.resize();
			chart6.resize();
			chart7.resize();
			chart8.resize();
			chart9.resize();
			chart10.resize();
			chart11.resize();
			chart12.resize();
			chart13.resize();
			chart14.resize();
		}
		var geoCoordMap={};
					var mapFeatures = echarts.getMap('china').geoJson.features;
					mapFeatures.forEach(function (v) {

						// 地区名称
						var name = v.properties.name;
						// 地区经纬度
						geoCoordMap[name] = v.properties.cp;

					});

		var vue = new Vue({
			el: "#app",
			data: {
				dateRange:'',
				radio: '1',
				chart1Date:{
					legendDate:['去年', '实际', '今年'],
					yDate:['YTD'],
					value:[
					],
					toGo:0,
					Funnel:0
				},
				// chart1Date:{
				// 	legendDate:['去年', '实际', '今年'],
				// 	yDate:['YTD','Q2'],
				// 	value:[
				// 		[160, 150],
				// 		[200, 290],
				// 		[300, 250]
				// 	],
				// 	toGo:87,
				// 	Funnel:88
				// },
				chart2Date:{
					legendDate:['去年', '实际'],
					yDate:['HTA', 'YTD'],
					value:[],
					toGo:0,
					ooh:0
				},
				chart3Date:[],
				WinRateMapData:[],
				CoverageMapData:[],
				PenetrationMapData:[],
				tableDate:[
					// {Zone:"North0",OIT:'-2.3',rate:1,Sales:2.3,weight:2,rank:3,a:2,b:3,c:2,d:4,e:2,f:1,g:5},
					// {Zone:"North1",OIT:'2.3',rate:1,Sales:-2.3,weight:2,rank:3,a:2,b:3,c:2,d:4,e:2,f:1,g:5},
					// {Zone:"North2",OIT:'-5',rate:1,Sales:2.3,weight:2,rank:3,a:2,b:3,c:2,d:4,e:2,f:1,g:5},
					// {Zone:"North3",OIT:'5',rate:1,Sales:-2.3,weight:2,rank:3,a:2,b:3,c:2,d:4,e:2,f:1,g:5},
					// {Zone:"North4",OIT:'-8',rate:1,Sales:2.3,weight:2,rank:3,a:2,b:3,c:2,d:4,e:2,f:1,g:5},
					// {Zone:"North5",OIT:'9',rate:1,Sales:-2.3,weight:2,rank:3,a:2,b:3,c:2,d:4,e:2,f:1,g:5},
					// {Zone:"North6",OIT:'-10',rate:1,Sales:2.3,weight:2,rank:3,a:2,b:3,c:2,d:4,e:2,f:1,g:5},
				],
					scatterOitValueData:{},
					scatterOitUnitData:{},
					scatterSalesValueData:{},
					scatterSalesUnitData:{},
					CVBottomData:{
						legendDate:['OIT', 'Sales']
					},
					GIBottomData:{
						legendDate:['OIT', 'Sales']
					},
					WHCBottomData:{
						legendDate:['OIT', 'Sales']
					},
					POCBottomData:{
						legendDate:['OIT', 'Sales']
					},
					topCompData:[
						{names:[]}
					],
					topFunnelData:[{names:[]}],
					topRiseData:[{names:[]}],
					// topTableData1: [{
					// 	names:['安徽','上海','11','22','33'],
					// 	// value:[20,30],
					// 	安徽:'20',
					// 	上海:'30',
					// 	11:'20',
					// 	22:'30',
					// 	33:'20'
					// }]
								
					// dataLong:10,
			},
			computed:{
				maxOITHtA:function(){
					if(this.tableDate.length==1){
						return 100;
					}
					return _.maxBy(this.tableDate, function(o) { return Math.abs( o.OIT); }).OIT;
				},
				minOITHtA:function(){
					return _.minBy(this.tableDate, function(o) { return Math.abs( o.OIT); }).OIT;
				},
				maxSaleHtA:function(){
					if(this.tableDate.length==1){
						return 100;
					}
					return _.maxBy(this.tableDate, function(o) { return Math.abs( o.Sales); }).Sales;
				},
				minSaleHtA:function(){
					return _.minBy(this.tableDate, function(o) { return Math.abs( o.Sales); }).Sales;
				}
			},
			mounted: function () {
				this.loadMapDate();
				this.loadTopDate();
				this.loadBottomData();
				// this.queryTableDate();
				this.loadScatterData();
				this.loadFCSTData();
				this.loadTop5Date()

				// this.loadTopChart();
				// this.loadChart3();
				// this.loadMapChart();
				// this.loadScatterChart();
				// this.loadBottomChart();
			},
			methods: {
				//请求地图数据
				loadMapDate(){
					const loading = this.$loading({
				        lock: true,
				        text: ''
				    });
					$.ajax({
				        url: 'handler/information.ashx?_op=QueryThreeRateProvince',
				        data: { year:sessionStorage.getItem("selectYear"), month: sessionStorage.getItem("selectMonth")},
				        type: 'POST',
				        dataType: "json",
				        success: function (data) {
				            loading.close()
				            if (data.success) {
								var WinRateMapData = [];
								var CoverageMapData = [];
								var PenetrationMapData = [];
								var Data = _(data.data).groupBy(item => item.DistrictName).map((items, DistrictName) => {
				                    return {
				                        DistrictName: DistrictName,
				                        list: items
				                    }
								}).value()
								_.forEach(Data, function (item, index) {
									if(item.DistrictName&&item.DistrictName!='null'){
										var WinRateItem={name:'',value:[]}
										var CoverageItem={name:'',value:[]}
										var PenetrationItem={name:'',value:[]}
										PenetrationItem.name=CoverageItem.name=WinRateItem.name=item.DistrictName;
										CoverageItem.value=JSON.parse(JSON.stringify(geoCoordMap[item.DistrictName])) || [];
										WinRateItem.value=JSON.parse(JSON.stringify(geoCoordMap[item.DistrictName])) || [];
										PenetrationItem.value=JSON.parse(JSON.stringify(geoCoordMap[item.DistrictName])) || [];
										var totalWinRate =_.sumBy(item.list, function (item1) { return (Number(item1.L1WinRate)||0) + (Number(item1.L2WinRate)||0)+(Number(item1.L3WinRate)||0)});
										var totalCoverage =_.sumBy(item.list, function (item1) { return (Number(item1.L1Coverage)||0) + (Number(item1.L2Coverage)||0)+(Number(item1.L3Coverage)||0)});
										var totalPenetration =_.sumBy(item.list, function (item1) { return (Number(item1.L1Penetration)||0) + (Number(item1.L2Penetration)||0)+(Number(item1.L3Penetration)||0)});
										WinRateItem.value[2]=(totalWinRate*100).toFixed(2)
										CoverageItem.value[2]=(totalCoverage*100).toFixed(2)
										PenetrationItem.value[2]=(totalPenetration*100).toFixed(2)
										WinRateMapData.push(WinRateItem)
										CoverageMapData.push(CoverageItem)
										PenetrationMapData.push(PenetrationItem)
									}	
								})
								vue.WinRateMapData=WinRateMapData;
								vue.CoverageMapData=CoverageMapData;
								vue.PenetrationMapData=PenetrationMapData;
								vue.loadMapChart();
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
				creatCompare(propertyName) {
					return function (obj1,obj2) {
						var value1=obj1[propertyName];
						var value2=obj2[propertyName];
						console.log(obj1)
						if(value1<value2){
							return -1
						}else if(value1>value2){
							return 1
						}else {
							return 0
						}
					}
				},
				loadTopDate(){
					const loading = this.$loading({
				        lock: true,
				        text: ''
				    });
					$.ajax({
				        url: 'handler/information.ashx?_op=QueryByDistrict',
				        data: { year: sessionStorage.getItem("selectYear"), month: sessionStorage.getItem("selectMonth"),type:1 },
				        type: 'POST',
				        dataType: "json",
				        success: function (data) {
				            loading.close()
				            if (data.success) {
				// 				chart1Date:{
				// 	legendDate:['去年', '实际', '今年'],
				// 	yDate:['YTD','Q2'],
				// 	value:[
				// 		[160, 150],
				// 		[200, 290],
				// 		[300, 250]
				// 	],
				// 	toGo:87,
				// 	ooh:88
				// },	

				// chart2Date:{
				// 	legendDate:['2018', '实际'],
				// 	yDate:['HTA', 'YID'],
				// 	value:[
				// 		[160, 150],
				// 		[200, 290]
				// 	],
				// 	toGo:85,
				// 	ooh:86
				// },
								//头部两个柱状图
								// var chart1Date={
								// 	Funnel:0,
								// 	toGo:0,
								// 	value:[[],[],[]]
								// }
								// var chart2Date={
								// 	ooh:0,
								// 	toGo:0,
								// 	value:[[],[]]
								// }
								// var OITYTDActual=0;
								// var OITYTarget=0;
								// var OITYTDLast=0;
								// var SalesYTDActual=0;
								// var SalesYTarget=0;
								// var SalesYTDLast=0;
								// var SalesHTAActual=0;
								// var SalesHTALast=0;

								vue.handleTableDate(data);
								vue.handleTopDate(data);
							
								// data.data.CurrentList.forEach((item,index)=>{
								// 	OITYTDActual+=item.OITYTDActual;
								// 	OITYTarget+=item.OITYTarget;
								// 	chart1Date.Funnel+=item.Funnel;
								// 	SalesYTDActual+=item.SalesYTDActual;
								// 	SalesYTarget+=item.SalesYTDActual;
								// 	chart2Date.ooh+=item.OOH;
								// 	SalesHTAActual+=item.SalesHTAActual

							
								// });
								// data.data.LastList.forEach((item,index)=>{
								// 	var i=(item.M1+item.M2+item.M3+item.M4+item.M5+item.M6+item.M7+item.M8+item.M9+item.M10+item.M11+item.M12)/1000;
								// 	OITYTDLast+=i;
								// });
								// data.data.LastDistrictList.forEach((item,index)=>{
								// 	SalesYTDLast+=item.SalesYTDActual;
								// 	SalesHTALast+=item.SalesHTAActual;
								// });
								// chart1Date.toGo=OITYTDActual-OITYTDActual;
								// chart1Date.value[0].push(OITYTDLast)
								// chart1Date.value[1].push(OITYTDActual)
								// chart1Date.value[2].push(OITYTarget)
								// vue.chart1Date=Object.assign(vue.chart1Date,chart1Date);
								// chart2Date.toGo=SalesYTarget-SalesYTDActual;
								
								// chart2Date.value[0].push(SalesHTALast)
								// chart2Date.value[0].push(SalesYTDLast)
								// chart2Date.value[1].push(SalesHTAActual)
								// chart2Date.value[1].push(SalesYTDActual)
								// vue.chart2Date=Object.assign(vue.chart2Date,chart2Date);
								// vue.loadTopChart();

								
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
				handleTopDate(data){
					data=JSON.parse(JSON.stringify(data));
					//头部两个柱状图
					var chart1Date={
						Funnel:0,
						toGo:0,
						value:[[],[],[]]
					}
					var chart2Date={
						ooh:0,
						toGo:0,
						value:[[],[]]
					}
					var OITYTDActual=0;
					var OITYTarget=0;
					var OITYTDLast=0;
					var SalesYTDActual=0;
					var SalesYTarget=0;
					var SalesYTDLast=0;
					var SalesHTAActual=0;
					var SalesHTALast=0;
					data.data.CurrentList.forEach((item,index)=>{
						OITYTDActual+=item.OITYTDActual;
						OITYTarget+=item.OITYTarget;
						chart1Date.Funnel+=item.Funnel;
						SalesYTDActual+=item.SalesYTDActual;
						SalesYTarget+=item.SalesYTDActual;
						chart2Date.ooh+=item.OOH;
						SalesHTAActual+=item.SalesHTAActual

				
					});
					data.data.LastList.forEach((item,index)=>{
						var i=(item.M1+item.M2+item.M3+item.M4+item.M5+item.M6+item.M7+item.M8+item.M9+item.M10+item.M11+item.M12)/1000;
						OITYTDLast+=i;
					});
					data.data.LastDistrictList.forEach((item,index)=>{
						SalesYTDLast+=item.SalesYTDActual;
						SalesHTALast+=item.SalesHTAActual;
					});
					chart1Date.toGo=OITYTDActual-OITYTDActual;
					chart1Date.value[0].push(OITYTDLast.toFixed(2))
					chart1Date.value[1].push(OITYTDActual.toFixed(2))
					chart1Date.value[2].push(OITYTarget.toFixed(2))
					vue.chart1Date=Object.assign(vue.chart1Date,chart1Date);
					chart2Date.toGo=SalesYTarget-SalesYTDActual;
					
					chart2Date.value[0].push(SalesHTALast.toFixed(2))
					chart2Date.value[0].push(SalesYTDLast.toFixed(2))
					chart2Date.value[1].push(SalesHTAActual.toFixed(2))
					chart2Date.value[1].push(SalesYTDActual.toFixed(2))
					vue.chart2Date=Object.assign(vue.chart2Date,chart2Date);
					vue.loadTopChart();
				},
				handleTableDate(data){
					data=JSON.parse(JSON.stringify(data));
					// var tableDate=[];
					var tables = _(data.data.CurrentList).groupBy(item => item.Region).map((items, Region) => {
						return {
							Zone: Region,
							list: items
						}
					}).value()
					_.forEach(tables, function (item, index) {
						item.OIT =_.sumBy(item.list, function (item1) { return item1.OITActual}).toFixed(2);
						item.rate =_.sumBy(item.list, function (item1) { return item1.Transrate}).toFixed(2);
						item.Sales =_.sumBy(item.list, function (item1) { return item1.SalesActual}).toFixed(2);
						item.OITYTDActual =_.sumBy(item.list, function (item1) { return item1.OITYTDActual});
						item.OITYTarget =_.sumBy(item.list, function (item1) { return item1.OITYTarget});
					})
				
					var tableDateLast = _(data.data.CurrentOITLast).groupBy(item => item.Region).map((items, Region) => {
						return {
							Zone: Region,
							list: items
						}
					}).value()
					_.forEach(tableDateLast, function (item, index) {
						item.LastRise =_.sumBy(item.list, function (item1) { return (item1.M1+item1.M2+item1.M3+item1.M4+item1.M5+item1.M6+item1.M7+item1.M8+item1.M9+item1.M10+item1.M11+item1.M12)/1000});
					})
					
					console.log(tableDateLast,'tableDateLast')
					var totalOIT =_.sumBy(tables, function (item1) { return Number(item1.OIT)});
					// let totalOIT = tableDate.reduce((sum, e) => sum + e.OIT, 0);
					let sortData=tables.sort(vue.creatCompare("OIT"));
					
					_.forEach(tables, function (item, index) {
						item.weight=(Number(item.OIT)/Number(totalOIT)*100).toFixed(2)+'%';
						item.target=(item.OITYTDActual/item.OITYTarget).toFixed(2);
						var rank=sortData.findIndex((i,v)=>{
							return i==item;
						})
						item.rank =rank+1;
						item.a=0;
						item.b=0;
						_.forEach(tableDateLast, function (a,b) {
							if(item.Zone==a.Zone){
								item.rise=(item.OITYTDActual/a.LastRise-1).toFixed(2);
								if(item.rise>0){
									item.a++
								}else if(item.rise<0){
									item.b++
								}
							}
						})
						// vue.tableDate.push(item)
					})
					
					this.tableDate=tables;
				},
				loadFCSTData(){
					var year=sessionStorage.getItem("selectYear")
					const loading = this.$loading({
				        lock: true,
				        text: ''
				    });
					$.ajax({
				        url: 'handler/information.ashx?_op=QueryFCSTAccuracy',
				        data: { year:year, month: sessionStorage.getItem("selectMonth") },
				        type: 'POST',
				        dataType: "json",
				        success: function (data) {
				            loading.close()
				            if (data.success) {
								var chart3Data={
									xDate:[],
									value:[0,0,0,0,0,0,0,0,0,0,0,0]
								}
								year=year-1
								for(var i=0;i<12;i++){
									var month=i+1
									chart3Data.xDate.push(year+"-"+month)
								}
								data.data.forEach(function(item,index){
									chart3Data.value[0]+=item.Accuracy1;
									chart3Data.value[1]+=item.Accuracy2;
									chart3Data.value[2]+=item.Accuracy3;
									chart3Data.value[3]+=item.Accuracy4;
									chart3Data.value[4]+=item.Accuracy5;
									chart3Data.value[5]+=item.Accuracy6;
									chart3Data.value[6]+=item.Accuracy7;
									chart3Data.value[7]+=item.Accuracy8;
									chart3Data.value[8]+=item.Accuracy9;
									chart3Data.value[9]+=item.Accuracy10;
									chart3Data.value[10]+=item.Accuracy11;
									chart3Data.value[11]+=item.Accuracy12;
								})
								chart3Data.value.forEach(function(item,index){
									chart3Data.value[index]=(chart3Data.value[index]*100/data.data.length).toFixed(2)
								})
								vue.chart3Date=chart3Data
								vue.loadChart3();
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
				loadTop5Date(){
					var year=sessionStorage.getItem("selectYear")
					const loading = this.$loading({
				        lock: true,
				        text: ''
				    });
					$.ajax({
				        url: 'handler/information.ashx?_op=QueryHomeArea',
				        data: { year:year, month: sessionStorage.getItem("selectMonth") },
				        type: 'POST',
				        dataType: "json",
				        success: function (data) {
				            loading.close()
				            if (data.success) {
					// 			topTableData1: [{
					// 	names:['安徽','上海','11','22','33'],
					// 	安徽:'20',
					// 	上海:'30',
					// 	11:'20',
					// 	22:'30',
					// 	33:'20'
					// }]

								data.data.ComplList.forEach(function(i,v){
									vue.topCompData[0].names.push(i.District);
									vue.topCompData[0][i.District]=i.Compl.toFixed(2)
								})
								data.data.FunnelList.forEach(function(i,v){
									vue.topFunnelData[0].names.push(i.District);
									vue.topFunnelData[0][i.District]=i.Funnel.toFixed(2)
								})
								// OITList
								var lastData = _(data.data.OITList).groupBy(item => item.AreaName).map((items, AreaName) => {
				                    return {
				                        AreaName: AreaName,
				                        list: items
				                    }
								}).value()
								
								_.forEach(lastData, function (item, index) {
				                    item.totalArea = _.sumBy(item.list, function (item1) { return ((item1.M1+item1.M2+item1.M3+item1.M4+item1.M5+item1.M6+item1.M7+item1.M8+item1.M9+item1.M10+item1.M11+item1.M12)/1000)});//区域总数
                                   
								})
								// 今年数据DistrictList
								var thisData = _(data.data.DistrictList).groupBy(item => item.District).map((items, District) => {
				                    return {
				                        AreaName: District,
				                        list: items
				                    }
								}).value();
								_.forEach(thisData, function (item, index) {
				                    item.totalArea = _.sumBy(item.list, function (item1) { return item1.OITYTDActual});//小地区总数
								})
								lastData.forEach(item=>{
									thisData.forEach(i=>{
										if(item.AreaName==i.AreaName){
											item.rise=Number(i.totalArea/item.totalArea-1).toFixed(2);
										}
									})
								})
								var riseData = _.filter(lastData, function(o) { return o.rise; })
								riseData = _.sortBy(riseData, function (item) {
									return item.rise;
								});
								riseData.forEach(function(i,v){
									vue.topRiseData[0].names.push(i.AreaName);
									vue.topRiseData[0][i.AreaName]=i.rise;
								})

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
				loadScatterData(){
					const loading = this.$loading({
				        lock: true,
				        text: ''
				    });
					$.ajax({
				        url: 'handler/information.ashx?_op=QueryByProduct',
				        data: { year: sessionStorage.getItem("selectYear"), month: sessionStorage.getItem("selectMonth")},
				        type: 'POST',
				        dataType: "json",
				        success: function (data) {
				            loading.close()
				            if (data.success) {
								var scatterOitValueData={
									legendDate:[],
									value:[]
								}
								var scatterOitUnitData={
									legendDate:[],
									value:[]
								}
								var scatterSalesValueData={
									legendDate:[],
									value:[]
								}
								var scatterSalesUnitData={
									legendDate:[],
									value:[]
								}
								var datas = _(data.data).groupBy(item => item.ProductName).map((items, ProductName) => {
				                    return {
				                        ProductName: ProductName,
				                        list: items
				                    }
								}).value()
								_.forEach(datas, function (item, index) {
				                    scatterOitValueData.legendDate.push(item.ProductName);
									scatterOitUnitData.legendDate.push(item.ProductName);
									scatterSalesValueData.legendDate.push(item.ProductName);
									scatterSalesUnitData.legendDate.push(item.ProductName);
									var OITValueYTDActual = _.sumBy(item.list, function (item1) { return item1.OITValueYTDActual});
									var OITValueTarget = _.sumBy(item.list, function (item1) { return item1.OITValueTarget});
									var OITValueYTD = _.sumBy(item.list, function (item1) { return item1.OITValueYTD});
									scatterOitValueData.value[index]=[[]]
									scatterOitValueData.value[index][0].push(Number((OITValueYTDActual/OITValueTarget*100).toFixed(2)))
									scatterOitValueData.value[index][0].push(Number(((OITValueYTDActual/OITValueYTD-1)*100).toFixed(2)))
									var OITUnitYTDActual = _.sumBy(item.list, function (item1) { return item1.OITUnitYTDActual});
									var OITUnitTarget = _.sumBy(item.list, function (item1) { return item1.OITUnitTarget});
									var OITUnitYTD = _.sumBy(item.list, function (item1) { return item1.OITUnitYTD});
									scatterOitUnitData.value[index]=[[]]
									scatterOitUnitData.value[index][0].push(Number((OITUnitYTDActual/OITUnitTarget*100).toFixed(2)))
									scatterOitUnitData.value[index][0].push(Number(((OITUnitYTDActual/OITUnitYTD-1)*100).toFixed(2)))
									var SalesValueYTDActual = _.sumBy(item.list, function (item1) { return item1.SalesValueYTDActual});
									var SalesValueTarget = _.sumBy(item.list, function (item1) { return item1.SalesValueTarget});
									var SalesValueYTD = _.sumBy(item.list, function (item1) { return item1.SalesValueYTD});
									scatterSalesValueData.value[index]=[[]]
									scatterSalesValueData.value[index][0].push(Number((SalesValueYTDActual/SalesValueTarget*100).toFixed(2)))
									scatterSalesValueData.value[index][0].push(Number(((SalesValueYTDActual/SalesValueYTD-1)*100).toFixed(2)))
									var SalesUnitYTDActual = _.sumBy(item.list, function (item1) { return item1.SalesUnitYTDActual});
									var SalesUnitTarget = _.sumBy(item.list, function (item1) { return item1.SalesUnitTarget});
									var SalesUnitYTD = _.sumBy(item.list, function (item1) { return item1.SalesUnitYTD});
									scatterSalesUnitData.value[index]=[[]]
									scatterSalesUnitData.value[index][0].push(Number((SalesUnitYTDActual/SalesUnitTarget*100).toFixed(2)))
									scatterSalesUnitData.value[index][0].push(Number(((SalesUnitYTDActual/SalesUnitYTD-1)*100).toFixed(2)))
								})
								vue.scatterOitValueData=scatterOitValueData;
								vue.scatterOitUnitData=scatterOitUnitData;
								vue.scatterSalesValueData=scatterSalesValueData;
								vue.scatterSalesUnitData=scatterSalesUnitData;
								vue.loadScatterChart();
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
				//请求最下面柱状图数据
				loadBottomData(){
					const loading = this.$loading({
				        lock: true,
				        text: ''
				    });
					$.ajax({
				        url: 'handler/information.ashx?_op=ByDistrictClinicalQuery',
				        data: { year: sessionStorage.getItem("selectYear"), month: sessionStorage.getItem("selectMonth") },
				        type: 'POST',
				        dataType: "json",
				        success: function (data) {
				            loading.close()
				            if (data.success) {
								var cvData = {
									xData:[],
									value:[[],[]]
								};
								var giData = {
									xData:[],
									value:[[],[]]
								};
								var whcData = {
									xData:[],
									value:[[],[]]
								};
								var pocData = {
									xData:[],
									value:[[],[]]
								};
								var Data = _(data.data.ClinicalList).groupBy(item => item.Region).map((items, Region) => {
				                    return {
				                        Region: Region,
				                        list: items
				                    }
								}).value()
								_.forEach(Data, function (item, index) {
									cvData.xData.push(item.Region)
									giData.xData.push(item.Region)
									whcData.xData.push(item.Region)
									pocData.xData.push(item.Region)
									item.CVOITYTDActual =Number(_.sumBy(item.list, function (item1) { return item1.CVOITYTDActual}));
									item.CVOITTarget = Number(_.sumBy(item.list, function (item1) { return item1.CVOITTarget}));
									if(item.CVOITYTDActual && item.CVOITTarget){
										cvData.value[0].push((item.CVOITYTDActual/item.CVOITTarget*100).toFixed(2))
									}else{
										cvData.value[0].push(0)
									}
									item.CVSalesYTDActual =Number(_.sumBy(item.list, function (item1) { return item1.CVSalesYTDActual})) ;
									item.CVSalesTarget = Number(_.sumBy(item.list, function (item1) { return item1.CVSalesTarget}));
									if(item.CVSalesYTDActual && item.CVSalesTarget){
										cvData.value[1].push((Number(item.CVSalesYTDActual)/Number(item.CVSalesTarget)*100).toFixed(2))
									}else{
										cvData.value[1].push(0)
									}
									item.GIOITYTDActual = Number(_.sumBy(item.list, function (item1) { return item1.GIOITYTDActual}));
									item.GIOITTarget =Number(_.sumBy(item.list, function (item1) { return item1.GIOITTarget})) ;
									if(item.GIOITYTDActual && item.GIOITTarget){
										giData.value[0].push((Number(item.GIOITYTDActual)/Number(item.GIOITTarget)*100).toFixed(2))
									}else{
										giData.value[0].push(0)
									}
									item.GISalesYTDActual = Number(_.sumBy(item.list, function (item1) { return item1.GISalesYTDActual}));
									item.GISalesTarget = Number(_.sumBy(item.list, function (item1) { return item1.GISalesTarget}));
									if(item.GISalesYTDActual && item.GISalesTarget){
										giData.value[1].push((Number(item.GISalesYTDActual)/Number(item.GISalesTarget)*100).toFixed(2))
									}else{
										giData.value[1].push(0)
									}
									item.WHCOITYTDActual =Number(_.sumBy(item.list, function (item1) { return item1.WHCOITYTDActual})) ;
									item.WHCOITTarget =Number(_.sumBy(item.list, function (item1) { return item1.WHCOITTarget})) ;
									if(item.WHCOITYTDActual && item.WHCOITTarget){
										whcData.value[0].push((Number(item.WHCOITYTDActual)/Number(item.WHCOITTarget)*100).toFixed(2))
									}else{
										whcData.value[0].push(0)
									}
									item.WHCSalesYTDActual =Number( _.sumBy(item.list, function (item1) { return item1.WHCSalesYTDActual}));
									item.WHCSalesTarget = Number(_.sumBy(item.list, function (item1) { return item1.WHCSalesTarget}));
									if(item.WHCSalesYTDActual && item.WHCSalesTarget){
										whcData.value[1].push((Number(item.WHCSalesYTDActual)/Number(item.WHCSalesTarget)*100).toFixed(2))
									}else{
										whcData.value[1].push(0)
									}
									item.POCOITYTDActual =Number(_.sumBy(item.list, function (item1) { return item1.POCOITYTDActual})) ;
									item.POCOITTarget =Number(_.sumBy(item.list, function (item1) { return item1.POCOITTarget})) ;
									if(item.POCOITYTDActual && item.POCOITTarget){
										pocData.value[0].push((Number(item.POCOITYTDActual)/Number(item.POCOITTarget)*100).toFixed(2))
									}else{
										pocData.value[0].push(0)
									}
									item.POCSalesYTDActual =Number(_.sumBy(item.list, function (item1) { return item1.POCSalesYTDActual})) ;
									item.POCSalesTarget =Number( _.sumBy(item.list, function (item1) { return item1.POCSalesTarget}));
									if(item.POCSalesYTDActual && item.POCSalesTarget){
										pocData.value[1].push((Number(item.POCSalesYTDActual)/Number(item.POCSalesTarget)*100).toFixed(2))
									}else{
										pocData.value[1].push(0)
									}
								})
								vue.CVBottomData=Object.assign(vue.CVBottomData,cvData);
								vue.GIBottomData=Object.assign(vue.GIBottomData,giData);
								vue.WHCBottomData=Object.assign(vue.WHCBottomData,whcData);
								vue.POCBottomData=Object.assign(vue.POCBottomData,pocData);
								// ['OIT', 'Sales']
				// 				chart1Date:{
				// 	legendDate:['去年', '实际', '今年'],
				// 	yDate:['YTD','Q2'],
				// 	value:[
				// 		[160, 150],
				// 		[200, 290],
				// 		[300, 250]
				// 	]
				// },
								vue.loadBottomChart();
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
				loadTopChart(){
					chart1 = echarts.init(document.getElementById('chart1'),'light');
					chart2 = echarts.init(document.getElementById('chart2'),'light');
					this.loadChart1(this.chart1Date,chart1,'OIT指标对比')
					this.loadChart1(this.chart2Date,chart2,'Sales指标对比')
				},
				loadChart1(data,chartDom,text) {
					var seriesDate=[]
					data.legendDate.forEach((i,index)=>{
						seriesDate[index]={
								name: i,
								type: 'bar',
								barGap: 0,
								data: data.value[index]
							}
					})
					// 指定图表的配置项和数据
					var option1 = {
						title: {  //图表标题
							text: text,  
							left: 'center',   //标题水平位置
							textStyle:{
								fontSize:14
							}
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow'
							}
						},
						grid: {
							left: '3%',
							bottom: '10%',
							containLabel: true
						},
						legend: {
							type: 'scroll',  //标签滚动
							textStyle: {
								color: 'black'
							},
							zlevel: 3000,
							right: '0',
							top: '30',
							// bottom: '10',
							data: data.legendDate
						},
						xAxis: {
							type: 'value',
							axisTick: {
								show: false //去除横轴上的刻度
							}
						},
						yAxis: {
							type: 'category',
							data: data.yDate,
							axisTick: {
								alignWithLabel: true
							}
						},
						color:  ['#74B0DE', '#2B7DBC', '#C1E4FF'],
						series:seriesDate
					};
					// 使用刚指定的配置项和数据显示图表。
					chartDom.setOption(option1);
				},
				loadChart3() {
					chart3 = echarts.init(document.getElementById('chart3'), 'light');
					var option3 = {
						title: {  //图表标题
							text: 'FCST准确率分析（过去12个月的FCST预测准确率）',   //文字标题
							x: 'center',     //标题水平位置
							y: 'bottom',
							textVerticalAlign: 'bottom',  //标题垂直位置
							// left: 'center',   //标题水平位置，主副标题都居中时效果等同x: 'center' 
							top: 'bottom',   //标题垂直位置
							textStyle:{
								fontSize:14
							}
						},
						// legend: {   //图例
						// 	left: 'center',//图例位置
						// },
						tooltip: {},
						yAxis: {
							axisLabel: {
									formatter: '{value} %'
								},
							// name: '销量(/件)',   //单位
						},
						color:  ['#3888fa', '#d14a61', '#675bba'],  //简写线的颜色
						xAxis: {
							data: this.chart3Date.xDate,
							axisTick: {   //x轴文字和刻度线在一起
								alignWithLabel: true
							},
							axisLine: {  //x轴和x轴上面的label的颜色
								onZero: false,
								lineStyle: {
									color: '#3888fa'
								}
							}
						},
						// [{
						// 	data: this.chart3Date.xDate[0],
						// 	axisTick: {   //x轴文字和刻度线在一起
						// 		alignWithLabel: true
						// 	},
						// 	axisLine: {  //x轴和x轴上面的label的颜色
						// 		onZero: false,
						// 		lineStyle: {
						// 			color: '#d14a61'
						// 		}
						// 	},
						// }, {
						// 	data: this.chart3Date.xDate[1],
						// 	axisLine: {   //x轴和x轴上面的label的颜色
						// 		onZero: false,
						// 		lineStyle: {
						// 			color: '#3888fa'
						// 		}
						// 	}
						// }],
						series: [
						{
							// name: '2015降雨量',
							symbol: 'circle',
							type: 'line',   //图表类型 line折线
							data:  this.chart3Date.value,
							smooth: true,  //折线变成平滑曲线
							animationDuration: 1800,   //动画时长
							animationEasing: "cubicInOut",   //动画效果
							itemStyle: {
								normal: {
									// color: "#3888fa",  //曲线上转折小圆点的颜色
									lineStyle: {   //曲线颜色宽度
										// color: "#3888fa",
										width: 2
									}
								}
							}
						}
						]
						// [{
						// 	name: '2015降雨量',
						// 	symbol: 'circle',
						// 	type: 'line',   //图表类型 line折线
						// 	data:  this.chart3Date.value[0],
						// 	smooth: true,  //折线变成平滑曲线
						// 	animationDuration: 1800,   //动画时长
						// 	animationEasing: "cubicInOut",   //动画效果
						// 	itemStyle: {
						// 		normal: {
						// 			// color: "#3888fa",  //曲线上转折小圆点的颜色
						// 			lineStyle: {   //曲线颜色宽度
						// 				// color: "#3888fa",
						// 				width: 2
						// 			}
						// 		}
						// 	}
						// },
						// {
						// 	name: '2016降雨量',
						// 	type: 'line',   //图表类型 line折线
						// 	symbol: 'circle',
						// 	xAxisIndex: 1,  //上面的x轴
						// 	data: this.chart3Date.value[1],
						// 	smooth: true,  //折线变成平滑曲线
						// 	animationDuration: 1800,   //动画时长
						// 	animationEasing: "cubicInOut",   //动画效果
						// 	itemStyle: {
						// 		normal: {
						// 			// color: "#d14a61",  //曲线上转折小圆点的颜色
						// 			lineStyle: {   //曲线颜色宽度
						// 				// color: "#d14a61",
						// 				width: 2
						// 			}
						// 		}
						// 	},
						// }]
					};
					chart3.setOption(option3);
				},
				loadMapChart(){
					chart4 = echarts.init(document.getElementById('chart4'),'light');
					chart5 = echarts.init(document.getElementById('chart5'));
					chart6 = echarts.init(document.getElementById('chart6'));
					this.loadChart4(this.CoverageMapData,chart4,'区域覆盖率(%)')
					this.loadChart4(this.PenetrationMapData,chart5,'区域渗透率(%)')
					this.loadChart4(this.WinRateMapData,chart6,'区域赢单率(%)')
				},
				loadChart4(data,chartDom,text){
					data.forEach((i)=>{
						i.itemStyle={}
						if(i.value[2]>=90){
							i.itemStyle.color='#7481A2'
						}else if(i.value[2]>=50){
							i.itemStyle.color='#43B2E2'
						}else if(i.value[2]>0){
							i.itemStyle.color='#AFD3F9'
						}
					})
					
					var option4 = {
						title: {  //图表标题
							text: text,   //文字标题
							x: 'center',     //标题水平位置
							// y: 'bottom',
							// textVerticalAlign: 'bottom',  //标题垂直位置
							// left: 'center',   //标题水平位置，主副标题都居中时效果等同x: 'center' 
							bottom: '40',   //标题垂直位置
							textStyle:{
								fontSize:14
							}
						},
						geo: {
							map: 'china',
							itemStyle: {					// 定义样式
								normal: {					// 普通状态下的样式
									areaColor: '#EEEEEE',
									borderColor: '#ccc'
								},
								// emphasis: {					// 高亮状态下的样式
								// 	areaColor: '#ccc',
								// 	color:'#fff'
								// }
							}
						},
						tooltip : {
							trigger: 'item',
							// formatter: '{b}<br/>{c} (%)'
							formatter: function(data){
                                return data.name+"："+data.value[2];
                            }
						},
						series: [
							{
								name: '销量', // series名称
								type: 'scatter', // series图表类型
								coordinateSystem: 'geo', // series坐标系类型
								data: data,
							}
						]
								// series: [{
								// 	type: 'map',
								// 	mapType: 'china',
								// 	label: {
								// 		// normal: {
								// 		// 	show: true,//显示省份标签
								// 		// 	textStyle:{color:"#c71585"}//省份标签字体颜色
								// 		// },    
								// 		emphasis: {//对应的鼠标悬浮效果
								// 			show: true,
								// 			textStyle:{color:"green"}
								// 		} 
								// 	},
								// 	itemStyle: {
								// 		normal: {
								// 			borderWidth: .5,//区域边框宽度
								// 			borderColor: '#DDDDDD',//区域边框颜色
								// 			areaColor:"#EEEEEE",//区域颜色
								// 		},
								// 		emphasis: {
								// 			borderWidth: .5,
								// 			borderColor: 'red',
								// 			areaColor:"pink",
								// 		}
								// 	},
								// 	data:[
								// 		{name:'新疆', selected:true}//福建为选中状态
								// 	]
								// }],
							};
							
							chartDom.setOption(option4);
							// chart4.on('mouseover', function (params) {
							// 	var dataIndex = params.dataIndex;
							// 	console.log(params);
							// });
				},
				loadScatterChart(){
					chart7 = echarts.init(document.getElementById('chart7'),'light');
					chart8 = echarts.init(document.getElementById('chart8'),'light');
					chart9 = echarts.init(document.getElementById('chart9'),'light');
					chart10 = echarts.init(document.getElementById('chart10'),'light');
					
					this.loadChart5(this.scatterOitValueData,chart7,'OIT Value & Unit 完成率与同比增长率气泡图')
					this.loadChart5(this.scatterOitUnitData,chart8,'')
					this.loadChart5(this.scatterSalesValueData,chart9,'Sales Value & Unit 完成率与同比增长率气泡图')
					this.loadChart5(this.scatterSalesUnitData,chart10,'')
					// this.loadChart5(this.mapData,chart4,'区域覆盖率')
					// this.loadChart4(this.mapData,chart5,'区域渗透率')
					// this.loadChart4(this.mapData,chart6,'区域赢单率')
				},
				loadChart5(data,chartDom,text){
					// vue.scatterOitValueData=scatterOitValueData;
					// 			vue.scatterOitUnitData=scatterOitUnitData;
					// 			vue.scatterSalesValueData=scatterSalesValueData;
					// 			vue.scatterSalesUnitData=scatterSalesUnitData;
					// var scatterSalesUnitData={
					// 				legendDate:[],
					// 				value:[]
					// 			}

					// {
					// 			name: '女性',
					// 			type: 'scatter',
					// 			data: data[0],
					// 			markArea: {
					// 				silent: true,
					// 				itemStyle: {
					// 					color: 'transparent',
					// 					borderWidth: 1,
					// 					borderType: 'dashed'
					// 				},
					// 				data: [[{
					// 					name: '女性分布区间',
					// 					xAxis: 'min',
					// 					yAxis: 'min'
					// 				}, {
					// 					xAxis: 'max',
					// 					yAxis: 'max'
					// 				}]]
					// 			},
					// 			markPoint: {
					// 				data: [
					// 					{type: 'max', name: '最大值'},
					// 					{type: 'min', name: '最小值'}
					// 				]
					// 			},
					// 			markLine: {
					// 				lineStyle: {
					// 					type: 'solid'
					// 				},
					// 				data: [
					// 					{type: 'average', name: '平均值'},
					// 					{ xAxis: 160 }
					// 				]
					// 			}
					// 		},
					var seriesDate=[]
					data.legendDate.forEach((i,index)=>{
						seriesDate[index]={
								name: i,
								type: 'scatter',
								symbolSize:40,
								data: data.value[index]
							}
					})
					option5 = {
						title: {
							text: text,
							x: 'center',
							textStyle:{
								fontSize:14
							}
						},
						grid: {
							left: '3%',
							right: '15%',
							bottom: '3%',
							containLabel: true
						},
						tooltip: {
							// trigger: 'axis',
							showDelay: 0,
							formatter: function (params) {
								console.log(params,'params')
								
								if (params.value.length > 1) {
									return params.seriesName + ' :<br/>'
									+ ' 完成率：'+ params.value[0] + '%<br/>'
									+ ' 增长率：'+ params.value[1] + '% ';
								}
								else {
									return params.seriesName + ' :<br/>'
									+ params.name + ' : '
									+ params.value + '% ';
								}
							},
							axisPointer: {
								show: true,
								type: 'cross',
								lineStyle: {
									type: 'dashed',
									width: 1
								}
							}
						},
						// legend: {
						// 	data: ['女性', '男性'],
						// 	left: 'center'
						// },
						xAxis: [
							{
								type: 'value',
								name: '完成率',
								scale: true,
								axisLabel: {
									formatter: '{value} %'
								},
								splitLine: {
									show: false
								}
							}
						],
						yAxis: [
							{
								type: 'value',
								name: '增长率',
								scale: true,
								axisLabel: {
									formatter: '{value} %'
								},
								splitLine: {
									show: false
								}
							}
						],
						series: seriesDate
						// [
						// 	{
						// 		name: '女性',
						// 		type: 'scatter',
						// 		data: data[0],
						// 		markArea: {
						// 			silent: true,
						// 			itemStyle: {
						// 				color: 'transparent',
						// 				borderWidth: 1,
						// 				borderType: 'dashed'
						// 			},
						// 			data: [[{
						// 				name: '女性分布区间',
						// 				xAxis: 'min',
						// 				yAxis: 'min'
						// 			}, {
						// 				xAxis: 'max',
						// 				yAxis: 'max'
						// 			}]]
						// 		},
						// 		markPoint: {
						// 			data: [
						// 				{type: 'max', name: '最大值'},
						// 				{type: 'min', name: '最小值'}
						// 			]
						// 		},
						// 		markLine: {
						// 			lineStyle: {
						// 				type: 'solid'
						// 			},
						// 			data: [
						// 				{type: 'average', name: '平均值'},
						// 				{ xAxis: 160 }
						// 			]
						// 		}
						// 	},
						// 	{
						// 		name: '男性',
						// 		type: 'scatter',
						// 		data: data[1],
						// 		markArea: {
						// 			silent: true,
						// 			itemStyle: {
						// 				color: 'transparent',
						// 				borderWidth: 1,
						// 				borderType: 'dashed'
						// 			},
						// 			data: [[{
						// 				name: '男性分布区间',
						// 				xAxis: 'min',
						// 				yAxis: 'min'
						// 			}, {
						// 				xAxis: 'max',
						// 				yAxis: 'max'
						// 			}]]
						// 		},
						// 		markPoint: {
						// 			data: [
						// 				{type: 'max', name: '最大值'},
						// 				{type: 'min', name: '最小值'}
						// 			]
						// 		},
						// 		markLine: {
						// 			lineStyle: {
						// 				type: 'solid'
						// 			},
						// 			data: [
						// 				{type: 'average', name: '平均值'},
						// 				{ xAxis: 170 }
						// 			]
						// 		}
						// 	}
						// ]
					};
					chartDom.setOption(option5);
				},
				loadBottomChart(){
					chart11 = echarts.init(document.getElementById('chart11'),'light');
					chart12 = echarts.init(document.getElementById('chart12'),'light');
					chart13 = echarts.init(document.getElementById('chart13'),'light');
					chart14 = echarts.init(document.getElementById('chart14'),'light');
					this.loadChart6(this.CVBottomData,chart11,'By 区域 CV OIT& Sales目标完成率')
					this.loadChart6(this.GIBottomData,chart12,'By 区域 GI OIT& Sales目标完成率')
					this.loadChart6(this.WHCBottomData,chart13,'By 区域 WHC OIT& Sales目标完成率')
					this.loadChart6(this.POCBottomData,chart14,'By 区域 POC OIT& Sales目标完成率')
				},
				loadChart6(data,chartDom,text) {
					var seriesDate=[]
					data.legendDate.forEach((i,index)=>{
						seriesDate[index]={
								name: i,
								type: 'bar',
								barGap: 0,
								data: data.value[index]
							}
					})
					// {
					// 			name: 'OIT',
					// 			type: 'bar',
					// 			barGap: 0,
					// 			data: [50 , 55 , 66 ,11,80,30,88],
					// 			color:'#2B7DBC'
					// 		}
					// 指定图表的配置项和数据
					var option6 = {
						title: {  //图表标题
							text: text,  
							left: 'center',   //标题水平位置
							textStyle:{
								fontSize:14
							}
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '7%',
							bottom: '3%',
							containLabel: true
						},
						legend: {
							type: 'scroll',  //标签滚动
							zlevel: 3000,
							right: '0',
							top: '30',
							// bottom: '10',
							data:data.legendDate
							// data: ['OIT', 'Sales']
						},
						xAxis: {
							type: 'category',
							data:data.xData,
							// data: ['区域1', '区域2','区域3', '区域4','区域5', '区域6','区域7'],
							axisTick: {
								show: false //去除横轴上的刻度
							},
							// axisLabel: {
							// 	interval:0,
							// }
							axisLabel: {
		                    interval: 0,
		                    rotate: 45,
		                    //倾斜度 -90 至 90 默认为0  
		                    margin: 5,
		//                     textStyle: {
		//                         fontWeight: "bolder",
		//                         color: "#000000"
		//                     }
		                },
						},
						yAxis: {
							type: 'value',
							axisTick: {
								show: false //去除横轴上的刻度
							},
							splitLine:{
									show:false
								},
								axisLabel: {
									formatter: '{value}%'  //y轴加单位
								}
						},
						color:  ['#2B7DBC', '#C1E4FF'],
						series: seriesDate
						// [
						// 	{
						// 		name: 'OIT',
						// 		type: 'bar',
						// 		barGap: 0,
						// 		data: [50 , 55 , 66 ,11,80,30,88],
						// 		color:'#2B7DBC'
						// 	},
						// 	{
						// 		name: 'Sales',
						// 		type: 'bar',
						// 		data: [10,30,50,66,70,88,90,20],
						// 		color:"#C1E4FF"
						// 	}
						// ]
					};
					// 使用刚指定的配置项和数据显示图表。
					chartDom.setOption(option6);
				}
			}

		})
	</script>

</asp:Content>
