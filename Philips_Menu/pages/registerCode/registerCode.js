// pages/register/register.js
//获取应用实例
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked: false,
    isget: false, //获取验证码
    phoneNumer: '',
    verifyCode: '', // 获取输入框中的验证码
    codetype: "重发验证码 60s",
    mobileCode: '', //接口获取后的验证码
    domainUrl: setting.setting.h5ImageUrl,
    returnPath: "", //注册完跳转的页面
    disabled: false,

    url: setting.setting.URL,
    mobile: "",
    isShow: false, //显示弹窗
    isWrong: false, //手机号正确与否
    isEmpty: false, //手机号是否输入
    isValidMobile: false, //手机号是否有效
    // backurl: "",
    // ID: "",
    time1: "", //进入页面时间
    time2: "", //离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      // backurl: options.returnPath,
      // ID: options.ID,
      time1: util.formatTime(new Date()),
      phoneNumer:app.globalData.mobile || ''
    })
    // wx.hideShareMenu();
  },
  // 跳转到会员服务协议
  memberCardRule() { 
    wx.navigateTo({
      url: '../memberCardRule/memberCardRule'
    })
  },
  // 跳转到隐私政策
  privacyPolicy() { 
    wx.navigateTo({
      url: '../privacyPolicy/privacyPolicy'
    })
  },
  //保存用户Unionid
  saveUserUnion: function() {
    setting.POST({}, "API/APIData.ashx?_op=SaveUserUnion", (data) => {
    }, (err) => {
      console.log(err)
    }, false);
  },
  // 表单验证
  registeredSubmit: function (e) {
    if (!this.checkForm()) return;
    app.globalData.formId = e.detail.formId;
    app.getEventLog("1304", "点击注册/登录按钮", "", "");
    this.addVipUser();
  },
  //注册会员 
  addVipUser: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      disabled: true
    })
    setting.POST({
      headerimg: wx.getStorageSync("avatarUrl"),
      mobile: this.data.phoneNumer,
      mobileCode: this.data.verifyCode
    }, "API/BasicData.ashx?_op=RegisterMobileUser", (data) => {
      that.setData({
        disabled: false
      })
      if (data.success) {
        wx.hideLoading();
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        })
        app.globalData.mobile = that.data.phoneNumer;
            wx.setStorageSync("mobile", that.data.phoneNumer);
            app.globalData.vipUserId = data.data.H5UserID;
        wx.setStorageSync(setting.setting.useridKey, data.data.H5UserID);
  
        wx.redirectTo
        ({
          url: '../interestLabel/interestLabel'
        })

      } else {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '注册失败',
          showCancel: false,
          success: (res) => {
            if (res.confirm) {

            }
          }
        })
      }
    }, (err) => {
      that.setData({
        disabled: false
      })
      wx.hideLoading();
      // wx.showToast({
      //   title: err,
      //   duration: 2000
      // })
    }, false);
  },
  // 隐私条款勾选变化
  checkboxChange: function(event) {
    this.setData({
      isChecked: event.detail.value.length > 0
    });
  },
  // 获取手机号并验证手机号  
  getPhone: function(e) {
    var val = e.detail.value;
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
          isValidMobile: true,
          phoneNumer: val
        });
      }
    } else {
      this.setData({
        isEmpty: true,
        isWrong: false
      });
    }
  },
  // 表单验证
  checkForm() {
    if (!this.data.isChecked) {
      wx.showToast({
        title: '请先阅读并同意飞利浦相关条例',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.phoneNumer) {
      wx.showToast({
        title: '请先完善手机号码',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.verifyCode) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      });
      return false;
    }

    return true;
  },
  //重获验证码倒计时
  settime: function(times) {
    if (times == 0) {
      // clearTimeout(timer);
      this.setData({
        isget: false
      })
      return
    } else {
      times--
      this.setData({
        isget: true,
        codetype: times + "s重新发送"
      })
    }
    setTimeout(() => {
      this.settime(times)
    }, 1000)
  },
  // 获取输入框中的验证码
  getCodeNumber: function (e) {
    this.setData({
      verifyCode: e.detail.value
    })
  },
  // 获取接口验证码
  getcode() {
    app.getEventLog("1301", "点击验证码按钮", "", "");
    var that = this;
    if (!this.data.phoneNumer) {
      wx.showToast({
        title: '请先完善手机号码',
        icon: 'none'
      });
      return;
    };
    //60秒倒计时
    that.settime(60);

    wx.showLoading({
      title: '加载中',
    })
    setting.GET({
      mobile: this.data.phoneNumer
    }, "API/BasicData.ashx?_op=GetMobileCode", (data) => {
      if (data.success) {
        app.getEventLog("1302", "点击验证码成功", "", "");
        wx.hideLoading();
        wx.showToast({
          title: '验证码发送成功',
          icon: 'success',
          duration: 2000
        })
      } else {
        app.getEventLog("1303", "点击验证码失败", "", "");
        wx.hideLoading();
      }
    }, (err) => {
      app.getEventLog("1303", "点击验证码失败", "", "");
      wx.hideLoading();
      wx.showModal({
        title: '温馨提示',
        showCancel: false,
        content: '获取验证码失败',
        success: function(res) {
          // this.getCode();
        }
      })
    }, false);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      time1: util.formatTime(new Date())
    })
    app.getEventLog("1300", "输入手机号注册页面", "", "");
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
      app.getPageTimer("1300", "输入手机号注册页面", "", "", vtime, this.data.time2);
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
      app.getPageTimer("1300", "输入手机号注册页面", "", "", vtime, this.data.time2);
    }
  },

})