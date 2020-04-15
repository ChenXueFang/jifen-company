// pages/MyMemberInvite/MyMemberInvite.js
const app = getApp() 
const util = require("../../utils/util.js")
const setting = require("../../utils/setting.js");
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../services/dataapi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    role: '',
  },
  //调用授权
  getUserInfo: async function (e) {
    this.setData({
      current: e.target.dataset.current,
    })
    if (e.detail.userInfo != undefined) {
      var hr = await dataApi.wxApi.wxUserInfo(e);
      app.globalData.userInfo = e.detail.userInfo
      if (this.data.current == 0) {
        wx.navigateTo({
          url: `../protocol/protocol?role= ${e.currentTarget.dataset.role}`
        })
      } 
      if (app.globalData.userInfo != null) {
        wx.setStorageSync("nickName", app.globalData.userInfo.nickName);
        wx.setStorageSync("avatarUrl", app.globalData.userInfo.avatarUrl);
      }
    }
    var that = this;
    var iv = e.detail.iv;
    var encr = e.detail.encryptedData;
    var rawData = e.detail.rawData;
    var signature = e.detail.signature;
    if (e.detail.errMsg == 'getUserInfo:fail auth deny' || e.detail.errMsg == 'getPhoneNumber:user deny' || e.detail.errMsg == 'getUserInfo:fail:cancel to confirm login' || e.detail.errMsg != 'getUserInfo:ok') {
      //用户未授权
      wx.showModal({
        title: '温馨提示',
        showCancel: false,
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
        success: function (res) { }
      })
      that.setData({
        hasUserInfo: false,
        hasMobileInfo: false
      });
      wx.hideLoading()
    }
  },

  //拒接邀请
  rejectInvite:function(){
    wx.showToast({ title: '您拒接了邀请！', icon: 'none' });
    wx.switchTab({
      url: '../home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
   
     await dataApi.wxApi.wxLoginCheck();
 
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
  onUnload: function (options) {
    this.setData({ nickname: options.nickname });
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