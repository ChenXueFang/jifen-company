//获取应用实例
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backurl:"",
    ID:"",
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  goRegister:function(){
    app.getEventLog("802", "获取手机方式页面点击验证码绑定手机按钮 ", "", "");
    wx.navigateTo({
      url: '../register/register?backurl=' + this.data.backurl + '&ID=' + this.data.ID
    })
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
    // app.getEventLog("800", "获取手机方式页面", "", "");
  },

  //获取用户手机号
  getPhoneNumber: function (e) {
    app.getEventLog("801", "获取手机方式页面点击微信授权手机按钮", "", "");
    // ;
    var that = this;
    var iv = e.detail.iv;
    var encr = e.detail.encryptedData;
    // ;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny' || e.detail.errMsg != 'getPhoneNumber:ok' || e.detail.errMsg == 'getPhoneNumber:fail:cancel to confirm login' || e.detail.errMsg == 'getPhoneNumber:user deny') {
      //未授权
       wx.showModal({
         title: '提示',
         showCancel: false,
         content: '请授权手机号',
         success: function (res) { }
       })
     
    } else {

      //同意授权
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var code = res.code;
          if (encr != null && encr != "" && encr != undefined) {
            setting.POST({ code: code, encryptedData: encr, iv: iv }, "API/APIData.ashx?_op=GetUserMobileDecrypt", (data) => {
              if (data.success) {
                // ;
                var data = data.data;
                var phoneNumber = data.phoneNumber;
                var openId = data.openId;
                app.globalData.mobile = phoneNumber;
                app.globalData.openId = openId;
              }
              else
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: data.msg,
                  success: function (res) { }
                })
            }, (err) => { 
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: '网络错误',
                success: function (res) { }
              })
             }, false);

            // wx.request({
            //   url: setting.setting.URL + "api/AuthorizationAPI.ashx?_op=GetUserMobileDecrypt",
            //   data: { code: code, encryptedData: encr, iv: iv },
            //   method: "Post",
            //   header: {
            //     'content-type': 'application/json' // 默认值
            //   },
            //   success: function (res) {

            //     if (res.data.success) {
            //       ;
            //       var data = res.data.data;
            //       var phoneNumber = data.phoneNumber;
            //       var openId = data.openId;
            //       app.globalData.mobile = phoneNumber;
            //       app.globalData.openId = openId;

            //       that.setData({
            //         mobile: app.globalData.mobile,
            //         hasMobileInfo: false,
            //       })
                  
            //     }
            //     else
            //       wx.showModal({
            //         title: '提示',
            //         showCancel: false,
            //         content: res.data.msg,
            //         success: function (res) { }
            //       })

            //   },
            //   fail(res) {

            //     wx.showModal({
            //       title: '提示',
            //       showCancel: false,
            //       content: '网络错误',
            //       success: function (res) { }
            //     })
            //   }
            // })

          } else {
            //参数为空
           
          }
        }
      })
      //  wx.showModal({
      //    title: '提示',
      //    showCancel: false,
      //    content: '同意授权',
      //    success: function (res) { }
      //  })
    }
    //    }
    // })
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
    app.getEventLog("800", "获取手机方式页面", "", "");
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
      app.getPageTimer("800", "获取手机方式页面", "", "", vtime, this.data.time2);
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
      app.getPageTimer("800", "获取手机方式页面", "", "", vtime, this.data.time2);
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