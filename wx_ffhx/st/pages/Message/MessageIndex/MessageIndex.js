// pages/Message/MessageIndex/MessageIndex.js
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
    currentTab: 0,
    activityList:[],
    equipmentList:[],
    informList:[],
    index: 1,
    showModal: false,
    isLogin:false,
    itemindex:"",
    time1: "",//进入页面时间
    time2: "",//离开页面时间

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    this.gerActivityList();
    this.getEquipmentList();

    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == true) || hr.isLogin == true) {
      this.getServiceNoticeList(); //根据useridguid查询 服务通知列表
      this.setData({
        isLogin:true
      })
    }
    
  },

  // 获取服务通知列表
  getServiceNoticeList: async function () {
    var that = this;
    let lastDay = '';
    for (let i = this.data.activityList.length - 1; i >= 0; i--) {
      if (that.data.activityList[i].msgList != null && that.data.activityList[i].msgList.thisDate != null) {
        lastDay = that.data.activityList[i].msgList.thisDate;
        break;
      }
    }
    var hr = await dataApi.knowledgeApi.getServiceNoticeList({
      UserId: wx.getStorageSync("wxauth").uid, //数字
      PageSize: 15,
      PageIndex: this.data.index,
      SortName: "CreatedTime",
      SortOrder: "desc",
      LastDay: lastDay
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      that.setData({
        informList: this.data.informList.concat(hr.rows),
        index: this.data.index + 1
      })
    }
  },

  // 获取产品活动文章列表--3
  gerActivityList: async function () {
    var that = this;
    let lastDay='';
    for (let i = this.data.activityList.length-1;i>=0;i--){
      if (that.data.activityList[i].msgList!=null&&that.data.activityList[i].msgList.thisDate!=null){
        lastDay = that.data.activityList[i].msgList.thisDate;
         break;
       }
    }
    var hr = await dataApi.knowledgeApi.gerArticleList({
      ClassType: 3,
      PageSize: 8,
      PageIndex: this.data.index,
      SortName: "CreatedTime",
      SortOrder: "desc",
      Q: "1",
      LastDay: lastDay
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      that.setData({
        activityList: this.data.activityList.concat(hr.rows),
        index: this.data.index + 1
      })
    }
  },

  // 获取设备维护文章列表--4
  getEquipmentList: async function () {
    var that = this;
    let lastDay = '';
    for (let i = this.data.equipmentList.length - 1; i >= 0; i--) {
      if (that.data.equipmentList[i].msgList != null && that.data.equipmentList[i].msgList.thisDate != null) {
        lastDay = that.data.equipmentList[i].msgList.thisDate;
        break;
      }
    }
    var hr = await dataApi.knowledgeApi.gerArticleList({
      ClassType: 4,
      PageSize: 8,
      PageIndex: this.data.index,
      SortName: "CreatedTime",
      SortOrder: "desc",
      Q: "1",
      LastDay: lastDay
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      that.setData({
        equipmentList: this.data.equipmentList.concat(hr.rows),
        index: this.data.index + 1
      })
    }
  },

  //下拉刷新
  onPullDownRefresh: function () {
    // console.log(111);
    this.setData({
      activityList: [],
      equipmentList: [],
      index: 1,
    })
    wx.stopPullDownRefresh(); //停止下拉刷新 
    this.gerActivityList();
    this.getEquipmentList();
    // 登录了就调服务通知列表
    if (this.data.isLogin==true){
      this.setData({
        informList: [],
        index: 1,
      })
      this.getServiceNoticeList();
    }
  },
  //上拉加载
  onReachBottom: function () {
    // console.log(222);
    var that = this;
    this.gerActivityList();
    this.getEquipmentList();
    // 登录了就调服务通知列表
    if (this.data.isLogin == true) {
      this.getServiceNoticeList();
    }
  },

  //tab点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    if (this.data.currentTab == 0) {
      app.getEventLog("marketActivity-button") //市场活动
    }
    if (this.data.currentTab == 1) {
      app.getEventLog("equipmentProtect-button") //设备维护
    }
    if (this.data.currentTab == 2) {
      app.getEventLog("serviceNotice-button") //服务通知
    }
  },

  // 消息详情
  tomessageDetails(e) {
    // 跳转到vip文章页面 classtype= 2  RemindType= 3
    if (e.currentTarget.dataset.remindtype==3){
      wx.navigateTo({
        url: `../../knowledge/illnessEssay/illnessEssay?guid=${e.currentTarget.dataset.guid}&classtype=${2}&pageto=`
      })
    }else{
      wx.navigateTo({
        url: `../messageDetails/messageDetails?id=${e.currentTarget.dataset.id}`,
      })
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
    app.getEventLog("MessageIndex-page")
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
      app.getPageTimer("MessageIndex-page", "", vtime, this.data.time2);
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
      app.getPageTimer("MessageIndex-page", "", vtime, this.data.time2);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})