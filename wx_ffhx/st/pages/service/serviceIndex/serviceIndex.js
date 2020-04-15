// pages/service/serviceIndex/serviceIndex.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/serveApi'
import familyapi from '../../../servicesAPI/familyapi'
import register from '../../../servicesAPI/userRegister'
const setting = require("../../../utils/setting.js");
const app = getApp();
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    IsVIP: false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    
  },

  // 跳转到小商城
  toStore() {
    app.getEventLog("onlineMall-button")
    // wx.navigateToMiniProgram({
    //   appId: 'wxaf72a47464d8f40a',
    //   path: "pages/shelf/index?page_id=PG00PFBJ4F&channel=M56QVNE0O9SG",
    //   extraData: {
    //     // foo: 'bar'
    //   },
    //   envVersion: 'release',
    //   success(res) {
    //     // 打开成功
    //   }
    // })

    setTimeout(() => {
      wx.showToast({
        title: '即将上线',
        icon: 'none',
        duration: 3000
      });
      setTimeout(() => {
        wx.hideToast();
      }, 2000)
    }, 200);
  },
  async getMyFamilyNickname(){
    var hr = await familyapi.familyApi.getMyFamily({
      userId: wx.getStorageSync("wxauth").userid,
      isCheckedState: true
    });
    if (hr.state == 1 && hr.data) {
      var nickNameTemp = "";
      nickNameTemp = hr.data.userInfo.NickName;
      if (nickNameTemp.length > 6) {
        nickNameTemp = nickNameTemp.substring(0, 5) + "..."
      }
      this.setData({
        nickName: nickNameTemp
      })
    }
  },
  // 查询是否开启vip
  getVIPState: async function() {
    var that = this;
    var hr = await dataApi.serveApi.getVIPState({
      userId: wx.getStorageSync("wxauth").userid
    });
    if (hr.state == 1) {
      this.setData({
        IsVIP: hr.data
      })
      this.getMyFamilyNickname();
    }
  },

  // 没有开启vip，跳转到vip服务
  // tovipServe() {
  //   if (this.data.IsVIP == false) {
  //     app.getEventLog("vipForDetails-button")
  //     wx.navigateTo({
  //       url: `../../vipServe/inviteCode/inviteCode?name=${"service"}`,
  //     })
  //   }
  // },

  // 开启了vip，到vip权益，没有开启vip，调到输入vip邀请码页面
  tovipRights: async function() {
    if (this.data.IsVIP == true) {
      wx.navigateTo({
        url: '../vipRights/vipRights',  //vip权益页面
      })
    }
    if (this.data.IsVIP == false) {
      //判断是否有家庭组, 有才能输入vip邀请码
      var hrcheck = await register.UserRegister.GetMyFamily({
        userId: wx.getStorageSync("wxauth").userid,
        isCheckedState: false
      });
      if (hrcheck.state == 1) {
        if (hrcheck.data != null && hrcheck.data != "") {
          if (hrcheck.data.userInfo.Status == 1) {
            wx.navigateTo({
              url: `../../vipServe/inviteCode/inviteCode?name=${"service"}`, //有家庭组，跳转到输入邀请码页面
            })
          }
        } else {
          setTimeout(function () {
            wx.showToast({
              title: "您还没有注册，请返回首页绑定设备。",
              icon: 'none',
              duration: 2000
            })
          },900)
          setTimeout(function () {
            wx.switchTab({
              url: '../../index/index',
            })
          }, 2000)
        }
      } else {
        wx.showToast({
          title: hrcheck.msg,
          icon: 'none',
          duration: 2000
        })
      }
      setTimeout(function() {
        app.getEventLog("vipForDetails-button")  //了解详情按钮
      }, 2000)
    }
  },
  // 电话咨询
  tocallServe() {
    wx.navigateTo({
      url: '../callServe/callServe',
    })
  },
  // 预约须知
  toOrderKnow() {
    wx.navigateTo({
      // url: '../orderKnow/orderKnow',
      url: '../orderForm2/orderForm2',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    let hr = await authApi.wxApi.wxLoginCheck()
    app.getEventLog("serviceIndex-page")
    if ((hr.data != undefined && hr.data.isLogin == true) || hr.isLogin == true) {
      this.getVIPState(); //查询是否开启vip，登录能查询是否开启vip
    }

    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })
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
      app.getPageTimer("serviceIndex-page", "", vtime, this.data.time2);
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
      app.getPageTimer("serviceIndex-page", "", vtime, this.data.time2);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    app.getPageShare("serviceIndex-page", "", "pages/service/serviceIndex/serviceIndex")
    return {
      title: '管理更智能，关护更贴心',
      path: `pages/service/serviceIndex/serviceIndex`,
      imageUrl: '../../images/shareImg.png'
    }
  }
})