// pages/vipServe/alreadyOpen/alreadyOpen.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/serveApi'
const setting = require("../../../utils/setting.js");
const app = getApp();
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name
    })
  },

  // 成功开启VIP服务后跳转
  toBack() {
    // 跳转到服务页面
    if (this.data.name =="service"){
      wx.switchTab({
        url: '../../service/serviceIndex/serviceIndex',
      })
    }
    // 跳转到知识页面，vip教育
    if (this.data.name == "knowledge") {
      this.toknowledgeIndex();
    }
  },

  // 页面跳转到vip文章列表
  toknowledgeIndex() {
    // app.globalData.currentTab = 2
    wx.switchTab({
      url: '../../knowledge/knowledgeIndex/knowledgeIndex'
    })
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
    app.getEventLog("alreadyOpen-page")
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
      app.getPageTimer("alreadyOpen-page", "", vtime, this.data.time2);
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
      app.getPageTimer("alreadyOpen-page", "", vtime, this.data.time2);
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