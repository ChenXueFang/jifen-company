// pages/applyInformation/leaderAgree/leaderAgree.js
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
    msgidguid: 0,
    familymemberid: 0,
    familyMsg: {},
    useridFamily: 0,
    familyinfo: "",
    applyid: 0,
    time1: "", //进入页面时间
    time2: "", //离开页面时间
    disabled: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.msgidguid != null && options.msgidguid != undefined && options.msgidguid != '') {
      this.setData({
        msgidguid: options.msgidguid
      })
      this.getFamilyMsgInfo();
    }
  },

  //消息标为已读 put this.readed();
  readed: async function () {
    var hr = await dataApi.familyApi.readed({
      MsgIdGuid: this.data.msgidguid,
      IsRead: true
    });
  },

  //首页过来获取信息
  getFamilyMsgInfo: async function () {
    var hr = await dataApi.familyApi.getFamilyMsgInfo({
      guid: this.data.msgidguid
    });
    if (hr.data) {
      this.setData({
        familyMsg: hr.data,
        useridFamily: hr.data.msgList.MPUserId,
        applyid: hr.data.FamilyMemberIdGuid
      })
      this.getMyFamily();
    }
  },

  //列表页过来获取信息
  getFamilyMemberByGuid: async function () {
    var hr = await dataApi.familyApi.getFamilyMemberByGuid({
      guid: this.data.familymemberid
    });
    if (hr.data) {
      this.setData({
        familyMsg: hr.data,
        useridFamily: hr.data.msgList.MPUserId,
        applyid: hr.data.MemberIdGuid
      })
      this.getMyFamily();
    }
  },

  // 获取我的家庭
  getMyFamily: async function () {
    var that = this;
    var hr = await dataApi.familyApi.getMyFamily({
      userId: this.data.useridFamily,
      isCheckedState: false
    });
    if (hr.state == 1 && hr.data) {
      if (hr.data.familyName != "" && hr.data.familyName != null) {
        that.setData({
          familyinfo: hr.data.userInfo.ApplyTime
        })
      }
    }
  },

  // 组长同意好友加入
  agreejoin: async function () {
    // 点过一个按钮就不能点另一个
    if (this.data.disabled == false) {
      var that = this;
      var hr = await dataApi.familyApi.dealJoinFamily({
        applyId: this.data.applyid,
        userId: wx.getStorageSync("wxauth").userid,
        isAccecpt: true
      });
      if (hr.state == 1) {
        this.setData({
          disabled: true
        })
        app.getEventLog("agreeJoin-button")
        this.readed();
        wx.showToast({
          title: '已同意',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      } else {
        setTimeout(function () {
          wx.showToast({
            title: hr.msg,
            icon: 'none'
          })
        }, 900)
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      }
    }
  },

  // 组长拒绝好友加入
  refusejoin: async function () {
    if (this.data.disabled == false) {
      this.readed();
      var that = this;
      var hr = await dataApi.familyApi.dealJoinFamily({
        applyId: this.data.applyid,
        userId: wx.getStorageSync("wxauth").userid,
        isAccecpt: false
      });
      if (hr.state == 1) {
        this.setData({
          disabled: true
        })
        app.getEventLog("refuseJoin-button")
        wx.showToast({
          title: '已拒绝',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      } else {
        setTimeout(function () {
          wx.showToast({
            title: hr.msg,
            icon: 'none'
          })
        }, 900)
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      }
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
    app.getEventLog("leaderAgree-page")
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
      app.getPageTimer("leaderAgree-page", "", vtime, this.data.time2);
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
      app.getPageTimer("leaderAgree-page", "", vtime, this.data.time2);
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