// pages/myFamilyMember/myFamilyMember.js
const app = getApp()
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../services/myFamily'
import authApi from '../../services/dataapi'

const util = require("../../utils/util.js")
const setting = require("../../utils/setting.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myRole: wx.getStorageSync("myrole").UserRole,
    myfamilyId: 0,
    otherFamilyList: [],
    creatFamily: {},
    checked: false,
    checkFamilyId: 0,
    isNull: true,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    await authApi.wxApi.wxLoginCheck()
    this.setData({
      myfamilyId: wx.getStorageSync("familyId").FamilyId
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.getEventLog(34);
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })

    this.getMyFamilyList();
  },

  // 获取家庭列表
  getMyFamilyList: async function() {
    var that = this;
    var hr = await dataApi.MyFamily.getMyFamilyList({
      UserId: wx.getStorageSync("wxauth").userid
    });
    if (hr.state == 1) {
      if (hr.data && hr.data.length > 0) {
        this.setData({
          creatFamily: hr.data.filter((a) => {
            return a.UserId == wx.getStorageSync("wxauth").userid
          })[0],
          otherFamilyList: hr.data.filter((a) => {
            return a.UserId != wx.getStorageSync("wxauth").userid
          }),
        })
        // 默认家庭的背景颜色
        let opi = this.data.otherFamilyList.filter((s) => {
          return s.FamilyId == that.data.myfamilyId
        });
        if (opi.length > 0) {
          opi[0].checked = true
        }
        that.setData({
          otherFamilyList: that.data.otherFamilyList
        })
        // 是否有创建的家庭
        if (this.data.creatFamily) {
          if (this.data.myfamilyId == this.data.creatFamily.FamilyId) {
            this.data.creatFamily.checked = true
            that.setData({
              creatFamily: this.data.creatFamily
            })
          }
          that.setData({
            isNull: false
          })
        } else {
          that.setData({
            isNull: true
          })
        }
      }
    } else {
      this.setData({
        isNull: true
      })
    }
  },

  // 申请加入新的家庭
  toJoinFamily() {
    app.getEventLog(37);
    app.globalData.currentLocation = 0,
      app.globalData.invitetype = true,
    wx.navigateTo({
      url: '../joinFamily/joinFamily',
    })
  },

  // 创建我的家庭
  toEnterPro() {
    app.getEventLog(35);
    wx.navigateTo({
      url: '../enterPro/enterPro',
    })
  },

  // 单选
  radioChange: async function(e) {
    this.setData({
      checkFamilyId: e.detail.value,
    })
  },
  // 一键切换
  changeFamily: async function() {
    if (this.data.checkFamilyId) {
      var that = this;
      var hr = await dataApi.MyFamily.changeFamily(wx.getStorageSync("wxauth").userid, {
        FamilyId: this.data.checkFamilyId
      });
      if (hr.state == 1) {
        app.getEventLog(36);
        // 默认家庭的背景颜色(我加入的家庭)
        let opi = this.data.otherFamilyList.filter((s) => {
          return s.FamilyId == this.data.checkFamilyId
        });
        //先把原来选中的取消选中  begin
        let opichk = this.data.otherFamilyList.filter((s) => {
          return s.checked == true
        });
        if (opichk.length > 0) {
          opichk[0].checked = false
        }
        //end
        //把当前项目选中
        if (opi.length > 0) {
          opi[0].checked = true
        }
        //重新赋值加载
        that.setData({
          otherFamilyList: that.data.otherFamilyList
        })

        // 默认家庭的背景颜色(我创建的家庭)
        if (this.data.creatFamily) {
          if (this.data.checkFamilyId == this.data.creatFamily.FamilyId) {
            this.data.creatFamily.checked = true
            that.setData({
              creatFamily: this.data.creatFamily
            })
          } else {
            this.data.creatFamily.checked = false
            that.setData({
              creatFamily: this.data.creatFamily
            })
          }
        }
        wx.showToast({
          title: hr.msg
        })
      } else {
        wx.showToast({
          title: hr.msg,
          icon: "none"
        })
      }
    }
  },

  //返回
  toMyFam: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
      app.getPageTimer(34, this.data.TempId, vtime, this.data.time2);
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
      app.getPageTimer(34, this.data.TempId, vtime, this.data.time2);
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