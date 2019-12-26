// pages/knowledge/productEssay/productEssay.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/knowledge'
const setting = require("../../../utils/setting.js");
const app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Act: {},
    html: "",
    guid:"",
    time1: "",//进入页面时间
    time2: "",//离开页面时间

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      guid: options.guid
    })
    this.getEssay();
  },

  // 获取文章
  getEssay: async function () {
    var that = this;
    var hr = await dataApi.knowledgeApi.getEssay({
      guid: this.data.guid
    });
    if (hr.state == 1 && hr.data !=null) {
      that.setData({
        Act: hr.data,
        html: hr.data.Content,
      })
      var that = this;
      WxParse.wxParse('article', 'html', hr.data.Content, that, 0);
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
    app.getEventLog("productEssay-page", options.guid)
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
      app.getPageTimer("productEssay-page", this.data.guid, vtime, this.data.time2);
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
      app.getPageTimer("productEssay-page", this.data.guid, vtime, this.data.time2);
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