import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dailyTask from '../../../servicesAPI/dailytask'
const setting = require("../../../utils/setting.js");
const util = require("../../../utils/util.js")

import {
  FDate
} from "../../../utils/FDate.js";
const app = getApp();
const f = new FDate();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: "2019",
    month: "07",
    datelist: [],
    checkList: [],
    isSelDay: 0,
    choiceData: '',
    isRecord:false,
    hasRecordList: [],
    today:'', //今天日期
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  isCheck(day) {
    for (var j = 0; j < this.data.checkList.length; j++) {
      var p = this.data.checkList[j];
      if (p.year == f.currentYear && p.month == f.currentMonth && p.day == day) {
        return true;
      }
    }
    return false;
  },
  hassRecord(day) {
    for (var j = 0; j < this.data.hasRecordList.length; j++) {
      var p = this.data.hasRecordList[j].TaskDate.split("-");
      
      if (p[0] == f.currentYear && p[1] == f.currentMonth && p[2]== day) {
        return true;
      }
    }
    return false;
  },
  setFDate() {
    this.setData({
      year: f.currentYear,
      month: f.currentMonth
    })
    this.getDailysByYM();
    // this.setData({
    //   datelist: this.setFCheck()
    // })
  },
  ConvertFDate() {
    var array = [];
    var v = this.getCheckData();
    for (var y = 0; y < v.length; y++) {
      var x = v[y].Date.split('-');
      var item = {
        "year": x[0],
        "month": x[1],
        "day": x[2]
      };
      array.push(item);
    }
    return array;
  },
  getCheckData() {
    // return this.data.get
    var d = new Date();
    var currentMonth = d.getMonth() + 1;
    var currentYear = d.getFullYear();
    var currentDay = d.getDate();
    return [{ "Date": currentYear + "-" + currentMonth + "-" + currentDay }];
  },
  setFCheck() {
    var array = []
    for (var i = 0; i < f.currentDayArray.length; i++) {
      if (!f.currentDayArray[i]) {
        array.push({
          day: "",
          isCheck: false,
          isRecord:false
        })
      } else {
        array.push({
          day: f.currentDayArray[i],
          isCheck: this.isCheck(f.currentDayArray[i]),
          isRecord: this.hassRecord(f.currentDayArray[i]),
        })
      }
    }
    return array
  },

  //上一月
  golastmonth: function (e) {
    var array = f.PrevMonth();
    this.setFDate();
  },
  //下一月
  gonextmonth: function (e) {
    var array = f.NextMonth();
    this.setFDate();
  },

  selDay: function (e) {
    this.setData({
      isSel: true
    })
    var selyear = e.currentTarget.dataset.selyear;
    var selmonth = e.currentTarget.dataset.selmonth;
    var selday = e.currentTarget.dataset.selday;
    if (selmonth < 10) {
      selmonth = "0" + selmonth
    }
    if (selday < 10) {
      selday = "0" + selday
    }
    var seldata = selyear + "-" + selmonth + "-" + selday
    this.setData({
      isSelDay: selday,
      choiceData: seldata
    })
    if (this.data.choiceData>this.data.today){
      wx.showToast({
        title: "未来日期不可操作！",
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.redirectTo({
        url: '../main?currentChoiceDate=' + this.data.choiceData
      })
    }
  },
  //取当天
  getdate: function () {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var curdate = year + seperator1 + month + seperator1 + strDate;

    this.setData({
      choiceData: curdate,
      today: curdate
    })
  },

  //获取日志记录
  getDailysByYM:async function(){
    var hr = await dailyTask.DailyTask.GetDailysByYM({
      // userGuid: wx.getStorageSync("wxauth").userid,
      familyIdGuid: wx.getStorageSync("familyidguid").FamilyId,
      year:this.data.year,
      month:this.data.month,
      day:0
    });
    
    if(hr.state==1 && hr.rows.length>0){
      this.setData({
        hasRecordList: hr.rows
      })
    }
    console.log(this.data.hasRecordList)
    this.setData({
      datelist: this.setFCheck()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      checkList: this.ConvertFDate()
    })
    f.GetDay();
    this.setFDate();
    this.getdate();
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
    app.getEventLog("logRecord_selDailyDate-page")
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
      app.getPageTimer("logRecord_selDailyDate-page", "", vtime, this.data.time2);
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
      app.getPageTimer("logRecord_selDailyDate-page", "", vtime, this.data.time2);
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