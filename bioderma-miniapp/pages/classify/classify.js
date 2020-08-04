// pages/classify/classify.js
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
    id: null,
    currentTab: 0,
    newPosterList: [], //最新海报
    index:1,
    usedPosterList: [], //常用海报
    indexU:1,

    product_images: [{
      id: 1,
      src: '../../images/class_product0.png',
    }, {
      id: 2,
      src: '../../images/class_product1.png',
    }, {
      id: 3,
      src: '../../images/class_product2.png',
    }, {
      id: 4,
      src: '../../images/class_product3.png',
    }, {
      id: 5,
      src: '../../images/class_product4.png',
    }],
    customer_images: [{
      id: 6,
      src: '../../images/class_customer0.png',
    }, {
      id: 7,
      src: '../../images/class_customer1.png',
    }, {
      id: 8,
      src: '../../images/class_customer2.png',
    }, {
      id: 9,
      src: '../../images/class_customer3.png',
    }],
    images: [{
      id: '1',
      src: '../../images/pro1.png',
      name: '照片01',
      data: '2017/11/1'
    }, {
      id: '2',
      src: '../../images/swiper.png',
      name: '照片02asdfasdfasdfadfadsvv',
      data: '2017/11/4'
    }, {
      id: '3',
      src: '../../images/pro2.png',
      name: '照片03',
      data: '2017/11/5'
    }, {
      id: '4',
      src: '../../images/pro1.png',
      name: '照片04',
      data: '2017/11/6'
    }, {
      id: '5',
      src: '../../images/swiper.png',
      name: '照片05',
      data: '2017/11/4'
    }, {
      id: '6',
      src: '../../images/pro2.png',
      name: '照片06',
      data: '2017/11/5'
    }, {
      id: '7',
      src: '../../images/pro1.png',
      name: '照片07',
      data: '2017/11/6'
    }],
  },

  // tab切换
  onTabItemTap: function(e) {
    if(e.currentTarget){
    this.setData({
        currentTab: e.currentTarget.dataset.index
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getNewPoster();
    this.getUsedPoster();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      currentTab: app.globalData.currentTab,
    })
    app.getEventLog("510", "海报分类页面", "","","","");
  },

  // 获取最新海报
  getNewPoster: async function () {
    var that = this;
    var hr = await classifyapi.classifyapi.getLatestPost({
      tagname: '最新海报',
      rows: 6,
      page: that.data.index,
      sord: 'desc',
      sidx: "CreateTime"
    });
    if (hr.success) {
      if (hr.rows && hr.rows.length > 0) {
        that.setData({
          newPosterList: that.data.newPosterList.concat(hr.rows),
          index: that.data.index + 1,
          total: hr.records
        })
      }
    }
  },

  // 获取常用海报
  getUsedPoster: async function () {
    var that = this;
    var hr = await classifyapi.classifyapi.getLatestPost({
      tagname: '常用海报',
      rows: 6,
      page: that.data.indexU,
      sord: 'desc',
      sidx: "CreateTime"
    });
    if (hr.success) {
      if (hr.rows && hr.rows.length > 0) {
        that.setData({
          usedPosterList: that.data.usedPosterList.concat(hr.rows),
          indexU: that.data.indexU + 1,
          totalU: hr.records
        })
      }
    }
  },

  //上拉加载
  onReachBottom: function () {
    if (this.data.currentTab==2) {
      if(this.data.newPosterList.length>=this.data.total){
        return
      }
      this.getNewPoster();  //接口一
    }else if (this.data.currentTab==3) {
      if(this.data.usedPosterList.length>=this.data.totalU){
        return
      }
      this.getUsedPoster();  //接口二
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})