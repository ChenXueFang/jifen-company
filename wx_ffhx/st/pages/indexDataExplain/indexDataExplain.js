// pages/indexDataExplain/indexDataExplain.js
const app = getApp();
const util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  //了解详情
  toViewMore:function(){
    app.getEventLog("indexDataExplain-M1-button")
    wx.navigateTo({
      url: `../knowledge/productIntro/productIntro?menuid=30`,
    })
  },
  //其他机器跳转至预约页
  toViewMore2:function(){
    app.getEventLog("indexDataExplain-M2-button")
    wx.navigateTo({
       url: `../service/orderKnow/orderKnow`,
    })
  },
  toViewMore3:function(){
    app.getEventLog("indexDataExplain-M3-button")
    wx.navigateTo({
      url: `../service/orderKnow/orderKnow`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    app.getEventLog("indexDataExplain-page")
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
      app.getPageTimer("indexDataExplain-page", "", vtime, this.data.time2);
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
      app.getPageTimer("indexDataExplain-page", "", vtime, this.data.time2);
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