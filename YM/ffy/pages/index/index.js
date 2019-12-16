//index.js
//获取应用实例
const app = getApp()
const setting = require("../../utils/setting.js");
Page({
  data: {
    userInfo: {}
  },

  //跳转到授权页
  toEnterPro:function(){
    if (wx.getStorageSync("wxauth")) { //代表授过权
      wx.switchTab({
        url: '../home/home', //已授权，进入主页
      })
      
    } else {
      //没授权
      wx.navigateTo({
        url: '../enterPro/enterPro', //跳转到授权页面
      })
    }
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function () {
    
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
