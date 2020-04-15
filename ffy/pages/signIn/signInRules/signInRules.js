// pages/signIn/signInRules/signInRules.js
const app = getApp()
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../../services/myFamily'
import authApi from '../../../services/dataapi'

const util = require("../../../utils/util.js")
const setting = require("../../../utils/setting.js");

var urlImg = wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl");   

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: ['upload/pointimg/signIn_madeBtn.png', 'upload/pointimg/signIn_star.png', 'upload/pointimg/signIn_alreadySign.png'],
    urlImg: setting.setting.urlImg,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      urlImg: wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl")
    })
  },

  // 定制奶瓶
  toCustomMade(){
    wx.navigateTo({
      url: '../customMade/customMade',
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
    app.getEventLog(114)
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
      app.getPageTimer(114, "", vtime, this.data.time2);
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
      app.getPageTimer(114, "", vtime, this.data.time2);
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