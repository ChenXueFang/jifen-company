// pages/applyInvite/applyInvite.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../services/enter'
import authApi from '../../services/dataapi'
import userApplyJoinApi from '../../services/userApplyJoin'
const setting = require("../../utils/setting.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyid:'',
    nickName:'',
    applyUserid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    var aid = options.ApplyId
    var uid = options.UserId
    console.log(aid + "," + uid)
    this.setData({
      applyid: aid,
      applyUserid: uid
    })

    var hr = await userApplyJoinApi.Users.GetUserInfoByUserId({
      id: this.data.applyUserid
    });
    if(hr.state==1 && hr.rows.length>0){
      this.setData({
        nickName: hr.rows[0].NickName
      })
    }
  },
  //同意
  sure: async function (id) {
    var that = this;
    var hr = await userApplyJoinApi.UserApplyJoin.agressInviteEnterFamily(this.data.applyid, {
      MatherUserId: wx.getStorageSync("wxauth").userid,
      ApproveState:"1"
    });
    if (hr.state == 1) {
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
  cancel:async function () {
    var that = this;
    var hr = await userApplyJoinApi.UserApplyJoin.agressInviteEnterFamily(this.data.applyid, {
      MatherUserId: wx.getStorageSync("wxauth").userid,
      ApproveState: "2"
    });
    if (hr.state == 1) {
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