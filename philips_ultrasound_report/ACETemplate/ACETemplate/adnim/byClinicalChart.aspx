<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="byClinicalChart.aspx.cs" Inherits="ACETemplate.adnim.byClinicalChart" MasterPageFile="~/adnim/SiteAdmin.Master"  %>

<%@ Register Src="~/adnim/include/HeadNavigation.ascx" TagPrefix="uc1" TagName="HeadNavigation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<link href="css/element-ui.css" rel="stylesheet" />
	<link href="css/productChart.css" rel="stylesheet" />
	<link href="css/areaChart.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

	<uc1:HeadNavigation runat="server" ID="HeadNavigation" Level2Name="报表管理" Level3Name="by 区域&Clinical" />
	<div class="page-content">
		<div id="app" v-cloak style="margin-top:10px;margin-bottom:10px;padding:0;border:1px solid white">
			<!-- CV -->
			<div class="charOneBox">
				<p class="BigTitle">CV</p>
				<div class="charCon">
					<table class="charOneTable" cellspacing="0" cellpadding="0">
						<!-- 标题 -->
						<tr>
							<td rowspan='3' style="text-align: left;">CV</td>
							<td colspan="9">OIT</td>
							<td colspan="7">Sales</td>
						</tr>
						<!-- 大括号 -->
						<tr>
							<td colspan="9">
								<img class="bracesImg" src="assets/images/braces.png" />
							</td>
							<td colspan="7">
								<img class="bracesImg" src="assets/images/braces.png" />
							</td>
						</tr>
						<tr height='30px'></tr>
						<tr>
							<td></td>
							<td>YTD actual</td>
							<td colspan="3">vs.target%</td>
							<td colspan="3">vs.2018%</td>
							<td>Funnel</td>
							<td>Trans rate</td>
							<!-- <td>Funnel60%</td> -->
							<td>YTD actual</td>
							<td colspan="3">vs.target%</td>
							<td colspan="3">vs.2018%</td>
							<!-- <td>HTA%</td> -->
						</tr>
						<!-- 空行间距 -->
						<tr height="20px"></tr>
						<!-- 刻度线 -->
						<tr height='13px'>
							<td colspan="2"></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
							<td colspan="3"></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
						</tr>
						<!-- 一行数据 -->
						<tr v-for="(item,index) in ClinicalDataList" :key="index">
							<td><div class="typeName">{{item.District}}</div></td>
							<td><div class="numBox">{{item.CVOITYTDActual}}</div></td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.CVOITVsTarget" :max="maxCVOITHtA" :min="minCVOITHtA" />
							</td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.CVOITVsYear" :max="maxCVOITVsYear" :min="minCVOITVsYear" />
							</td>
							<td><div class="numBox">{{item.CVFunnel}}</div></td>
							<td><div class="numBox">{{item.CVOITTransrate}}</div></td>
							<!-- <td><div class="numBox">暂定</div></td> -->
							<td><div class="numBox">{{item.CVSalesYTDActual}}</div></td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.CVSalesVsTarget" :max="maxCVSalesHtA" :min="minCVSalesHtA" />
							</td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.CVSalesVsYear" :max="maxCVSalesVsYear" :min="minCVSalesVsYear" />
							</td>
							<td>
								<!-- ECharts 饼图组件 -->
								<!-- <common-pie :chart-data="chardata[0]" autoresize /> -->
							</td>
						</tr>
					</table>
				</div>
			</div>
			<!-- CV end-->
			<!-- GI -->
			<div class="charOneBox">
				<p class="BigTitle">GI</p>
				<div class="charCon">
					<table class="charOneTable" cellspacing="0" cellpadding="0">
						<!-- 标题 -->
						<tr>
							<td rowspan='3' style="text-align: left;">GI</td>
							<td colspan="9">OIT</td>
							<td colspan="7">Sales</td>
						</tr>
						<!-- 大括号 -->
						<tr>
							<td colspan="9">
								<img class="bracesImg" src="assets/images/braces.png" />
							</td>
							<td colspan="7">
								<img class="bracesImg" src="assets/images/braces.png" />
							</td>
						</tr>
						<tr height='30px'></tr>
						<tr>
							<td></td>
							<td>YTD actual</td>
							<td colspan="3">vs.target%</td>
							<td colspan="3">vs.2018%</td>
							<td>Funnel</td>
							<td>Trans rate</td>
							<!-- <td>Funnel60%</td> -->
							<td>YTD actual</td>
							<td colspan="3">vs.target%</td>
							<td colspan="3">vs.2018%</td>
							<!-- <td>HTA%</td> -->
						</tr>
						<!-- 空行间距 -->
						<tr height="20px"></tr>
						<!-- 刻度线 -->
						<tr height='13px'>
							<td colspan="2"></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
							<td colspan="3"></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
						</tr>
						<!-- 一行数据 -->
						<tr v-for="(item,index) in ClinicalDataList" :key="index">
							<td><div class="typeName">{{item.District}}</div></td>
							<td><div class="numBox">{{item.GIOITYTDActual}}</div></td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.GIOITVsTarget" :max="maxGIOITHtA" :min="minGIOITHtA" />
							</td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.GIOITVsYear" :max="maxGIOITVsYear" :min="minGIOITVsYear" />
							</td>
							<td><div class="numBox">{{item.GIFunnel}}</div></td>
							<td><div class="numBox">{{item.GIOITTransrate}}</div></td>
							<!-- <td><div class="numBox">暂定</div></td> -->
							<td><div class="numBox">{{item.GISalesYTDActual}}</div></td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.GISalesVsTarget" :max="maxGISalesHtA" :min="minGISalesHtA" />
							</td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.GISalesVsYear" :max="maxGISalesVsYear" :min="minGISalesVsYear" />
							</td>
							<td>
								<!-- ECharts 饼图组件 -->
								<!-- <common-pie :chart-data="chardata[0]" autoresize /> -->
							</td>
						</tr>
					</table>
				</div>
			</div>
			<!-- GI end--> 
			<!-- WHC -->
			<div class="charOneBox">
				<p class="BigTitle">WHC</p>
				<div class="charCon">
					<table class="charOneTable" cellspacing="0" cellpadding="0">
						<!-- 标题 -->
						<tr>
							<td rowspan='3' style="text-align: left;">WHC</td>
							<td colspan="9">OIT</td>
							<td colspan="7">Sales</td>
						</tr>
						<!-- 大括号 -->
						<tr>
							<td colspan="9">
								<img class="bracesImg" src="assets/images/braces.png" />
							</td>
							<td colspan="7">
								<img class="bracesImg" src="assets/images/braces.png" />
							</td>
						</tr>
						<tr height='30px'></tr>
						<tr>
							<td></td>
							<td>YTD actual</td>
							<td colspan="3">vs.target%</td>
							<td colspan="3">vs.2018%</td>
							<td>Funnel</td>
							<td>Trans rate</td>
							<!-- <td>Funnel60%</td> -->
							<td>YTD actual</td>
							<td colspan="3">vs.target%</td>
							<td colspan="3">vs.2018%</td>
							<!-- <td>HTA%</td> -->
						</tr>
						<!-- 空行间距 -->
						<tr height="20px"></tr>
						<!-- 刻度线 -->
						<tr height='13px'>
							<td colspan="2"></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
							<td colspan="3"></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
						</tr>
						<!-- 一行数据 -->
						<tr v-for="(item,index) in ClinicalDataList" :key="index">
							<td><div class="typeName">{{item.District}}</div></td>
							<td><div class="numBox">{{item.WHCOITYTDActual}}</div></td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.WHCOITVsTarget" :max="maxWHCOITHtA" :min="minWHCOITHtA" />
							</td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.WHCOITVsYear" :max="maxWHCOITVsYear" :min="minWHCOITVsYear" />
							</td>
							<td><div class="numBox">{{item.WHCFunnel}}</div></td>
							<td><div class="numBox">{{item.WHCOITTransrate}}</div></td>
							<!-- <td><div class="numBox">暂定</div></td> -->
							<td><div class="numBox">{{item.WHCSalesYTDActual}}</div></td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.WHCSalesVsTarget" :max="maxWHCSalesHtA" :min="minWHCSalesHtA" />
							</td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.WHCSalesVsYear" :max="maxWHCSalesVsYear" :min="minWHCSalesVsYear" />
							</td>
							<td>
								<!-- ECharts 饼图组件 -->
								<!-- <common-pie :chart-data="chardata[0]" autoresize /> -->
							</td>
						</tr>
					</table>
				</div>
			</div>
			<!-- WHC end-->
			<!-- POC -->
			<div class="charOneBox">
				<p class="BigTitle">POC</p>
				<div class="charCon">
					<table class="charOneTable" cellspacing="0" cellpadding="0">
						<!-- 标题 -->
						<tr>
							<td rowspan='3' style="text-align: left;">POC</td>
							<td colspan="9">OIT</td>
							<td colspan="7">Sales</td>
						</tr>
						<!-- 大括号 -->
						<tr>
							<td colspan="9">
								<img class="bracesImg" src="assets/images/braces.png" />
							</td>
							<td colspan="7">
								<img class="bracesImg" src="assets/images/braces.png" />
							</td>
						</tr>
						<tr height='30px'></tr>
						<tr>
							<td></td>
							<td>YTD actual</td>
							<td colspan="3">vs.target%</td>
							<td colspan="3">vs.2018%</td>
							<td>Funnel</td>
							<td>Trans rate</td>
							<!-- <td>Funnel60%</td> -->
							<td>YTD actual</td>
							<td colspan="3">vs.target%</td>
							<td colspan="3">vs.2018%</td>
							<!-- <td>HTA%</td> -->
						</tr>
						<!-- 空行间距 -->
						<tr height="20px"></tr>
						<!-- 刻度线 -->
						<tr height='13px'>
							<td colspan="2"></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
							<td colspan="3"></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
						</tr>
						<!-- 一行数据 -->
						<tr v-for="(item,index) in ClinicalDataList" :key="index">
							<td><div class="typeName">{{item.District}}</div></td>
							<td><div class="numBox">{{item.POCOITYTDActual}}</div></td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.POCOITVsTarget" :max="maxPOCOITHtA" :min="minPOCOITHtA" />
							</td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.POCOITVsYear" :max="maxPOCOITVsYear" :min="minPOCOITVsYear" />
							</td>
							<td><div class="numBox">{{item.POCFunnel}}</div></td>
							<td><div class="numBox">{{item.POCOITTransrate}}</div></td>
							<!-- <td><div class="numBox">暂定</div></td> -->
							<td><div class="numBox">{{item.POCSalesYTDActual}}</div></td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.POCSalesVsTarget" :max="maxPOCSalesHtA" :min="minPOCSalesHtA" />
							</td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.POCSalesVsYear" :max="maxPOCSalesVsYear" :min="minPOCSalesVsYear" />
							</td>
							<td>
								<!-- ECharts 饼图组件 -->
								<!-- <common-pie :chart-data="chardata[0]" autoresize /> -->
							</td>
						</tr>
					</table>
				</div>
			</div>
			<!-- POC end--> 
		</div>
	</div>
	<!-- /.page-content -->

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptBlock" runat="server">

	<script src="assets/js/myUpload/jquery.ajaxfileupload.js"></script>
	<script src="assets/js/myUpload/myFileUpload.js"></script>
	<script src="js/echats.4.7.0.min.js"></script>
	<!-- <script src="js/echarts/echarts.min.js"></script> -->

	<script src="js/element.js"></script>
	<script src="js/echats.4.7.0.min.js"></script>
	<!-- <script src="js/echarts/echarts.min.js"></script> -->
	<!--引入公共组件,饼图-->
	<script type="text/javascript" src="component/pieECharts.js"></script>
	<!--引入公共组件,正负轴-->
	<script type="text/javascript" src="component/plus-minus.js"></script>

	<script>
		var vue = new Vue({
			el: "#app",
			data: {
				pagesize: 10,//每页的数据条数
				currentPage: 1,//默认开始页面
				List: [],
				total: 10,
				// 所有图表数据
				allChartsDatas:{
					chartData1: [
						// 第一个数组为 饼图
						[{value:335, name:'手机'},
						{value:310, name:'电脑'},],
						// 第二个数组为 正负轴
						10,
					],
					chartData2: [
						// 第一个数组为 饼图
						[{value:305, name:'手机'},
						{value:310, name:'电脑'},],
						// 第二个数组为 正负轴
						-20,
					],
				},
				ClinicalDataList:[],
					
			},
			created: function () {
				this.getClinicalData();
			},
			computed:{
				// CV
				// vstarget%正负轴最大值最小值
				maxCVOITHtA:function(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs( o.CVOITVsTarget  ); }).CVOITVsTarget  ;
				},
				minCVOITHtA:function(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs( o.CVOITVsTarget  ); }).CVOITVsTarget  ;
				},
				maxCVSalesHtA:function(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs( o.CVSalesVsTarget  ); }).CVSalesVsTarget  ;
				},
				minCVSalesHtA:function(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs( o.CVSalesVsTarget  ); }).CVSalesVsTarget  ;
				},
				// vs.2018%正负轴最大值最小值
				maxCVOITVsYear(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs(o.CVOITVsYear); }).CVOITVsYear;
				},
				minCVOITVsYear(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs(o.CVOITVsYear); }).CVOITVsYear;
				},
				maxCVSalesVsYear(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs(o.CVSalesVsYear); }).CVSalesVsYear;
				},
				minCVSalesVsYear(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs(o.CVSalesVsYear); }).CVSalesVsYear;
				},

				// GI
				// vstarget%正负轴最大值最小值
				maxGIOITHtA:function(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs( o.GIOITVsTarget  ); }).GIOITVsTarget  ;
				},
				minGIOITHtA:function(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs( o.GIOITVsTarget  ); }).GIOITVsTarget  ;
				},
				maxGISalesHtA:function(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs( o.GISalesVsTarget  ); }).GISalesVsTarget  ;
				},
				minGISalesHtA:function(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs( o.GISalesVsTarget  ); }).GISalesVsTarget  ;
				},
				// vs.2018%正负轴最大值最小值
				maxGIOITVsYear(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs(o.GIOITVsYear); }).GIOITVsYear;
				},
				minGIOITVsYear(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs(o.GIOITVsYear); }).GIOITVsYear;
				},
				maxGISalesVsYear(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs(o.GISalesVsYear); }).GISalesVsYear;
				},
				minGISalesVsYear(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs(o.GISalesVsYear); }).GISalesVsYear;
				},

				// WHC
				// vstarget%正负轴最大值最小值
				maxWHCOITHtA:function(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs( o.WHCOITVsTarget  ); }).WHCOITVsTarget  ;
				},
				minWHCOITHtA:function(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs( o.WHCOITVsTarget  ); }).WHCOITVsTarget  ;
				},
				maxWHCSalesHtA:function(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs( o.WHCSalesVsTarget  ); }).WHCSalesVsTarget  ;
				},
				minWHCSalesHtA:function(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs( o.WHCSalesVsTarget  ); }).WHCSalesVsTarget  ;
				},
				// vs.2018%正负轴最大值最小值
				maxWHCOITVsYear(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs(o.WHCOITVsYear); }).WHCOITVsYear;
				},
				minWHCOITVsYear(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs(o.WHCOITVsYear); }).WHCOITVsYear;
				},
				maxWHCSalesVsYear(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs(o.WHCSalesVsYear); }).WHCSalesVsYear;
				},
				minWHCSalesVsYear(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs(o.WHCSalesVsYear); }).WHCSalesVsYear;
				},

				// POC
				// vstarget%正负轴最大值最小值
				maxPOCOITHtA:function(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs( o.POCOITVsTarget  ); }).POCOITVsTarget  ;
				},
				minPOCOITHtA:function(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs( o.POCOITVsTarget  ); }).POCOITVsTarget  ;
				},
				maxPOCSalesHtA:function(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs( o.POCSalesVsTarget  ); }).POCSalesVsTarget  ;
				},
				minPOCSalesHtA:function(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs( o.POCSalesVsTarget  ); }).POCSalesVsTarget  ;
				},
				// vs.2018%正负轴最大值最小值
				maxPOCOITVsYear(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs(o.POCOITVsYear); }).POCOITVsYear;
				},
				minPOCOITVsYear(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs(o.POCOITVsYear); }).POCOITVsYear;
				},
				maxPOCSalesVsYear(){
					return _.maxBy(this.ClinicalDataList, function(o) { return Math.abs(o.POCSalesVsYear); }).POCSalesVsYear;
				},
				minPOCSalesVsYear(){
					return _.minBy(this.ClinicalDataList, function(o) { return Math.abs(o.POCSalesVsYear); }).POCSalesVsYear;
				},
			},
			mounted: function() {
				
			},
			methods: {
				// 获取vs2018,M1-M12的数组
				instaceOIToldYear(datalist){
					var that=this
					// CV
					this.CVYearList=_.filter(datalist,function(a){
						return _.trim(a.ProductTypeName)=="CV";	
					})
					this.CVOITYearList=_.filter(that.CVYearList,function(a){
						return _.trim(a.TypeName)=="OIT";	
					})
					this.CVSalesYearList=_.filter(that.CVYearList,function(a){
						return _.trim(a.TypeName)=="Sales to Thirds";	
					})

					// GI
					this.GIYearList=_.filter(datalist,function(a){
						return _.trim(a.ProductTypeName)=="GI";	
					})
					this.GIOITYearList=_.filter(that.GIYearList,function(a){
						return _.trim(a.TypeName)=="OIT";	
					})
					this.GISalesYearList=_.filter(that.GIYearList,function(a){
						return _.trim(a.TypeName)=="Sales to Thirds";	
					})

					// WHC
					this.WHCYearList=_.filter(datalist,function(a){
						return _.trim(a.ProductTypeName)=="WHC";	
					})
					this.WHCOITYearList=_.filter(that.WHCYearList,function(a){
						return _.trim(a.TypeName)=="OIT";	
					})
					this.WHCSalesYearList=_.filter(that.WHCYearList,function(a){
						return _.trim(a.TypeName)=="Sales to Thirds";	
					})

					// POC
					this.POCYearList=_.filter(datalist,function(a){
						return _.trim(a.ProductTypeName)=="POC";	
					})
					this.POCOITYearList=_.filter(that.POCYearList,function(a){
						return _.trim(a.TypeName)=="OIT";	
					})
					this.POCSalesYearList=_.filter(that.POCYearList,function(a){
						return _.trim(a.TypeName)=="Sales to Thirds";	
					})
				},
				getClinicalData(){  
					var that = this
					this.FCSTyear='2019'
					const loading = this.$loading({
						lock: true,
						text: ''
					});
					$.ajax({
						url: 'handler/information.ashx?_op=ByDistrictClinicalQuery',
						data: { year: sessionStorage.getItem("selectYear"), month: sessionStorage.getItem("selectMonth")
 },
						type: 'POST',
						dataType: "json",
						success: function (data) {
							loading.close();
							if (data.success) {
								that.instaceOIToldYear(data.data.OITList) //筛选出OldYearList的数据
								var AllList = data.data.ClinicalList
								// that.ClinicalDataList=data.data.ClinicalList // Clinical 曲线图所有数据
								var Districts=_.union(_.map(data.data.ClinicalList,'District')) //筛选District并去重,District值数据
								var tt=[]
								_.forEach(Districts, a => {
									var b={};
									b.District=a
									// CV
									b.CVFunnel=_.sumBy(AllList, function(o){if(a==o.District)return  o.CVFunnel;return 0;})
									b.CVOITTarget=_.sumBy(AllList, function(o){if(a==o.District)return  o.CVOITTarget;return 0;})
									b.CVOITYTDActual=_.sumBy(AllList, function(o){if(a==o.District)return  o.CVOITYTDActual;return 0;})
									b.CVOITTogo=b.CVOITTarget-b.CVOITYTDActual
									b.CVFunnel=_.sumBy(AllList, function(o){if(a==o.District)return  o.CVFunnel;return 0;})
									// Transrate
									if(b.CVOITTogo!=0 && isNaN(b.CVOITTogo)==false){
										b.CVOITTransrate= (b.CVFunnel/b.CVOITTogo).toFixed(2) //I/H
									}else{
										b.CVOITTransrate=0
									}
									// CVOIT vs.target%  c/d	
									if(b.CVOITTarget!=0 && isNaN(b.CVOITTarget)==false){
										b.CVOITVsTarget= (b.CVOITYTDActual/b.CVOITTarget).toFixed(2) //c/d
									}else{
										b.CVOITVsTarget=0
									}
									// CVSales vs.target%  c/d	
									b.CVSalesTarget=_.sumBy(AllList, function(o){if(a==o.District)return  o.CVSalesTarget;return 0;})
									b.CVSalesYTDActual=_.sumBy(AllList, function(o){if(a==o.District)return  o.CVSalesYTDActual;return 0;})
									if(b.CVSalesTarget!=0 && isNaN(b.CVSalesTarget)==false){
										b.CVSalesVsTarget= (b.CVSalesYTDActual/b.CVSalesTarget).toFixed(2) //c/d
									}else{
										b.CVSalesVsTarget=0
									}
									// CV vs.2018%  C/F-1	
									// CV OIT一条数据中的M总值
									var CVOITM = _.sumBy(that.CVOITYearList ,function(a){
										// 地名相同
										if(_.trim(a.AreaName)==b.District){
											return a.M1+a.M2+a.M3+a.M4+a.M5+a.M6+a.M7+a.M8+a.M9+a.M10+a.M11+a.M12
										}
									})/12/1000
									b.CVOITM= CVOITM?CVOITM:0 // F
									b.CVOITVsYear=(b.CVOITYTDActual-b.CVOITM-1).toFixed(2) //vs2018%=C/F-1
									// CV Sales一条数据中的M总值
									var CVSalesM = _.sumBy(that.CVSalesYearList ,function(a){
										// 地名相同
										if(_.trim(a.AreaName)==b.District){
											return a.M1+a.M2+a.M3+a.M4+a.M5+a.M6+a.M7+a.M8+a.M9+a.M10+a.M11+a.M12
										}
									})/12/1000
									b.CVSalesM= CVSalesM?CVSalesM:0 // F
									b.CVSalesVsYear=(b.CVSalesYTDActual-b.CVSalesM-1).toFixed(2) //vs2018%=C/F-1

									// GI
									b.GIOITTarget=_.sumBy(AllList, function(o){if(a==o.District)return  o.GIOITTarget;return 0;})
									b.GIOITYTDActual=_.sumBy(AllList, function(o){if(a==o.District)return  o.GIOITYTDActual;return 0;})
									b.GIOITTogo=b.GIOITTarget-b.GIOITYTDActual
									b.GIFunnel=_.sumBy(AllList, function(o){if(a==o.District)return  o.GIFunnel;return 0;})
									// Transrate
									if(b.GIOITTogo!=0 && isNaN(b.GIOITTogo)==false){
										b.GIOITTransrate= (b.GIFunnel/b.GIOITTogo).toFixed(2) //I/H
									}else{
										b.GIOITTransrate=0
									}
									// GIOIT vs.target%  c/d	
									if(b.GIOITTarget!=0 && isNaN(b.GIOITTarget)==false){
										b.GIOITVsTarget= (b.GIOITYTDActual/b.GIOITTarget).toFixed(2) //c/d
									}else{
										b.GIOITVsTarget=0
									}
									// GISales vs.target%  c/d	
									b.GISalesTarget=_.sumBy(AllList, function(o){if(a==o.District)return  o.GISalesTarget;return 0;})
									b.GISalesYTDActual=_.sumBy(AllList, function(o){if(a==o.District)return  o.GISalesYTDActual;return 0;})
									if(b.GISalesTarget!=0 && isNaN(b.GISalesTarget)==false){
										b.GISalesVsTarget= (b.GISalesYTDActual/b.GISalesTarget).toFixed(2) //c/d
									}else{
										b.GISalesVsTarget=0
									}
									// GI vs.2018%  C/F-1	
									// GI OIT一条数据中的M总值
									var GIOITM = _.sumBy(that.GIOITYearList ,function(a){
										// 地名相同
										if(_.trim(a.AreaName)==b.District){
											return a.M1+a.M2+a.M3+a.M4+a.M5+a.M6+a.M7+a.M8+a.M9+a.M10+a.M11+a.M12
										}
									})/12/1000
									b.GIOITM= GIOITM?GIOITM:0 // F
									b.GIOITVsYear=(b.GIOITYTDActual-b.GIOITM-1).toFixed(2) //vs2018%=C/F-1
									// GI Sales一条数据中的M总值
									var GISalesM = _.sumBy(that.GISalesYearList ,function(a){
										// 地名相同
										if(_.trim(a.AreaName)==b.District){
											return a.M1+a.M2+a.M3+a.M4+a.M5+a.M6+a.M7+a.M8+a.M9+a.M10+a.M11+a.M12
										}
									})/12/1000
									b.GISalesM= GISalesM?GISalesM:0 // F
									b.GISalesVsYear=(b.GISalesYTDActual-b.GISalesM-1).toFixed(2) //vs2018%=C/F-1

									// WHC
									b.WHCOITTarget=_.sumBy(AllList, function(o){if(a==o.District)return  o.WHCOITTarget;return 0;})
									b.WHCOITYTDActual=_.sumBy(AllList, function(o){if(a==o.District)return  o.WHCOITYTDActual;return 0;})
									b.WHCOITTogo=b.WHCOITTarget-b.WHCOITYTDActual
									b.WHCFunnel=_.sumBy(AllList, function(o){if(a==o.District)return  o.WHCFunnel;return 0;})
									// Transrate
									if(b.WHCOITTogo!=0 && isNaN(b.WHCOITTogo)==false){
										b.WHCOITTransrate= (b.WHCFunnel/b.WHCOITTogo).toFixed(2) //I/H
									}else{
										b.WHCOITTransrate=0
									}
									// WHCOIT vs.target%  c/d	
									if(b.WHCOITTarget!=0 && isNaN(b.WHCOITTarget)==false){
										b.WHCOITVsTarget= (b.WHCOITYTDActual/b.WHCOITTarget).toFixed(2) //c/d
									}else{
										b.WHCOITVsTarget=0
									}
									// WHCSales vs.target%  c/d	
									b.WHCSalesTarget=_.sumBy(AllList, function(o){if(a==o.District)return  o.WHCSalesTarget;return 0;})
									b.WHCSalesYTDActual=_.sumBy(AllList, function(o){if(a==o.District)return  o.WHCSalesYTDActual;return 0;})
									if(b.WHCSalesTarget!=0 && isNaN(b.WHCSalesTarget)==false){
										b.WHCSalesVsTarget= (b.WHCSalesYTDActual/b.WHCSalesTarget).toFixed(2) //c/d
									}else{
										b.WHCSalesVsTarget=0
									}
									// WHC vs.2018%  C/F-1	
									// WHC OIT一条数据中的M总值
									var WHCOITM = _.sumBy(that.WHCOITYearList ,function(a){
										// 地名相同
										if(_.trim(a.AreaName)==b.District){
											return a.M1+a.M2+a.M3+a.M4+a.M5+a.M6+a.M7+a.M8+a.M9+a.M10+a.M11+a.M12
										}
									})/12/1000
									b.WHCOITM= WHCOITM?WHCOITM:0 // F
									b.WHCOITVsYear=(b.WHCOITYTDActual-b.WHCOITM-1).toFixed(2) //vs2018%=C/F-1
									// WHC Sales一条数据中的M总值
									var WHCSalesM = _.sumBy(that.WHCSalesYearList ,function(a){
										// 地名相同
										if(_.trim(a.AreaName)==b.District){
											return a.M1+a.M2+a.M3+a.M4+a.M5+a.M6+a.M7+a.M8+a.M9+a.M10+a.M11+a.M12
										}
									})/12/1000
									b.WHCSalesM= WHCSalesM?WHCSalesM:0 // F
									b.WHCSalesVsYear=(b.WHCSalesYTDActual-b.WHCSalesM-1).toFixed(2) //vs2018%=C/F-1

									// POC
									b.POCOITTarget=_.sumBy(AllList, function(o){if(a==o.District)return  o.POCOITTarget;return 0;})
									b.POCOITYTDActual=_.sumBy(AllList, function(o){if(a==o.District)return  o.POCOITYTDActual;return 0;})
									b.POCOITTogo=b.POCOITTarget-b.POCOITYTDActual
									b.POCFunnel=_.sumBy(AllList, function(o){if(a==o.District)return  o.POCFunnel;return 0;})
									// Transrate
									if(b.POCOITTogo!=0 && isNaN(b.POCOITTogo)==false){
										b.POCOITTransrate= (b.POCFunnel/b.POCOITTogo).toFixed(2) //I/H
									}else{
										b.POCOITTransrate=0
									}
									// POCOIT vs.target%  c/d	
									if(b.POCOITTarget!=0 && isNaN(b.POCOITTarget)==false){
										b.POCOITVsTarget= (b.POCOITYTDActual/b.POCOITTarget).toFixed(2) //c/d
									}else{
										b.POCOITVsTarget=0
									}
									// POCSales vs.target%  c/d	
									b.POCSalesTarget=_.sumBy(AllList, function(o){if(a==o.District)return  o.POCSalesTarget;return 0;})
									b.POCSalesYTDActual=_.sumBy(AllList, function(o){if(a==o.District)return  o.POCSalesYTDActual;return 0;})
									if(b.POCSalesTarget!=0 && isNaN(b.POCSalesTarget)==false){
										b.POCSalesVsTarget= (b.POCSalesYTDActual/b.POCSalesTarget).toFixed(2) //c/d
									}else{
										b.POCSalesVsTarget=0
									}
									// POC vs.2018%  C/F-1	
									// POC OIT一条数据中的M总值
									var POCOITM = _.sumBy(that.POCOITYearList ,function(a){
										// 地名相同
										if(_.trim(a.AreaName)==b.District){
											return a.M1+a.M2+a.M3+a.M4+a.M5+a.M6+a.M7+a.M8+a.M9+a.M10+a.M11+a.M12
										}
									})/12/1000
									b.POCOITM= POCOITM?POCOITM:0 // F
									b.POCOITVsYear=(b.POCOITYTDActual-b.POCOITM-1).toFixed(2) //vs2018%=C/F-1
									// POC Sales一条数据中的M总值
									var POCSalesM = _.sumBy(that.POCSalesYearList ,function(a){
										// 地名相同
										if(_.trim(a.AreaName)==b.District){
											return a.M1+a.M2+a.M3+a.M4+a.M5+a.M6+a.M7+a.M8+a.M9+a.M10+a.M11+a.M12
										}
									})/12/1000
									b.POCSalesM= POCSalesM?POCSalesM:0 // F
									b.POCSalesVsYear=(b.POCSalesYTDActual-b.POCSalesM-1).toFixed(2) //vs2018%=C/F-1
									
									that.ClinicalDataList.push(b)
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
			}

		})
	</script>

</asp:Content>
