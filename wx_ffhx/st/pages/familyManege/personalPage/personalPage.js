// pages/familyManege/personalPage/personalPage.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/familyapi'
const setting = require("../../../utils/setting.js");
const util = require("../../../utils/util.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    familyMemberId:0,
    personalInfo:{},
    role:0,
    isLeader: false,
    isChecked:false,
    msgidguid:0,
    familymemberidguid:0,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      familyMemberId: options.familyMemId,
      role: options.role,
      msgidguid: options.msgidguid
    });
    // 判断进入者的角色，隐藏"退出家庭组"按钮
    if (this.data.role==0){
      this.setData({
        isLeader: true
      })
    } else if (this.data.role == 1) {
      this.setData({
        isLeader: false,
      })
    }
    // 列表进去
    if (options.familyMemId != null && options.familyMemId != undefined && options.familyMemId != ''){
      this.setData({
        isChecked: false
      })
      this.getFamilyMember();
    }
    // 首页消息进去
    if (options.msgidguid != null && options.msgidguid != undefined && options.msgidguid != '') {
      this.setData({
        isChecked: true,
        isLeader: true
      })
      this.getFamilyMsgInfo();
    }
    
  },

  //首页过来获取信息
  getFamilyMsgInfo: async function () {
    var hr = await dataApi.familyApi.getFamilyMsgInfo({
      guid: this.data.msgidguid
    });
    if (hr.data) {
      this.setData({
        familymemberidguid: hr.data.FamilyMemberIdGuid
      })
    }
    this.getFamilyMemberIndex()
  },

  // 列表进来，获取家庭成员的明细信息
  getFamilyMember: async function () {
    var that = this;
    var hr = await dataApi.familyApi.getFamilyMember({
      familyMemberId: this.data.familyMemberId
    });
    if (hr.state==1){
      that.setData({
        personalInfo: hr.data
      })
    }
  },
  // 首页进来，获取信息
  getFamilyMemberIndex: async function () {
    var that = this;
    var hr = await dataApi.familyApi.getFamilyMember({
      familyMemberId: this.data.familymemberidguid
    });
    if (hr.state == 1) {
      that.setData({
        personalInfo: hr.data
      })
    }
  },

  //消息标为已读 put  this.readed();
  readed: async function () {
    var hr = await dataApi.familyApi.readed({
      MsgIdGuid: this.data.msgidguid,
      IsRead: true
    });
  },

  // 点击知道了，跳转到首页
  index() {
    app.getEventLog("alreadyJoin_know-button")
    wx.switchTab({
      url: '../../index/index',
    })
    this.readed();
  },
  // 移除按钮
  remove(){
    var that = this;
    wx.showModal({
      title: '移出家庭组',
      content: '是否将好友移出家庭组',
      cancelText: "取消", //默认是“取消”
      confirmText: "确定", //默认是“确定”
      confirmColor: '#1575e5', //确定文字的颜色
      success: async function (res) {
        if (res.confirm) {
          app.getEventLog("removeFamily-button")
          //列表进来
          if (that.data.familyMemberId) {
            var hr = await dataApi.familyApi.deleteFamilyMember({
              familyMemberId: that.data.familyMemberId,
              userId: wx.getStorageSync("wxauth").userid
            });
          }
          //首页进来
          if (that.data.msgidguid) {
            var hr = await dataApi.familyApi.deleteFamilyMember({
              familyMemberId: that.data.familymemberidguid,
              userId: wx.getStorageSync("wxauth").userid
            });
            that.readed();
          }
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
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
    app.getEventLog("personalPage-page")
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
      app.getPageTimer("personalPage-page", "", vtime, this.data.time2);
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
      app.getPageTimer("personalPage-page", "", vtime, this.data.time2);
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