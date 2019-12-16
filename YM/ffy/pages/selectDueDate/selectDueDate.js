// pages/selectDueDate/selectDueDate.js
const util = require("../../utils/util.js")
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../services/enter'
import dataApi2 from '../../services/dataapi'
const setting = require("../../utils/setting.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    isNull: false
  },
  //选择预产期
  bindDateChange: async function(e) {
    this.setData({
      date: e.detail.value
    })
    var that = this;
    var hr = await dataApi.Enter.CheckExpectDate({
      EcpectDate: this.data.date,
    });
    if (hr.state == 1) {
      this.setData({
        isNull: true
      })
    } else {
      wx.showToast({
        title: "请设置正确的预产期时间！", //res.data.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },

  //保存预产期
  saveDueDay: async function() {
    if (this.data.date == '') {
      wx.showToast({
        title: "请选择您的预产期", //res.data.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },

  // 设置我是妈妈接口
  setMathor: async function() {
    // debugger;
    var that = this;
    var hr = await dataApi2.wxApi.SetMother({
      UserId: wx.getStorageSync("wxauth").userid
    });
    if (hr.state == 1) {
      // 设置预产期
      this.setLaborData();
    }else{
      wx.showToast({
        title: hr.msg,
        icon:"none"
      })
    }
  },

  // 设置预产期
  setLaborData: async function() {
    var that = this;
    var hr = await dataApi.Enter.setData({
      UserId: wx.getStorageSync("wxauth").userid,
      EcpectDate: this.data.date,
    });
    if (hr.state == 1) {

      wx.switchTab({
        url: '../home/home'
      })
    }
  },

  //获取用户手机号
  getPhoneNumber: async function(e) {
    // 获取手机号接口
    let hr = await dataApi2.wxApi.wxPhoneNumber(e);

    // 缓存手机号
    if (hr.data) {
      wx.setStorageSync("wxphone", hr.data.phoneNumber);

      // 妈妈授权
      this.setMathor();
    }

    // debugger;
    var that = this;
    var iv = e.detail.iv;
    var encr = e.detail.encryptedData;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny' || e.detail.errMsg != 'getPhoneNumber:ok' || e.detail.errMsg == 'getPhoneNumber:fail:cancel to confirm login' || e.detail.errMsg == 'getPhoneNumber:user deny') {
      wx.hideLoading()
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
     
    }
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