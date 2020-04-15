// pages/babySize/babySize.js
const app = getApp()
const util = require("../../utils/util.js")
const setting = require("../../utils/setting.js");
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import babySize from '../../services/babySize'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yWeek:'',
    badySizeList:[],
    babyWeight:'0',
    babyHeight:'1',
    noticeItme:'',
    yweekindex:0,
    selectArray:['相当于动物大小','相当于水果大小'],
    selectIndex:0,
    babytips:'',
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //选择孕周
  bindChange:function(e){
    this.setData({
      yweekindex: e.detail.value,
      babyWeight: this.data.badySizeList[e.detail.value].BBWeight,
      babyHeight: this.data.badySizeList[e.detail.value].BBHeight,
      yWeek: this.data.badySizeList[e.detail.value].WeekMin,
      noticeItme: this.data.badySizeList[e.detail.value].Remark
    })
    if (e.detail.value){
      app.getEventLog(118)
    }
    //this.getWeekInfo()
  },
  //选择图片
  bindPicChange:function(e){
    console.log("图片：" + e.detail.value)
    this.setData({
      yweekindex: e.detail.value,
      babyWeight: this.data.badySizeList[e.detail.value].BBWeight,
      babyHeight: this.data.badySizeList[e.detail.value].BBHeight,
      yWeek: this.data.badySizeList[e.detail.value].WeekMin,
      noticeItme: this.data.badySizeList[e.detail.value].Remark
    })
    if (e.detail.value) {
      app.getEventLog(119)
    }
    //this.getWeekInfo()
  },
  //选择体型
  bindSelect:function(e){
    this.setData({
      selectIndex: e.detail.value,
    })
    if (e.detail.value) {
      app.getEventLog(120)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.selYWeekAndDay();
    this.getAllSize();
  },

  //根据用户获取孕周孕天
  selYWeekAndDay: function () {
    var that = this;
    setting.POST({
      UserId: wx.getStorageSync("wxauth").userid
    }, "/api/Users/GetGestationalAge", (data) => {
      console.log(data)
      if (data.rows.length > 0) {
        this.setData({
          yWeek: data.rows[0].ageWeek
        })
        //this.getWeekInfo()
      }
      console.log("孕周：" + this.data.yWeek)
    }, (error) => {
      if (error.errMsg) { }
    }, false)
  },
  //获取所有体型
  getAllSize:async function(){
    var hr = await babySize.BabySize.GetListBySC({
      WeekTitle: "",
      WeekTitleLike: "",
      PageSize: 100,
      PageIndex: 1,
      SortName:"WeekMin",
      SortOrder:"asc"
    });
    console.log(hr)
    if(hr.state==1 && hr.rows.length>0){
      this.setData({
        badySizeList:hr.rows
      })

      for (var i = 0; i < hr.rows.length;i++){
        if (this.data.yWeek >= hr.rows[i].WeekMin && this.data.yWeek <= hr.rows[i].WeekMax){
          this.setData({
            yweekindex:[i],
            babyWeight: this.data.badySizeList[i].BBWeight,
            babyHeight: this.data.badySizeList[i].BBHeight,
            noticeItme: this.data.badySizeList[i].Remark,
            selectIndex:0
          })
        }
      }
      console.log(this.data.badySizeList)
      console.log(this.data.yweekindex)
    }
  },
  //根据条件获取 孕期相关配置表
  getWeekInfo:async function(){
    if (this.data.yWeek=="0"){
      this.setData({
        yWeek:1
      })
    }
    var hr = await babySize.PregnantConfig.GetWeekInfoByWeekId({
      Week: this.data.yWeek,
      PageSize: 1,
      PageIndex: 1
    });
    if(hr.state==1 && hr.rows.length>0){
      this.setData({
        babytips: hr.rows[0].AttendContent
      })
    }else{
      this.setData({
        babytips: ''
      })
    }
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
    app.getEventLog(117)
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
      app.getPageTimer(117, "", vtime, this.data.time2);
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
      app.getPageTimer(117, "", vtime, this.data.time2);
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