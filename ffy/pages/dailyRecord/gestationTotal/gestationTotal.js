
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
const util = require("../../../utils/util.js")
const md5 = require("../../../utils/md5.js");
const setting = require("../../../utils/setting.js");
import dataApi from '../../../services/dayrecord'
import userchoiceApi from '../../../services/userLinkRecord'

import * as echarts from '../../../ec-canvas/echarts';

var app=getApp();

var xdatalist=[];
var dataList = [];
var Chart = null;
var weightMax=0;

var stepxdatalist = [];
var stepdataList = [];
var steptargetdataList = [];
var ChartStep = null;
var stepMax = 0;

var xqxdatalist = [];
var xqdataList = [];
var ChartXQ=null

var rsfyxdatalist = [];
var rsfydataList = [];
var Chartrsfy = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    currentWeightTab:0,
    currentSportTab: 0,
    currentxqTab:0,
    showWeightDesc:true,  
    weightRecordList:[{},{},{}],
    PregnantMoveRecordList:[{},{}],
    SportsRecordList:[{},{}],
    xqRecordList: [{}, {}],
    sportstartTime:'',
    sportendtime:'',
    todayDate: '',//今天的日期
    todayWeek: '',//今天所在周
    isGetWeightInfo: [
      { name: '是', value: '1'},
      { name: '否', value: '0' }
    ],
    isBQShow: false, //点击查看弹窗,
    radioSelectValue:'',
    isGetWeightSuggest:'',
    isSelected:false,
    selval:'0',
    isdown: true,
    ec: {
      lazyLoad: true // 延迟加载
    },
    changeloading:false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  menuclick(e) {
    var that = this;
    var is = e.currentTarget.dataset.show
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0,
      // transformOrigin: "50% 50%",
    })
    var animatheightadd = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in',
    })
      // // animation.rotate(0).step();
      // animatheightadd.height(400).step()
      // that.setData({
      //   isdown: false,
      //   animationData: animation.export(),
      //   animatheightadd: animatheightadd.export(),
      // })
    if (that.data.isdown == false) {
      // animation.rotate(90).step();
      animatheightadd.height(280).step()
      that.setData({
        isdown: true,
        animationData: animation.export(),
        animatheightadd: animatheightadd.export(),
      })
    } else {
      // animation.rotate(0).step();
      animatheightadd.height(75).step()
      that.setData({
        isdown: false,
        animationData: animation.export(),
        animatheightadd: animatheightadd.export(),
      })
    }
  },

  //点击查看
  showBQ: async function () {
    app.getEventLog(64)
    
    this.setData({
      isBQShow: true
    })
  },
  //关闭点击查看
  hideBQ: function () {
    app.getEventLog(65)
    
    this.setData({
      isBQShow: false
    })
  },

  //点击切换
  clickTab: function (e) {
    if (e.target.dataset.current==1){
      var that = this;
      if (this.data.currentTab === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTab: e.target.dataset.current,
        })
      }
      this.setData({ changeloading: false })
      this.getdate(this.data.currentTab)
    }else{
      if (this.data.changeloading==false){
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
          return false;
        } else {
          that.setData({
            currentTab: e.target.dataset.current,
          })
        }
        this.setData({ changeloading:true})
        this.getdate(this.data.currentTab)
      }else{
        wx.showToast({
          title: "请等待当前图表加载完成",
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  //点击切换体重曲线和记录
  clickWeightTab: function (e) {
    var that = this;
    // if (this.data.currentWeightTab === e.target.dataset.current) {
    //   return false;
    // } else {
    //   that.setData({
    //     currentWeightTab: e.target.dataset.current,
    //   })
    // }

    if (this.data.changeloading == false) {
      var that = this;
      if (this.data.currentWeightTab === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          currentWeightTab: e.target.dataset.current,
          currentTab: e.target.dataset.curid
        })
      }
      this.setData({ changeloading: true })
      this.getdate(this.data.currentTab)
    } else {
      wx.showToast({
        title: "请等待当前图表加载完成",
        icon: 'none',
        duration: 2000
      })
    }

  },
  //点击显示体重描述
  changeWeightDesc:function(){
    this.setData({
      showWeightDesc: false
    })
  },
  changeWeightDescHide:function(){
    this.setData({
      showWeightDesc: true
    })
  },
  //点击切换运动记录 曲线和记录
  clickSportTab:function(e){
    var that = this;
    // if (this.data.currentSportTab === e.target.dataset.current) {
    //   return false;
    // } else {
    //   that.setData({
    //     currentSportTab: e.target.dataset.current,
    //   })
    // }

    if (this.data.changeloading == false) {
      var that = this;
      if (this.data.currentSportTab === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          currentSportTab: e.target.dataset.current,
          currentTab: e.target.dataset.curid
        })
      }
      this.setData({ changeloading: true })
      this.getdate(this.data.currentTab)
    } else {
      wx.showToast({
        title: "请等待当前图表加载完成",
        icon: 'none',
        duration: 2000
      })
    }
  },
  //点击切换心情 曲线和记录
  clickXQTab: function (e) {
    var that = this;
    if (this.data.currentxqTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentxqTab: e.target.dataset.current,
      })
    }
  },
  //获取体重记录
  getWeightRecord: async function () {
    var hr = await dataApi.DayRecord.getWeightRecord({
      Q:wx.getStorageSync("myrole").UserRole,
      UserId: wx.getStorageSync("wxauth").userid,
      "PageSize": 99,
      "PageIndex": 1
    });
    if (hr.state && hr.state == 1) {
      // debugger
     this.setData({
       weightRecordList:hr.rows
     })
    }
  },
  //获取运动记录
  GetSportRecord: async function () {
    var hr = await dataApi.DayRecord.GetSportRecord({
      Q: wx.getStorageSync("myrole").UserRole,
      UserId: wx.getStorageSync("wxauth").userid,
      "PageSize": 99,
      "PageIndex": 1
    });
    if (hr.state && hr.state == 1) {
      // debugger
      this.setData({
        SportsRecordList: hr.rows
      })
    }
  },

  //获取胎动记录
  getPregnantMoveRecord: async function () {
    var hr = await dataApi.DayRecord.getPregnantMoveRecord({
      Q: wx.getStorageSync("myrole").UserRole,
      UserId: wx.getStorageSync("wxauth").userid,
      "PageSize": 99,
      "PageIndex": 1,
      "SortName": "createdtime",
    });
    if (hr.state && hr.state == 1) {
      hr.rows.forEach((item) => {
        item.CreatedTime = item.CreatedTime.substring(0, 10)
        item.RecordBeginTime = item.RecordBeginTime.substring(11, 16)
        item.RecordEndTime = item.RecordEndTime.substring(11, 16)
      })
      this.setData({
        PregnantMoveRecordList: hr.rows
      })
    }
  },
  //获取运动记录曲线
  GetSportCharData: async function () {
    var hr = await dataApi.DayRecord.GetSportCharData({
      Q: wx.getStorageSync("myrole").UserRole,
      UserId: wx.getStorageSync("wxauth").userid,
      beginDate: this.data.sportstartTime,
      endDate: this.data.sportendtime
    });
    if (hr.state && hr.state == 1) {
      stepxdatalist = hr.data.date,
      stepdataList = hr.data.value,
      steptargetdataList = hr.data.target,
      
      stepMax = Number(hr.data.max) >= Number(steptargetdataList[0]) ? hr.data.max : steptargetdataList[0]
    }
    this.stepechartsComponnet = this.selectComponent('#stepymychart');
    this.getDataStep(); //获取数据
  },
  //获取体重记录曲线
  getWeightChar: async function () {
    var hr = await dataApi.DayRecord.GetWeightCharData({
      Q: wx.getStorageSync("myrole").UserRole,
      UserId: wx.getStorageSync("wxauth").userid,
      beginDate: this.data.sportstartTime,
      endDate: this.data.sportendtime
    });
    if (hr.state && hr.state == 1) {
      xdatalist = hr.data.date,
      dataList= hr.data.value,
        weightMax = hr.data.max == '' ? 0 : hr.data.max
    }
    this.echartsComponnet = this.selectComponent('#weightmychart');
    this.getData(); //获取数据
  },
  //是否获取体重推荐
  selAnswer:function(e){
    console.log(e.currentTarget.dataset.val)
    this.setData({
      selval: e.currentTarget.dataset.val
    })
  },
  // radioChange: function(res){
  //   this.setData({
  //     radioSelectValue: res.detail.value
  //   })
  // },
  //提交
  submitSel:async function(){
    var hr = await userchoiceApi.UserChoiceItem.insertUserChoiceItem({
      UserId: wx.getStorageSync("wxauth").userid,
      FamilyId: wx.getStorageSync("familyId").FamilyId,
      UserRole: wx.getStorageSync("myrole").UserRole,
      ItemType: "WeightManage",
      ItemAnswer: this.data.selval,
      AnswerRemark: "",
    });
    if (hr.state==1 && hr.rows.length>0) {
      this.setData({
        isGetWeightSuggest: this.data.selval,
        isBQShow:false
      })
    }else{
      isGetWeightSuggest:''
    }
  },

  getWeightSuggest: async function () {
    var hr = await userchoiceApi.UserChoiceItem.getUserChoiceItem({
      UserId: wx.getStorageSync("wxauth").userid,
      ItemType: "WeightManage",
      PageSize: 1,
      PageIndex: 1
    });
    if (hr.state==1 && hr.rows.length>0) {
      this.setData({
        isGetWeightInfo: this.data.isGetWeightInfo,
        isGetWeightSuggest: hr.rows[0].ItemAnswer,
        selval: hr.rows[0].ItemAnswer
      })
    }else{
      this.setData({
        isGetWeightSuggest:''
      })
    }
  },
  //心情图表
  GetXQCharData: async function () {
    var hr = await dataApi.DayRecord.GetMoodCharDataByDate({
      Q: wx.getStorageSync("myrole").UserRole,
      userId: wx.getStorageSync("wxauth").userid,
      beginDate: this.data.sportstartTime,
      endDate: this.data.sportendtime
    });
    if (hr.state && hr.state == 1) {
      xqxdatalist = hr.data.date,
      xqdataList = hr.data.value
    }
    this.xqechartsComponnet = this.selectComponent('#xqmychart');
    this.getDataXQ(); //获取数据
  },
  //妊娠反应图表
  GetRSCharData: async function () {
    var hr = await dataApi.DayRecord.GetRSCharDataByDate({
      Q: wx.getStorageSync("myrole").UserRole,
      userId: wx.getStorageSync("wxauth").userid,
      beginDate: this.data.sportstartTime,
      endDate: this.data.sportendtime
    });

    if (hr.state && hr.state == 1) {
      rsfyxdatalist = hr.data.date,
      rsfydataList = hr.data.value
    }
    this.rsechartsComponnet = this.selectComponent('#rsfymychart');
    this.getDataRSFY(); //获取数据
  },


  //取当天
  getdate: function (currentTab) {
    var date = new Date();
    var seperator1 = "/";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var curdate = year + seperator1 + month + seperator1 + strDate;

    this.setData({
      choiceData: curdate,
      todayDate: curdate
    })

    this.getPreWeek(this.data.choiceData, currentTab)
  },
  //加载当前日期所在周
  getPreWeek: function (datevalue, currentTab) {
    var date2 = new Date(datevalue);
    date2.setDate(date2.getDate() + -6);
    var time2 = date2.getFullYear() + "/" + (date2.getMonth() + 1) + "/" + date2.getDate();
    this.setData({
      sportstartTime: time2,
      sportendtime: datevalue
    })    
    if (currentTab==0){
      this.getWeightChar()
    }else if(currentTab==2){
      this.GetSportCharData()
    }else if(currentTab==3){
      this.GetXQCharData()
    }else if(currentTab==4){
      this.GetRSCharData()
    }

    if (datevalue == this.data.todayDate) {
      this.setData({
        isShowLastWeek: true
      })
    } else {
      this.setData({
        isShowLastWeek: false
      })
    }
  },
  //上一周
  proWeek: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.curid
    })
    var date = new Date(this.data.choiceData);

    var timestamp = date.getTime();
    var newDate = new Date(timestamp - 7 * 24 * 3600 * 1000);

    var month = newDate.getMonth() + 1
    if (newDate.getMonth() + 1 < 10) {
      month = "0" + (newDate.getMonth() + 1)
    }
    var day = newDate.getDate()
    if (newDate.getDate() < 10) {
      day = "0" + newDate.getDate()
    }
    var curdate = [newDate.getFullYear(), month, day].join('/');
    this.setData({
      choiceData: curdate,
    })
    this.getPreWeek(this.data.choiceData, this.data.currentTab)
  },
  //下一周
  nextWeek: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.curid
    })
    var date = new Date(this.data.choiceData);

    var timestamp = date.getTime();
    var newDate = new Date(timestamp + 7 * 24 * 3600 * 1000);

    var month = newDate.getMonth() + 1
    if (newDate.getMonth() + 1<10){
      month = "0" + (newDate.getMonth() + 1) 
    }
    var day = newDate.getDate()
    if (newDate.getDate()< 10) {
      day = "0" + newDate.getDate()
    }
    var curdate = [newDate.getFullYear(), month, day].join('/');
    this.setData({
      choiceData: curdate,
    })
    this.getPreWeek(this.data.choiceData, this.data.currentTab)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.fun_date()
    this.getdate(0)


    // this.GetSportCharData();
    this.getWeightRecord();
    this.getPregnantMoveRecord()
    this.GetSportRecord()
    // this.GetXQCharData()
    this.getWeightSuggest()
  },


  getData: function () {
    //如果是第一次绘制
    // if (!Chart) {
    //   console.log(Chart)
    //   this.init_echarts(); //初始化图表
    // } else {
    //   console.log(Chart)
    //   this.setOption(Chart); //更新数据
    // }

     this.init_echarts(); //初始化图表
  },
  //初始化图表
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // Chart.setOption(this.getOption());
      this.setOption(Chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      this.setData({ changeloading:false})
      return Chart;
    });
  },
  setOption: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption());  //获取新数据
  },
  getOption: function () {
    // 指定图表的配置项和数据
    var option = {
      color: ["#f9e0ef", "#FFFF99"],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: 'red'
          }
        }
      },
      legend: {
        data: ['体重记录']
      },
      grid: {
        top: '9%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: xdatalist
        }
      ],
      yAxis: [
        {
          type: 'value',
          min: '40',
          max: weightMax == 0 ? 50 : weightMax,
          splitNumber: '4',
          "splitLine": {     //网格线
            "show": false
          }
        }
      ],
      series: [
        {
          name: '体重记录',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: dataList
        }
      ]
    };
    return option;
  },


  getDataXQ: function () {
    this.init_echartsXQ(); //初始化图表
  },
  //初始化图表
  init_echartsXQ: function () {
    this.xqechartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      ChartXQ = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOptionXQ(ChartXQ);
      this.setData({ changeloading: false })
      return ChartXQ;
    });
  },
  setOptionXQ: function (ChartXQ) {
    ChartXQ.clear();  // 清除
    ChartXQ.setOption(this.getxqOption());  //获取新数据
  },
  getxqOption: function () {
    // 指定图表的配置项和数据
    var option = {
      color: ["#f9e0ef"],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['次数']
      },
      grid: {
        top: '9%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xqxdatalist,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          min: '0',
          max: 7,
          splitNumber: '7',
          "splitLine": {     //网格线
            "show": false
          }
        }
      ],
      series: [
        {
          name: '次数',
          type: 'bar',
          barWidth: '60%',
          data: xqdataList
        }
      ]
    };
    return option;
  },



  getDataRSFY: function () {
    this.init_echartsRSFY(); //初始化图表
  },
  //初始化图表
  init_echartsRSFY: function () {
    this.rsechartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chartrsfy = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOptionRSFY(Chartrsfy);
      this.setData({ changeloading: false })
      return Chartrsfy;
    });
  },
  setOptionRSFY: function (Chartrsfy) {
    Chartrsfy.clear();  // 清除
    Chartrsfy.setOption(this.getRSFYOption());  //获取新数据
  },
  getRSFYOption: function () {
    // 指定图表的配置项和数据
    var option = {
      color: ["#f9e0ef"],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['次数']
      },
      grid: {
        top: '9%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: rsfyxdatalist,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: { interval: 0, rotate: 40} 
        }
      ],
      yAxis: [
        {
          type: 'value',
          min: '0',
          max: 21,
          splitNumber: '5',
          "splitLine": {     //网格线
            "show": false
          }
        }
      ],
      series: [
        {
          name: '次数',
          type: 'bar',
          barWidth: '60%',
          data: rsfydataList
        }
      ]
    };
    return option;
  },




  getDataStep: function () {
    this.init_echartsStep(); //初始化图表
  },
  //初始化图表
  init_echartsStep: function () {
    this.stepechartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      ChartStep = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOptionStep(ChartStep);
      this.setData({ changeloading: false })
      return ChartStep;
    });
  },
  setOptionStep: function (ChartStep) {
    ChartStep.clear();  // 清除
    ChartStep.setOption(this.getOptionStep());  //获取新数据
  },
  getOptionStep: function () {
    // 指定图表的配置项和数据
    var option = {
      color: ["#f9e0ef", "#81C0C0"],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: 'red'
          }
        }
      },
      legend: {
        data: ['微信步数','目标值']
      },
      grid: {
        top: '17%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: stepxdatalist
        }
      ],
      yAxis: [
        {
          type: 'value',
          min: '0',
          max: stepMax,
          splitNumber: '5',
          "splitLine": {     //网格线
            "show": false
          }
        }
      ],
      series: [
        {
          name: '微信步数',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: stepdataList,
          markLine: {
            symbol: "none",               //去掉警戒线最后面的箭头
            label: {
              position: "middle"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
            },
            data: [{
              silent: false,             //鼠标悬停事件  true没有，false有
              lineStyle: {               //警戒线的样式  ，虚实  颜色
                type: "solid",
                color: "#81C0C0",
              },
              yAxis: steptargetdataList         
            }]
          }

        },
        {
          name: '目标值',
          type: 'line',
          stack: '总量',
          areaStyle: {},
        }
        
       
      ]
    };
    return option;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.getEventLog(50)

    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer(50, "", vtime, this.data.time2);
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer(50, "", vtime, this.data.time2);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})