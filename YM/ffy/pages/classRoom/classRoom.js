// pages/home/home.js

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
    Inp: "",
    SearchText: "",
    GetList: [],
    Today: {},
    Three: {},
    index: 1,
    isfinish: false,
    issorry: false,
    domainUrl: setting.setting.url,
    curIndex: 0,
    SortNum: 0,
    PDay: 0,
    articleId:'',
    toBottom: false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    let yqinfo = wx.getStorageSync("yqinfo")
    let totalDays = parseInt(yqinfo.ageWeek) * 7 + parseInt(yqinfo.ageDay)
    this.setData({
      SortNum: totalDays,
      PDay: totalDays
    })
    // 获取文章列表
    this.getList();
    // 今日推荐
    this.getToday();
    // 三大板块
    this.getThree();
  },

  //我的收藏
  toFavorite: function () {
    app.getEventLog(70)

    wx.navigateTo({
      url: '../mycollect/mycollect'
    })
  },

  //文章页面跳转传参
  bindViewTap: function(e) {
    app.getEventLog(73)

    this.setData({
      articleId: e.currentTarget.dataset.id,
    })
    console.log(this.data.articleId)
    wx.navigateTo({
      url: '../essay/essay?id=' + e.currentTarget.dataset.id
    })
  },

  // 获取input值,搜索框功能
  getInp: function(e) {
    this.setData({
      Inp: e.detail.value
    })
  },
  // 失去焦点
  bindblur: function (e) {
    if (e.detail.value == "") {
      this.search();
    }
  },
  // 搜索回车键触发方法
  search() {
    app.getEventLog(69)

    if (this.data.curIndex != 1)
      return;
    this.setData({
      GetList: [],
      index: 1,
      SearchText: this.data.Inp,
      isfinish: false
    })
    this.getList();
  },

  //下拉刷新
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
    if (this.data.curIndex != 1)
      return;
    this.setData({
      GetList: [],
      index: 1,
      isfinish: false
    })
    this.getList();
  },
  //上拉加载
  onReachBottom: function() {
    if (this.data.curIndex != 1)
      return;
    var that = this;
    this.getList();
  },

  // 三大板块 
  getThree: async function() {
    if (this.data.PDay == null || this.data.PDay < 36 ){
      this.setData({
        PDay: 36
      })
    }
    if (this.data.PDay > 287){
      this.setData({
        PDay: 287
      })
    }
    var that = this;
    var hr = await dataApi.GetThree.GetListBySC({
      PageSize: 1,
      PageIndex: 1,
      PDay: this.data.PDay
    });
    if (hr.rows != null && hr.rows.length > 0) {
      that.setData({
        Three: hr.rows[0]
      })
    }
  },

  // 今日推荐 
  getToday: async function() {
    var that = this;
    var hr = await dataApi.ClassRomm.GetListBySC({
      PageSize: 1,
      PageIndex: 1,
      SortNum: this.data.SortNum == null ? 1 : this.data.SortNum
    });
    if (hr.rows != null && hr.rows.length > 0) {
      that.setData({
        Today: hr.rows[0]
      })
    }
  },

  // 获取文章列表开始 == '' ? null : this.data.SearchText
  getList: async function () {
    if (this.data.isfinish) return;
    this.setData({
      isfinish: true
    });
    var ageWeek = 0
    if (wx.getStorageSync('yqinfo').ageWeek == '' || wx.getStorageSync('yqinfo').ageWeek == null || wx.getStorageSync('yqinfo').ageWeek == undefined) {
      ageWeek = 0
    } else {
      ageWeek = wx.getStorageSync('yqinfo').ageWeek
    }
    var that = this;
    var hr = await dataApi.GetEssayList.GetListBySC({
      PageSize: 8,
      PageIndex: this.data.index,
      SortName: "CreatedTime",
      SortOrder: "desc",
      TitleLike: this.data.SearchText ,
      Q: ageWeek
    });
    if (hr.state === 1) {
      this.setData({
        isfinish: false
      });
      if (hr.rows  && hr.rows.length > 0) {
        that.setData({
          GetList: that.data.GetList.concat(hr.rows),
          index: that.data.index+1,
          issorry: false,
        })
      }
      if (hr.pageIndex > 1 && hr.rows.length == 0) {
        that.setData({
          issorry: false,
          toBottom: true
        })
      }
      if(hr.pageIndex == 1 && hr.rows.length == 0){
        this.setData({
          issorry: true,
        });
      }
    } else {
      this.setData({
        isfinish: false,
        issorry: true,
      });
    }
  },
  // 获取文章列表结束

  // tab切换
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
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
  onShow: function() {
    app.getEventLog(12)
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
      app.getPageTimer(12, this.data.TempId, vtime, this.data.time2);
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
      app.getPageTimer(12, this.data.TempId, vtime, this.data.time2);
    }
  },



  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})