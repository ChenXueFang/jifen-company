//获取应用实例
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgHeight:"",
    time1: "",//进入页面时间
    time2: "",//离开页面时间
    userInfo: {},
    isshow:true,
    r:'',
    backurl:'',
    ID:""
  },
  //立即进入
  goIndex: function () {
    app.getEventLog("705", " 授权页面点击立即进入按钮", "", "");

    if (this.data.r) {
      // wx.showModal({
      //   title: '提示2',
      //   showCancel: false,
      //   content: this.data.r,
      //   success: function (res) { }
      // })
      wx.redirectTo({
        url: this.data.r,
      })
    } else {
      wx.redirectTo({
        url: '../index/index'
      })
    } 
    // wx.redirectTo({
    //   url: '../index/index'
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      backurl: options.backurl,
      ID: options.ID
    })

    // debugger;
    console.log(options)
    wx.removeStorageSync("searchKey");
    wx.setStorageSync("searchKey", options.searchKey);
    wx.setStorageSync("s", options.s);
    wx.setStorageSync("v", options.v);
    wx.setStorageSync("c", options.c);
    //wx.setStorageSync("r", options.r);  //小程序的路径
    wx.setStorageSync("typeid", options.typeid);
    wx.setStorageSync("subtypeid", options.subtypeid);
    

    //动态获取滚动区域高度 屏幕总高-100
    var h = wx.getSystemInfoSync().windowHeight - ((wx.getSystemInfoSync().screenWidth / 750) * 0);
    // debugger
    this.setData({
      imgHeight: h,
      time1: util.formatTime(new Date()),
      isshow:app.globalData.isshow,
      r:options.r
    })
    // app.getEventLog("700", " 授权页面", "", "");
    if (app.globalData.hasAccredit) {//已授权
    // debugger
     
      if (options.r)
      {            
        wx.redirectTo({
          url: options.r,
        })

      }else{
        if (options.searchKey) {
          wx.redirectTo({
            url: '../searchresult/searchresult?searchKey=' + options.searchKey + "&s=" + options.s + "&v=" + options.v + "&c=" + options.c + "&typeid=" + options.typeid + "&subtypeid=" + options.subtypeid
          })
        } else {
          wx.redirectTo({
            url: '../index/index'
          })
        }
      }    
      this.setData({
        isshow: false,
      })
    }else{
      app.hasAccreditReadyCallback = res => {
        //  console.log(res);
        // debugger;
        if (res.data.IsExist == true) {
          if(this.data.r){
            
            wx.redirectTo({
              url: this.data.r,
            })
          }else{
            if (options.searchKey) {
              wx.redirectTo({
                url: '../searchresult/searchresult?searchKey=' + options.searchKey + "&s=" + options.s + "&v=" + options.v + "&c=" + options.c + "&typeid=" + options.typeid + "&subtypeid=" + options.subtypeid
              })
            } else {
              wx.redirectTo({
                url: '../index/index'
              })
            }
        }
          
          
          this.setData({
            isshow: false,
          })
          console.log("isshow:",this.data.isshow);
        } else {
          this.setData({
            isshow: true,
          })
        }
      }

    }
  },

  //保存用户Unionid
  saveUserUnion:function(){
    setting.POST({}, "API/APIData.ashx?_op=SaveUserUnion", (data) => {
    }, (err) => { console.log(err) }, false);
  },
  //获取 UserId
  getUserid: function () {
    // debugger
    setting.GET({ unionId: setting.setting.GetCache(setting.setting.unionidKey) }, "API/APIData.ashx?_op=GetOpenAndUserId", (data) => {
      if (data.success) {
        wx.setStorageSync(setting.setting.useridKey, data.data.VipUserId);
        this.saveUserUnion();
      }
    }, (err) => {
    }, false);
  },
  //获取sessionId
  getSessionid: function (s, v, c, sid) {
    setting.GET({ s: s, v: v, c: c, sid: sid }, "API/APIData.ashx?_op=GetSession", (data) => {
      if (data.success) {
        wx.setStorageSync(setting.setting.sessionidKey, data.msg);
      }
    }, (err) => {
      console.log(err)
    }, false);
  },
  getUserInfo: function (e) {
    app.getEventLog("701", " 授权页面点击获取用户信息按钮", "", "");
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      hasloading: true,
    });

    var that = this;
    var iv = e.detail.iv;
    var encr = e.detail.encryptedData;
    var rawData = e.detail.rawData;

    var signature = e.detail.signature;
    if (e.detail.errMsg == 'getUserInfo:fail auth deny' || e.detail.errMsg == 'getPhoneNumber:user deny' || e.detail.errMsg == 'getUserInfo:fail:cancel to confirm login' || e.detail.errMsg != 'getUserInfo:ok') {
      //用户未授权
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请先授权',
        success: function (res) { }
      })
      app.getEventLog("702", " 授权取消按钮", "", "");
    } else {
      wx.login({
        success: res => {
          var code = res.code;

          if (encr != null && encr != "" && encr != undefined) {
            //用户确认授权
            setting.POST({ code: code, encryptedData: encr, iv: iv, rawData: rawData, signature: signature }, "API/APIData.ashx?_op=GetUserAppDecrypt", (data) => {
                if (data.success) {
                  console.log(data.data);
                  var data = data.data;
                  if(data!=null){
                    var unionId = data.unionId;
                    var openId = data.openId;
                    app.globalData.unionId = unionId;
                    app.globalData.openId = openId;
                    wx.setStorageSync(setting.setting.unionidKey, unionId);
                    wx.setStorageSync(setting.setting.miniopenidKey, openId);
                    if (unionId && openId) {
                      this.getUserid();
                      this.getSessionid(app.globalData.s, app.globalData.v, app.globalData.c, app.globalData.sid);
                      app.getEventLog("700", " 授权页面", "", "");
                      app.getEventLog("703", " 授权确认按钮(成功)", "", "");
                      if (this.data.backurl) {
                        // debugger
                        wx.redirectTo({
                          url: '../registerCode/registerCode?backurl=' + this.data.backurl +'&ID=' + this.data.ID
                        })
                      }
                      else if (that.data.r){                     
                        wx.redirectTo({
                          url: that.data.r
                        })
                      }else{

                        if (wx.getStorageSync('searchKey')) {
                          wx.redirectTo({
                            url: '/pages/searchresult/searchresult?searchKey=' + wx.getStorageSync('searchKey') + "&s=" + wx.getStorageSync('s') + "&v=" + wx.getStorageSync('v') + "&c=" + wx.getStorageSync('c') + "&typeid=" + wx.getStorageSync('typeid') + "&subtypeid=" + wx.getStorageSync('subtypeid')
                          })
                        } else {
                          wx.redirectTo({
                            url: '../index/index'
                          })
                        }
                      }          
                    }
                  }
                }
                else {
                  //失败
                  app.getEventLog("704", "授权确认按钮(失败)", "", "");
                  wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: data.msg,
                    success: function (res) { }
                  })
                }
            }, (err) => { console.log(err) }, false);
          } else {
            //参数为空
          }
        }
      })
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
    this.setData({
      time1: util.formatTime(new Date())
    })
    setTimeout(() => {
      app.getEventLog("700", " 授权页面", "", "");
    }, 1000);
    
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
      app.getPageTimer("700", " 授权页面", "", "", vtime, this.data.time2);
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
      app.getPageTimer("700", " 授权页面", "", "", vtime, this.data.time2);
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