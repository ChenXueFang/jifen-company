// pages/validation/validation.js
//获取应用实例
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
Page({
  data: {
    url: setting.setting.URL,
    mobile: "",
    mobileCode: "",
    codetype: "重发验证码 60s",
    isEmpty: false, //验证码是否为空
    isget: false, //获取验证码
    backurl: "",
    ID: "",
    time1: "", //进入页面时间
    time2: "", //离开页面时间
  },
  //返回
  goBack: function() {
    wx.navigateTo({
      url: "../login/login"
    })
    // wx.navigateBack({})
  },
  //得到填写的验证码
  getMobileCode: function(e) {
    var val = e.detail.value;
    this.setData({
      mobileCode: val
    });
    if (val.length != 0) {
      this.setData({
        isEmpty: false
      });
    } else {
      this.setData({
        isEmpty: true
      });
    }
  },
  //获取验证码
  getCode: function() {
    app.getEventLog("1102", "获取手机验证码点击重发验证码", "", "");
    setting.GET({
      mobile: this.data.mobile
    }, "API/APIData.ashx?_op=GetMobileCode", (data) => {
      if (data.success) {
        wx.showToast({
          title: '验证码发送成功',
          icon: 'success',
          duration: 2000
        })
        this.settime(60);
      }
    }, (err) => {
      console.log(err)
    }, false);
  },
  //保存用户Unionid
  saveUserUnion: function() {
    setting.POST({}, "API/APIData.ashx?_op=SaveUserUnion", (data) => {

    }, (err) => {
      console.log(err)
    }, false);
  },
  //注册用户
  register: function() {
    app.getEventLog("1101", "获取手机验证码点击下一步", "", "");
    if (this.data.mobileCode.length == 0) {
      this.setData({
        isEmpty: true
      });
    } else {
      setting.GET({
        unionId: setting.setting.GetCache(setting.setting.unionidKey),
        openId: setting.setting.GetCache(setting.setting.miniopenidKey),
        mobile: this.data.mobile,
        mobileCode: this.data.mobileCode
      }, "API/APIData.ashx?_op=RegisterMobileUser", (data) => {
        if (data.success) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          })
          wx.setStorageSync(setting.setting.useridKey, data.data.VipUserId);
          this.saveUserUnion();

          let backurl = this.data.backurl + '?ID=' + this.data.ID;
          if (!backurl) {
            wx.navigateTo({
              url: '../index/index'
            })
          } else {
            wx.navigateTo({
              url: backurl
            })
          }

        } else {
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
        console.log(err);
      }, false);
    }
  },
  //重获验证码倒计时
  settime: function(times) {
    if (times == 0) {
      // clearTimeout(timer);
      this.setData({
        isget: true
      })
      return
    } else {
      times--
      this.setData({
        isget: false,
        codetype: "重发验证码  " + times + "s"
      })
    }
    setTimeout(() => {
      this.settime(times)
    }, 1000)
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      mobile: options.mobile,
      backurl: options.backurl,
      ID: options.ID,
      time1: util.formatTime(new Date())
    })
    this.settime(60);
    console.log(options.backurl)
    console.log(options.ID)

    // app.getEventLog("1100", "获取手机验证码页面", "", "");
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      time1: util.formatTime(new Date())
    })
    app.getEventLog("1100", "获取手机验证码页面", "", "");
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
      app.getPageTimer("1100", "获取手机验证码页面", "", "", vtime, this.data.time2);
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
      app.getPageTimer("1100", "获取手机验证码页面", "", "", vtime, this.data.time2);
    }
  },
})