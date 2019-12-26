// pages/calendar/calendar.js
import {
  FDate
} from "../../utils/FDate.js";
const app = getApp();
const f = new FDate();
const util = require("../../utils/util.js")

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
    choiceData:'',
    typeid:0,
    lotype:'',
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
  isChoiceDay(cdata) {
    var ccdate = new Date(cdata);
    for (var j = 0; j < this.data.checkList.length; j++) {
      var p = this.data.checkList[j];
      if (p.year == ccdate.getFullYear() && p.month == ccdate.getMonth() + 1 && p.day == ccdate.getDate()) {
       this.setData({
         isSelDay: ccdate.getDate()
       })
      }
    }
  },
  setFDate() {
    this.setData({
      year: f.currentYear
    })
    this.setData({
      month: f.currentMonth
    })
    this.setData({
      datelist: this.setFCheck()
    })
  },
  setLessCheck() {

    let d = new Date();
    var array = []
    if (f.currentYear == d.getFullYear() && f.currentMonth == (d.getMonth() + 1)) {
      let y = 0;
      //判断第几周
      for (var i = 0; i < f.currentDayArray.length; i++) {
        if (f.currentDayArray[i] == d.getDate()) {
          y = i;
          break;
        }
      }
      let m = y % 7;
      let m1 = parseInt(y / 7)

      for (var i = m1 * 7; i < f.currentDayArray.length; i++) {

        if (!f.currentDayArray[i]) {
          array.push({
            day: "",
            isCheck: false
          })
        } else {
          array.push({
            day: f.currentDayArray[i],
            isCheck: this.isCheck(f.currentDayArray[i])
          })
        }
        if (array.length >= 7)
          return array;

      }
      return array;

    } else {
      for (var i = 0; i < 7; i++) {
        if (!f.currentDayArray[i]) {
          array.push({
            day: "",
            isCheck: false
          })
        } else {
          array.push({
            day: f.currentDayArray[i],
            isCheck: this.isCheck(f.currentDayArray[i])
          })
        }
      }
      return array;
    }
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
          isCheck: false
        })
      } else {
        array.push({
          day: f.currentDayArray[i],
          isCheck: this.isCheck(f.currentDayArray[i])
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
    // this.getDates(this.data.choiceData);

    wx.navigateTo({
      url: '../indexDataEChart/indexDataEChart?currentChoiceDate=' + this.data.choiceData + '&itmid=' + this.data.typeid + '&lotype=' + this.data.lotype
    })

  },
  //根据日期取所在周
  getDates: function (choiceData) {
    var new_Date = new Date(choiceData)
    var timesStamp = new_Date.getTime();
    var currenDay = new_Date.getDay();
    
    var dates = [];
    for(var i = 0; i < 7; i++) {
        dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/[年月]/g, '-').replace(/[日上下午]/g, ''));
    }
    // console.log("所在周：" + dates) 
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
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currdata=options.currentChoiceDate
    var typid = options.itemtypeid
    var lotype = options.lotype

    this.setData({
      checkList: this.ConvertFDate(),
      choiceData: currdata,
      typeid:typid,
      lotype: lotype
    })
    f.GetDay();
    this.setFDate();
    this.getdate();


    //this.isChoiceDay(this.data.choiceData);
    // this.getDates(this.data.choiceData);
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
    app.getEventLog("SelectDate-page")
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
      app.getPageTimer("SelectDate-page", "", vtime, this.data.time2);
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
      app.getPageTimer("SelectDate-page", "", vtime, this.data.time2);
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