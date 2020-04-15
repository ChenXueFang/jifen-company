// pages/signIn/customMade/customMade.js
const app = getApp()
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../../services/myFamily'
import authApi from '../../../services/dataapi'
import userLinkRecordApi from '../../../services/userLinkRecord';

const util = require("../../../utils/util.js")
const setting = require("../../../utils/setting.js");

var urlImg = wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl");   

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: ['upload/pointimg/signIn_madeBg2.png', 'upload/pointimg/signIn_bottle.png'],
    urlImg: setting.setting.urlImg,
    checkitems: [{ index: 0, content: "60ML（白）" }, { index: 1, content: "125ML（粉）" }, { index: 2, content: "125ML（蓝）" }, { index: 3, content: "240ML（粉）" }],
    disabled: false,  //可以点击
    inputValue: "",
    radioValue:"",
    answerRemark:"",
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getState();
    this.setData({
      urlImg: wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl")
    })
  },

  // 定制奶瓶，提交按钮
  madeBottle: async function(){
    // 如果没有选择容量
    if (!this.data.radioValue) {
      wx.showToast({
        title: '请选择奶瓶容量',
        icon: 'none'
      })
    }
    // 如果没有选择输入名称
    if (!this.data.inputValue) {
      wx.showToast({
        title: '请输入制定名称',
        icon: 'none'
      })
    }
    // 定制名称，奶瓶容量 都不为空, 才能定制奶瓶
    if (this.data.inputValue && this.data.radioValue){
      app.getEventLog(116)  //定制奶瓶，提交按钮
      var that = this
      var hr = await userLinkRecordApi.UserChoiceItem.insertUserChoiceItem({
        Userid: wx.getStorageSync("wxauth").userid,
        FamilyId: wx.getStorageSync("familyId").FamilyId,
        UserRole: wx.getStorageSync("myrole").UserRole,
        ItemType: "MakeMealBottle",
        ItemAnswer: this.data.radioValue,
        AnswerRemark: this.data.inputValue
      });
      if (hr.state == 1) {
        app.getEventLog(121)
        wx.showToast({
          title: "提交成功",
          icon: "none"
        })
        this.setData({
          disabled: true   // 提交成功，input和radio禁用，提交按钮消失
        })
        setTimeout(function (){
          that.getState();
        },2000)
      } else {
        wx.showToast({
          title: hr.msg,
          icon: "none"
        })
      }
    }
  },

  // 获取选中状态
  getState: async function (e) {
    var that = this;
    var hr = await userLinkRecordApi.UserChoiceItem.getUserChoiceItem({
      UserId: wx.getStorageSync("wxauth").userid,
      ItemType: "MakeMealBottle",
      PageSize: 1,
      PageIndex: 1
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      if (hr.rows[0].ItemAnswer) {
        this.setData({
          disabled: true   // 提交成功，input和radio禁用，提交按钮消失
        })
        var checkedList = hr.rows[0].ItemAnswer
        for (var i = 0; i < this.data.checkitems.length; i++) {
          for (var j = 0; j < checkedList.length; j++) {
            if (this.data.checkitems[i].index == checkedList[j]) {
              this.data.checkitems[i].checked = true
              this.setData({
                checkitems: this.data.checkitems,
                answerRemark: hr.rows[0].AnswerRemark
              })
            }
          }
        }
      }
      this.setData({
        isNull: false
      })
    } else {
      this.setData({
        isNull: true
      })
    }
  },

  // 单选
  radioChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      radioValue: e.detail.value
    })
  },

  // 获取input输入的值
  bindinput:function(e){
    this.setData({
      inputValue: e.detail.value
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
    app.getEventLog(115)
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
      app.getPageTimer(115, "", vtime, this.data.time2);
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
      app.getPageTimer(115, "", vtime, this.data.time2);
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