// pages/applyJoin/applyJoin.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../services/enter'
import authApi from '../../services/dataapi'
const setting = require("../../utils/setting.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:"",
      mid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await authApi.wxApi.wxLoginCheck()
    app.getEventLog(21)

    this.setData({ 
      id: options.id,
      mid:options.mid
    });
    if (wx.getStorageSync("wxauth").userid != this.data.mid){
      wx.switchTab({
        url: '../home/home'
      })
    }

   // this.sure(id)
  },

  sure: async function (id) {
    var that = this;
    var hr = await dataApi.Enter.ApproveJoinFamily({
      UserId: wx.getStorageSync("wxauth").userid,
      familyMemberId: this.data.id,
    });
    if (hr.state) {
      wx.showToast({
        title: hr.msg,
        icon: 'none'
      })
      setTimeout(function () {
        wx.switchTab({
          url: '../home/home'
        })
      }, 2000)
    }
  },

  // 取消
  cancel: function () {
    app.getEventLog(22)
    wx.switchTab({
      url: '../home/home'
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
  // onShareAppMessage: function () {

  // }
})