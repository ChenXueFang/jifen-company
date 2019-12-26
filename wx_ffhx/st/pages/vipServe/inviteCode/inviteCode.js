// pages/vipServe/inviteCode/inviteCode.js
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
    inputValue: "",
    name: "",
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      name: options.name
    })
  },

  bindinput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  // 已经开启VIP服务
  toAlreadyOpen: async function() {
    if (this.data.inputValue != "") {
      var that = this;
      var hr = await dataApi.serveApi.openVip({
        Code: this.data.inputValue,
        UserIdGuid: wx.getStorageSync("wxauth").userid
      });
      if (hr.state == 1) {
        // wx.showToast({
        //   title: "您已开启VIP服务",
        //   icon: "none",
        //   duration:2000,
        // })
        // 页面跳转到已开启vip服务页面
        var name = this.data.name
        setTimeout(function() {
          wx.navigateTo({
            url: `../alreadyOpen/alreadyOpen?name=${name}`,
          })
        }, 1000)
        setTimeout(function () {
          app.getEventLog("openVipServe-button")
        }, 2000)
      } else {
        wx.showToast({
          title: hr.msg,
          icon: "none",
          duration: 2000
        })
      }
    }
  },
  goEditAppointment(){
    app.getEventLog("inviteCode-applyVipcode-button")
    wx.navigateTo({
      url: '../../service/orderForm2/orderForm2?yyxmid=4',
    })
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
    app.getEventLog("inviteCode-page")
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
      app.getPageTimer("inviteCode-page", "", vtime, this.data.time2);
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
      app.getPageTimer("inviteCode-page", "", vtime, this.data.time2);
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