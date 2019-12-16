// pages/dailyRecord/fetalMovementNum/fetalMovementNum.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
const util = require("../../../utils/util.js")
const md5 = require("../../../utils/md5.js");
const setting = require("../../../utils/setting.js");
var isLock = false;

import {
  FDate
} from "../../../utils/FDate.js";
import dataApi from '../../../services/dayrecord'
const app = getApp();

var intervalId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //间隔时间，5分钟内不能重复记录
    jiangeTime: 5,
    //统计时间,分钟
    countTime:60,
    currentDateRecord:'',
    showtime:true,
    jishi:'60:00',
    tdsNum:0,
    beginTime:'',
    endTime:'',
    tdRecordId:'',
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //取当前时间
  getdate(){
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();

    //获取当前月
    var month = myDate.getMonth() + 1;

    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)
    var s = myDate.getSeconds();

    //获取当前时间

    var now = year + '-' + this.conver(month) + "-" + this.conver(date) + " " + this.conver(h) + ':' + this.conver(m) + ":" + this.conver(s);
    return now;
  },
  //日期时间处理
   conver(s) {
    return s < 10 ? '0' + s : s;
  },

  //点击开始计数
  clickSt:function(){
    if (this.data.tdsNum!="0"){
      wx.showToast({ title: '请先提交或重置再开始记录！', icon: 'none' });
      return;
    }
    this.setData({
      showtime: false,
      beginTime: this.getdate()
    })
    wx.setStorageSync("jishuBeginTime", this.data.beginTime);  

    var that = this;
    // var c = 3600;  //60分钟
    var c = this.data.countTime*60; //分钟
    if(setting.setting.isDebug)
    {
      c=10;
    }
    intervalId  = setInterval(function () {
      c = c - 1
      var minute = parseInt(c / 60);
      var second = parseInt(c % 60);
      if(second<10)
      {
        second = "0" + second
      }
      that.setData({
        jishi: minute + ":" + second
      })
      if (c == 0) {
        clearInterval(intervalId)

        that.setData({
          endTime: that.getdate(),
          jishi: '00:00' 
        })
      }
    }, 1000)
  },
  //胎动说明
  toTDExplain:function(){
    app.getEventLog(67)

    wx.navigateTo({
      url: '../fetalMovementExplain/fetalMovementExplain'
    })
  },
  //记录胎动数
  showEnd: function () {

    if (this.data.jishi=='00:00')
    {
      wx.showToast({ title: '请点击完成提交数据！', icon: 'none' });
      return;
    }

    // 五分钟内只记录一次
    if (isLock) {
      wx.showToast({ title: '五分钟内只记录一次有效胎动哦！', icon: 'none' });
      return false;
    }



    // console.log("胎动数加1")
    this.setData({
      tdsNum: this.data.tdsNum+1
    })

    isLock = true;
    let timeInterval = 60000 * this.data.jiangeTime;
    if(setting.setting.isDebug)
    {
      timeInterval=1000*2;
    }
    setTimeout(function () {
      isLock = false;
    }, timeInterval);
  },
  //关闭弹窗
  hideEnd: function () {
    this.setData({
      isRSShow: false
    })
  },
  //确定结束，重置数据
  comitEnd: function () {
    wx.setStorageSync("jishuBeginTime", '')
    wx.setStorageSync("jishu", '')
    clearInterval(intervalId)
    this.setData({
      isRSShow: false,
      showtime: true,
      jishi: '60:00',
      tdsNum:0
    })
    isLock=false
  },
  //重置
  resetTime:function(){
    if (this.data.jishi == "60:00" && this.data.tdsNum == "0") {
      wx.showToast({ title: '还未开始记录！', icon: 'none' });
      return;
    }else{
      wx.setStorageSync("jishuBeginTime", '')
      wx.setStorageSync("jishu",'')
      isLock = false;
      clearInterval(intervalId)
      this.setData({
        showtime: true,
        jishi: '60:00',
        tdsNum: 0
      })

      wx.showToast({ title: '重置成功！', icon: 'none' });
    }     
  },
  //完成  时间未截止提前结束弹窗提示
  complateNum: async function(){
    //提交数据
    if (this.data.jishi == "60:00" && this.data.tdsNum == "0") {
      wx.showToast({ title: '请先点击开始记录！', icon: 'none' });
      return;
    } else if(this.data.jishi != "00:00"){
      this.setData({
        isRSShow: true
      })
    }else{
      wx.setStorageSync("jishuBeginTime", '')
      wx.setStorageSync("jishu", '')
      isLock = false;
      clearInterval(intervalId)
      this.setData({
        showtime: true,
        jishi: '60:00',
        tdsNum: 0
      })

      var that = this;
      var hr = await dataApi.DayRecord.AddPregnantMoveRecord({
        UserId: wx.getStorageSync("wxauth").userid,
        RecordBeginTime: wx.getStorageSync("jishuBeginTime"),
        RecordCount: this.data.tdsNum,
        RecordEndTime: this.data.endTime,
      });
      // console.log(hr)
      if (hr.state == 1) {
        this.setData({
          tdRecordId: hr.rows[0].PregnantMoveRecordId
        })
        let postdata = {
          UserId: wx.getStorageSync("wxauth").userid,
          RecordDate: this.getdate(),
          MotionId: this.data.tdRecordId
        };
        this.updateRecordByInterface(postdata);
        //判断有没有今天的记录，有就更新，没有就新增

        wx.showToast({ title: hr.msg, icon: 'none' });
      }
    }  
    
  },
  updateRecordByInterface: async function (postdata) {
    //调用接口
    var hr=null;
    if (this.data.currentDateRecord == '') {
      //新增
      hr= await dataApi.Insert.Post(postdata);
      if (hr.state && hr.state == 1) {
        this.setData({
          currentDateRecord: hr.rows[0].PregnantRecordId
        })
      }
    } else {
      //修改
       hr = await dataApi.UpdateRecord.updateRecordById(this.data.currentDateRecord, postdata);
      if (hr.state && hr.state != 1) {
        wx.showToast({
          title: "操作失败，请重试", //res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }

if(hr!=null&&hr.state==1){
  //返回原页面，带上胎动次数
  // console.log('../index/index?mountcount=' + this.data.tdsNum);
  wx.navigateTo({
    url: '../index/index?mountcount=' + this.data.tdsNum
  })
}

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentDateRecord: options.currentDateRecord
    })
    // console.log("每日记录id" + this.data.currentDateRecord)
    
    var reJishu=wx.getStorageSync("jishu"); 
    if (reJishu != null && reJishu !='' && reJishu!=undefined){
      var c = null
      if (reJishu.starttime != undefined && reJishu.starttime !=""){
        var currenttime = this.getdate().replace(/\-/g, '/');
        var totaltime = this.data.countTime * 60 //总时间
        c = totaltime - (Date.parse(currenttime) - Date.parse(reJishu.starttime.replace(/\-/g, '/'))) / 1000

        console.log("开始日期：" + reJishu.starttime + ",当前日期：" + currenttime)
        console.log("剩余时间："+c)

        var that = this;
        intervalId = setInterval(function () {
          c = c - 1
          var minute = parseInt(c / 60);
          var second = parseInt(c % 60);
          if (second < 10) {
            second = "0" + second
          }
          that.setData({
            jishi: minute + ":" + second
          })
          if (c == 0) {
            clearInterval(intervalId)

            that.setData({
              endTime: that.getdate(),
              jishi: '00:00'
            })
          }
        }, 1000)
        this.setData({
          tdsNum: reJishu.count,
          showtime: false
        })
      }else{
        this.setData({
          tdsNum: 0,
          showtime: true
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
    app.getEventLog(66)

    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })
    // isLock = false;
    // clearInterval(intervalId)
    // this.setData({
    //   showtime: true,
    //   jishi: '60:00',
    //   tdsNum: 0
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")
    var js = { 'count': this.data.tdsNum, 'starttime': wx.getStorageSync("jishuBeginTime")}
    wx.setStorageSync("jishu", js);  

    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer(66, "", vtime, this.data.time2);
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
    var js = { 'count': this.data.tdsNum, 'starttime': wx.getStorageSync("jishuBeginTime") }
    wx.setStorageSync("jishu", js);  

    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer(66, "", vtime, this.data.time2);
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