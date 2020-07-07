<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/adnim/SiteAdmin.Master" CodeBehind="SalesPromotion.aspx.cs" Inherits="ACETemplate.adnim.SalesPromotion" %>

<%@ Register Src="~/adnim/include/HeadNavigation.ascx" TagPrefix="uc1" TagName="HeadNavigation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<link href="css/element-ui.css" rel="stylesheet" />
	<link href="css/salesPromotion.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

	<uc1:HeadNavigation runat="server" ID="HeadNavigation" Level2Name="报表管理" Level3Name="其他分析" />
	<div class="page-content">
		<div id="app" style="margin-top:10px;margin-bottom:10px;padding:0;border:1px solid white" v-cloak>
			<el-button :class="{'active':isPage==0}" @click="showPage(0)">促销使用</el-button>
			<el-button :class="{'active':isPage==1}" @click="showPage(1)">特价使用</el-button>
			<el-button :class="{'active':isPage==2}" @click="showPage(2)">阶梯价使用</el-button>
			<div class="reportArea">
				<!-- <div v-show="isPage==0" id="page0"> -->
					<div id="page0">
						<el-row :gutter="20">
							<el-col :span="24">
								<div class="leftTop">
									<p class="tableTile title">促销计划使用详情</p>
									<!-- 表格 -->
									<el-table
									:data="tableData1"
									:span-method="objectSpanMethod"
									style="width: 100%" class="leftTable"
									show-summary>
									<el-table-column
										prop="Segment"
										label="Segment"
										width="">
										</el-table-column>
										<el-table-column
										prop="Promotion"
										label="Promotion"
										width="">
										</el-table-column>
									<el-table-column label="Region">
										<el-table-column
											prop="EastQty"
											label="East"
											>
										</el-table-column>
										<el-table-column
											prop="NorthQty"
											label="North"
											width="">
										</el-table-column>
										<el-table-column
										prop="SouthQty"
										label="South"
										width="">
										</el-table-column>
										<el-table-column
											prop="WestQty"
											label="West"
											width="">
										</el-table-column>
										<!-- label="L0L1" -->
										<el-table-column
										prop="PrivateQty"
										label="Private"
										width="">
										</el-table-column>
									</el-table-column>
									<el-table-column
										prop="totalPromotionQty"
										label="Total"
										width="">
										</el-table-column>
										<el-table-column
										prop="totalRegionQty"
										label="2019 Promotion Total"
										width="">
										</el-table-column>
									<%--<el-table-column
										prop="totalQtyPercent"
										label="Usage Rate"
										width="">
										</el-table-column>
										<el-table-column
										prop="zip"
										label="Growth VS Y2018"
										width="">
										</el-table-column>--%>
								</el-table>
								</div>
							</el-col>
						</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<div class="grid-content bg-purple">
								<div id="page1Bar1" class="chart"></div>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content bg-purple">
								<div id="page1Line" class="chart"></div>
							</div>
						</el-col>
					</el-row>
					<!-- <el-row :gutter="20">
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<div id="table" class="chart">
									<p class="tableTile">促销使用详情表</p>
									<ul>
										<li v-for="(item,index) in tableData">
											{{item}}
										</li>
									</ul>
								</div>
							</div>
						</el-col>
						<el-col :span="16">
							<div class="grid-content bg-purple">
								<div id="page1Bar2" class="chart"></div>
							</div>
						</el-col>
					</el-row> -->
				</div>
				<!-- <div v-show="isPage==1" id="page1"> -->
				<div id="page1">
					<el-row :gutter="20">
						<el-col :span="18">
							<div class="leftTop">
								<p class="tableTile title">Special Price Applied by Region</p>
								<!-- 表格 -->
								 <el-table
									:data="tableData2"
									style="width: 100%" class="leftTable"
									show-summary>
									<el-table-column label="">
										<el-table-column
										prop="date"
										label="Region"
										>
										</el-table-column>
									</el-table-column>
									<el-table-column label="By Qty(Unit)">
										<el-table-column
											prop="name"
											label="2018 SP"
											>
										</el-table-column>
										<el-table-column
											prop="province"
											label="2018 TT"
											width="">
										</el-table-column>
										<el-table-column
										prop="zip"
										label="SP/TT"
										width="">
										</el-table-column>
										<el-table-column
										prop="city"
										label="2017 SP"
										width="">
										</el-table-column>
										<el-table-column
										prop="address"
										label="2018 vs 2017"
										width="">
										</el-table-column>
									</el-table-column>
									<el-table-column label="By Value(KUSD)">
										<el-table-column
										prop="city"
										label="2018 SP"
										width="">
										</el-table-column>
										<el-table-column
										prop="address"
										label="2018 TT"
										width="">
										</el-table-column>
										<el-table-column
										prop="zip"
										label="SP/TT"
										width="">
										</el-table-column>
										<el-table-column
										prop="city"
										label="2017 SP"
										width="">
										</el-table-column>
										<el-table-column
										prop="address"
										label="2018 vs 2017"
										width="">
										</el-table-column>
									</el-table-column>
								</el-table>
								<div id="page2Pie" class="chart chart2"></div>
								<div id="page2Bar1" class="chart chart2"></div>
							</div>
							<div class="leftBottom">
								<p class="tableTile title">Special Price Used by Clinical</p>
								<!-- 表格 -->
								<el-table
									:data="tableData1"
									style="width: 100%" class="leftTable leftBottomTable"
									show-summary>
									<el-table-column label="">
										<el-table-column label="" prop="name"></el-table-column>
									</el-table-column>
									<el-table-column label="By Qty(Unit)">
										<el-table-column
											prop="name"
											label="2018 SP"
											>
										</el-table-column>
										<el-table-column
											prop="province"
											label="2018 TT"
											width="">
										</el-table-column>
										<el-table-column
										prop="zip"
										label="SP/TT"
										width="">
										</el-table-column>
									</el-table-column>
									<el-table-column label="By Value(KUSD)">
										<el-table-column
										prop="city"
										label="2018 SP"
										width="">
										</el-table-column>
										<el-table-column
										prop="address"
										label="2018 TT"
										width="">
										</el-table-column>
										<el-table-column
										prop="zip"
										label="SP/TT"
										width="">
										</el-table-column>
									</el-table-column>
									<el-table-column
										prop="address"
										label="2018 TT"
										width="">
										</el-table-column>
										<el-table-column
										prop="zip"
										label="SP/TT"
										width="">
										</el-table-column>
								</el-table>
								<div id="page2Bar2" class="chart"></div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="right">
								<p class="rightTitle">代理商使用特价汇总</p>
								<p class="textHeader"><span>Dlealer Name</span><span class="rightText">Qty</span></p>
								<ul>
									<li v-for="item in rightData">
										<p class="textSubHeader"><span>{{item.Region}}</span><span class="rightText">{{item.totalregion}}</span></p>
										<ul class="textContent">
											<li v-for="i in item.list">
												<span>{{i.DealerName}}</span><span class="rightText">{{i.total}}</span>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>
				</div>
				<div id="page2">
					<el-row :gutter="20">
						<el-col :span="14">
                            <div>
							<div class="leftTop">
								<p class="tableTile title">Public Dealer BCDE Price by Region</p>
								<!-- 表格 -->
								 <el-table
									:data="publiclist"
									style="width: 100%" class="leftTable"
									show-summary>
									<el-table-column label="">
										<el-table-column
										prop="Region"
										label="Region"
										>
										</el-table-column>
									</el-table-column>
									<el-table-column label="By Qty(Unit)">
										<el-table-column
											prop="qtybcdetotal"
											label="BCDE"
											>
										</el-table-column>
										<el-table-column
											prop="qtytotal"
											label="Total"
											width="">
										</el-table-column>
										<el-table-column
										prop="qtybcderate"
										label="BCDE %"
										width="">
										</el-table-column>
									</el-table-column>
									<el-table-column label="By Value(KUSD)">
										<el-table-column
										prop="kusdbcdetotal"
										label="BCDE"
										width="">
										</el-table-column>
										<el-table-column
										prop="kusdtotal"
										label="Total"
										width="">
										</el-table-column>
										<el-table-column
										prop="kusdbcderate"
										label="BCDE %"
										width="">
										</el-table-column>
									</el-table-column>
								</el-table>
							</div>
                            </div>
                            <div>
							<div class="leftTop">
								<p class="tableTile title">Private Dealer BCDE Price by Region</p>
								<!-- 表格 -->
								 <el-table
									:data="privatelist"
									style="width: 100%" class="leftTable"
									show-summary>
									<el-table-column label="">
										<el-table-column
										prop="Region"
										label="Region"
										>
										</el-table-column>
									</el-table-column>
									<el-table-column label="By Qty(Unit)">
										<el-table-column
											prop="qtybcdetotal"
											label="BCDE"
											>
										</el-table-column>
										<el-table-column
											prop="qtytotal"
											label="Total"
											width="">
										</el-table-column>
										<el-table-column
										prop="qtybcderate"
										label="BCDE %"
										width="">
										</el-table-column>
									</el-table-column>
									<el-table-column label="By Value(KUSD)">
										<el-table-column
										prop="kusdbcdetotal"
										label="BCDE"
										width="">
										</el-table-column>
										<el-table-column
										prop="kusdtotal"
										label="Total"
										width="">
										</el-table-column>
										<el-table-column
										prop="kusdbcderate"
										label="BCDE %"
										width="">
										</el-table-column>
									</el-table-column>
								</el-table>
							</div>
                            </div>
						</el-col>
						<el-col :span="10">
							<div class="right" style="height:800px;overflow:auto">
								<p class="rightTitle">代理商使用阶梯价订单分析</p>
								<p class="textHeader"><span>Region/Dealer </span><span class="rightText"><span>Qty</span><span>Value(KUSD)</span></span></p>
								<ul>
									<li v-for="item in page2RightData">
                                        <p class="textSubHeader">{{item.Region}}<span class="rightText"><span>{{item.totalregion}}</span><span>{{item.totalregion1}}</span></span></p>
                                        <template v-if="item.publist&&item.publist.length>0">
                                        <p class="textSubHeader headerleft">public<span class="rightText"><span>{{item.publictotal}}</span><span>{{item.publictotal1}}</span></span></p>
