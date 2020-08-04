//index.js
//获取应用实例
const app = getApp()
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
const md5 = require("../../utils/MD5.js");
Page({
  data: {
    isAuth: true,
    hasUserInfo: false,
    hasMobileInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    domainUrl: setting.setting.h5ImageUrl,
    isProcess: false,//是否显示授权页内容
    time1: "",//进入页面时间
    time2: "",//离开页面时间
    hasLoading: false,
    // returnPath: "",//授完权跳转的页面
    // oldMemReturnPath: "",//ohc刷头兑换老会员授完权跳转的页面
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goBack: function () {
    wx.navigateBack({ })
  },
  onLoad: function (options) {
    
    if (app.globalData.unionId && app.globalData.miniOpenId) {//代表授过权

      // this.wxSaveUserInfo();

      //用户是否是会员
      if (app.globalData.vipUserId && app.globalData.mobile) {
      // if (wx.getStorageSync("vipUserId") && wx.getStorageSync("mobile")) {
        this.setData({
          isProcess: false,
          hasUserInfo: true,
          hasMobileInfo: true,
        })
        app.checkChoosedLabel()

      } else {
        this.setData({
          isProcess: true,
          hasUserInfo: true,
          hasMobileInfo: false,
        })
      }
    } else {
      //没授权
      this.setData({
        isProcess: true,
        hasUserInfo: false,
        hasMobileInfo: false,
      })
    }
  },
  sureEnter: function () {
    if (this.data.returnPath != "" && this.data.returnPath != null) {
      wx.redirectTo({
        url: this.data.returnPath
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },

  //获取用户手机号
  getPhoneNumber: function (e) {

    app.getEventLog("104", "点击授权用户手机信息按钮", "");
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var iv = e.detail.iv;
    var encr = e.detail.encryptedData;
    console.log(e.detail.errMsg);
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny' || e.detail.errMsg != 'getPhoneNumber:ok' || e.detail.errMsg == 'getPhoneNumber:fail:cancel to confirm login' || e.detail.errMsg == 'getPhoneNumber:user deny') {
      wx.hideLoading()
      
      app.getEventLog("106", "点击授权用户手机取消按钮", "");
    
      wx.redirectTo({
        url: '../registerCode/registerCode'
      })
    } else {
      
      app.getEventLog("105", "点击授权用户手机确认按钮", "");
      var that = this;
      //检查登录态是否过期
      wx.checkSession({
        success: function (res) {
          //session_key 未过期，并且在本生命周期一直有效
          if (encr != null && encr != "" && encr != undefined) {
            that.getUserMobile("", encr, iv);
          }
        },
        fail: function (res) {
          // session_key 已经失效，需要重新执行登录流程
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 mobile
              var code = res.code;
              if (encr != null && encr != "" && encr != undefined) {             
                that.getUserMobile(code, encr, iv);
              }
            }
          })

        },
        complete: function (res) { },
      })
    }
  },
  //获取用户手机号
  getUserMobile: function (code, encr,iv){
    
    var that = this;
    wx.request({
      url: setting.setting.payUrl + 'Api/Miniapp/GetUserMobile',
      data: { openid: app.globalData.miniOpenId, code: code, appid: setting.setting.appid, encryptedData: encr, iv: iv },
      // data: { openid: wx.getStorageSync("miniOpenId"), code: code, appid: setting.setting.appid, encryptedData: encr, iv: iv },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {

        if (res.data.state == 1) {
          wx.hideLoading()
          if (res.data.data != null) {
            app.globalData.mobile = res.data.data.phoneNumber;
            wx.setStorageSync("mobile", res.data.data.phoneNumber);

            // wx.redirectTo({
            //   url: '../register/register?returnPath=' + that.data.returnPath
            // })
            wx.redirectTo({
              url: '../registerCode/registerCode'
            })
          }
        }
        else {
          wx.showModal({
            title: '温馨提示',
            showCancel: false,
            content: res.data.msg,
            success: function (res) { }
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  
  //用于客服对接
  wxSaveUserInfo: function () {
    wx.request({
      url: setting.setting.payUrl + 'Api/Miniapp/wxSaveUserInfo',
      data: { OpenID: app.globalData.miniOpenId, NickName: wx.getStorageSync("nickName"), AvatarUrl: wx.getStorageSync("avatarUrl"), Gender: wx.getStorageSync("gender"), Province: wx.getStorageSync("province"), City: wx.getStorageSync("city"), Country: wx.getStorageSync("country") },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
      },
      fail: function (err) {
        wx.hideLoading();
        console.log(err)
      }
    })
  },
  //点击立即授权
  getUserInfo: function (e) {
    
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      hasLoading: true
    })
    app.getEventLog("101", "点击授权用户按钮", "");
    if (e.detail.userInfo != undefined) {
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.userInfo.NickName = e.detail.userInfo.nickName
      app.globalData.userInfo.HeadimgUrl = e.detail.userInfo.avatarUrl
      if (app.globalData.userInfo != null) {
        wx.setStorageSync("nickName", app.globalData.userInfo.nickName);
        wx.setStorageSync("avatarUrl", app.globalData.userInfo.avatarUrl);
        wx.setStorageSync("gender", app.globalData.userInfo.gender);
        wx.setStorageSync("province", app.globalData.userInfo.province);
        wx.setStorageSync("city", app.globalData.userInfo.city);
        wx.setStorageSync("country", app.globalData.userInfo.country);
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
        content: '请先授权',
        success: function (res) { }
      })
      app.getEventLog("103", "点击授权用户取消按钮", "");
      that.setData({
        hasUserInfo: false,
        hasMobileInfo: false,
        hasLoading: false,
      });
      wx.hideLoading()
      wx.navigateBack({ })
    } else {
      app.getEventLog("102", "点击授权用户确认按钮", "");
      wx.showLoading({
        title: '加载中',
      })
      wx.login({
        success: res => {
          
          var code = res.code;
          var that = this;
          if (encr != null && encr != "" && encr != undefined) {
            //用户确认授权 调用涛哥接口 获取小程序的openid unionid 公众号的openid
            wx.request({
              url: setting.setting.payUrl + 'Api/Miniapp/GetUserInfo',
              data: {
                code: code,
                appid: setting.setting.appid,
                iv: iv,
                encryptedData: encr,
                signature: signature
              },
              header: {
                'content-type': 'application/json'
              },
              method: 'GET',
              dataType: "json",
              success: function (res) {
                wx.hideLoading()
                if (res.data.state == 1) {
                  
                  if (res.data.data != null) {
                    app.globalData.unionId = res.data.data.unionid;
                    app.globalData.h5OpenId = res.data.data.wechatOpenid;
                    app.globalData.miniOpenId = res.data.data.openid;
                    wx.setStorageSync("unionidKey", res.data.data.unionid);
                    wx.setStorageSync("h5OpenId", res.data.data.wechatOpenid);
                    wx.setStorageSync("miniOpenId", res.data.data.openid);
                    that.setData({
                      hasUserInfo: true,
                      hasMobileInfo: false
                    });
                    //用于客服对接
                    // that.wxSaveUserInfo();
                    //检查用户是否是会员
                    // that.checkVipUser();
                    that.checkVipUser();
                  }
                } else {
                  that.setData({
                    hasUserInfo: false,
                    hasMobileInfo: false
                  });
                  wx.showModal({
                    title: '温馨提示',
                    showCancel: false,
                    content: res.data.msg,
                    success: function (res) { }
                  })
                  that.setData({
                    hasLoading: false
                  })
                }
              },
              fail: function (err) {
                wx.hideLoading()
                console.log(err)
              }
            })
          } else {
            //参数为空
          }
        }
      })
    }
  },
  checkVipUser:function(){
    setting.GET({ headerImg: this.globalData.userInfo.HeadimgUrl || wx.getStorageSync("avatarUrl")|| ''}, "API/BasicData.ashx?_op=ExistUserUnion", (data) => {
      // 
      wx.hideLoading();
      if (data.success) {
        if (!data.data.IsExist) {
         
          //不是会员
          this.setData({
            hasUserInfo: true,
            hasMobileInfo: false,
            hasLoading: false,
          });
        } else {
          //是会员
          app.globalData.vipUserId = data.data.UserModel.H5UserID;
          app.globalData.miniOpenId = data.data.UserModel.OpenID;
          app.globalData.unionId = data.data.UserModel.UnionID;
          app.globalData.mobile = data.data.UserModel.Mobile;
          wx.setStorageSync("vipUserId", data.data.UserModel.H5UserID);
          wx.setStorageSync("miniOpenId", data.data.UserModel.OpenID);
          wx.setStorageSync("unionidKey", data.data.UserModel.UnionID);
          wx.setStorageSync("mobile", data.data.UserModel.Mobile);
          this.setData({
            hasUserInfo: true,
            hasMobileInfo: true,
            hasLoading: false
          });
          app.checkChoosedLabel()
          // wx.redirectTo({
          //   url: that.data.oldMemReturnPath
          // })
        }
      }
    }, (err) => {
      console.log(err)
    },false);

  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.setData({
      time1: util.formatTime(new Date())
    })

    app.getEventLog("100", "授权页面", "");
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
      app.getPageTimer("100", "授权页面", "", vtime, this.data.time2);
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
      app.getPageTimer("100", "授权页面", "", vtime, this.data.time2);
    }
  },
})
