// pages/knowledge/productVideo/productVideo.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/knowledge'
import serveApi from '../../../servicesAPI/serveApi'
const setting = require("../../../utils/setting.js");
const util = require("../../../utils/util.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl:"",
    productid:"",
    guid:"",
    danmu:false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      productid: options.productid,
      guid: options.guid
    })
    this.getProductVideo();
  },

  // 获取产品说明视频
  getProductVideo: async function () {
    // 老式呼吸机，一级菜单，两个视频
    if(this.data.guid){
      var that = this;
      var hr = await dataApi.knowledgeApi.getTwoVideo({
        guid: this.data.guid
      });
      if (hr.state == 1 && hr.data) {
        that.setData({
          videoUrl: hr.data.Remark
        })
      }
    }
    // 其余产品说明列表直接跳转到视频
    else{
      var that = this;
      var hr = await dataApi.knowledgeApi.getProductVideo({
        id: this.data.productid
      });
      if (hr.state == 1 && hr.data) {
        that.setData({
          videoUrl: hr.data.VideoUrl
        })
      }
    }
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
    if (this.data.guid) {
      app.getEventLog("productVideo-page", this.data.guid)
    } else {
      app.getEventLog("productVideo-page", this.data.productid)
    }

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
      if (this.data.guid) {
        app.getPageTimer("productVideo-page", this.data.guid, vtime, this.data.time2);
      } else {
        app.getPageTimer("productVideo-page", this.data.productid, vtime, this.data.time2);
      }
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // if (!this.data.guid) {
    //   this.toknowledgeIndex();
    // }

    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      if (this.data.guid) {
        app.getPageTimer("productVideo-page", this.data.guid, vtime, this.data.time2);
      } else {
        app.getPageTimer("productVideo-page", this.data.productid, vtime, this.data.time2);
      }
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