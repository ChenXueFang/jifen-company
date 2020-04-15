
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
    isRSShow: false,
    isSearchShow: false,
    isExist: false,
    isShowDesc: false,
    snNumber: '',
    familyName: '',
    familyid: '',
    isNextBtn: false, //下一步按钮是否可点
    time1: "",//进入页面时间
    time2: "",//离开页面时间
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
  //授权后跳转到第二步
  // 授权头像信息
  getUserInfo: async function (e) {
    var that = this;
    console.log(e)

    if (e.detail.userInfo != undefined) {
      this.setData({
        isNextBtn: false, //下一步按钮是否可点
      })
      // 获取用户信息接口
      let hr = await authApi.wxApi.wxUserInfo(e);
      app.globalData.userInfo = e.detail.userInfo

      if (app.globalData.userInfo != null) {
        wx.setStorageSync("nickName", app.globalData.userInfo.nickName);
        wx.setStorageSync("avatarUrl", app.globalData.userInfo.avatarUrl);
      }
      setTimeout(function () {
        wx.showLoading({
          title: '加载中...',
        })
      }, 850)
      //检查sn号
      var hrs = await register.UserRegister.CheckSN({
        userId: wx.getStorageSync("wxauth").userid,
        sn: this.data.snNumber,
        isFirst: true
      });
      console.log(hrs)
      if (hrs.state == 1) {
        this.setData({
          isNextBtn: false, //下一步按钮是否可点
        })
        setTimeout(function () {
          wx.hideLoading();
          wx.navigateTo({
            url: '../stepTwo/stepTwo?deviceId=' + hrs.rows[0].DeviceIdGuid
          })
        }, 900)
      } else if (hrs.state == -2 && hrs.msg == "该sn号已被绑定，请选择其他sn号") {
        // 有家庭组信息
        if (hrs.data) {
          setTimeout(function () {
            wx.hideLoading();
          }, 900)
          this.setData({
            isExist: true,
            familyName: hrs.data.FamilyName,
            familyid: hrs.data.FamilyIdGuid,
            isNextBtn: true, //下一步按钮是否可点
          })
          console.log('家庭id：' + this.data.familyid + ",家庭名：" + this.data.familyName)
        }else{  // 没有家庭组信息
          setTimeout(function () {
            wx.hideLoading();
            wx.showToast({
              title: hrs.msg,
              icon: 'none',
              duration: 2000
            })
          }, 900)
        }
      } else {
        setTimeout(function () {
          wx.hideLoading();
          wx.showToast({
            title: hrs.msg,
            icon: 'none',
            duration: 2000
          })
        }, 900)
        this.setData({
          isNextBtn: true, //下一步按钮是否可点
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

  //加入家庭组
  toJoinGroup: function () {
    wx.navigateTo({
      url: '../../joinFamilyGroup/stepOne/stepOne'
    })
  },
  //序列号存在的情况下申请加入家庭组
  toJoinFamilyGroup: function () {
    //需要带上参数
    wx.navigateTo({
      url: '../../joinFamilyGroup/stepTwo/stepTwo?famGroId=' + this.data.familyName
    })
  },
  //输入sn码
  onInputValue: function (e) {
    this.setData({
      snNumber: e.detail.value
    })
    if (e.detail.value) {
      this.setData({
        isNextBtn: true, //下一步按钮是否可点
      })
    }
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
  //什么是家庭组弹窗
  showRS: function () {
    app.getEventLog("whatIsFamily-button")
    this.setData({
      isRSShow: true
    })
  },
  //关闭家庭组弹窗
  hideRS: function () {
    this.setData({
      isRSShow: false
    })
  },
  //如何找到序列号弹窗
  showSearch: function () {
    app.getEventLog("productNumber_question-button")
    this.setData({
      isSearchShow: true
    })
  },
  //关闭如何找到序列号弹窗
  hideSearch: function () {
    this.setData({
      isSearchShow: false
    })
  },
  //序列号存在弹窗
  showExit: function () {
    this.setData({
      isExist: true
    })
  },
  //关闭序列号存在弹窗
  hideExit: function () {
    this.setData({
      isExist: false
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
    app.getEventLog("register_stepOne-page")
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
      app.getPageTimer("register_stepOne-page", "", vtime, this.data.time2);
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
      app.getPageTimer("register_stepOne-page", "", vtime, this.data.time2);
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