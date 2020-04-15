//获取应用实例
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
Page({
  data: {
    url: setting.setting.URL,
    mobile: "",
    isShow: false,//显示弹窗
    isWrong: false,//手机号正确与否
    isEmpty: false,//手机号是否输入
    isValidMobile: false,//手机号是否有效
    backurl: "",
    ID: "",
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //返回
  goBack: function () {
    wx.navigateBack({})
  },
  // 获取手机号并验证手机号  
  getPhone: function (e) {
    var val = e.detail.value;
    this.setData({
      mobile: val
    });
    if (val.length != 0) {
      this.setData({
        isEmpty: false
      });
      if (!(/^1\d{10}$/.test(val))) {
        this.setData({
          isWrong: true,
          isValidMobile: false
        });
      } else {
        this.setData({
          isWrong: false,
          isValidMobile: true
        });
      }
    } else {
      this.setData({
        isEmpty: true,
        isWrong: false
      });
    }
  },
  //显示弹窗
  showMask: function () {
    if (this.data.mobile.length == 0) {
      this.setData({
        isEmpty: true
      });
    }
    if (this.data.isValidMobile) {
      this.setData({
        isShow: true
      })
    }
  },
  //隐藏弹窗
  hideMask: function () {
    this.setData({
      isShow: false
    })
  },
  //获取验证码
  getCode: function () {
    app.getEventLog("1001", "获取手机号点击验证码按钮", "", "");
    wx.showLoading({
      title: '获取中',
    });
    setting.GET({ mobile: this.data.mobile }, "API/APIData.ashx?_op=GetMobileCode", (data) => {
      if (data.success) {
        wx.hideLoading();
        // setTimeout(() => {
        wx.navigateTo({
          url: '../validation/validation?mobile=' + this.data.mobile + '&backurl=' + this.data.backurl + '&ID=' + this.data.ID
        })
        // }, 1000)
      } else {
        wx.hideLoading();
      }
      // console.log(data.data);
    }, (err) => {
      console.log(err);
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '获取验证码失败，刷新重试',
        showCancel: false,
        success: (res) => {
          this.getCode();
        }
      })
    }, false);
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      backurl: options.backurl,
      ID: options.ID, 
      time1: util.formatTime(new Date())
    })
    console.log(options.backurl)
    console.log(options.ID)
    
    // app.getEventLog("1000", "获取手机号登录页面", "", "");
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      time1: util.formatTime(new Date())
    })
    app.getEventLog("1000", "获取手机号登录页面", "", "");
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
      app.getPageTimer("1000", "获取手机号登录页面", "", "", vtime, this.data.time2);
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
      app.getPageTimer("1000", "获取手机号登录页面", "", "", vtime, this.data.time2);
    }
  },

})