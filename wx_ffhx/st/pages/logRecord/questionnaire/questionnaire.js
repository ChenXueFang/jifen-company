// pages/logRecord/questionnaire/questionnaire.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import dailyTask from '../../../servicesAPI/dailytask';
const util = require("../../../utils/util.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '0', value: '减轻' },
      { name: '1', value: '差不多' },
      { name: '2', value: '有' },
    ],
    t1answer:-1,
    t2answer: -1,
    t3answer: -1,
    t4answer: -1,
    choiceDate:'',  //选择日期
    questionid:0,
    questionguid:'',
    todayDate:'',//今天日期
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //选项
  t1change:function(e){
    console.log('1：', e.detail.value)
    this.setData({
      t1answer: e.detail.value
    })
  },
  t2change: function (e) {
    console.log('2：', e.detail.value)
    this.setData({
      t2answer: e.detail.value
    })
  },
  t3change: function (e) {
    console.log('3：', e.detail.value)
    this.setData({
      t3answer: e.detail.value
    })
  },
  t4change: function (e) {
    console.log('4：', e.detail.value)
    this.setData({
      t4answer: e.detail.value
    })
  },
  //提交
  commit:async function(){
    if (this.data.questionid != "0" && this.data.questionguid!=""){
      //修改
      var hr = await dailyTask.DailyTask.UpdateQuestionNaire({
        UserId: wx.getStorageSync("wxauth").uid, //数字
        UserIdGuid: wx.getStorageSync("wxauth").userid, //字符串
        QuestionId: this.data.questionid,
        QuestionIdGuid:this.data.questionguid,
        IsMoreCough: this.data.t1answer,
        IsMoreSputum: this.data.t2answer,
        IsMoreAsthma: this.data.t3answer,
        IsLowSpirits: this.data.t4answer,
      });
      console.log(hr)
      if (hr.state == 1) {
        wx.showToast({
          title: hr.msg,
          icon: 'none'
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          });
        }, 1000)

      } else {
        wx.showToast({
          title: hr.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }else{
      //新增
      var hrs = await dailyTask.DailyTask.AddQuestionNaire({
        UserId: wx.getStorageSync("wxauth").uid, //数字
        UserIdGuid: wx.getStorageSync("wxauth").userid, //字符串
        IsMoreCough: this.data.t1answer,
        IsMoreSputum: this.data.t2answer,
        IsMoreAsthma: this.data.t3answer,
        IsLowSpirits: this.data.t4answer,
      });
      console.log(hrs)
      if (hrs.state == 1) {
        wx.showToast({
          title: hrs.msg,
          icon: 'none'
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          });
        }, 1000)

      } else {
        wx.showToast({
          title: hrs.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }
  },

  //查询问卷
  checkquestionNa: async function () {
    var hr = await dailyTask.DailyTask.CheckQuestionNaire({
      UserId: wx.getStorageSync("wxauth").uid,
      CreatedTimeBegin: this.data.choiceDate + " 00:00:00",
      CreatedTimeEnd: this.data.choiceDate + " 23:59:59",
      PageSize: 1,
      PageIndex: 1
    });
    console.log(hr)
    if (hr.rows && hr.rows.length > 0) {
      this.setData({
        t1answer: hr.rows[0].IsMoreCough,
        t2answer: hr.rows[0].IsMoreSputum,
        t3answer: hr.rows[0].IsMoreAsthma,
        t4answer: hr.rows[0].IsLowSpirits,
        questionid: hr.rows[0].QuestionId,
        questionguid: hr.rows[0].QuestionIdGuid,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
   
    this.setData({
      todayDate: year + "/" + month + "/" + day
    })

    var cdate = options.choicedate
    this.setData({
      choiceDate: cdate
    })

    this.checkquestionNa()
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
    app.getEventLog("questionnaire-page")
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
      app.getPageTimer("questionnaire-page", "", vtime, this.data.time2);
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
      app.getPageTimer("questionnaire-page", "", vtime, this.data.time2);
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