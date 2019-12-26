import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import register from '../../../servicesAPI/userRegister'
const setting = require("../../../utils/setting.js");
const app = getApp();
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    snNumber:'',
    isSearchShow: false,
    isExist: false,
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
  //下一步
  // 授权头像信息
  getUserInfo: async function (e) {
    console.log(e)

    if (e.detail.userInfo != undefined) {
      // 获取用户信息接口
      let hr = await authApi.wxApi.wxUserInfo(e);
      app.globalData.userInfo = e.detail.userInfo

      if (app.globalData.userInfo != null) {
        wx.setStorageSync("nickName", app.globalData.userInfo.nickName);
        wx.setStorageSync("avatarUrl", app.globalData.userInfo.avatarUrl);
      }
      
      //检查家庭组或sn是否存在
      var hrs = await register.UserRegister.CheckHasSN({
        SN: this.data.snNumber,
        PageSize: 1,
        PageIndex: 1
      });
      console.log(hrs)
      if (hrs.state == 1) {
        if (hrs.rows.length <= 0) {
          this.setData({
            isExist: true
          })
        } else {
          if (hrs.rows[0].ApprovState == 0 || hrs.rows[0].ApprovState == 1) {
            this.setData({
              isSearchShow: true
            })
          } else if (hrs.rows[0].ApprovState == 2) {
            //根据家庭组名查询sn号
            var hrss = await register.UserRegister.SelectFamily({
              snorfamilyNo: this.data.snNumber
            });
            if (hrss.state == 1 && hrss.rows.length > 0) {
              wx.navigateTo({
                url: '../stepTwo/stepTwo?famGroId=' + hrss.rows[0].FamilyName
              })
            } else {
              wx.showToast({
                title: hrss.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        }
      } else {
        wx.showToast({
          title: hrs.msg,
          icon: 'none',
          duration: 2000
        })
      }
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
        success: function (res) {
          wx.switchTab({
            url: '/pages/index/index'
          })

        }
      })
      wx.hideLoading()
    }
  },

  //不注册返回首页
  goBack: function () {
    app.getEventLog("notRegisterUse-button")
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  //序列号不存在
  toRegister:function(){
    //带参数：患者本人
    wx.navigateTo({
      url: '../../register/stepTwo/stepTwo?deviceId=' + this.data.snNumber
    })
  },
  //输入sn码或组长信息
  onInputValue: function (e) {
    this.setData({
      snNumber: e.detail.value
    })
  },
  //组长申请在审核弹窗
  showSearch: function () {
    this.setData({
      isSearchShow: true
    })
  },
  //关闭组长申请在审核弹窗
  hideSearch: function () {
    this.setData({
      isSearchShow: false
    })
  },
  //序列号不存在弹窗
  showExit: function () {
    this.setData({
      isExist: true
    })
  },
  //关闭序列号不存在弹窗
  hideExit: function () {
    this.setData({
      isExist: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    app.getEventLog("joinFamilyGroup_stepOne-page")
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
      app.getPageTimer("joinFamilyGroup_stepOne-page", "", vtime, this.data.time2);
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
      app.getPageTimer("joinFamilyGroup_stepOne-page", "", vtime, this.data.time2);
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