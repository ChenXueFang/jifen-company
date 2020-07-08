<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="areaChart.aspx.cs" Inherits="ACETemplate.adnim.areaChart" MasterPageFile="~/adnim/SiteAdmin.Master"  %>

<%@ Register Src="~/adnim/include/HeadNavigation.ascx" TagPrefix="uc1" TagName="HeadNavigation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<link href="css/element-ui.css" rel="stylesheet" />
	<link href="css/productChart.css" rel="stylesheet" />
	<link href="css/areaChart.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

	<uc1:HeadNavigation runat="server" ID="HeadNavigation" Level2Name="报表管理" Level3Name="区域" />
	<div class="page-content">
		<div id="app" v-cloak style="margin-top:10px;margin-bottom:10px;padding:0;border:1px solid white">
			<!-- OIT -->
			<div class="charOneBox">
				<p class="BigTitle">区域指标表现</p>
				<div class="charCon">
					<table class="charOneTable" cellspacing="0" cellpadding="0">
						<!-- 标题 -->
						<tr><td colspan="13" style="text-align: left;">OIT</td></tr>
						<tr height='30px'></tr>
						<!-- 标题 -->
						<tr>
							<td>Zone.</td>
							<td>OITActual</td>
							<td colspan="3">vs.target%</td>
							<td colspan="3">vs.2018%</td>
							<td>HTA actual</td>
							<td>HTA%</td>
							<td>Funnel</td>
							<td>Trans rate</td>
							<td>FCST CM</td>
							<td>FCST N2M</td>
							<td>OIT Rack</td>
						</tr>
						<!-- 空行间距 -->
						<tr height="20px"></tr>
						<!-- 刻度线 -->
						<tr height='13px'>
							<td colspan="2"></td>
							<td  colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td colspan="3"  class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
						</tr>
						<!-- 一行数据 -->
						<tr v-for="(item,index) in sumData" :key="index">
							<td><div class="typeName">{{item.Region}}</div></td>
							<td><div class="numBox">{{item.OITActual}}</div></td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.vstarget" :max="maxOITHtA" :min="minOITHtA" />
							</td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.OITVsYear" :max="maxOITVsYear" :min="minOITVsYear" />
							</td>
							<td><div class="numBox">{{item.OITHTAActual}}</div></td>
							<td>
								<!-- ECharts 饼图组件 -->
								<common-pie :chart-data="item.HTA" autoresize />
							</td>
							<td><div class="numBox">{{item.Funnel}}</div></td>
							<td><div class="numBox">{{item.Transrate}}</div></td>
							<td><div class="numBox">{{item.FCST}}</div></td>
							<td><div class="numBox">{{item.FCSTN2M}}</div></td>
							<td><div class="numBox">{{getOITRack(item.OITActual)}}</div></td>
						</tr>
					</table>
				</div>
			</div>
			<!-- OIT end-->
			<!-- Sales -->
			<div class="charOneBox">
				<div class="charCon">
					<table class="charOneTable" cellspacing="0" cellpadding="0">
						<!-- 标题 -->
						<tr><td colspan="13" style="text-align: left;">Sales</td></tr>
						<tr height='30px'></tr>
						<tr>
							<td>Zone.</td>
							<td>SalesActual</td>
							<td colspan="3">vs.target%</td>
							<td colspan="3">vs.2018%</td>
							<td>HTA actual</td>
							<td>HTA%</td>
							<td>To go</td>
							<td>OOH</td>
							<td>Seas Rank</td>
							<td>Inventony>90</td>
							<td colspan="3">FCST Accuracy%</td>
						</tr>
						<!-- 空行间距 -->
						<tr height="20px"></tr>
						<!-- 刻度线 -->
						<tr height='13px'>
							<td colspan="2"></td>
							<td  colspan="3" class="scaleBox"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td colspan="3"  class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
						</tr>
						<!-- 一行数据 -->
						<tr v-for="(item,index) in sumData" :key="index">
							<td><div class="typeName">{{item.Region}}</div></td>
							<td><div class="numBox">{{item.SalesActual}}</div></td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.Salesvstarget" :max="maxSalesHtA" :min="minSalesHtA" />
							</td>
							<td colspan="3">
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.SalesVsYear" :max="maxSalesVsYear" :min="minSalesVsYear" />
							</td>
							<td><div class="numBox">{{item.SalesHTAActual}}</div></td>
							<td>
								<!-- ECharts 饼图组件 -->
								<common-pie :chart-data="item.SalesHTA" autoresize />
							</td>
							<td><div class="numBox">{{item.Togo}}</div></td>
							<td><div class="numBox">{{item.OOH}}</div></td>
							<td><div class="numBox">{{getSalesRack(item.SalesActual)}}</div></td>
							<td><div class="numBox">{{item.InvenrotyIsNinety}}</div></td>
							<td colspan="3">
								<!-- ECharts 曲线图组件 -->
								<common-line :ychart-data="item.FCSTChartData.value" :ids="'Sales'+index" :xchart-data="item.FCSTChartData.xDate" autoresize />
							</td>
						</tr>
					</table>
				</div>
			</div>
			<!-- Sales end-->
			<!-- OIT2 堆叠图 -->
			<!-- <div class="charOneBox">
				<div class="charCon stackCon">
					<table class="charOneTable stackTable" cellspacing="0" cellpadding="0">
						<tr><td colspan="13" style="text-align: left;">OIT</td></tr>
						<tr height='30px'></tr>
						<tr>
							<td>Zone.</td>
							<td colspan="7">HopitalLevel contrbute</td>
							<td></td>
							<td colspan="3">Private</td>
							<td></td>
							<td colspan="3">L1/0</td>
							<td></td>
							<td colspan="3">L2</td>
							<td></td>
							<td colspan="3">L3</td>
						</tr>
						<tr height="20px"></tr>
						<tr height='13px'>
							<td colspan="9"></td>
							<td colspan="3"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td></td>
							<td colspan="3"><img class="scaleImg" src="assets/images/scale.png"/></td>
							<td></td>
							<td colspan="3"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td></td>
							<td colspan="3"><img class="scaleImg" src="assets/images/scale.png"/></td>
						</tr>
						<tr v-for="(chardata,index) in allChartsDatas" :key="index">
							<td><div class="typeName">D1</div></td>
							<td colspan="7">
								<common-stack :stack-data="chardata[2]" />
							</td>
							<td></td>
							<td colspan="3">
								<common-plus-minus :plus-minus="chardata[3]" />
							</td>
							<td></td>
							<td colspan="3">
								<common-plus-minus :plus-minus="chardata[3]" />
							</td>
							<td></td>
							<td colspan="3">
								<common-plus-minus :plus-minus="chardata[3]" />
							</td>
							<td></td>
							<td colspan="3">
								<common-plus-minus :plus-minus="chardata[3]" />
							</td>
						</tr>
					</table>
				</div>
			</div> -->
			<!-- OIT2 end-->
			<!-- Sales2 堆叠图 -->
			<!-- <div class="charOneBox">
				<div class="charCon stackCon">
					<table class="charOneTable stackTable" cellspacing="0" cellpadding="0">
						<tr><td colspan="13" style="text-align: left;">Sales</td></tr>
						<tr height='30px'></tr>
						<tr>
							<td>Zone.</td>
							<td colspan="7">HopitalLevel contrbute</td>
							<td></td>
							<td colspan="3">Private</td>
							<td></td>
							<td colspan="3">L1/0</td>
							<td></td>
							<td colspan="3">L2</td>
							<td></td>
							<td colspan="3">L3</td>
							<td></td>
							<td>CRM/DMS</td>
						</tr>
						<tr height="20px"></tr>
						<tr height='13px'>
							<td colspan="9"></td>
							<td colspan="3"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td></td>
							<td colspan="3"><img class="scaleImg" src="assets/images/scale.png"/></td>
							<td></td>
							<td colspan="3"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td></td>
							<td colspan="3"><img class="scaleImg" src="assets/images/scale.png"/></td>
						</tr>
						<tr v-for="(chardata,index) in allChartsDatas" :key="index">
							<td><div class="typeName">D1</div></td>
							<td colspan="7">
								<common-stack :stack-data="chardata[2]" />
							</td>
							<td></td>
							<td colspan="3">
								<common-plus-minus :plus-minus="chardata[3]" />
							</td>
							<td></td>
							<td colspan="3">
								<common-plus-minus :plus-minus="chardata[3]" />
							</td>
							<td></td>
							<td colspan="3">
								<common-plus-minus :plus-minus="chardata[3]" />
							</td>
							<td></td>
							<td colspan="3">
								<common-plus-minus :plus-minus="chardata[3]" />
							</td>
							<td></td>
							<td><div class="numBox">87.5</div></td>
						</tr>
					</table>
				</div>
			</div> -->
			<!-- Sales2 end-->
			<!-- Sales3 曲线 表格 -->
			<!-- <div class="charOneBox">
				<div class="charCon stackCon">
					<div>Sales</div>
					<div class="twoTableBox">
						<dl class="AccuracyBox">
							<dt class="AccuracyTitle">FCST Accuracy%</dt>
							<dd v-for="(chardata,index) in allChartsDatas" :key="index">
								<common-line :chart-data="chardata[1]" :ids="'Sales'+index" autoresize />
							</dd>
						</dl>

						<table class="top5Table" border="1" cellspacing="0" cellpadding="0">
							<caption>经销商排名（显示Top5,现在全部排名）</caption>
							<tr height='30px'></tr>
							<tr>
								<th>OIT完成率</th>
								<th>OIT完成率</th>
								<th>OIT完成率</th>
								<th>OIT完成率</th>
							</tr>
							<tr>
								<td>30%</td>
								<td>30%</td>
								<td>30%</td>
								<td>30%</td>
							</tr>
							<tr>
								<td>30%</td>
								<td>30%</td>
								<td>30%</td>
								<td>30%</td>
							</tr>
							<tr>
								<td>30%</td>
								<td>30%</td>
								<td>30%</td>
								<td>30%</td>
							</tr>
							<tr height="20px"></tr>
						</table>
					</div>
				</div>
			</div> -->
			<!-- Sales3 end-->
			<!-- OIT table -->
			<div class="charOneBox">
				<div class="charCon stackCon">
					<div>OIT</div>
					<table class="top5Table" border="1" cellspacing="0" cellpadding="0">
						<tr height='30px'></tr>
						<tr>
							<th>地区</th>
							<th>Private</th>
							<th>L1</th>
							<th>L2</th>
							<th>L3</th>
						</tr>
						<!-- 一条数据 -->
						<tr v-for="(item,index) in OITHospitData" :key="index">
							<td>{{item.District}}</td>
							<td>{{item.Private}}</td>
							<td>{{item.L1}}</td>
							<td>{{item.L2}}</td>
							<td>{{item.L3}}</td>
						</tr>
					</table>
				</div>
			</div>
			<!-- OIT table end -->
			<!-- Sales table -->
			<div class="charOneBox">
				<div class="charCon stackCon">
					<div>Sales</div>
					<table class="top5Table" border="1" cellspacing="0" cellpadding="0">
						<tr height='30px'></tr>
						<tr>
							<th>地区</th>
							<th>Private</th>
							<th>L1</th>
							<th>L2</th>
							<th>L3</th>
						</tr>
						<!-- 一条数据 -->
						<tr v-for="(item,index) in SalesHospitData" :key="index">
							<td>{{item.District}}</td>
							<td>{{item.Private}}</td>
							<td>{{item.L1}}</td>
							<td>{{item.L2}}</td>
							<td>{{item.L3}}</td>
						</tr>
					</table>
				</div>
			</div>
			<!-- Sales table end -->
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
	<!--引入公共组件,曲线图-->
	<script type="text/javascript" src="component/lineECharts.js"></script>
	<!--引入公共组件,饼图-->
	<script type="text/javascript" src="component/pieECharts.js"></script>
	<!--引入公共组件,堆叠图-->
	<script type="text/javascript" src="component/stackBlock.js"></script>
	<!--引入公共组件,正负轴-->
	<script type="text/javascript" src="component/plus-minus.js"></script>
	<!--引入公共组件,年月选择-->
	<script type="text/javascript" src="component/cascader.js"></script>

	<script>
		var vue = new Vue({
			el: "#app",
		data: {
			pagesize: 10,//每页的数据条数
			currentPage: 1,//默认开始页面
			List: [],
			total: 10,
			sumData:[],
			OITOlderYearList:[],
			// 所有图表数据
			allChartsDatas:{
				chartData1: [
					// 第一个数组为 饼图
					[{value:335, name:'手机'},
					{value:110, name:'电脑'},],
					// 第二个数组为 曲线图
					[-0.5, -0.1, -0.4, -0.3, -0.1, -0.1, -0.1, -0.2],
					// 堆叠图
					[50,26,25,33,20],
					// 正负轴
					10,
				],
				chartData2: [
					// 第一个数组为 饼图
					[{value:105, name:'手机'},
					{value:399, name:'电脑'},],
					// 第二个数组为 曲线图
					[-0.1, -0.8, -0.4, -1, 0, 0.3, 1, 0.8],
					// 堆叠图
					[20,26,25,33,50],
					// 正负轴
					-20,
				],
			},
			chart3Data:{},
			FCSTDataList:[],
			OITHospitData:[],
			SalesHospitData:[],
		},
		created: function () {
			this.getFCSTData();
			this.getOITdata();
			this.getTableData();
		},
		computed:{
			// vstarget%正负轴最大值最小值
			maxOITHtA:function(){
				return _.maxBy(this.sumData, function(o) { return Math.abs( o.vstarget); }).vstarget;
			},
			minOITHtA:function(){
				return _.minBy(this.sumData, function(o) { return Math.abs( o.vstarget); }).vstarget;
			},
			maxSalesHtA:function(){
				return _.maxBy(this.sumData, function(o) { return Math.abs( o.Salesvstarget); }).Salesvstarget;
			},
			minSalesHtA:function(){
				return _.minBy(this.sumData, function(o) { return Math.abs( o.Salesvstarget); }).Salesvstarget;
			},
			// vs.2018正负轴最大值最小值
			maxOITVsYear(){
				return _.maxBy(this.sumData, function(o) { return Math.abs(o.OITVsYear); }).OITVsYear;
			},
			minOITVsYear(){
				return _.minBy(this.sumData, function(o) { return Math.abs(o.OITVsYear); }).OITVsYear;
			},
			maxSalesVsYear(){
				return _.maxBy(this.sumData, function(o) { return Math.abs(o.SalesVsYear); }).SalesVsYear;
			},
			minSalesVsYear(){
				return _.minBy(this.sumData, function(o) { return Math.abs(o.SalesVsYear); }).SalesVsYear;
			}
		},

		methods: {
			cascader(year,month){
				console.log(year,'year')
				console.log(month,'month')
			},
			instaceOIToldYear(datalist){
			 	this.OITOlderYearList=	_.filter(datalist,function(a){
					return _.trim(a.TypeName)=="OIT";	
				})
			},
			instaceSalesoldYear(datalist){
			 	this.SalesOlderYearList=_.filter(datalist,function(a){
					return _.trim(a.TypeName)=="Sales to Thirds";	
				})
			},
			getOITRack:function(sortvalue){
				return this.setsord(this.sumData,"OITActual",sortvalue)
			},
			getSalesRack:function(sortvalue){
				return this.setsord(this.sumData,"SalesActual",sortvalue)

			},
			setsord:function(list,filed,value){
				//var f =_.sortBy(this.sumData,function(o){return parseFloat( eval("o."+filed))});
				var rank=1;	
				for(var i =0;i<list.length;i++){
				   if(this.sortfunction(value, parseFloat( eval("list[i]."+filed)))>0){
					   rank++;
				   }

				}
				return rank;
			},	
			sortfunction:function(a,b){
				return b-a;
			},

			// 表格数据
			getTableData(){  
				var that = this
				const loading = this.$loading({
					lock: true,
					text: ''
				});
				$.ajax({
					url: 'handler/information.ashx?_op=QueryDistrictHospital',
					data: { year: sessionStorage.getItem("selectYear"), month: sessionStorage.getItem("selectMonth") },
					type: 'POST',
					dataType: "json",
					success: function (data) {
						loading.close();
						if (data.success) {
							// OIT表格数据
							var OITList= _.filter(data.data, function(o){return o.OITSales=="OIT";});  // OIT 表格数据
							var DistrictOIT=_.union(_.map(OITList,'District')) //筛选District并去重,District值数据
							that.OITHospitData=[]; //最终渲染数组OITHospitData
							_.forEach(DistrictOIT, b => {
								var t={};
								t.District=b
								t.Private=_.sumBy(OITList, function(o){if(b==o.District&&o.HospitalType=='Private')return  o.Qty;return 0;})
								t.L1=_.sumBy(OITList, function(o){if(b==o.District&&o.HospitalType=='L1')return  o.Qty;return 0;})
								t.L2=_.sumBy(OITList, function(o){if(b==o.District&&o.HospitalType=='L2')return  o.Qty;return 0;})
								t.L3=_.sumBy(OITList, function(o){if(b==o.District&&o.HospitalType=='L3')return  o.Qty;return 0;})
								that.OITHospitData.push(t)
							})

							// OIT表格数据
							var SalesList= _.filter(data.data, function(o){return o.OITSales=="Sales";});  // Sales 表格数据
							var DistrictSales=_.union(_.map(SalesList,'District')) //筛选District并去重,District值数据
							that.SalesHospitData=[]; //最终渲染数组SalesHospitData
							_.forEach(DistrictSales, b => {
								var t={};
								t.District=b
								t.Private=_.sumBy(SalesList, function(o){if(b==o.District&&o.HospitalType=='Private')return  o.Qty;return 0;})
								t.L1=_.sumBy(SalesList, function(o){if(b==o.District&&o.HospitalType=='L1')return  o.Qty;return 0;})
								t.L2=_.sumBy(SalesList, function(o){if(b==o.District&&o.HospitalType=='L2')return  o.Qty;return 0;})
								t.L3=_.sumBy(SalesList, function(o){if(b==o.District&&o.HospitalType=='L3')return  o.Qty;return 0;})
								that.SalesHospitData.push(t)
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
			
			// FCST Accuracy% 曲线图
			getFCSTData(){  
				var that = this
				this.FCSTyear=sessionStorage.getItem("selectYear")
				const loading = this.$loading({
					lock: true,
					text: ''
				});
				$.ajax({
					url: 'handler/information.ashx?_op=QueryFCSTAccuracy',
					data: { year:this.FCSTyear, month: sessionStorage.getItem("selectMonth") },
					type: 'POST',
					dataType: "json",
					success: function (data) {
						loading.close();
						if (data.success) {
							that.FCSTDataList=data.data // FCST Accuracy% 曲线图所有数据
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
			
			// OIT Sales数据
			getOITdata: function () {
				const loading = this.$loading({
					lock: true,
					text: ''
				});
				var that = this
			    $.ajax({
			        url: 'handler/information.ashx?_op=QueryByDistrict',
			        data: { year: sessionStorage.getItem("selectYear"), month: sessionStorage.getItem("selectMonth") },
			        type: 'POST',
			        dataType: "json",
			        success: function (data) {
						loading.close()
						var dataList = data.data.CurrentList;
						var dataListMM = data.data.CurrentOITLast;
						that.instaceOIToldYear(dataListMM) //筛选出OITOlderYearList的数据
						that.instaceSalesoldYear(dataListMM) //筛选出SalesOlderYearList的数据
						// 曲线图
					
						var y=_.union(_.map(dataList,'Region')) //筛选Regin并去重
						var tt=[]; //最终渲染数组sumData
						_.forEach(y, b => {
							var t={};
							t.Region=b
							t.OITActual=_.sumBy(dataList, function(o){if(b==o.Region) return  o.OITActual; return 0; }).toFixed(2) //HTAl
							t.OITHTAActual=_.sumBy(dataList, function(o){if(b==o.Region) return  o.OITHTAActual; return 0; }).toFixed(2) //HTA2
							t.Funnel=_.sumBy(dataList, function(o){if(b==o.Region) return  o.Funnel; return 0; }).toFixed(2) 
							t.Transrate=_.sumBy(dataList, function(o){if(b==o.Region) return  o.Transrate; return 0;}).toFixed(2) 
							t.FCST=_.sumBy(dataList, function(o){if(b==o.Region) return  o.FCST; return 0; }).toFixed(2) //FCST CM
							t.FCSTN2M=_.sumBy(dataList, function(o){if(b==o.Region) return  o.FCSTN2M; return 0;}).toFixed(2) //FCST N2M
							t.OITYTDActual=_.sumBy(dataList, function(o){if(b==o.Region) return  o.OITYTDActual; return 0;}) //H3
							// 一条数据中的M总值
							var OITM = _.sumBy(that.OITOlderYearList ,function(a){
								if(b==a.Region){
									return a.M1+a.M2+a.M3+a.M4+a.M5+a.M6+a.M7+a.M8+a.M9+a.M10+a.M11+a.M12
								}
							})/12/1000
							t.OITM= OITM?OITM.toFixed(2):0 //L3
							t.OITVsYear=t.OITYTDActual-t.OITM-1 //vs2018=H3-L3-1
							
							t.OITYTarget=_.sumBy(dataList, function(o){if(b==o.Region) return  o.OITYTarget; return 0;}) //I3不能为0
							// vs.target% H3/I3
							if(t.OITYTarget==0 || !t.OITYTarget) {
								t.vstarget= 0
							}else{
								t.vstarget= parseFloat(t.OITYTDActual/t.OITYTarget).toFixed(2)
							}
							var HTA1 = parseFloat(t.OITHTAActual/100).toFixed(2)
							var HTA2 = parseFloat(1-HTA1).toFixed(2)
							t.HTA=[{value:HTA1, name:'HTA actual'},{value:HTA2, name:'非HTA actual'}] //饼图HTA%
							
							// sale
							t.SalesActual=_.sumBy(dataList, function(o){if(b==o.Region) return  o.SalesActual; return 0; }).toFixed(2) //HTAl
							t.SalesHTAActual=_.sumBy(dataList, function(o){if(b==o.Region) return  o.SalesHTAActual; return 0; }).toFixed(2) //HTA2
							t.InvenrotyIsNinety=_.sumBy(dataList, function(o){if(b==o.Region) return  o.InvenrotyIsNinety; return 0; }) //Inventony>90
							t.SalesYTDActual=_.sumBy(dataList, function(o){if(b==o.Region) return  o.SalesYTDActual; return 0; })//Y3 
							t.SalesYTarget=_.sumBy(dataList, function(o){if(b==o.Region) return  o.SalesYTarget; return 0;})//Z3 
							t.Togo= (t.SalesYTarget-t.SalesYTDActual).toFixed(2) //To go = Z3-Y3
							t.OOH=_.sumBy(dataList, function(o){if(b==o.Region) return  o.OOH; return 0;}).toFixed(2)
							var SalesHTA1 = parseFloat(t.SalesHTAActual/100).toFixed(2)
							var SalesHTA2 = parseFloat(1-SalesHTA1).toFixed(2)
							t.SalesHTA=[{value:SalesHTA1, name:'HTA actual'},{value:SalesHTA2, name:'非HTA actual'}] //饼图HTA%
							t.SalesYTDActual=_.sumBy(dataList, function(o){if(b==o.Region) return  o.SalesYTDActual; return 0;}) //H3
							var SalesM = _.sumBy(that.SalesOlderYearList ,function(a){
								if(b==a.Region){
									return a.M1+a.M2+a.M3+a.M4+a.M5+a.M6+a.M7+a.M8+a.M9+a.M10+a.M11+a.M12
								}
							})/12/1000
							t.SalesM= SalesM?SalesM:0 //L3
							t.SalesVsYear=(t.OITYTDActual-t.OITM-1).toFixed(2) //vs2018=H3-L3-1
							t.SalesYTarget=_.sumBy(dataList, function(o){if(b==o.Region) return  o.SalesYTarget; return 0;}) //I3不能为0
							// vs.target% H3/I3
							if(t.SalesYTarget==0 || !t.SalesYTarget) {
								t.Salesvstarget= 0
							}else{
								t.Salesvstarget= parseFloat(t.SalesYTDActual/t.SalesYTarget).toFixed(2)
							}
							// 曲线图
							var chart3Data={
								xDate:[],
								value:[0,0,0,0,0,0,0,0,0,0,0,0]
							}
							for(var i=0;i<12;i++){
								var month=i+1
								chart3Data.xDate.push(that.FCSTyear+"-"+month)
							}
							// Accuracy1求和
							for(var i=0;i<12;i++){
								var sum=_.sumBy(that.FCSTDataList, function(o){if(b==o.Region){return eval("o.Accuracy" +(i+1) );}else{return 0}});
								var count= _.filter(that.FCSTDataList, function(o){return b==o.Region;}).length;
								if(count==0) 
									chart3Data.value[i]=0
								else  
									chart3Data.value[i]= parseFloat( sum*100/count).toFixed(2)
							}
							t.FCSTChartData =  chart3Data //曲线图字段
	
							tt.push(t);
						});	

						that.sumData = tt    
						
						
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
