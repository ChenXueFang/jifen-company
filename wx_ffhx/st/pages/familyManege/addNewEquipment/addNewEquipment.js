import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import register from '../../../servicesAPI/userRegister'
const setting = require("../../../utils/setting.js");
const util = require("../../../utils/util.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRSShow: false,
    isSearchShow: false,
    isExist: false,
    isShowDesc: false,
    snNumber: '',
    familyName: '',
    familyid: '',
    time1: "", //进入页面时间
    time2: "", //离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toCall: function () {
    app.getEventLog("customerService-button")
    wx.makePhoneCall({
      phoneNumber: app.globalData.phoneNumber
    })
  },

  //输入sn码
  onInputValue: function (e) {
    this.setData({
      snNumber: e.detail.value
    })
  },
  //打开扫码提示弹窗
  showDesc: function () {
    app.getEventLog("sweepCodeRegister-button")
    this.setData({
      isShowDesc: true
    })
  },
  //扫码
  toSM: function () {
    this.setData({
      isShowDesc: false
    })
    var that = this;
    wx.scanCode({
      success(res) {
        console.log(res)
        if (res.scanType == "CODE_128") {
          that.setData({
            snNumber: res.result
          })
        }
      }
    })
    console.log(this.data.snNumber)
  },
  //下一步
  toNextStep: async function () {
    setTimeout(function () {
      wx.showLoading({
        title: '加载中...',
      })
    },850)
    var hrs = await register.UserRegister.CheckSN({
      userId: wx.getStorageSync("wxauth").userid,
      sn: this.data.snNumber,
      isFirst: false
    });
    console.log(hrs)
    if (hrs.state == 1) {
      app.getEventLog("completeAddNewEquip-button")
      setTimeout(function () {
        wx.hideLoading();
        wx.navigateTo({
          url: '../completeAddNewEquip/completeAddNewEquip'
        })
      },900)
    } else {
      setTimeout(function () {
        wx.hideLoading();
        wx.showToast({
          title: hrs.msg,
          icon: 'none',
          duration: 2000
        })
      }, 900)
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
    app.getEventLog("addNewEquipment-page")
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
      app.getPageTimer("addNewEquipment-page", "", vtime, this.data.time2);
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
      app.getPageTimer("addNewEquipment-page", "", vtime, this.data.time2);
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