<%--										<p class="textSubHeader"><span>{{item1.DealerName}}</span><span class="rightText"><span>{{item1.QTY}}</span><span>{{item.value2}}</span><span>{{item.value3}}</span></span></p>--%>
										<ul class="textContent">
											<li v-for="item1 in item.publist">
												<span>{{item1.DealerName}}</span><span class="rightText"><span>{{item1.total}}</span><span>{{item1.total1}}</span></span>
											</li>
										</ul>
                                        </template>
                                        <template v-if="item.prilist&&item.prilist.length>0">
                                         <p class="textSubHeader headerleft">private<span class="rightText"><span>{{item.privatetotal}}</span><span>{{item.privatetotal1}}</span></span></p>
<%--										<p class="textSubHeader"><span>{{item.title}}</span><span class="rightText"><span>{{item.value1}}</span><span>{{item.value2}}</span><span>{{item.value3}}</span></span></p>--%>
										<ul class="textContent">
											<li v-for="item1 in item.prilist">
												<span>{{item1.DealerName}}</span><span class="rightText"><span>{{item1.total}}</span><span>{{item1.total1}}</span></span>
											</li>
										</ul>
                                        </template>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>
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

	<script>
		var page1Chart1 = '',
			page1Chart2 = '',
			// page1Chart3 = '',
			page2Chart1 = '',
			page2Chart2 = '',
			page2Chart3 = '';
		window.onresize = function () {
			page1Chart1.resize();
			page1Chart2.resize();
			// page1Chart3.resize();
			page2Chart1.resize();
			page2Chart2.resize();
			page2Chart3.resize();
		}
		var app = new Vue({
			el: "#app",
			data: {
				isPage:0,
				myChart2Legend:['CV', 'GI', 'POC', 'WHC'],
				myChart2SecendX:['East', 'East', 'North', 'North', 'South', 'South', 'West', 'West', 'NTA-L0/L1', 'NTA-L0/L1'],
				size:2,
				myChart2DateY: [
					[750, 800, 780, 800, 780, 500, 800, 780, 500, 800],// 第1组
					[750, 400, 750, 750, 500, 400, 800, 500, 400, 800],// 第2组
					[600, 400, 200, 500, 250, 500, 500, 250, 500, 500],// 第3组
					[200, 310, 300, 200, 250, 300, 250, 250, 300, 250],// 第4组
				],
				chart2Date:{
					legendDate:['CV', 'GI', 'POC','WHC'],
					xDate:[
						"Q1", "Q2", "Q3", "Q4"
					],
					value:[
						[160, 150, 101, 52],
						[200, 290, 163, 57],
						[4, 15, 15, 12],
						[90, 283, 96, 44]
					],
				},
				tableData: [87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5, 87.5],
				tableData1: [],
			    tableData2:[],
				publiclist: [],
				privatelist: [],
				rightData:[],
				page2RightData:[]
			},
			computed: {
				myChart2DateMax() {
					var maxArr=[];
					var sumArr=[];
					this.myChart2DateY.forEach((i,v)=>{ 
					
						i.forEach((c,d)=>{
							sumArr[d]=c+sumArr[d] || c+0
						}); 
						maxArr[v]={index:sumArr.indexOf(Math.max(...sumArr)),value:Math.max(...sumArr)}
					})
					return maxArr
				},
			},
			created:function(){
			    this.getPromotion();
			},
			mounted: function () {
				//this.loadPage1Date1(this.chart2Date);
				//this.loadPage1Date2(this.myChart2Legend,this.myChart2SecendX);
				// this.loadPage1Date3();
			},
			methods: {
				showPage(index){
					// page1
					
					this.isPage=index;
					// setTimeout(()=>{
						if(index==0){
							document.getElementById('page0').style.display='block';
						document.getElementById('page1').style.display='none';
						document.getElementById('page2').style.display='none';
						
						this.getPromotion();
						    // this.loadPage1Date3();
					}else if(index==1){
						document.getElementById('page0').style.display='none';
						document.getElementById('page1').style.display='block';
						document.getElementById('page2').style.display='none';
						//this.loadPage2Date1();
						//this.loadPage2Date2();
						//this.loadPage2Date3();
						this.getQueryDiscount(sessionStorage.getItem("selectMonth"))
						this.getQueryDiscount("")
					}
					else if(index==2){
						document.getElementById('page0').style.display='none';
						document.getElementById('page1').style.display='none';
						document.getElementById('page2').style.display = 'block';
						this.getBC()
					}
					// },1000)
				},
				getPromotion(){
				    const loading = this.$loading({
				        lock: true,
				        text: ''
				    });
				    $.ajax({
				        url: 'handler/information.ashx?_op=QueryPromotion',
				        data: { year: sessionStorage.getItem("selectYear"), month: sessionStorage.getItem("selectMonth")},
				        type: 'POST',
				        dataType: "json",
				        success: function (data) {
				            loading.close()
				            if (data.success) {
				                

				                app.loadPage1Date1(data.data);
								app.loadPage1Date2(app.myChart2Legend, app.myChart2SecendX);
								app.loadTableData1(data.data);
				                //app.tableData1 = data.data
				            } else {
				                app.$message.error(data.msg)
				            }
				        },
				        error: function (err) {
				            loading.close()
				            app.$message.error(err.msg)
				        }
				    });
				},
				objectSpanMethod({ row, column, rowIndex, columnIndex }) {
					if (columnIndex === 0 || columnIndex === 8 || columnIndex === 9) {
					if (row.rowspan) {
						// return {
						// rowspan: 2,
						// colspan: 1
						// };
						return {
							rowspan:row.rowspan,
							colspan:row.colspan
						}
					} else {
						return {
						rowspan: 0,
						colspan: 0
						};
					}
					}},
				loadTableData1(da){
					var data = _.sortBy(da, function (item) {
				        return item.Segment;
					});
					 data = _(data).groupBy(item => {return 'key'+item.Promotion+item.Segment}).map((items, Promotion,Segment) => {
				        return {
							Promotion: items[0].Promotion,
							Segment:items[0].Segment,
							list: items,
							EastQty:_.sumBy(items, function (item1) { {
								if(/CHINA_EAST/i.test(item1.Region))return item1.Qty;else return 0;
							} }),
							WestQty:_.sumBy(items, function (item1) { {
								if(/CHINA_WEST/i.test(item1.Region))return item1.Qty;else return 0;
							} }),
							SouthQty:_.sumBy(items, function (item1) { {
								if(/CHINA_SOUTH/i.test(item1.Region))return item1.Qty;else return 0;
							} }),
							NorthQty:_.sumBy(items, function (item1) { {
								if(/CHINA_NORTH/i.test(item1.Region))return item1.Qty;else return 0;
							} }),
							PrivateQty:_.sumBy(items, function (item1) { {
								if(/CHINA_PRIVATE/i.test(item1.Region))return item1.Qty;else return 0;
							} }),
							totalPromotionQty:_.sumBy(items, function (item1) { {
								return item1.Qty;
							} }),

				        }
					}).value()
					// var data2 =data;
					var data2 = _(data).groupBy(item => item.Segment).map((items, key) => {
				        return {
				            Segment: key,
				            list: items,

				        }
					}).value()
					var totalQty=_.sumBy(data, function (item1) { 
							return item1.totalPromotionQty;
						 })
					_.forEach(data2, function (item, index) {
						item.list[0].rowspan=item.list.length;
						item.list[0].colspan=1;
						item.list[0].totalRegionQty=_.sumBy(item.list, function (item1) { {
								return item1.totalPromotionQty;
							} });
						item.list[0].totalQtyPercent=(
							(_.sumBy(item.list, function (item1) { {
							return item1.totalPromotionQty;
						} })) / totalQty*100
						).toFixed(2)+'%'
					})
					console.log(data,'datadata')
					console.log(data2,'datadata')
					app.tableData1=data;
					// _.forEach(data, function (item, index) {
					// 	item.list = _(item.list).groupBy(item => item.Region).map((items, Region) => {
					// 		return {
					// 			AreaName: Region,
					// 			AreaNamelist: items
					// 		}
					// 	}).value()
					// 	_.forEach(item.list, function (item, index) {
					// 		item.total = _.sumBy(item.AreaNamelist, function (item1) { return item1.Qty; })
					// 	})
					// 	item.totalArea = _.sumBy(item.list, function (item1) { return item1.total.toFixed(2)});//区域总数
						
					// })
				    // data = _.sortBy(data, function (item) {
				    //     return item.Segment;
					// });
					// console.log(data,'data')
		// 			tableData: [{
        //   id: '12987122',
        //   name: '王小虎',
        //   amount1: '234',
        //   amount2: '3.2',
        //   amount3: 10
        // }, {
        //   id: '12987123',
        //   name: '王小虎',
        //   amount1: '165',
        //   amount2: '4.43',
        //   amount3: 12
        // }, {
        //   id: '12987124',
        //   name: '王小虎',
        //   amount1: '324',
        //   amount2: '1.9',
        //   amount3: 9
        // }, {
        //   id: '12987125',
        //   name: '王小虎',
        //   amount1: '621',
        //   amount2: '2.2',
        //   amount3: 17
        // }, {
        //   id: '12987126',
        //   name: '王小虎',
        //   amount1: '539',
        //   amount2: '4.1',
        //   amount3: 15
        // }]
				},
				getQueryDiscount(month) {
				    const loading = this.$loading({
				        lock: true,
				        text: ''
				    });
				    $.ajax({
				        url: 'handler/information.ashx?_op=QueryDiscountPie',
				        data: { year: sessionStorage.getItem("selectYear"), month: month },
				        type: 'POST',
				        dataType: "json",
				        success: function (data) {
				            loading.close()
				            if (data.success) {
				                //app.tableData2 = _(data.data).groupBy(item => item.Segment).map((items, Segment) => {
				                //    return {
				                //        Segment: Segment,
				                //        list: items
				                //    }
				                //}).value()
				                //console.log(app.tableData1)


				                //右代理商按区域Region区分
				                var rightdata = _(data.data).groupBy(item => item.Region).map((items, Region) => {
				                    return {
				                        Region: Region,
				                        list: items
				                    }
				                }).value()
				                
				                _.forEach(rightdata, function (item, index) {
				                    item.list = _(item.list).groupBy(item => item.DealerName).map((items, DealerName) => {
				                        return {
				                            DealerName: DealerName,
				                            Regionlist: items
				                        }
				                    }).value()
				                    _.forEach(item.list, function (item, index) {
				                        item.total = _.sumBy(item.Regionlist, function (item1) { return item1.Qty ? item1.Qty : 0; })
				                    })
				                    item.totalregion = _.sumBy(item.list, function (item1) { return item1.total});//区域总数
                                   
				                })
                                app.rightData = rightdata
                                app.loadPage2Date1(rightdata)
                                if(month==""){
                                    app.loadPage2Date2(data.data)
                                }
                                app.loadPage2Date3(data.data)

				            } else {
				                app.$message.error(data.msg)
				            }
				        },
				        error: function (err) {
				            loading.close()
				            app.$message.error(err.msg)
				        }
				    });
				},
				getBC() {
				    const loading = this.$loading({
				        lock: true,
				        text: ''
				    });
				    $.ajax({
				        url: 'handler/information.ashx?_op=QueryBCInfo',
				        data: { year: sessionStorage.getItem("selectYear"), month: sessionStorage.getItem("selectMonth")},
				        type: 'POST',
				        dataType: "json",
				        success: function (data) {
				            loading.close()
				            if (data.success) {
                                //筛选public和private
                                //public 
				                let publiclist = _.filter(data.data, function (item) {
				                    return item.PublicORPrivate == "Public"
				                })
				                //按区域Region重新组合
				                publiclist = _(publiclist).groupBy(item => item.Region).map((items, Region) => {
				                    return {
				                        Region: Region,
				                        list: items
				                    }
				                }).value()
				                _.forEach(publiclist, function (item, index) {
                                    //筛选public中BCDE
				                let pubbcdelist = _.filter(item.list, function (item1) {
				                    return item1.BCLevel.toString().indexOf("B") > -1 || item1.BCLevel.toString().indexOf("C") > -1
                                    || item1.BCLevel.toString().indexOf("D") > -1 || item1.BCLevel.toString().indexOf("E") > -1
				                })
                                  //Qty
				                item.qtybcdetotal = _.sumBy(pubbcdelist, function (item) { return item.QTY?item.QTY:0; });
				                item.qtytotal = _.sumBy(item.list, function (item) { return item.QTY ? item.QTY : 0; });
				                item.qtybcderate = ((item.qtybcdetotal / item.qtytotal) * 100).toFixed(2);
                                  //KUSD
				                item.kusdbcdetotal = _.sumBy(pubbcdelist, function (item) { return item.NetPrice?item.NetPrice:0; });
				                item.kusdtotal = _.sumBy(item.list, function (item) { return item.NetPrice ? item.NetPrice : 0; });
				                item.kusdbcderate = item.kusdtotal==0?0.00:((item.kusdbcdetotal / item.kusdtotal) * 100).toFixed(2);
				                })
				                //Private
				                let privatelist = _.filter(data.data, function (item) {
				                    return item.PublicORPrivate == "Private"
				                })
				                privatelist = _(privatelist).groupBy(item => item.Region).map((items, Region) => {
				                    return {
				                        Region: Region,
				                        list: items
				                    }
				                }).value()
				                _.forEach(privatelist, function (item, index) {
				                    let pribcdelist = _.filter(item.list, function (item1) {
				                        return item1.BCLevel.toString().indexOf("B") > -1 || item1.BCLevel.toString().indexOf("C") > -1
                                        || item1.BCLevel.toString().indexOf("D") > -1 || item1.BCLevel.toString().indexOf("E") > -1
				                    })
				                    //Qty
				                    item.qtybcdetotal = _.sumBy(pribcdelist, function (item) { return item.QTY; });
				                    item.qtytotal = _.sumBy(item.list, function (item) { return item.QTY; });
				                    item.qtybcderate = ((item.qtybcdetotal / item.qtytotal) * 100).toFixed(2);
				                    //KUSD
				                    item.kusdbcdetotal = _.sumBy(pribcdelist, function (item) { return item.NetPrice ? item.NetPrice : 0; });
				                    item.kusdtotal = _.sumBy(item.list, function (item) { return item.NetPrice ? item.NetPrice : 0; });
				                    item.kusdbcderate = item.kusdtotal == 0 ? 0.00 : ((item.kusdbcdetotal / item.kusdbcderate) * 100).toFixed(2) ;
				                })

				                //右代理商
				                //按区域Region重新组合
				                var rightdata = _(data.data).groupBy(item => item.Region).map((items, Region) => {
				                    return {
				                        Region: Region,
				                        list: items
				                    }
				                }).value()
				                _.forEach(rightdata, function (item, index) {
                                    //区域总共
				                    item.totalregion = _.sumBy(item.list, function (item1) { return item1.QTY ? item1.QTY : 0; })//区域总数
				                    item.totalregion1 = _.sumBy(item.list, function (item1) { return item1.NetPrice ? item1.NetPrice : 0; })
                                    //public
				                    item.publist = _.filter(item.list, function (item) {
				                        return item.PublicORPrivate == "Public"
				                    })
				                    item.publist = _(item.publist).groupBy(item => item.DealerName).map((items, DealerName) => {
				                        return {
				                            DealerName: DealerName,
				                            Regionlist: items
				                        }
				                    }).value()
				                    _.forEach(item.publist, function (item, index) {
				                        item.total = _.sumBy(item.Regionlist, function (item1) { return item1.QTY ? item1.QTY : 0; })
				                        item.total1 = _.sumBy(item.Regionlist, function (item1) { return item1.NetPrice ? item1.NetPrice : 0; })
				                    })

                                    //public总共
				                    item.publictotal = _.sumBy(item.publist, function (item1) { return item1.total })
				                    item.publictotal1 = _.sumBy(item.publist, function (item1) { return item1.total1})
				                    
				                    item.prilist = _.filter(item.list, function (item) {
				                        return item.PublicORPrivate == "Private"
				                    })
				                    //按代理商DealerName重新组合
				                    item.prilist = _(item.prilist).groupBy(item => item.DealerName).map((items, DealerName) => {
				                        return {
				                            DealerName: DealerName,
				                            Regionlist: items
				                        }
				                    }).value()
				                    //单个代理商DealerName总数
				                    _.forEach(item.prilist, function (item, index) {
				                        item.total = _.sumBy(item.Regionlist, function (item1) { return item1.QTY ? item1.QTY : 0; })
				                        item.total1 = _.sumBy(item.Regionlist, function (item1) { return item1.NetPrice ? item1.NetPrice : 0; })
				                    })
                                    //private总共
				                    item.privatetotal = _.sumBy(item.prilist, function (item1) { return item1.total })
				                    item.privatetotal1 = _.sumBy(item.prilist, function (item1) { return item1.total1})
				                })
				                app.publiclist = publiclist
				                app.privatelist = privatelist
				                app.page2RightData = rightdata
				            } else {
				                app.$message.error(data.msg)
				            }
				        },
				        error: function (err) {
				            loading.close()
				            app.$message.error(err.msg)
				        }
				    });
				},
				loadPage1Date1(da) {
				    var data = _(da).groupBy(item => item.Segment).map((items, Segment) => {
				        return {
				            Segment: Segment,
				            list: items,

				        }
				    }).value()
				    data = _.sortBy(data, function (item) {
				        return item.Segment;
				    });
				    _.forEach(data, function (item, index) {
				        item.list = _(item.list).groupBy(item1 => item1.Quarter).map((items, Quarter) => {
				            return {
				                Quarter: Quarter,
				                Qlist: items
				            }
				        }).value()
				        item.list = _.sortBy(item.list, function (item) {
				            return item.Quarter;
				        });
				    })
				    
				    var datas=[];
				    for (var m = 0; m < data.length; m++) {
				        var data1=[]
				        for (var i = 0; i < data[m].list.length; i++) {//季度list
				            data1.push(_.sumBy(data[m].list[i].Qlist, function (item) { return item.Qty }))
				        }
				        while (data1.length < 4) {
				            data1.push(0)
				        }
				        datas.push(data1)
				        
				    }
				    let tabelNum = this.chart2Date.legendDate.length
					page1Chart1 = echarts.init(document.getElementById('page1Line'), 'light');
					this.chart2Date.legendDate = _.map(data, 'Segment')
					this.chart2Date.xDate = ["Q1", "Q2", "Q3", "Q4"]
					this.chart2Date.value = datas
					lineList = this.getTableLine(tabelNum);
					var t = this.chart2Date.legendDate.join('\n');
				    t = "\n" +"\n"+ t;
					$("#page1Line").height(500 + tabelNum* 20);
					var seriesDate=[]
					this.chart2Date.legendDate.forEach((i, index) => {
						seriesDate[index]={
								name: i,
								type: 'line',
								data: this.chart2Date.value[index]
							}
					})
					// 指定图表的配置项和数据
					var option1 = {
						backgroundColor: 'white',  //背景色
						title: [{  //图表标题
							text: 'Promotion Used by Quarter',   //文字标题
							textStyle: {
								color: 'black'    //文字颜色
							},
							left: 'center',   //标题水平位置
						},
						{
								text: t,
								top: 342,
								left: 20,
								verticalAlign: 'top',

								textStyle: {
									lineHeight: 20,
									fontSize: 13,
									fontWeight: 'normal',
									formatter: function (value) {
										return '{t1|' + (value+"").substr(0,20) + '}';
										return (value + "").substr(0, 20);
									},
									rich: {
										table: {
											align: 'center'
										}
									}
								}
							}
						],
						tooltip: {  //hover提示
						},
						legend: {
							bottom:0,
							left:'center',
							data: this.chart2Date.legendDate
						},
						grid: {
							// left: '3%',
							// right: '4%',
							// bottom: this.size *20 +20+10, //'3%',
							// containLabel: true
							left: '10%',
							right: '4%',
							bottom: tabelNum *20+40,
						},
						xAxis: {
						    data: this.chart2Date.xDate,
							boundaryGap: true, //横轴坐标点由中间变为两端,适用折线
							axisTick: {
						        // length: this.size*42+20+20
								length: tabelNum*20+5
						    },
							axisLabel: {
								interval:0,
								// rotate :45,
								// margin:2,
								textStyle:{
									// color:"red",
									fontSize:12,
									fontWeight:'bolder',
								},
						        formatter: function (value, index) {
                                    //索引值
						            var ts = [];
						            ts.push("{t|" +  value + "}")
						            for (var i = 0; i < app.chart2Date.legendDate.length; i++) {
						                 ts.push("{t|" + seriesDate[i].data[index] + "}")
						               // ts.push(  series[i].data[index] )
						            }
						            return ts.join("\n");
						            return '{t|' + value +
                                        '}\n{t|' +0+
                                        '}\n{t|' + 0+
                                        '}\n{table|' + 0+
                                        '%}\n{table|' + 0+ '%}';
						        },
						        rich: {
						            t: {
						                lineHeight: 20,
						                align: 'center',
                                        //max:60,
                                        //width:20
						            },
						            t1: {
					                lineHeight: 20,
					                align: 'right',
						                            //max:60,
						                            //width:20
					                }
                                    
						        }
						    }
						},
						
						yAxis:{
								type: 'value'
							}
						,
						series: seriesDate,
						graphic: lineList
					};
					// 使用刚指定的配置项和数据显示图表。
					page1Chart1.setOption(option1);
				},
				getTableLine(num) {
				    var list = [];
				    // var bottom =this.size*20+20+20-10;
					var bottom =num*20+15;
					// var bottom =150;
				    var height = 20;
				    for (var i = 0; i < num; i++) {
				        list.push({
				            type: 'line',
				            bottom: bottom - i * height,
				            right:20,
							left:20,
				            style: {
				                fill: '#333'
				            },
				            shape: {
				                x1: 0,
				                y1: 0,
				                x2: '1000',
								y2: 0,
				            }

				        });
				    }
				    return list;
				},
				loadPage1Date2(myChart2Legend,myChart2SecendX) {
					let tabelNum=6;
					// lineList = this.getTableLine(this.size+4);
					lineList = this.getTableLine(tabelNum);
					var t = myChart2Legend.join('\n');
				    t = "\n" +"\n"+ t;
					// $("#page1Bar1").height(500 + this.size* 20);
					$("#page1Bar1").height(500 + tabelNum* 20);
					page1Chart2 = echarts.init(document.getElementById('page1Bar1'), 'light');
					var seriesDate=[];
					myChart2Legend.forEach((i,index)=>{
						seriesDate[index]={
								name: i,
								type: 'bar',
								stack: '总量',
								data: this.myChart2DateY[index],
								// markPoint: {
								// 	data: [
								// 		// { type: 'max', name: '最大值' },
								// 		{name: '最大累计值', value: this.myChart2DateMax[index].value, xAxis: this.myChart2DateMax[index].index, yAxis: this.myChart2DateMax[index].value}
								// 	]
								// }
							}
					})
					
					var option2 = {
						title: [
							{  //图表标题
								text: 'Promotion Used by Region 2019 VS 2018',   //文字标题
								textStyle: {
									color: 'black'    //文字颜色
								},
								left: 'center',   //标题水平位置
							},
							{
								text: t,
								top: 462,
								left: 20,
								verticalAlign: 'top',

								textStyle: {
									lineHeight: 20,
									fontSize: 13,
									fontWeight: 'normal',
									formatter: function (value) {
										return '{t1|' + (value+"").substr(0,20) + '}';
										return (value + "").substr(0, 20);
									},
									rich: {
										table: {
											align: 'center'
										}
									}
								}
							}
						],
						tooltip: {
							trigger: 'axis',
							axisPointer: {            // 坐标轴指示器，坐标轴触发有效
								type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						legend: {
							data: myChart2Legend,
							// top: 20,
							// right: 0,
							bottom:10,
							left:'center'
						},
						grid: {
							left: '10%',
							right: '4%',
							bottom: tabelNum *20+40,
							// bottom: this.size *20 +20+15+20, //'3%',
							// containLabel: true
						},
						xAxis: {
							type: 'category',
							data: ['2019', '2018', '2019', '2018', '2019', '2018', '2019','2018', '2019','2018'],
							axisTick: {
								length: tabelNum*20+5
						        // length: this.size*42+20+20
						    },
							axisLabel: {
								interval:0,
								// rotate :45,
								// margin:2,
								textStyle:{
									// color:"red",
									fontSize:12,
									fontWeight:'bolder',
								},
						        formatter: function (value, index) {
                                    //索引值
						            var ts = [];
						            ts.push("{t|" +  value + "}")
									ts.push("{t|" +  myChart2SecendX[index] + "}")
						            for (var i = 0; i < myChart2Legend.length; i++) {
						                 ts.push("{t|" + seriesDate[i].data[index] + "}")
						               // ts.push(  series[i].data[index] )
						            }
						          //  ts.push("" + series[series.length - 1].data[index] + "")
						            // ts.push("{t|" + seriesDate[seriesDate.length-1].data[index] + "%}")
						            return ts.join("\n");
						            return '{t|' + value +
                                        '}\n{t|' +0+
                                        '}\n{t|' + 0+
                                        '}\n{table|' + 0+
                                        '%}\n{table|' + 0+ '%}';
						        },
						        rich: {
						            t: {
						                lineHeight: 20,
						                align: 'center',
                                        //max:60,
                                        //width:20
						            },
						            t1: {
					                lineHeight: 20,
					                align: 'right',
						                            //max:60,
						                            //width:20
					                }
                                    
						        }
						    }
						},
						yAxis: {
							type: 'value',
							splitLine:{
								lineStyle: {
									color: ['#EEEEEE']
								}
								// show:false
							},
							splitArea: {
								show: true
							}
							// data: [0, 500, 1000, 1500, 2000, 2500,3000]
						},
						series: seriesDate,
						graphic: lineList
					};
					// var option1 = { ...option, ...d }
					// 使用刚指定的配置项和数据显示图表。
					page1Chart2.setOption(option2);
				},
				loadPage2Date1(da) {
					page2Chart1 = echarts.init(document.getElementById('page2Pie'), 'light');
					var data = _.map(da, 'Region')
					var newdata=[]
					for (var i = 0; i < da.length; i++) {
					    newdata.push({ name: da[i].Region, value: da[i].totalregion });
					}
					var option4 = {
						title: {  //图表标题
							text: 'Discount Applied by Region',   //文字标题
							// textStyle: {
							// 	color: 'red'    //文字颜色
							// },
							left: 'center',   //标题水平位置，主副标题都居中时效果等同x: 'center' 
							// top: '20'   //标题垂直位置
						},
						tooltip: {  //hover提示
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						legend: {
							icon:'roundRect',
							// type: 'scroll',  //标签滚动
							// orient: 'vertical',
							zlevel: 3000,
							left: 'center',
							top: '40',
							data: data
						},
						series: [{
							name: '来源',
							type: 'pie',   //图表类型 line折线
							radius : '35%',
							data: newdata,
							animationDuration: 1800,   //动画时长
							animationEasing: "cubicInOut",   //动画效果
							label: {
								normal: {
									formatter: '{b} : {c} ({d}%)'  //标签显示内容
								}
							}
						}]
					};
    				page2Chart1.setOption(option4);
				},
				loadPage2Date2(da) {
				    //按区域重新组合
				    var data = _(da).groupBy(item => item.Region).map((items, Region) => {
				        return {
				            Region:Region,
				            Regionlist: items,
				            
				        }
				    }).value()

				    data = _.sortBy(data, function (item) {
				        return item.Region;
				    });
				    _.forEach(data, function (item, index) {
				        item.Regionlist = _(item.Regionlist).groupBy(item => item.Quarter).map((items, Quarter) => {
				            return {
				                Quarter: Quarter,
				                list: items
				            }
				        }).value()
				        item.Regionlist = _.sortBy(item.Regionlist, function (item) {
				            return item.Quarter;
				        });
				    })
				    console.log(data)
                    let datas=[]
                    let regdata = []//每个区域各季度数据
                    var series=[]
                    for (var m = 0; m < data.length; m++) {
                        datas.push({list:[]});
                        for (var i = 0; i < data[m].Regionlist.length; i++) {//季度list
                            datas[m].list.push(
                                _.sumBy(data[m].Regionlist[i].list, function (item) { return item.NetPrice+10})
                                )
                    //}
                        }
                        series.push({
                            name: '',
                            type: 'bar',
                            data: datas[m].list,
                            //markPoint: {气泡
                            //    data: [
                            //        { type: 'max', name: '最大值' }
                            //    ]
                            //}
                        })
				    }
				    console.log(datas)
					page2Chart2 = echarts.init(document.getElementById('page2Bar1'), 'light');
				
					var option5 = {
						title: {  //图表标题
							text: 'Specail Price Applied by Quiter',   //文字标题
							// textStyle: {
							// 	color: 'red'    //文字颜色
							// },
							left: 'center',
							   //标题水平位置，主副标题都居中时效果等同x: 'center' 
							// top: '20'   //标题垂直位置
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
						    data: ['Q1', 'Q2', 'Q3', 'Q4'],
							left: 'right',
							top: '40'
						},
						// calculable: true,
						xAxis: [
							{
								type: 'category',
								data: ['Q1', 'Q2', 'Q3', 'Q4']
							}
						],
						yAxis: [
							{
								type: 'value',
								splitLine:{
									lineStyle: {
										color: ['#EEEEEE']
									}
									// show:false
								},
								splitArea: {
									show: true
								}
							}
						],
						series:series
					};
    				page2Chart2.setOption(option5);
				},
				loadPage2Date3(da) {
				    var data = _(da).groupBy(item => item.Area).map((items, Area) => {
				        return {
				            Area: Area,
				            list: items,

				        }
				    }).value()
				    var chatdata=[],chatseries=[];
				    for(var i =0;i<data.length;i++){
				        chatseries.push(
                             _.sumBy(data[i].list, function (item) { return item.Qty})
                        )
				        chatdata.push(data[i].Area)
				    }
					page2Chart3 = echarts.init(document.getElementById('page2Bar2'), 'light');
					var option6 = {
						title: {  //图表标题
							text: 'Discount applied by Area',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis'
						},
						xAxis: [
							{
								type: 'category',
								data: chatdata,
								axisLabel: {
								    interval: 0
								}
        
							}
						],
						yAxis: [
							{
								type: 'value'
							}
						],
						series: [
							{
								name: '数据',
								type: 'bar',
								data: chatseries,
								    itemStyle: {
						            normal: {
						            label: {
						            show: true, //开启显示
						            position: 'top', //在上方显示
					                textStyle: { //数值样式
					                color: 'black',
					                fontSize: 14
					            }
					}
				}
			}
							}
						]
					};
    				page2Chart3.setOption(option6);
				}

			}

		})
	</script>

</asp:Content>