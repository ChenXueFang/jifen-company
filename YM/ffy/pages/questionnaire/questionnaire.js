// pages/questionnaire/questionnaire.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../services/userLinkRecord'
import familyApi from '../../services/myFamily'
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //前往问卷星答题
  toWrite: async function () {
    app.getEventLog(129)

    var hr = await dataApi.UserPoint.getUserPoint({
      UserId: wx.getStorageSync("wxauth").userid,
    });
    console.log("问卷积分")
    console.log(hr)

    wx.navigateToMiniProgram({
      appId: 'wxd947200f82267e58',
      path: "pages/wjxqList/wjxqList?activityId=48606952",
      extraData: {
        // foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("进入问卷页面")
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
    app.getEventLog(128)
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
      app.getPageTimer(129, this.data.TempId, vtime, this.data.time2);
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
      app.getPageTimer(129, this.data.TempId, vtime, this.data.time2);
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