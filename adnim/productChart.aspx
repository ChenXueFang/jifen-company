<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="productChart.aspx.cs" Inherits="ACETemplate.adnim.productChart" %>

<%@ Register Src="~/adnim/include/HeadNavigation.ascx" TagPrefix="uc1" TagName="HeadNavigation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<link href="css/element-ui.css" rel="stylesheet" />
	<link href="css/productChart.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

	<uc1:HeadNavigation runat="server" ID="HeadNavigation" Level2Name="报表管理" Level3Name="产品" />
	<div class="page-content">
		<div id="app" v-cloak style="margin-top:10px;margin-bottom:10px;padding:0;border:1px solid white">
			<!-- By Unit 分析 -->
			<div class="charOneBox">
				<p class="BigTitle">By Unit 分析</p>
				<div class="charCon">
					<table class="charOneTable" cellspacing="0" cellpadding="0">
						<!-- 标题 -->
						<tr>
							<td rowspan='3'>By Unit 分析</td>
							<td colspan="6">OIT</td>
							<td colspan="5">Sales</td>
						</tr>
						<!-- 大括号 -->
						<tr>
							<td colspan="6">
								<img class="bracesImg" src="assets/images/braces.png" />
							</td>
							<td colspan="5">
								<img class="bracesImg" src="assets/images/braces.png" />
							</td>
						</tr>
						<tr>
							<td>HTA actual</td>
							<td>vs.target%</td>
							<td>vs.2018%</td>
							<td>To go</td>
							<td>Funnel</td>
							<td>Trans rate</td>
							<td>HTA actual</td>
							<td>vs.target%</td>
							<td>vs.2018%</td>
							<td>To go</td>
							<td>Funnel</td>
						</tr>
						<!-- 空行间距 -->
						<tr height="30px"></tr>
						<!-- 刻度线 -->
						<tr height='13px'>
							<td colspan="2"></td>
							<td class="scaleBox"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
							<td colspan="4"></td>
							<td class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
							<td class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
						</tr>
						<!-- 一行数据 -->
						<tr v-for="(item,index) in proDataList" :key="index">
							<td><div class="typeName">{{item.ProductName}}</div></td>
							<td><div class="numBox">{{item.OITUnitYTDActual}}</div></td>
							<td>
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.OITUnitTarget" :max="maxOITHtA" :min="minOITHtA" />
							</td>
							<td>
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.OITUnitVsYear" :max="maxOITVsYear" :min="minOITVsYear" />
							</td>
							<td><div class="numBox">{{item.OITUnitTogo}}</div></td>
							<td><div class="numBox">{{item.UnitFunnel}}</div></td>
							<td><div class="numBox">{{item.OITUnitTransrate}}</div></td>
							<td><div class="numBox">{{item.SalesUnitYTDActual}}</div></td>
							<td>
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.SalesUnitTarget" :max="maxSalesHtA" :min="minSalesHtA" />
							</td>
							<td>
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.SalesUnitVsYear" :max="maxSalesVsYear" :min="minSalesVsYear" />
							</td>
							<td><div class="numBox">{{item.SalesUnitTogo}}</div></td>
							<td><div class="numBox">{{item.UnitOOH}}</div></td>
						</tr>
					</table>
				</div>
			</div>
			<!-- By Unit 分析 end-->
			<!-- By Value 分析 -->
			<div class="charOneBox charOneBox2">
				<p class="BigTitle">By Value 分析</p>
				<div class="charCon">
					<table class="charOneTable" cellspacing="0" cellpadding="0">
						<!-- 标题 -->
						<tr>
							<td rowspan='3'>By Value 分析</td>
							<td colspan="6">OIT</td>
							<td colspan="5">Sales</td>
						</tr>
						<!-- 大括号 -->
						<tr>
							<td colspan="6">
								<img class="bracesImg" src="assets/images/braces.png" />
							</td>
							<td colspan="5">
								<img class="bracesImg" src="assets/images/braces.png" />
							</td>
						</tr>
						<tr>
							<td>HTA actual</td>
							<td>vs.target%</td>
							<td>vs.2018%</td>
							<td>To go</td>
							<td>Funnel</td>
							<td>Trans rate</td>
							<td>HTA actual</td>
							<td>vs.target%</td>
							<td>vs.2018%</td>
							<td>To go</td>
							<td>Funnel</td>
						</tr>
						<!-- 空行间距 -->
						<tr height="30px"></tr>
						<!-- 刻度线 -->
						<tr height='13px'>
							<td colspan="2"></td>
							<td class="scaleBox"><img class="scaleImg" src="assets/images/scale.png" /></td>
							<td class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
							<td colspan="4"></td>
							<td class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
							<td class="scaleBox"><img class="scaleImg" src="assets/images/scale.png"/></td>
						</tr>
						<!-- 一行数据 -->
						<tr v-for="(item,index) in proDataList" :key="index">
							<td><div class="typeName">{{item.ProductName}}</div></td>
							<td><div class="numBox">{{item.OITValueYTDActual}}</div></td>
							<td>
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.OITValueTarget" :max="maxOITHtAValue" :min="minOITHtAValue" />
							</td>
							<td>
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.OITValueVsYear" :max="maxOITVsYearValue" :min="minOITVsYearValue" />
							</td>
							<td><div class="numBox">{{item.OITValueTogo}}</div></td>
							<td><div class="numBox">{{item.ValueFunnel}}</div></td>
							<td><div class="numBox">{{item.OITValueTransrate}}</div></td>
							<td><div class="numBox">{{item.SalesValueYTDActual}}</div></td>
							<td>
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.SalesValueTarget" :max="maxSalesHtAValue" :min="minSalesHtAValue" />
							</td>
							<td>
								<!-- 正负轴 -->
								<common-plus-minus :plus-minus="item.SalesValueVsYear" :max="maxSalesVsYearValue" :min="minSalesVsYearValue" />
							</td>
							<td><div class="numBox">{{item.SalesValueTogo}}</div></td>
							<td><div class="numBox">{{item.ValueOOH}}</div></td>
						</tr>
					</table>
				</div>
			</div>
			<!-- By Value 分析 end-->
			<!-- 左右两块折线饼图 -->
			<div class="twoBox">
				<!-- 左By Unit 分析 -->
				<div class="charCon leftUnitBox">
					<table class="charOneTable leftTable" cellspacing="0" cellpadding="0">
						<tr>
							<td colspan="7" style="text-align: left;">By Unit 分析</td>
						</tr>
						<!-- 标题 -->
						<tr>
							<td></td>
							<td colspan="5">一个自然年OIT / Sales 趋势分析</td>
							<!-- <td>HTA%</td> -->
						</tr>
						<tr height='30px'></tr>
						<!-- 一行数据 -->
						<tr v-for="(chardata,index) in ChartData" :key="index">
							<td><div class="typeName">{{chardata.ProductName}}</div></td>
							<td colspan="5"> 
								<!-- ECharts 曲线图组件 -->
								<common-line2 :ychart-data1="chardata.ChartData.yOITUnit" :ychart-data2="chardata.ChartData.ySalesUnit" :ids="'OIT'+index" :xchart-data="chardata.ChartData.xDate" autoresize />
							</td>
							<!-- ECharts 饼图组件 -->
							<!-- <td>
								<common-pie :chart-data="chardata[0]" autoresize />
							</td> -->
						</tr>
					</table>
				</div>
				<!-- 左By Unit 分析 end -->
				<!-- 右By Value 分析 -->
				<div class="charCon leftUnitBox">
					<table class="charOneTable leftTable" cellspacing="0" cellpadding="0">
						<tr>
							<td colspan="7" style="text-align: left;">By Value 分析</td>
						</tr>
						<tr>
							<td></td>
							<td colspan="5">一个自然年OIT / Sales 趋势分析</td>
							<!-- <td>HTA%</td> -->
						</tr>
						<tr height='30px'></tr>
						<!-- 一行数据 -->
						<tr v-for="(chardata,index) in ChartData" :key="index">
							<td><div class="typeName">{{chardata.ProductName}} </div></td>
							<td colspan="5"> 
								<!-- ECharts 曲线图组件 -->
								<common-line2 :ychart-data1="chardata.ChartData.yOITValue" :ychart-data2="chardata.ChartData.ySalesValue" :ids="'Sales'+index" :xchart-data="chardata.ChartData.xDate" autoresize />
							</td>
							<!-- ECharts 饼图组件 -->
							<!-- <td>
								<common-pie :chart-data="chardata[0]" autoresize />
							</td> -->
						</tr>
					</table>
				</div>
				<!-- 右By Value 分析 end -->
			</div>
			<!-- 左右两块折线饼图 end-->
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
	<script type="text/javascript" src="component/lineECharts2.js"></script>
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
						// 第二个数组为 曲线图
						[-0.5, -0.1, -0.4, -0.3, -0.1, -0.1, -0.1, -0.2],
						// 正负轴
						10,
					],
					chartData2: [
						// 第一个数组为 饼图
						[{value:305, name:'手机'},
						{value:310, name:'电脑'},],
						// 第二个数组为 曲线图
						[-0.1, -0.8, -0.4, -1, 0, 0.3, 1, 0.8],
						// 正负轴
						-20,
					],
				},
				proDataList:[],
				FCSTDataList:[],
				ChartData:[],
				year:2020
			},
			created: function () {
				this.getProata();
				this.getFCSTData();
			},
			computed:{
				// by unit
				// vstarget%正负轴最大值最小值
				maxOITHtA:function(){
					return _.maxBy(this.proDataList, function(o) { return Math.abs( o.OITUnitTarget  ); }).OITUnitTarget  ;
				},
				minOITHtA:function(){
					return _.minBy(this.proDataList, function(o) { return Math.abs( o.OITUnitTarget  ); }).OITUnitTarget  ;
				},
				maxSalesHtA:function(){
					return _.maxBy(this.proDataList, function(o) { return Math.abs( o.SalesUnitTarget  ); }).SalesUnitTarget  ;
				},
				minSalesHtA:function(){
					return _.minBy(this.proDataList, function(o) { return Math.abs( o.SalesUnitTarget  ); }).SalesUnitTarget  ;
				},
				// vs.2018%正负轴最大值最小值
				maxOITVsYear(){
					return _.maxBy(this.proDataList, function(o) { return Math.abs(o.OITUnitVsYear); }).OITUnitVsYear;
				},
				minOITVsYear(){
					return _.minBy(this.proDataList, function(o) { return Math.abs(o.OITUnitVsYear); }).OITUnitVsYear;
				},
				maxSalesVsYear(){
					return _.maxBy(this.proDataList, function(o) { return Math.abs(o.SalesUnitVsYear); }).SalesUnitVsYear;
				},
				minSalesVsYear(){
					return _.minBy(this.proDataList, function(o) { return Math.abs(o.SalesUnitVsYear); }).SalesUnitVsYear;
				},

				// by value
				// vstarget%正负轴最大值最小值
				maxOITHtAValue:function(){
					return _.maxBy(this.proDataList, function(o) { return Math.abs( o.OITValueTarget  ); }).OITValueTarget  ;
				},
				minOITHtAValue:function(){
					return _.minBy(this.proDataList, function(o) { return Math.abs( o.OITValueTarget  ); }).OITValueTarget  ;
				},
				maxSalesHtAValue:function(){
					return _.maxBy(this.proDataList, function(o) { return Math.abs( o.SalesValueTarget  ); }).SalesValueTarget  ;
				},
				minSalesHtAValue:function(){
					return _.minBy(this.proDataList, function(o) { return Math.abs( o.SalesValueTarget  ); }).SalesValueTarget  ;
				},
				// vs.2018%正负轴最大值最小值
				maxOITVsYearValue(){
					return _.maxBy(this.proDataList, function(o) { return Math.abs(o.OITValueVsYear); }).OITValueVsYear;
				},
				minOITVsYearValue(){
					return _.minBy(this.proDataList, function(o) { return Math.abs(o.OITValueVsYear); }).OITValueVsYear;
				},
				maxSalesVsYearValue(){
					return _.maxBy(this.proDataList, function(o) { return Math.abs(o.SalesValueVsYear); }).SalesValueVsYear;
				},
				minSalesVsYearValue(){
					return _.minBy(this.proDataList, function(o) { return Math.abs(o.SalesValueVsYear); }).SalesValueVsYear;
				}
			},
			mounted: function() {
				
			},
			methods: {
				// 曲线图
				getFCSTData(){  
					var that = this
					const loading = this.$loading({
						lock: true,
						text: ''
					});
					$.ajax({
						url: 'handler/information.ashx?_op=QueryByProduct',
						data: { year: sessionStorage.getItem("selectYear") },
						type: 'POST',
						dataType: "json",
						success: function (data) {
							loading.close();
							if (data.success) {
								that.FCSTDataList=data.data // FCST Accuracy% 曲线图所有数据
								// By Unit 曲线图
								//产品列表
								var g= _.union( _.map(that.FCSTDataList,function(a){return a.ProductName}));
								console.log(g);
								var gx=[];
								for ( var y=0;y<g.length;y++){
									var v= g[y]
									var chart3Data={
									xDate:[],
									yOITUnit:[0,0,0,0,0,0,0,0,0,0,0,0],
									ySalesUnit:[0,0,0,0,0,0,0,0,0,0,0,0],
									yOITValue:[0,0,0,0,0,0,0,0,0,0,0,0],
									ySalesValue:[0,0,0,0,0,0,0,0,0,0,0,0],
									}
									for(var i=0;i<12;i++){
										var month=i+1
										chart3Data.xDate.push(that.year+"-"+month)
									}
									
									for(var i=1 ;i<12;i++){
											var x=_.sumBy(that.FCSTDataList,function(a){if( a.Month==i  && a.ProductName==v) return a.OITUnitYTDActual; return 0})
											chart3Data.yOITUnit[i-1]=x;
											var x1=_.sumBy(that.FCSTDataList,function(a){if( a.Month==i  && a.ProductName==v) return a.SalesUnitYTDActual; return 0})
											chart3Data.ySalesUnit[i-1]=x1;
											var x2=_.sumBy(that.FCSTDataList,function(a){if( a.Month==i  && a.ProductName==v) return a.OITValueYTDActual; return 0})
											chart3Data.yOITValue[i-1]=x2;
											var x3=_.sumBy(that.FCSTDataList,function(a){if( a.Month==i  && a.ProductName==v) return a.SalesValueYTDActual; return 0})
											chart3Data.ySalesValue[i-1]=x3;
									}
								
									gx.push({ProductName:v,ChartData:chart3Data})
									that.ChartData=gx;

								}
							}
						},
						error: function (err) {
							loading.close()
							vue.$message.error(err.msg)
						}
					});
				},
				
				getProata(){  
					var that = this
					const loading = this.$loading({
						lock: true,
						text: ''
					});
					$.ajax({
						url: 'handler/information.ashx?_op=QueryByProduct',
						data: { year: sessionStorage.getItem("selectYear"), month: sessionStorage.getItem("selectMonth") },
						type: 'POST',
						dataType: "json",
						success: function (data) {
							loading.close();
							if (data.success) {
								var AllList=data.data // FCST Accuracy% 曲线图所有数据
								var ProductNames=_.union(_.map(data.data,'ProductName')) //筛选ProductName并去重,ProductName值数据
								_.forEach(ProductNames, a => {
									var b={};
									b.ProductName=a
									// by Unit 
									b.UnitOOH=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.UnitOOH;return 0;})
									b.OITUnitTarget=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.OITUnitTarget;return 0;})
									b.OITUnitYTDActual=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.OITUnitYTDActual;return 0;})
									b.OITUnitTogo=(b.OITUnitTarget-b.OITUnitYTDActual).toFixed(2)
									b.SalesUnitTarget=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.SalesUnitTarget;return 0;})
									b.SalesUnitYTDActual=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.SalesUnitYTDActual;return 0;})
									b.SalesUnitTogo=(b.SalesUnitTarget-b.SalesUnitYTDActual).toFixed(2)								
									// OITUnitTransrate
									b.UnitFunnel=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.UnitFunnel;return 0;})
									if(b.OITUnitTogo!=0 && isNaN(b.OITUnitTogo)==false){
										b.OITUnitTransrate= (b.UnitFunnel/b.OITUnitTogo).toFixed(2)
									}else{
										b.OITUnitTransrate=0
									}
									// OITUnit vs.target%  c/d	
									if(b.OITUnitTarget!=0 && isNaN(b.OITUnitTarget)==false){
										b.OITUnitVsTarget= (b.OITUnitYTDActual/b.OITUnitTarget).toFixed(2) //c/d
									}else{
										b.OITUnitVsTarget=0
									}
									// SalesUnit vs.target%	
									if(b.SalesUnitTarget!=0 && isNaN(b.SalesUnitTarget)==false){
										b.SalesUnitVsTarget= (b.SalesUnitYTDActual/b.SalesUnitTarget).toFixed(2) //c/d
									}else{
										b.SalesUnitVsTarget=0
									}
									// OITUnit vs.2018%	 c/f	
									b.OITUnitYTD=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.OITUnitYTD;return 0;})
									if(b.OITUnitYTD!=0 && isNaN(b.OITUnitYTD)==false){
										b.OITUnitVsYear	= (b.OITUnitYTDActual/b.OITUnitYTD).toFixed(2) //c/f
									}else{
										b.OITUnitVsYear=0
									}
									// SalesUnit vs.2018%		
									b.SalesUnitYTD=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.SalesUnitYTD;return 0;})
									if(b.SalesUnitYTD!=0 && isNaN(b.SalesUnitYTD)==false){
										b.SalesUnitVsYear= (b.SalesUnitYTDActual/b.SalesUnitYTD).toFixed(2) //c/f
									}else{
										b.SalesUnitVsYear=0
									}

									// by Value
									b.ValueOOH=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.ValueOOH;return 0;})
									b.OITValueTarget=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.OITValueTarget;return 0;})
									b.OITValueYTDActual=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.OITValueYTDActual;return 0;})
									b.SalesValueTarget=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.SalesValueTarget;return 0;})
									b.SalesValueYTDActual=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.SalesValueYTDActual;return 0;})
									b.OITValueTogo=(b.OITValueTarget-b.OITValueYTDActual).toFixed(2)
									b.SalesValueTogo=(b.SalesValueTarget-b.SalesValueYTDActual).toFixed(2)
									// OITValueTransrate
									b.ValueFunnel=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.ValueFunnel;return 0;})
									if(b.OITValueTogo!=0 && isNaN(b.OITValueTogo)==false){
										b.OITValueTransrate= (b.ValueFunnel/b.OITValueTogo).toFixed(2)
									}else{
										b.OITValueTransrate=0
									}
									// OITValue vs.target%  c/d	
									if(b.OITValueTarget!=0 && isNaN(b.OITValueTarget)==false){
										b.OITValueVsTarget= (b.OITValueYTDActual/b.OITValueTarget).toFixed(2) //c/d
									}else{
										b.OITValueVsTarget=0
									}
									// SalesValue vs.target%	
									if(b.SalesValueTarget!=0 && isNaN(b.SalesValueTarget)==false){
										b.SalesValueVsTarget= (b.SalesValueYTDActual/b.SalesValueTarget).toFixed(2) //c/d
									}else{
										b.SalesValueVsTarget=0
									}
									// OITValue vs.2018%	 c/f	
									b.OITValueYTD=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.OITValueYTD;return 0;})
									if(b.OITValueYTD!=0 && isNaN(b.OITValueYTD)==false){
										b.OITValueVsYear	= (b.OITValueYTDActual/b.OITValueYTD).toFixed(2) //c/f
									}else{
										b.OITValueVsYear=0
									}
									// SalesValue vs.2018%		
									b.SalesValueYTD=_.sumBy(AllList, function(o){if(a==o.ProductName)return  o.SalesValueYTD;return 0;})
									if(b.SalesValueYTD!=0 && isNaN(b.SalesValueYTD)==false){
										b.SalesValueVsYear= (b.SalesValueYTDActual/b.SalesValueYTD).toFixed(2) //c/f
									}else{
										b.SalesValueVsYear=0
									}
									
									that.proDataList.push(b)
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