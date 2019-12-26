// pages/applyInformation/refuseInvite/refuseInvite.js
const app = getApp()
const util = require("../../utils/util.js")
const setting = require("../../utils/setting.js");
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import authApi from '../../servicesAPI/dataapi'
import dataApi from '../../servicesAPI/familyapi'
import register from '../../servicesAPI/userRegister'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgidguid:0,
    familyMsg:{},
    title:"",
    instructions:"",
    isRefuse:false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      msgidguid: options.msgidguid
    })
    this.getFamilyMsgInfo();
    this.getMyFamily()
  },

  //消息标为已读 put  this.readed();
  readed: async function () {
    var hr = await dataApi.familyApi.readed({
      MsgIdGuid: this.data.msgidguid,
      IsRead: true
    });
  },

  //获取信息
  getFamilyMsgInfo: async function(){
    var hr = await dataApi.familyApi.getFamilyMsgInfo({
      guid: this.data.msgidguid
    });
    if (hr.data) {
      this.setData({
        familyMsg: hr.data
      })
      if (hr.data.MsgType==1){
        this.setData({
          title: "已退出家庭组",
          instructions: "您的好友已退出家庭组",
          isRefuse: false,
        })
      }
      if (hr.data.MsgType == 7) {
        this.setData({
          title: "无法加入您的邀请",
          instructions: "您的好友已经是其他组员的成员",
          isRefuse: false,
        })
      }
      if (hr.data.MsgType == 8) {
        this.setData({
          title: "已拒绝您的邀请",
          instructions: "您的好友已拒绝您的家庭组邀请",
          isRefuse: true,
        })
      }
    }
  },

  // 点击知道了，跳转到首页
  index() {
    app.getEventLog("familyKnow-button")
    wx.switchTab({
      url: '../index/index',
    })
    this.readed();
  },

  // 获取家庭成员列表
  getMyFamily: async function () {
    var that = this;
    var hr = await dataApi.familyApi.getMyFamily({
      userId: wx.getStorageSync("wxauth").userid,
      isCheckedState: true
    });
    if (hr.state == 1 && hr.data) {
      if (hr.data.familyName != "" && hr.data.familyName != null) {
        that.setData({
          familyinfo: hr.data
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (state) {
    app.getShareLog("inviteJoinShareAgain", "再次邀请加入家庭组分享");  //记录再次邀请好友分享日志
    this.readed();
    if (state.from === 'button') {
      // 来自页面内转发按钮
      console.log(state.target)
    }
    return {
      title: '管理更智能，关护更贴心',
      path: `pages/index/index?share=1&familyid=${state.target.dataset.familyid}&invituserid=${state.target.dataset.invituserid}`,
      imageUrl: '../../images/shareImg.png',
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
    app.getEventLog("familyMsg-page")
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
      app.getPageTimer("familyMsg-page", "", vtime, this.data.time2);
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
      app.getPageTimer("familyMsg-page", "", vtime, this.data.time2);
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

  }
})