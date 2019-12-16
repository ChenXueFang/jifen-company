// pages/pregnancyDiary/selectOption/selectOption.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
const util = require("../../../utils/util.js")
const setting = require("../../../utils/setting.js");

import dataApi from '../../../services/pregnancyDiary'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selContents: [
      { name: '每日记录', value: '0' },
      { name: '孕期日记', value: '1' },
      { name: '孕照对比', value: '2' },
      { name: '筛选与宝宝对话', value: '3' },
      { name: '筛选爸爸的参与', value: '4' },
    ],
    selStyles:[
      { name: '卡通风格', value: '0' },
      { name: '旅游风格', value: '1' },
      { name: '风景风格', value: '2' }
    ],
    phontsItems: [
      { name: '杂志图书 ￥99', value: '0' },
      { name: '木本图书 ￥199', value: '1' },
      { name: '电子图书 ￥39', value: '2' }
    ],
    photoid:-1,
    selcontid:'',
    selstyleid:'',
    isShowBtn:true,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //图书类型
  photochange:function(e){
    this.setData({
      photoid: e.detail.value
    })
  },
  //内容
  cbContentChange:function(e){
    var item = e.detail.value //选中的数组
    var id = []; //选中的ID
    var name = []; //选中的NAME

    //循环选中的数组，取出对应的数据进行数组拼接
    for (var i = 0; i < item.length; i++) {
      var row = item[i].split(",") //将数组进行分割
      id = id.concat(row[0]) //数组下表的第一个为id
      name = name.concat(row[1]) //数组下表的第二个为name
    }
    this.setData({
      contentId: id.join(","),
      content: name.join(",")
    })
  },
  //风格
  cbStyleChange:function(e){
    var item = e.detail.value 
    var id = []; 
    var name = []; 

    for (var i = 0; i < item.length; i++) {
      var row = item[i].split(",") 
      id = id.concat(row[0]) 
      name = name.concat(row[1]) 
    }
    this.setData({
      styleId: id.join(","),
      style: name.join(",")
    })
  },
  back:function(){
    app.getEventLog(122) //确认按钮
    this.addNoteSurveyInfo()

    
  },
  //新增
  addNoteSurveyInfo:async function(){
    if (this.data.contentId == "" || this.data.contentId ==undefined){
      wx.showToast({
        title: "请选择包含内容",
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.styleId == "" || this.data.styleId == undefined) {
      wx.showToast({
        title: "请选择风格",
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.photoid == "" || this.data.photoid == -1) {
      wx.showToast({
        title: "请选择图书类型",
        icon: 'none',
        duration: 2000
      })
    }else{
      var hr = await dataApi.NoteSurvey.addNoteSurvey({
        UserId: wx.getStorageSync("wxauth").userid,
        ContentId: this.data.contentId,
        Content: this.data.content,
        StyleId: this.data.styleId,
        Style: this.data.style,
        ChoiceBookId: this.data.photoid,
        ChoiceBook: this.data.phontsItems[this.data.photoid].name,
      });
      wx.navigateBack({
        delta: 1
      })
    }
  },
  //加载最新
  getLastNoteSurveyInfo:async function(){
    var hr = await dataApi.NoteSurvey.getLastNoteSurvey({
      UserId: wx.getStorageSync("wxauth").userid,
      PageSize: 1,
      PageIndex: 1,
      SortName: "createdtime",
      SortOrder: "desc"
    });
    console.log(hr)
    if (hr.state == 1 && hr.rows && hr.rows.length > 0){
      this.setData({
        photoid: hr.rows[0].ChoiceBookId,
        selcontid: hr.rows[0].ContentId,
        selstyleid: hr.rows[0].StyleId,
        isShowBtn: false
      })
      var contentid = hr.rows[0].ContentId.split(",")
      for (var i = 0; i < this.data.selContents.length;i++){
        for (var j = 0; j < contentid.length;j++){
          if (this.data.selContents[i].value == contentid[j]){
            this.data.selContents[i].checked = true
            this.setData({
              selContents: this.data.selContents
            })
          }
        }
      }
      var styleid = hr.rows[0].StyleId.split(",")
      for (var i = 0; i < this.data.selStyles.length; i++) {
        for (var j = 0; j < styleid.length; j++) {
          if (this.data.selStyles[i].value == styleid[j]) {
            this.data.selStyles[i].checked = true
            this.setData({
              selStyles: this.data.selStyles
            })
          }
        }
      }

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLastNoteSurveyInfo()
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
    app.getEventLog(89)
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
      app.getPageTimer(89, this.data.TempId, vtime, this.data.time2);
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
      app.getPageTimer(89, this.data.TempId, vtime, this.data.time2);
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