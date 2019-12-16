// pages/pregnancyDiary/diaryDetail/diaryDetail.js
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
    notesid:null,
    diaryDetail:{},
    diaryImg:[],
    imgArr:null
  },
  //预览
  previewImage:function(e){
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgArr // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    this.setData({
      notesid: options.noteid 
    })
    console.log("noteid:" + this.data.notesid)

    var hr = await dataApi.PregnancyDiary.GetDetailByNoteId(this.data.notesid);
    if (hr.state == 1) {
      var imgArrs = [];
      for (var i = 0; i < hr.data.listatt.length; i++) {
        console.log(hr.data.listatt[i])
        imgArrs.push(hr.data.listatt[i].FileUrl);
      }

      this.setData({
        diaryDetail:hr.data.note,
        diaryImg: hr.data.listatt,
        imgArr: imgArrs
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
    app.getEventLog(86)
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