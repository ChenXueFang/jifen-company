// pages/Message/messageDetails/messageDetails.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/knowledge'
const setting = require("../../../utils/setting.js");
const app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');
import dailyTask from '../../../servicesAPI/dailytask'
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    guid: "",
    id:"",
    illnessEssay: {},
    time: "",
    articleId: "",
    fromW: "",
    activityList: [],
    informList: [],
    classtype: "",
    lableLike: "",
    itemindex: "",
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.setData({
      guid: options.guid,
      id: options.id, //服务通知
      classtype: options.classtype,
      // fromW: options.fromW,
      source: options.source,
    })
    // 有文章guid，就调文章内容
    if (options.guid){
      console.log("333333")
      this.getEssayCon();
    }

    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == true) || hr.isLogin == true) {
      this.getServiceMessage(); //根据useridguid查询 服务通知列表
    }

  },

  // 获取相关文章列表，产品活动文章列表--3
  // gerActivityList: async function() {
  //   if (this.data.isfinish) return;
  //   this.setData({
  //     isfinish: true
  //   });
  //   var that = this;
  //   let lastDay = '';
  //   var hr = await dataApi.knowledgeApi.gerArticleList({
  //     ClassType: this.data.classtype,
  //     LableLike: this.data.lableLike,
  //     PageSize: 1,
  //     PageIndex: 1,
  //     Q: "1",
  //   });
  //   if (hr.state == 1 && hr.rows.length > 0) {
  //     that.setData({
  //       activityList: hr.rows,
  //     })
  //   }
  // },

  // 获取市场活动,设备维护文章内容
  getEssayCon: async function() {
    var that = this;
    var hr = await dataApi.knowledgeApi.getEssayCon({
      guid: this.data.guid
    });
    if (hr.state == 1 && hr.data != null) {
      that.setData({
        illnessEssay: hr.data,
        likeCount: hr.data.msgList.LikeCount,
        lableLike: hr.data.Lable,
        labelList: hr.data.Lable.split(','),
        articleId: hr.data.ArticleId,
        articleIdGuid: hr.data.ArticleIdGuid,
        time: hr.data.CreatedTime.substring(0, 10)
      })
      this.changeReadCount();
      WxParse.wxParse('article', 'html', hr.data.Content, that, 0);
    }
  },

  // 获取服务通知内容
  // getServiceNoticeList: async function () {
  //   var that = this;
  //   if(this.data.source=="index"){
  //     var hr = await dailyTask.DailyTask.GetIndexMessage({
  //       userId: wx.getStorageSync("wxauth").userid
  //     });
  //     if (hr.data && hr.data.length > 0) {
  //       var itemindex = this.data.itemindex
  //       that.setData({
  //         illnessEssay: hr.data[itemindex],
  //         time: hr.data[itemindex].MsgDate.substring(0, 10)
  //       })
  //     } 
  //   }else{
  //     var hr = await dataApi.knowledgeApi.getServiceNoticeList({
  //       UserIdGuid: wx.getStorageSync("wxauth").userid,
  //       PageSize: 100,
  //       PageIndex: 1
  //     });
  //     if (hr.state == 1 && hr.data.length > 0) {
  //       var itemindex = this.data.itemindex
  //       that.setData({
  //         illnessEssay: hr.data[itemindex],
  //         time: hr.data[itemindex].CreatedTime.substring(0, 10)
  //       })
  //     }
  //   }
  // },

  // 获取服务通知详情
  getServiceMessage: async function () {
    var that = this;
    var hr = await dataApi.knowledgeApi.getServiceMessage({
      id: this.data.id
    });
    if (hr.state == 1 && hr.rows) {
      that.setData({
        illnessEssay: hr.rows[0],
        time: hr.rows[0].CreatedTime.substring(0, 10)
      })
    }
  },

  // 记录阅读数
  changeReadCount: async function() {
    var that = this;
    var hr = await dataApi.knowledgeApi.changeReadCount({
      id: this.data.articleId
    });
  },

  //返回
  toMyFam: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 消息详情
  tomessageDetails(e) {
    wx.navigateTo({
      // url: `../../knowledge/illnessEssay/illnessEssay?guid=${e.currentTarget.dataset.guid}`
      url: `../messageDetails/messageDetails?guid=${e.currentTarget.dataset.guid}&classtype=${e.currentTarget.dataset.classtype}&pageto=`,
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
    app.getEventLog("messageDetails-page", options.guid)
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
      app.getPageTimer("messageDetails-page", this.data.guid, vtime, this.data.time2);
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
      app.getPageTimer("messageDetails-page", this.data.guid, vtime, this.data.time2);
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

  }
})