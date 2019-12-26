//app.js
import regeneratorRuntime from './libs/regenerator-runtime/runtime-module';
import authApi from './servicesAPI/dataapi'
const setting = require("./utils/setting.js");
const util = require("./utils/util.js");

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var systemInfo = wx.getSystemInfoSync();
    wx.setStorageSync('systemInfo', systemInfo)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    phoneNumber: '400-820-6665',
    currentTab:"",
    time1:""
  },

  // 页面访问次数 + 按钮点击次数
  getEventLog: async function (linkcode, openid) {
    var that = this;
    var uinfo = null;
    var userguid=null
    if (wx.getStorageSync("wxauth").uid == "" || wx.getStorageSync("wxauth").uid == null || wx.getStorageSync("wxauth").uid == undefined) {
      uinfo = null
    } else {
      uinfo = wx.getStorageSync("wxauth").uid
    }
    if (wx.getStorageSync("wxauth").userid == "" || wx.getStorageSync("wxauth").userid == null || wx.getStorageSync("wxauth").userid == undefined) {
      userguid = null
    } else {
      userguid = wx.getStorageSync("wxauth").userid
    }
    wx.getSystemInfo({
      success(res) {
        var hr = authApi.wxApi.getEventLog(uinfo, userguid,
          linkcode, openid, res.brand, res.model, res.pixelRatio, res.screenWidth, res.screenHeight, res.language, res.version, res.system, res.platform, res.wifiEnabled);
        // console.log(hr)
      }
    })
  },

  // 分享记录日志
  getShareLog: async function (logType, action) {
    var that = this;
    var uinfo = null;
    if (wx.getStorageSync("wxauth").uid == "" || wx.getStorageSync("wxauth").uid == null || wx.getStorageSync("wxauth").uid == undefined) {
      uinfo = null
    } else {
      uinfo = wx.getStorageSync("wxauth").uid
    }
    wx.getSystemInfo({
      success(res) {
        var hr = authApi.wxApi.getShareLog(uinfo,
          logType, action, res.brand, res.model, res.pixelRatio, res.screenWidth, res.screenHeight, res.language, res.version, res.system, res.platform, res.wifiEnabled);
        // console.log(hr)
      }
    })
  },

  //时长，记录页面停留的时间
  getPageTimer: async function (linkcode, openid, time1, time2) {
    var that = this;
    var uinfo = null;
    var ueridguid = null;
    var familyid = null;
    if (wx.getStorageSync("wxauth").uid == "" || wx.getStorageSync("wxauth").uid == null || wx.getStorageSync("wxauth").uid == undefined) {
      uinfo = null;
      ueridguid = null;
    } else {
      uinfo = wx.getStorageSync("wxauth").uid;
      ueridguid = wx.getStorageSync("wxauth").userid;
    }
    if (wx.getStorageSync("familyidguid").FId == "" || wx.getStorageSync("familyidguid").FId == null || wx.getStorageSync("familyidguid").FId == undefined) {
      familyid = null;
    } else {
      familyid = wx.getStorageSync("familyidguid").FId
    }
    wx.getSystemInfo({
      success(res) {
        var hr = authApi.wxApi.getPageTimer(uinfo, ueridguid, linkcode, time1, time2, familyid, openid, res.brand, res.model, res.pixelRatio, res.screenWidth, res.screenHeight, res.language, res.version, res.system, res.platform, res.wifiEnabled);
      }
    })
  },

  //右上角页面分享 分享日志
  getPageShare: async function (linkcode, articleguid, path) {
    var that = this;
    var uinfo = null;
    var ueridguid = null;
    var familyid = null;
    if (wx.getStorageSync("wxauth").uid == "" || wx.getStorageSync("wxauth").uid == null || wx.getStorageSync("wxauth").uid == undefined) {
      uinfo = null;
      ueridguid = null;
    } else {
      uinfo = wx.getStorageSync("wxauth").uid;
      ueridguid = wx.getStorageSync("wxauth").userid;
    }
    if (wx.getStorageSync("familyidguid").FId == "" || wx.getStorageSync("familyidguid").FId == null || wx.getStorageSync("familyidguid").FId == undefined) {
      familyid = null;
    } else {
      familyid = wx.getStorageSync("familyidguid").FId
    }
    wx.getSystemInfo({
      success(res) {
        var hr = authApi.wxApi.getPageShare(uinfo, ueridguid, linkcode, articleguid, path, familyid, res.brand, res.model, res.pixelRatio, res.screenWidth, res.screenHeight, res.language, res.version, res.system, res.platform, res.wifiEnabled);
      }
    })
  },

  onShow: function (options) {
    if (this.globalData.time1 == "") {
      this.globalData.time1 = util.formatTime(new Date());
    }
  },
  onHide: function () {
    this.getPageTimer("exitAll","", this.globalData.time1, util.formatTime(new Date()));
  },

})