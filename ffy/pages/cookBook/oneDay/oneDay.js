// pages/cookBook/oneDay/oneDay.js
const setting = require("../../../utils/setting.js");
const util = require("../../../utils/util.js")
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../../services/enter';
import userLinkRecordApi from '../../../services/userLinkRecord';
const app = getApp();
var urlImg = wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: ['upload/recipeimg/cook_one1.png', 'upload/recipeimg/cook_one2.png', 'upload/recipeimg/cook_one3.png', 'upload/recipeimg/cook_one4.png', 'upload/recipeimg/cook_one5.png'],
    urlImg: urlImg,
    // checkitems: ['根据孕期和体重提供营养均衡的一日三餐规划', '根据食材偏好生成个性化菜谱', '根据营养生成个性化菜谱（高钙，高铁，低糖）','根据生成一日三餐规划按天进行食材配送'],
    checkitems: [{ index: 1, title: '根据孕期和体重提供营养均衡的一日三餐规划' }, { index: 2, title: '根据食材偏好生成个性化菜谱' }, { index: 3, title: '根据营养生成个性化菜谱（高钙，高铁，低糖）' }, { index: 4, title: '根据生成一日三餐规划按天进行食材配送'}],
    checkedMenu:'',
    checked:false,
    isNull:false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      urlImg: wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl")
    })
    

    this.getCheckbox();
  },

  // 多选
  checkboxChange: async function (e) {
    this.setData({
      checkedMenu: e.detail.value.join(',')
    })
  },

  // 提交
  submit: async function () {
    if (this.data.checkedMenu!=""){
      var that = this;
      var hr = await userLinkRecordApi.UserChoiceItem.insertUserChoiceItem({
        Userid: wx.getStorageSync("wxauth").userid,
        FamilyId: wx.getStorageSync("familyId").FamilyId,
        UserRole: wx.getStorageSync("myrole").UserRole,
        ItemType: "SpecialMenu",
        ItemAnswer: this.data.checkedMenu,
        AnswerRemark:""
      });
      if(hr.state==1){
        app.getEventLog(121)
        wx.showToast({
          title: "提交成功",
        })
        this.getCheckbox();
      }else{
        wx.showToast({
          title: hr.msg,
          icon: "none"
        })
      }
    }else{
      wx.showToast({
        title: "请选择",
        icon: "none"
      })
    }
  },

  // 获取多选状态
  getCheckbox: async function (e) {
    var that = this;
    var hr = await userLinkRecordApi.UserChoiceItem.getUserChoiceItem({
      UserId: wx.getStorageSync("wxauth").userid,
      ItemType: "SpecialMenu",
      PageSize: 1,
      PageIndex: 1
    });
    if (hr.state==1 && hr.rows.length>0){
      if (hr.rows[0].ItemAnswer) {
        var checkedList = hr.rows[0].ItemAnswer.split(',')
        for (var i = 0; i < this.data.checkitems.length; i++) {
          for (var j = 0; j < checkedList.length; j++) {
            if (this.data.checkitems[i].index== checkedList[j]){
              this.data.checkitems[i].checked=true
              this.setData({
                checkitems: this.data.checkitems
              })
            }
          }
        }
      }
      this.setData({
        isNull:false
      })
    }else{
      this.setData({
        isNull: true
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
    app.getEventLog(26);
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
      app.getPageTimer(26, this.data.TempId, vtime, this.data.time2);
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
      app.getPageTimer(26, this.data.TempId, vtime, this.data.time2);
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