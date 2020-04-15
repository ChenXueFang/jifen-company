// pages/myIntegral/myIntegral.js
const app = getApp()
const util = require("../../utils/util.js")
const setting = require("../../utils/setting.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myscore:0,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
    isShowCollect:false,
  },
  //根据用户获取积分
  getScore: function () {
    var that = this;
    setting.GET({
      userId: wx.getStorageSync("wxauth").userid,
    }, "/api/Users/GetPoint", (data) => {
      var pointcount = 0;
      if (data.state == 1 && data.data != null && data.data != ""){
          pointcount = data.data;
      }
      this.setData({
        myscore: pointcount
      })
    }, (error) => {
      if (error.errMsg) {

      }
    }, false)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScore()

    var openid = wx.getStorageSync("wxauth").openid
    if (openid == "oGDEp4444O05sTNtokueco59TcHM" || openid == "oGDEp4wStI_uz2qSVMtUIwlA7H4U" || openid =="oGDEp4zOrPIprIrGoWUc54cv2m-E") {
     this.setData({
       isShowCollect:true
     })
    }
  },
  tocollect:function(){
    wx.navigateTo({
      url: '../protocol/protocol'
    })
  },

  // 跳转到小商城
  store(){
    app.getEventLog(90)

    wx.navigateToMiniProgram({
      appId: 'wxaf72a47464d8f40a',
      path: "pages/shelf/index?page_id=PG00PFBJ4F&channel=M56QVNE0O9SG",
      extraData: {
        // foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
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
    app.getEventLog(15)

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
      app.getPageTimer(15, this.data.TempId, vtime, this.data.time2);
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
      app.getPageTimer(15, this.data.TempId, vtime, this.data.time2);
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