// pages/setWarm/setWarm.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../services/chanjian'
import authApi from '../../services/dataapi'
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js")
const app = getApp();

// 时间选择器
var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();
var s = [];
for (var i = 0; i < 24; i++)
  if (i < 10)
    s.push('0' + i + '时')
else
  s.push(i + '时')
var s1 = []
for (var i = 0; i <= 59; i++) {
  if (i < 10)
    s1.push('0' + i + '分');
  else
    s1.push(i + '分')
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isStart: true,
    warmList: [],
    selectvalue: '',
    multiArray: [
      ['检前七天', '检前三天', '检前一天'], s, s1
    ],
    multiIndex: [0, 0, 0],
    isDisplay: true,
    isHave: false,
    UserId: '',
    resul: '',
    lastDay: '',
    switchchecked: false,
    isfocus: true,
    remid: '',
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  // 检前几天，天数转换
  getTijian(daynum) {
    if (daynum == '检前七天') {
      return 7
    }
    if (daynum == '检前三天') {
      return 3
    }
    if (daynum == '检前一天') {
      return 1
    }
  },
  // 检前几天，天数转换
  getTijianToText(days) {
    let resut = ''
    switch (days) {
      case 1:
        resut = '检前一天';
        break;
      case 3:
        resut = '检前三天';
        break;
      case 7:
        resut = '检前七天';
        break;
    }
    return resut
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function(options) {
    let hr = await authApi.wxApi.wxLoginCheck()

    //this.switch();
    this.getWarm();
    //this.isWarm();
    // this.isGuanzhu();
  },

  onShow: function (options) {
    app.getEventLog(76)

    this.isGuanzhu();
  },

  // 判断是否关注公众号
  isGuanzhu: async function(e) {
    let hr = await authApi.wxApi.wxCheckWechatSubscribe(e);
    if (hr.state == 1) {
      if (hr.data && hr.data.subscribe == 1) {
        this.setData({
          isfocus: true
        })
      } else if (hr.data && hr.data.subscribe == 0){
        this.setData({
          isfocus: false
        })
      }
    }
  },

  // 获取是否开启提醒
  isWarm: async function() {
    var that = this;
    var hr = await dataApi.LaborChart.IsWarm({
      id: wx.getStorageSync("wxauth").userid
    });
    if (hr.rows && hr.rows.length > 0) {
      if (hr.rows[0].IsSendRemind == true) {
        this.setData({
          switchchecked: true
        })
      } else {
        this.setData({
          switchchecked: false
        })
      }
    }
  },

  // 设置开启或关闭
  switchChange: async function(e) {
    var sflag = e.detail.value
    this.setData({
      sflag: e.detail.value
    })
    if (sflag) {
      if (this.data.selectvalue == "" && this.data.resul == "") {
        wx.showToast({
          title: "请选择提醒时间！",
          icon: 'none',
          duration: 2000
        })
        this.setData({
          switchchecked: false
        })
      } else {
        this.insertOrUpdateInfo()
      }
    } else {
      this.insertOrUpdateInfo()
    }
  },
  // // 按钮开关

  insertOrUpdateInfo: async function () {
    //新增或修改记录
    if (this.data.remid != '') {  //修改
      var hr = await dataApi.LaborChart.ChangeWarmPut({
        id: this.data.remid,
        IsOpen: this.data.sflag == true ? 1 : 0,
        RemindTime: this.data.v2,
        RemindDay: this.data.v11
      });
      if (hr.state == 1) {
        console.log('成功');
      }
    } else { //新增
      var hr = await dataApi.LaborChart.AddWarmPost({
        UserId: wx.getStorageSync("wxauth").userid,
        FamilyId: wx.getStorageSync("familyId").FamilyId,
        IsOpen: this.data.sflag == true ? 1 : 0,
        RemindTime: this.data.v2,
        RemindDay: this.data.v11
      });
      if (hr.state == 1) {
        this.setData({
          warmList: hr.rows,
          remid: hr.rows[0].RemindId,
        })
        console.log('成功');
      }
    }
  },

  // 更改提醒时间
  setChange: async function(e) {
    let v1 = this.data.multiArray[0][e.detail.value[0]]
    let v0 = ' '
    let v2 = `${this.data.multiArray[1][e.detail.value[1]].replace('时', '')}:${this.data.multiArray[2][e.detail.value[2]].replace('分', '')}`
    let v11 = this.getTijian(v1)
    this.setData({
      selectvalue: v1 + v0 + v2,
      isDisplay: false,
      v2: v2,
      v11: v11
    })
    this.insertOrUpdateInfo()
  },

  // 获取产检提醒时间
  getWarm: async function() {
    var that = this;
    var hr = await dataApi.LaborChart.GetWarm({
      // UserId: wx.getStorageSync("wxauth").userid,
      // PageIndex: 1
      UserId: wx.getStorageSync("wxauth").userid,
      FamilyId: wx.getStorageSync("familyId").FamilyId,
      PageSize: 1,
      PageIndex: 1,
    });
    if (hr.rows && hr.rows.length > 0) {
      this.setData({
        warmList: hr.rows,
        resul: that.getTijianToText(hr.rows[0].RemindDay),
        timesplit: hr.rows[0].RemindTime,
        remid: hr.rows[0].RemindId,
        switchchecked: hr.rows[0].IsOpen == 1 ? true : false,
        sflag: hr.rows[0].IsOpen == 1 ? true : false
      })
      if (hr.rows[0].RemindDay != '' && hr.rows[0].RemindTime != '') {
        this.setData({
          isHave: false
        })
      }
    }
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
      app.getPageTimer(76, this.data.TempId, vtime, this.data.time2);
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
      app.getPageTimer(76, this.data.TempId, vtime, this.data.time2);
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
  // onShareAppMessage: function () {

  // },



})