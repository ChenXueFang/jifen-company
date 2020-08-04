// pages/index/index.js
import posterApi from '../../servicesAPI/posterapi';
import classifyapi from '../../servicesAPI/classifyapi'
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
const app = getApp();
const setting = require("../../utils/setting.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: setting.setting.urlImg, //图片域名
    carouselList: [], //轮播图
    SeasonList: [], //当季精选海报
    swiperList: ["../../images/pro2.png", "../../images/pro1.png", "../../images/pro2.png"],
    proList: [{ image: "../../images/pro1.png", intro: '舒妍多效洁肤液：清除彩妆和残留，舒缓纯净肌肤，高度安全，高度耐受', PosterID: 1 }, { image: "../../images/pro2.png", intro: '净妍控油洁肤液：清洁净化，控油调理，专为油性及混合型肌肤设计的一款洁肤液', PosterID: 2 }, { image: "../../images/pro3.png", intro: '舒妍修护爽肤水：温和二次清洁，补水舒缓面部及眼周肌肤，同时提升肌肤柔软度', PosterID: 3 }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarousel();
    this.getCorePoster();
    this.getSeasonPoster();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.getEventLog("500", "小程序首页", "", "", "", "");
  },

  // 获取核心产品
  getCorePoster: async function () {
    var that = this;
    var hr = await classifyapi.classifyapi.getLatestPost({
      tagname: '核心产品',
      rows: 3,
      page: 1,
      sord: 'desc',
      sidx: "CreateTime"
    });
    if (hr.success) {
      if (hr.rows && hr.rows.length > 0) {
        that.setData({
          usedPosterList: hr.rows.slice(0, 3),  //获取前三条数据
        })
      }
    }
  },

  // 获取当季海报 getPosterList
  getSeasonPoster: async function () {
    var that = this;
    var hr = await posterApi.posterapi.getSeasonList({});
    if (hr.success) {
      if (hr.data && hr.data.length > 0) {
        that.setData({
          SeasonList: hr.data.slice(0, 3),  //获取前三条数据
        })
      }
    }
  },

  // 获取轮播
  getCarousel: async function () {
    var that = this;
    var hr = await posterApi.posterapi.getCarousel({});
    if (hr.success) {
      if (hr.data && hr.data.length > 0) {
        that.setData({
          carouselList: hr.data
        })
      }
    }
  },

  // 跳转到操作说明
  toInstructions() {
    wx.navigateTo({
      url: '../instructions/instructions',
    })
  },

  // 跳转到分类
  toClassify(){
    wx.switchTab({
      url: '../classify/classify',
    })
  },
  // 核心产品-更多
  toCoreMore() {
    app.globalData.currentTab = 0
    this.toClassify();
  },
  // 客群更多
  toCustomerMore() {
    app.globalData.currentTab = 1
    this.toClassify();
  },
  // 当季精选更多
  toSpecialMore() {
    app.globalData.currentTab = 2
    this.toClassify();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  onShareAppMessage: function () {

  }
})