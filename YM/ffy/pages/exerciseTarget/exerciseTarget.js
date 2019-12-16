// pages/exerciseTarget/exerciseTarget.js
const app = getApp()
const util = require("../../utils/util.js")
const md5 = require("../../utils/md5.js");
const setting = require("../../utils/setting.js");
import authApi from '../../services/dataapi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    targetNum:0,
    targetId:0,
    myRole: '',
    moRenRole:true,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //选择目标日期
  bindDateChange: function (e) {
    console.log('运动目标日期:', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    this.getTargetNum();
  },
  //输入目标量
  getTarNum:function(e){
    console.log('运动目标量:', e.detail.value)
    if (e.detail.value == "" || isNaN(e.detail.value)) {
      this.setData({
        targetNum: ''
      })
      wx.showToast({
        title: "请填写数字",
        icon: 'none',
        duration: 2000
      })
    }
    if (e.detail.value.length>5) {
      wx.showToast({
        title: "不能超过五位数！",
        icon: 'none',
        duration: 2000
      })
    }
    this.setData({
      targetNum: e.detail.value
    })
  },
  //获取当前日期
  getNowFormatDate:function() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if(month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    this.setData({
      date: currentdate
    })
  },
  // 页面加载时根据当前用户和日期获取目标
  getTargetNum: function () {
    // console.log(this.data.date)
    var that = this;
    setting.POST({
      PageSize: 1,
      PageIndex: 1,
      Q:that.data.myRole,
      UserId: wx.getStorageSync("wxauth").userid, 
      TargetDateBegin: this.data.date,
      TargetDateEnd: this.data.date
    }, "/api/SportTarget/GetListBySC", (data) => {
      if (data.rows.length > 0) {
        this.setData({
          targetNum: data.rows[0].Target,
          targetId: data.rows[0].TargetId,
        })
      }
    }, (error) => {
      if (error.errMsg) {
        
      }
    }, false)
  },
  //提交运动目标
  submitTargetNum: async function () {
    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })

      if (this.data.targetNum == "0" || this.data.targetNum<=0){
        wx.showToast({ title: '目标步数应该大于0！', icon: 'none' });
        return;
      }else{
        if (this.data.targetNum == "" || isNaN(this.data.targetNum)) {
          wx.showToast({ title: '目标步数应该为数字！', icon: 'none' });
          return;
        }
      }

      if(this.data.targetId!="0" || this.data.targetId!=0){
        console.log("修改运动目标：" + this.data.targetId)
        var that = this;
        setting.PUT({
          id: this.data.targetId,
          UserId: wx.getStorageSync("wxauth").userid,
          TargetDate: this.data.date,
          Target: this.data.targetNum
        }, "/api/SportTarget/Put", (data) => {
            wx.showToast({
              title: data.msg,
              icon: 'none',
              duration: 2000
            })
        }, (error) => {
          if (error.errMsg) {
            
          }
        }, false)

      }else{        
        console.log("新增运动目标：" + this.data.targetId)
        var that = this;
        setting.POST({
        
          UserId: wx.getStorageSync("wxauth").userid, //"137B2603-2A92-472D-85D2-2D6DC93F4701",
          TargetDate: this.data.date,
          Target: this.data.targetNum
        }, "/api/SportTarget/Post", (data) => {
          if(data.state==1){
            this.setData({
              targetId: data.rows[0].TargetId
            })
            wx.showToast({
              title: data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }, (error) => {
          if (error.errMsg) {

          }
        }, false)
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      this.setData({
        moRenRole: true
      })
    } else {
      this.setData({
        moRenRole: false,
      })
      this.getNowFormatDate();
      this.getTargetNum();
    }
    this.setData({
      myRole: wx.getStorageSync("myrole").UserRole
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
    app.getEventLog(13)
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
      app.getPageTimer(13, this.data.TempId, vtime, this.data.time2);
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
      app.getPageTimer(13, this.data.TempId, vtime, this.data.time2);
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