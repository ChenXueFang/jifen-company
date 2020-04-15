// pages/privacyPolicy/privacyPolicy.js
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
import yun from '../../utils/YingShi.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domainImageUrl: setting.setting.h5Url +"H5Mini/ka/",
    title: "",
    comment: "",
    lastUpdateTime: "",
    D: [],
    time1: "", //进入页面时间
    time2: "", //离开页面时间
  },
  showDec: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var now = "D[" + index + "].hidden";
    if (that.data.D[index].hidden == true) {
      console.log("显示");
      that.setData({
        [now]: false
      });
    } else {
      that.setData({
        [now]: true
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    let self = this;
    wx.request({
      url: setting.setting.h5Url + 'H5Mini/PrivacyProtocol.json',
      method: 'get',
      dataType: "json",
      success: function(res) {
        wx.hideLoading();
        self.setData({
          D: res.data.data,
          title: res.data.title,
          comment: res.data.comment,
          lastUpdateTime: res.data.lastUpdateTime
        })
      },
      fail: function(err) {
        wx.hideLoading();
        console.log(err)
      }
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
  onShow: function() {
    this.setData({
      time1: util.formatTime(new Date())
    })
    app.getEventLog("1306", "账户管理页面", "", "");
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
      app.getPageTimer("1306", "账户管理页面", "", "", vtime, this.data.time2);
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
      app.getPageTimer("1306", "账户管理页面", "", "", vtime, this.data.time2);
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