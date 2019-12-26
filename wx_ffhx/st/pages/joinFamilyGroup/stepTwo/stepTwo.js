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
    isselected: false,
    index: 0,
    array: ['患者家属'],
    buttonClicked: false,
    deviceIdGuid:'',
    familyId:'',
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //电话
  toCall: function () {
    app.getEventLog("customerService-button")
    wx.makePhoneCall({
      phoneNumber: app.globalData.phoneNumber
    })
  },
  //选择角色
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  //完成注册
  compRegister:async function () {
    if (this.data.isselected == true) {
      //根据家庭组名查询sn号
      var hr = await register.UserRegister.SelectFamily({
        snorfamilyNo: this.data.familyId
      });
      if (hr.state == 1 && hr.data != "") {
        //完成申请加入家庭组
        console.log("角色：" + this.data.array[this.data.index])
        var hrs = await register.UserRegister.ApplyJoinFamily({
          userId: wx.getStorageSync("wxauth").userid,
          sn: hr.data.SN,
          userRole: this.data.array[this.data.index],
          familyId:0
        });
        if (hrs.state == 1) {
          wx.navigateTo({
            url: '../stepThree/stepThree'
          })
        } else {
          wx.showToast({
            title: hrs.msg,
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: hr.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }else{
      wx.showToast({
        title: "请阅读并同意用户许可协议及隐私条款", //res.data.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },
  //不注册返回首页
  goIndex: function () {
    app.getEventLog("notRegisterUse-button")
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  //点击同意隐私协议 
  checkboxChange: function (e) {
    app.getEventLog("registerMember-Agreeprotocol-button")
    this.setData({
      isselected: e.target.dataset.checks ? false : true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let famgruid = options.famGroId;
    this.setData({
      familyId: famgruid
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
    app.getEventLog("joinFamilyGroup_stepTwo-page")
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
      app.getPageTimer("joinFamilyGroup_stepTwo-page", "", vtime, this.data.time2);
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
      app.getPageTimer("joinFamilyGroup_stepTwo-page", "", vtime, this.data.time2);
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