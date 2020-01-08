// pages/familyManege/saomaJoin/saomaJoin.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/familyapi'
import register from '../../../servicesAPI/userRegister'
const setting = require("../../../utils/setting.js");
const util = require("../../../utils/util.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isselected: false,
    showjoinbtn:false,
    scene: "",
    uid: "",
    fid: "",
    leaderInfo:{},
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //license 许可
  license: function () {
    wx.navigateTo({
      url: '../../license/license'
    })
  },
  //protocol 隐私
  protocol: function () {
    wx.navigateTo({
      url: '../../protocol/protocol'
    })
  },
  //点击同意隐私协议 
  checkboxChange: function (e) {
    app.getEventLog("scanApplyjoin-Agreeprotocol-button")
    this.setData({
      isselected: e.target.dataset.checks ? false : true
    })

    if (this.data.isselected == true) {
      this.setData({
        showjoinbtn:true
      })
    }else{
      this.setData({
        showjoinbtn: false
      })
    }
  },
  toApplyjoin:function(){
    if (this.data.isselected == false) {
      wx.showToast({
        title: "请阅读并同意用户许可协议及隐私条款", //res.data.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let hr = await authApi.wxApi.wxLoginCheck();
    this.setData({
      uid: options.scene.split("_")[0],  //组长userid
      fid: options.scene.split("_")[1],  //familyId
    })
    this.getLeaderInfo();
  },

  // 获取组长信息
  getLeaderInfo: async function () {
    var that = this;
    var hr = await dataApi.familyApi.getLeaderInfo({
      id: this.data.uid
    });
    if (hr.state == 1&&hr.rows.length>0) {
      that.setData({
        leaderInfo: hr.rows[0]
      })
    }
  },

  // 授权头像信息
  getUserInfo: async function(e) {
    if (e.detail.userInfo != undefined) {
      // 获取用户信息接口
      let hr = await authApi.wxApi.wxUserInfo(e);
      app.globalData.userInfo = e.detail.userInfo

      if (app.globalData.userInfo != null) {
        wx.setStorageSync("nickName", app.globalData.userInfo.nickName);
        wx.setStorageSync("avatarUrl", app.globalData.userInfo.avatarUrl);
      }

      // 申请加入接口
      var hrs = await register.UserRegister.ApplyJoinFamily({
        userId: wx.getStorageSync("wxauth").userid,
        sn: "",  //为空
        userRole: "family",
        familyId: this.data.fid
      });
      if (hrs.state == 1) {
        app.getEventLog("saoMa_applyJoin-button")
        wx.switchTab({
          url: '/pages/index/index'
        })
      } else {
        wx.showToast({
          title: hrs.msg,
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }, 2000)
      }
      // 申请加入 end
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
            url: '/pages/index/index'
          })

        }
      })
      wx.hideLoading()
    }
  },

  // 点击取消加入，跳转到首页
  index() {
    app.getEventLog("saoMa_cancel-button")
    wx.switchTab({
      url: '../../index/index',
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
  onShow: async function() {
    app.getEventLog("saomaJoin-page")
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
      app.getPageTimer("saomaJoin-page", "", vtime, this.data.time2);
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
      app.getPageTimer("saomaJoin-page", "", vtime, this.data.time2);
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