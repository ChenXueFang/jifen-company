// pages/cjReadings/cjReadings.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selindex:'',
    isOpen:false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //展开隐藏
  showOrHidden:function(e){
    var sindex = "index" + e.currentTarget.dataset.index
    var sisopen = e.currentTarget.dataset.isopen
    console.log(sindex + "," + sisopen)

    this.setData({
      isOpen: !sisopen
    })

    if (this.data.isOpen == false && sindex == this.data.selindex){
      this.setData({
        selindex: -1,
      })
    }else{
      this.setData({
        selindex: sindex,
      })
    }
   
    console.log(this.data.isOpen, this.data.selindex)
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
    app.getEventLog(106)
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
      app.getPageTimer(106, this.data.TempId, vtime, this.data.time2);
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
      app.getPageTimer(106, this.data.TempId, vtime, this.data.time2);
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