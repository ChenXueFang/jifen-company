// pages/cookBook/menuRecommended/menuRecommended.js
const setting = require("../../../utils/setting.js");
const util = require("../../../utils/util.js")
const app = getApp();

var urlImg = wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: ['upload/recipeimg/cook_recommend1.png', 'upload/recipeimg/cook_recommend2.png', 'upload/recipeimg/cook_recommend3.png', 'upload/recipeimg/cook_recommend4.png', 'upload/recipeimg/cook_recommend5.png', 'upload/recipeimg/cook_recommend6.png'],
    urlImg: urlImg,
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

  //一日套餐
  toOneDay(){
    wx.navigateTo({
      url: '../oneDay/oneDay',
    })
  },
  //青椒炒猪肝
  toGreenPeppers() {
    wx.navigateTo({
      url: '../greenPeppers/greenPeppers',
    })
  },
  //清蒸鲈鱼
  toFish() {
    wx.navigateTo({
      url: '../fish/fish',
    })
  },
  //西红柿
  toTomatoes() {
    wx.navigateTo({
      url: '../tomatoes/tomatoes',
    })
  },
  //鲜虾芦笋
  toBamboo() {
    wx.navigateTo({
      url: '../bamboo/bamboo',
    })
  },
  //小鸡炖蘑菇
  toChicken() {
    wx.navigateTo({
      url: '../chicken/chicken',
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
    app.getEventLog(91)

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
      app.getPageTimer(91, this.data.TempId, vtime, this.data.time2);
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
      app.getPageTimer(91, this.data.TempId, vtime, this.data.time2);
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