//获取应用实例
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: setting.setting.URL,
    mobile:"",
    codetype: "重发验证码 60s",
    isget: false,//获取验证码
    ismobile: false,
    backurl: "",
    ID: "",
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  // 手机号部分
  inputPhoneNum: function (e) {
    let phoneNumber = e.detail.value
    if (phoneNumber.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNumber);
      this.setData({
        ismobile: checkedNum,
        mobile: phoneNumber
      });
    }
  },
  checkPhoneNum: function (phoneNumber) {
    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        image: '../../images/fail.png',
        duration: 2000,
      })
      return false
    }
  },
  //获取验证码
  getCode:function(){
    app.getEventLog("901", "手机验证码页面点击验证码按钮", "", "");
    if (this.data.ismobile){
      setting.GET({ mobile: this.data.mobile }, "API/APIData.ashx?_op=GetMobileCode", (data) => {
        if (data.success) {
          wx.showToast({
            title: '验证码发送成功',
            icon: 'success',
            duration: 2000
          })
          this.settime(60);
        }
      }, (err) => { console.log(err) }, false);
    }else{
      wx.showToast({
        title: '手机号不正确',
        image: '../../images/fail.png',
        duration: 2000,
      })
    }
  },
  //重获验证码倒计时
  settime: function (times) {
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
        codetype: "重发验证码  " + times + "s"
      })
    }
    setTimeout(() => {
      this.settime(times)
    }, 1000)
  },
  //绑定手机号
  bindMobile:function(e){
    app.getEventLog("902", "手机验证码页面点击绑定手机按钮", "", "");
    var mobile = e.detail.value.mobile;
    var code = e.detail.value.code;
    if (!mobile || !code) {
      wx.showModal({
        title: '提示',
        content: '请输入完整信息！',
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
    }else{
      setting.GET({ unionId: setting.setting.GetCache(setting.setting.unionidKey), openId: setting.setting.GetCache(setting.setting.miniopenidKey), mobile: mobile, mobileCode: code }, "API/APIData.ashx?_op=RegisterMobileUser", (data) => {
        if (data.success) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          })
          wx.setStorageSync(setting.setting.useridKey, data.data.VipUserId);
          let backurl = this.data.backurl + '?ID=' + this.data.ID;
          console.log(backurl)
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
      }, (err) => { console.log(err); }, false);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      backurl: options.backurl,
      ID: options.ID,
      time1: util.formatTime(new Date())
    })
    console.log(options.backurl)
    console.log(options.ID)

    //记录页面访问次数
    // app.getEventLog("900", "手机验证码注册页面", "", "");
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
    this.setData({
      time1: util.formatTime(new Date())
    })
    app.getEventLog("900", "手机验证码注册页面", "", "");
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
      app.getPageTimer("900", "手机验证码注册页面", "", "", vtime, this.data.time2);
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
      app.getPageTimer("900", "手机验证码注册页面", "", "", vtime, this.data.time2);
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