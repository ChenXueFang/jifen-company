// pages/knowledge/productDescription/productDescription.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/knowledge'
const setting = require("../../../utils/setting.js");
const app = getApp();
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: -1,
    productList:{},
    productDescMenu:[],
    articleList:[],
    index:"",
    producttype:"",
    moveParams: {
      scrollTop: 0
    },
    time1: "",//进入页面时间
    time2: "",//离开页面时间

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      producttype: options.producttype
    })
    this.getProductList();
    this.getProductMenuList();
    // 滚动到中间
    this.moveTo()
    
  },

  getRect(ele) {
    //获取点击元素的信息,ele为传入的id
    var that = this;
    //节点查询
    wx.createSelectorQuery().select(ele).boundingClientRect(function (rect) {
      let moveParams = that.data.moveParams;
      moveParams.subTop = rect.top;
      moveParams.subHalfHeight = rect.height / 2;
      moveParams.screenHalfHeight = wx.getSystemInfoSync().windowHeight/1.50
      that.moveTo();
    }).exec()
  },
  moveTo: function () {
    let subTop = this.data.moveParams.subTop;
    let screenHalfHeight = this.data.moveParams.screenHalfHeight;
    let subHalfHeight = this.data.moveParams.subHalfHeight;
    let scrollTop = this.data.moveParams.scrollTop;
    let distance = subTop - screenHalfHeight + subHalfHeight;
    
    scrollTop = scrollTop + distance;
    this.setData({
      scrollTop: scrollTop
    })
  },
  scrollMove(e) {
    let moveParams = this.data.moveParams;
    moveParams.scrollTop = e.detail.scrollTop;
    this.setData({
      moveParams: moveParams
    })
  },
  //选择项目
  selectItem: function (e) {
    let ele = 'scroll-item-' + e.currentTarget.dataset.index
    this.getRect('#' + ele);
  },

  // tab切换方法
  clickTab: async function (e) {
    //选择项目
    let ele = 'scroll-item-' + e.currentTarget.dataset.index
    this.getRect('#' + ele);

    var that = this;
    if (this.data.currentTab === e.target.dataset.index) {
      that.setData({
        currentTab: -1
      })
    } else {
      that.setData({
        currentTab: e.target.dataset.index,
      })
    }
    // 老款呼吸机，一级标题跳转到视频页面
    if (this.data.producttype == 2) {
      // wx.navigateTo({
      //   url: `../productVideo/productVideo?guid=${e.currentTarget.dataset.guid}`,
      // })
      app.getEventLog("video-button")
      setTimeout(() => {
        wx.showToast({
          title: '尚未发布',
          icon: 'none',
          duration: 3000
        });
        setTimeout(() => {
          wx.hideToast();
        }, 2000)
      }, 200);
    }
  },

  // 产品说明菜单 , 一级二级菜单
  getProductMenuList: async function () {
    var that = this;
    var hr = await dataApi.knowledgeApi.getProductMenuList({
      MPMenuDescIdMenuNameLike: '',
      ContentLike: '',
      TitleLike: '',
      ProductType: this.data.producttype,
      PageSize: 100,
      PageIndex: 1,
      Status:1,
      SortName: "createdtime",
      SortOrder: "desc",
      Q: "1"
    });  
    if (hr.state == 1) {
      that.setData({
        productDescMenu: hr.data  //一级菜单
      })
    }
  },

  // 获取产品列表
  getProductList: async function () {
    var that = this;
    var hr = await dataApi.knowledgeApi.getProductList({
      ProductType: this.data.producttype,
      SortName: "ProductId",
      SortOrder: "desc",
      PageSize: 100,
      PageIndex: 1
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      that.setData({
        productList: hr.rows[0]
      })
      if (hr.rows.length==2){
        that.setData({
          productList: hr.rows[1]
        })
      }
    }
  },

  // 搜索
  tosearch(e){
    wx.navigateTo({
      url: `../search/search?type=${e.currentTarget.dataset.type}&producttype=${e.currentTarget.dataset.producttype}`,
    })
  },

  // 跳转到产品说明文章页面
  toProductEssay(e){
    // wx.navigateTo({
    //   url: `../productEssay/productEssay?guid=${e.currentTarget.dataset.guid}`,
    // })
    wx.navigateTo({
      url: `../productIntro/productIntro?menuid=${e.currentTarget.dataset.menuid}`,
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
    app.getEventLog("productDescription-page")
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
      app.getPageTimer("productDescription-page", "", vtime, this.data.time2);
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // this.toknowledgeIndex();

    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer("productDescription-page", "", vtime, this.data.time2);
    }
  },

  // 页面跳转到知识文章列表
  toknowledgeIndex() {
    app.globalData.currentTab = 0
    wx.switchTab({
      url: '../knowledgeIndex/knowledgeIndex'
    })
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