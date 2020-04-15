// pages/mycollect/mycollect.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js")
import dataApi from '../../services/classroom'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    GetList: [],
    index: 1,
    isfinish: false,
    issorry: false,
    domainUrl: setting.setting.url,
    SortNum: 0,
    PDay: 0,
    UserId:'',
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let yqinfo = wx.getStorageSync("yqinfo")
    console.log(yqinfo)
    let totalDays = parseInt(yqinfo.ageWeek) * 7 + parseInt(yqinfo.ageDay)
    this.setData({
      SortNum: totalDays,
      PDay: totalDays
    })
    this.getList();
  },

  //文章页面跳转传参
  bindViewTap: function (e) {
    app.getEventLog(72)
    
    wx.navigateTo({
      url: '../essay/essay?id=' + e.currentTarget.dataset.id
    })
  },

  // 获取文章列表开始
  getList: async function () {
    var that = this;
    var hr = await dataApi.Collection.ColleList({
      UserId: wx.getStorageSync("wxauth").userid,
      PageSize: 8,
      PageIndex: this.data.index,
      SortName: "CreatedTime",
      SortOrder: "desc",
    });
    if (hr.state === 1) {
      if (hr.rows != null && hr.rows.length > 0) {
        that.setData({
          GetList: that.data.GetList.concat(hr.rows),
          index: that.data.index + 1,
        })
      } else {
       
      }
    } else {
      
    }
  },

  //下拉刷新
  onPullDownRefresh: function () {
    console.log('下拉刷新');
    this.setData({
      GetList: [],
      index: 1,
    })
    wx.stopPullDownRefresh();
    this.getList();
  },
  //上拉加载
  onReachBottom: function () {
    console.log('上拉加载');
    var that = this;
    this.getList();
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
    app.getEventLog(71)

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
      app.getPageTimer(71, "", vtime, this.data.time2);
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
      app.getPageTimer(71, "", vtime, this.data.time2);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})