
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import authApi from '../../services/dataapi'
const util = require("../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: true, //是否登录
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //每日记录
  toDailyRecord: function() {
    app.getEventLog(1)
    wx.navigateTo({
      url: '../dailyRecord/index/index'
    })
  },
  //与宝宝对话
  toDialogue: function() {
    app.getEventLog(2)
    wx.navigateTo({
      url: '../dialogue/dialogue'
    })
  },
  //产检表
  toLaborChart: function() {
    app.getEventLog(3)
    wx.navigateTo({
      url: '../laborChart/laborChart'
    })
  },
  //宝宝体型
  toBabySize:function(){
    app.getEventLog(105)
    wx.navigateTo({
      url: '../babySize/babySize'
    })
  },
  //每日一读
  toClassRoom: function() {
    app.getEventLog(4)
    wx.navigateTo({
      url: '../classRoom/classRoom'
    })
  },
  //我的孕期日记
  toMyDiary: function() {
    app.getEventLog(5)
    wx.navigateTo({
      url: '../pregnancyDiary/diaryMain/diaryMain'
    })
  },
  //积分
  toMyIntegral: function () {
    app.getEventLog(7)
    wx.navigateTo({
      url: '../signIn/dailySign/dailySign'
    })
  },
  // 菜谱推荐
  toCookBook: function () {
    app.getEventLog(25)
    wx.navigateTo({
      url: '../cookBook/menuRecommended/menuRecommended'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    await authApi.wxApi.wxLoginCheck()
    if (wx.getStorageSync("wxauth").userid == null || wx.getStorageSync("wxauth").userid == "") {
      this.setData({
        isLogin: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.getEventLog(132)
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer(132, "", vtime, this.data.time2);
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer(132, "", vtime, this.data.time2);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})