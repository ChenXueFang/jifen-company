// pages/inviteShare/inviteShare.js
// pages/applyJoin/applyJoin.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../services/enter'
import familyApi from '../../services/myFamily'
import authApi from '../../services/dataapi'
const setting = require("../../utils/setting.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motherid: "",
    familyid: "",
    inviterole:"",
    role: '',
    nickName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await authApi.wxApi.wxLoginCheck();
    app.getEventLog(24)
    this.setData({
      familyid: options.familyid,
      motherid: options.motherid,
      inviterole: options.inviterole
    });
    this.getNickName();
    // if (wx.getStorageSync("wxauth").userid == this.data.motherid) {
    //   wx.switchTab({
    //     url: '../home/home'
    //   })
    // }
    // // 判断是否加入过家庭，不能加入多个家庭
    // var that = this;
    // let usid = wx.getStorageSync("wxauth").userid
    // var hr = await familyApi.MyFamily.GetMyFamily(usid);
    // if (hr.data != null && hr.data.userInfo) {
    //   wx.switchTab({
    //     url: '../home/home'
    //   })
    // }
  },

  // 获取妈妈昵称
  getNickName: async function () {
    var that = this;
    var hr = await dataApi.Enter.getNickName({
      id:this.data.motherid
    });
    if (hr.rows && hr.rows.length > 0) {
      that.setData({
        nickName: hr.rows[0].NickName
      })
    }
  },

  // 添加家庭成员接口，protocol页面，同意协议时调用
  addFamilyMember: async function (e) {
    var that = this;
    var hr = await dataApi.Enter.FamilyMember({
      UserId: wx.getStorageSync("wxauth").userid,
      FamilyId: this.data.familyid,
      UserRole: 'Family'
    });
    if (hr.state == 1) {
      // wx.showToast({
      //   title: "已同意！", //res.data.msg,
      //   icon: 'none',
      // })
    }
  },

  //调用授权
  getUserInfo: async function (e) {
    if (e.detail.userInfo != undefined) {
      // 获取用户授权信息
      var hr = await authApi.wxApi.wxUserInfo(e);

      app.globalData.userInfo = e.detail.userInfo
      
      // // 添加家庭成员接口
      // this.addFamilyMember();
      wx.navigateTo({
        url: `../protocol/protocol?role= ${e.currentTarget.dataset.role}&familyid=${this.data.familyid}&inviterole=${this.data.inviterole}`
      })
      
      if (app.globalData.userInfo != null) {
        wx.setStorageSync("nickName", app.globalData.userInfo.nickName);
        wx.setStorageSync("avatarUrl", app.globalData.userInfo.avatarUrl);
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
            url: '../home/home'
          })
        }
      })
      that.setData({
        hasUserInfo: false,
        hasMobileInfo: false
      });
      wx.hideLoading()
    }
  },

  // 取消
  cancel: function () {
    app.getEventLog(23)
    // wx.showToast({ title: '您拒接了邀请！', icon: 'none', duration: 2000});
    wx.switchTab({
      url: '../home/home'
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
  // onShareAppMessage: function () {

  // }
})