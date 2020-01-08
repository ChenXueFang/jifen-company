import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import authApi from '../../servicesAPI/dataapi'
import dailyTask from '../../servicesAPI/dailytask'
const setting = require("../../utils/setting.js");
const app = getApp();
const util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iteid:0,
    is_show:true,
    showWeekQue:false,
    currdate:'',
    currtime:'',
    tycolor:['透明','黄色','绿色'],
    xy:'',
    xyg:'',
    xyd:'',
    xl:'',
    taskIdGuid:'' , //日志id 判断是否已有当天日志
    taskId:0,
    choiceDate:'',//选择日期
    todayDate:'',  //今天日期
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  maskHideSelect: function () {
    this.setData({
      isSelect: false
    })
  },
  //选择日期
  toselDate:function(){
    wx.redirectTo({
      url: 'selDailyDate/selDailyDate'
    })
  },
  //每周问卷
  toQuestionnaire:function(){
    wx.navigateTo({
      url: 'questionnaire/questionnaire?choicedate='+this.data.choiceDate
    })
  },
  //选项弹窗
  toSelect: function () {
    this.setData({
      isSelect: true
    })
  },
  //隐藏选项弹窗
  hideSelect: function () {
    this.setData({
      isSelect: false
    })
  },
  //未完成时提交点提交
  unCommit:function(){
    this.setData({
      is_show:false
    })
  },
  //隐藏提示
  hidetip:function(){
    this.setData({
      is_show: true
    })
  },
  //选择颜色
  seltycolor:function(e){
    var itemid = e.currentTarget.dataset.itemid;
    
    this.setData({
      isSelect: false,
      iteid: itemid
    })
  },
  //血氧
  inputxy:function(e){
    if (e.detail.value == "" || isNaN(e.detail.value)) {
      wx.showToast({
        title: "请填写数字",
        icon: 'none',
        duration: 1000
      })
      this.setData({
        xy: ''
      })
    }else{
      this.setData({
        xy: e.detail.value
      })
    }
  },
  //血压高
  inputxyg: function (e) {
    if (e.detail.value == "" || isNaN(e.detail.value)) {
      wx.showToast({
        title: "请填写数字",
        icon: 'none',
        duration: 2000
      })
      this.setData({
        xyg: ''
      })
    }else{
      this.setData({
        xyg: e.detail.value
      })
    }
  },
  //血压低
  inputxyd: function (e) {
    if (e.detail.value == "" || isNaN(e.detail.value)) {
      wx.showToast({
        title: "请填写数字",
        icon: 'none',
        duration: 2000
      })
      this.setData({
        xyd: ''
      })
    }else{
      this.setData({
        xyd: e.detail.value
      })
    }
  },
  //心率
  inputxl: function (e) {
    if (e.detail.value == "" || isNaN(e.detail.value)) {
      wx.showToast({
        title: "请填写数字",
        icon: 'none',
        duration: 2000
      })
      this.setData({
        xl: ''
      })
    }else{
      this.setData({
        xl: e.detail.value
      })
    }
  },

  //提交日志
  commit:async function(){
    if (this.data.taskIdGuid!=''){
      //修改
      var hr = await dailyTask.DailyTask.UpdateDailyTask({
        // UserId: wx.getStorageSync("wxauth").uid, //数字
        // UserIdGuid: wx.getStorageSync("wxauth").userid, //字符串
        TaskDate: this.data.choiceDate,
        Hbo2: this.data.xy,
        LowBloodPressure: this.data.xyd,
        HighBloodPressure: this.data.xyg,
        HeartRate: this.data.xl,
        SputumColor: this.data.tycolor[this.data.iteid],
        TaskId: this.data.taskId,
        TaskIdGuid: this.data.taskIdGuid,
      });
      wx.showToast({
        title: hr.msg,
        icon: 'none',
        duration: 2000
      })

    }else{
      //新增
      var hrs = await dailyTask.DailyTask.InsertDailyTask({
        UserId: wx.getStorageSync("wxauth").uid, //数字
        UserIdGuid: wx.getStorageSync("wxauth").userid, //字符串
        FamilyIdGuid: wx.getStorageSync("familyidguid").FamilyId,
        FamilyId: wx.getStorageSync("familyidguid").FId,
        TaskDate: this.data.choiceDate,
        Hbo2: this.data.xy,
        LowBloodPressure: this.data.xyd,
        HighBloodPressure: this.data.xyg,
        HeartRate: this.data.xl,
        SputumColor: this.data.tycolor[this.data.iteid],
      });
      console.log(hrs)
      if (hrs.state==1){
        app.getEventLog("logSubmit-button")
        var colorid = -1
        for (var i = 0; i < this.data.tycolor.length; i++) {
          if (hrs.rows[0].SputumColor == this.data.tycolor[i]) {
            colorid = i;
          }
        }
        this.setData({
          taskId: hrs.rows[0].TaskId,
          taskIdGuid: hrs.rows[0].TaskIdGuid,
          xy: parseInt(hrs.rows[0].Hbo2),
          xyg: parseInt(hrs.rows[0].HighBloodPressure),
          xyd: parseInt(hrs.rows[0].LowBloodPressure),
          xl: parseInt(hrs.rows[0].HeartRate),
          iteid: colorid
        })
      }
      wx.showToast({
        title: hrs.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },
  //查询日志
  getDailyRecord: async function(){
    var hr = await dailyTask.DailyTask.GetDailyTaskByCurrentDate({
      // UserId: wx.getStorageSync("wxauth").uid, //数字
      // UserIdGuid: wx.getStorageSync("wxauth").userid, //字符串
      FamilyIdGuid: wx.getStorageSync("familyidguid").FamilyId,
      TaskDateBegin: this.data.choiceDate+" 00:00:00",
      TaskDateEnd: this.data.choiceDate +" 23:59:59",
      PageSize: 1,
      PageIndex: 1
    });
    console.log(hr)
    if (hr.state == 1) {
      if(hr.rows.length>0){
        var colorid=-1
        for (var i = 0; i<this.data.tycolor.length;i++){
          if (hr.rows[0].SputumColor == this.data.tycolor[i]){
            colorid=i;
          }
        }
        this.setData({
          taskId: hr.rows[0].TaskId,
          taskIdGuid: hr.rows[0].TaskIdGuid,
          xy: parseInt(hr.rows[0].Hbo2),
          xyg: parseInt(hr.rows[0].HighBloodPressure),
          xyd: parseInt(hr.rows[0].LowBloodPressure),
          xl: parseInt(hr.rows[0].HeartRate),
          iteid: colorid
        })
      }
    }
 
  },

  //查询问卷是否填写
  checkquestionNa:async function(){
    console.log("查询问卷是否填写")
    var hr = await dailyTask.DailyTask.CheckQuestionNaire({
      UserId: wx.getStorageSync("wxauth").uid,
      CreatedTimeBegin: this.data.choiceDate +" 00:00:00",
      CreatedTimeEnd: this.data.choiceDate + " 23:59:59",
      PageSize: 1,
      PageIndex: 1
    });
    console.log(hr)
    if (hr.rows && hr.rows.length > 0) {
      this.setData({
        hasRecord: false
      })
    } else {
      this.setData({
        hasRecord: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var strDate =null
    var date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    this.setData({
      todayDate:year + "/" + month + "/" + day
    })

    var currDate = options.currentChoiceDate;
    if (currDate != "" && currDate != null && currDate != undefined) {
      var cdate=currDate.split("-")
      this.setData({
        choiceDate: currDate.replace(/-/g, '/'),
        currtime: hour + ":" + minute,
        currdate: cdate[0] + "年" + cdate[1] + "月" + cdate[2] + "日"
      })
      strDate = currDate.replace(/-/g, '/')
    } else {
      
      strDate = year + "/" + month + "/" + day
      this.setData({
        currdate: year + "年" + month + "月" + day + "日",
        currtime: hour + ": " + minute,
        choiceDate: strDate
      })
    }
    console.log(strDate)
    
    var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
    var week = weekArray[new Date(strDate).getDay()];  //注意此处必须是先new一个Date
    if (week == "日") { //if(week=="六" || week=="日"){
      this.setData({
        showWeekQue:true
      })
      this.checkquestionNa()  //检查问卷是否已填
    }

    this.getDailyRecord() //查日志
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
    app.getEventLog("logRecord_main-page")
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
      app.getPageTimer("logRecord_main-page", "", vtime, this.data.time2);
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
      app.getPageTimer("logRecord_main-page", "", vtime, this.data.time2);
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
  // onShareAppMessage: function () {
  //   app.getPageShare("logRecord_main-page", "", "pages/logRecord/main")
  //   // if (res.from === 'button') { }
  //   return {
  //     title: '管理更智能，关护更贴心',
  //     path: `pages/index/index`,
  //     imageUrl: '../../images/shareImg.png'
  //   }
  // }
})