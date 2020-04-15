// pages/messageList/messageList.js
const app = getApp()
const util = require("../../utils/util.js")
const setting = require("../../utils/setting.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [],
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //根据用户获取留言
  getMessages: function () {
    var that = this;
    setting.POST({
      PageSize: 100,
      PageIndex: 1,
      UserId: wx.getStorageSync("wxauth").userid, //"137B2603-2A92-472D-85D2-2D6DC93F4701",
      SortName: "createdtime",
      SortOrder: "asc",
    }, "/api/PregnantLeaveMsg/GetListBySC", (data) => {
      if (data.rows.length > 0) {
        this.setData({
          messages: data.rows
        })
      }
    }, (error) => {
      if (error.errMsg) {
      }
    }, false)
  },
  //跳转至每日记录查看留言
  toDaliyRecord:function(e){
    var todtail = e.currentTarget.dataset.levetime
    var leveid = e.currentTarget.dataset.leveid
    
    var that = this;
    setting.PUT({
      Status: 2,
      id: leveid
    }, "/api/PregnantLeaveMsg/Put", (data) => {
      if (data.msg ="更新成功"){
        wx.redirectTo({
          url: '../dailyRecord/index/index?leaveTime=' + todtail.substring(0, 10)
        })
      }
    }, (error) => {
      if (error.errMsg) {
      }
    }, false)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessages()
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
    app.getEventLog(131)
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
      app.getPageTimer(131, "", vtime, this.data.time2);
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
      app.getPageTimer(131, "", vtime, this.data.time2);
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