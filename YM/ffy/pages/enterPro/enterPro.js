// pages/enterPro/enterPro.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../services/dataapi'
const setting = require("../../utils/setting.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    role: '',
  },
  //爸爸角色
  clickForDay: function(e) {
  console.log(e)
    wx.navigateTo({
      url: `../protocol/protocol?role= ${e.currentTarget.dataset.role}`
    })
  },

  // // 设置我是妈妈接口
  // setMathor: async function() {
  //   var that = this;
  //   var hr = await dataApi.wxApi.SetMother({
  //     UserId: wx.getStorageSync("wxauth").userid
  //   });
  //   console.log(wx.getStorageSync("wxauth").userid)
  // },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad:async function() {
await dataApi.wxApi.wxLoginCheck();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  //允许授权
  getUserInfo: async function(e) {
    this.setData({
      role: e.target.dataset.role,
    })
    if (e.detail.userInfo != undefined) {
      // 获取用户信息接口
      let hr = await dataApi.wxApi.wxUserInfo(e);
      if (hr.state==1){
        var stor = wx.getStorageSync("wxauth")
        stor.userid = hr.data.userid
        stor.unionid = hr.data.unionId
        stor.norole = this.data.role

        // 妈妈授权
        if (this.data.role == 0) {
          stor.Mom = this.data.role

        }
        // 爸爸和其他成员授权
        else if (this.data.role == 1) {
          stor.Fa = this.data.role
        }

        if (app.globalData.userInfo != null) {
          wx.setStorageSync("nickName", app.globalData.userInfo.nickName);
          wx.setStorageSync("avatarUrl", app.globalData.userInfo.avatarUrl);
        }

        wx.setStorageSync("wxauth", stor);
        // console.log('======================================')
        // console.log(this.data.current)
        // console.log(wx.getStorageSync("wxauth").norole) //string
      }else{
        wx.showToast({
          title: hr.msg,
          icon:"none"
        })
      }
      app.globalData.userInfo = e.detail.userInfo
      // 跳转到隐私协议
      // this.clickForDay();
      // console.log(111 + ":" + e.currentTarget.dataset.role)
      // console.log(111 + ":" + e.currentTarget.dataset.fath)
      wx.navigateTo({
        url: `../protocol/protocol?role= ${e.currentTarget.dataset.role}&fath=${e.currentTarget.dataset.fath}`
      })
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
        success: function(res) {
          wx.switchTab({
            url: '../home/home'
          })

        }
      })
      that.setData({
        hasUserInfo: false,
        hasMobileInfo: false
      });

      wx.hideLoading()
    }
  },
  turnIndex:function(){
    wx.switchTab({
      url: '../home/home'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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