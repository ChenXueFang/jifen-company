// pages/laborChart/laborChart.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../services/chanjian'
import authApi from '../../services/dataapi'
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowOpen: false,
    LaborList: [],
    index: 1,
    TimeOver: [],
    changeTime: {},
    showModal: false,
    isChange: false,
    isSubmit: false,
    isWarm: true,
    leaveDays: 0,
    date: '',
    UserId: '',
    Top: false,
    userRole: '',
    isYDPic1: true,
    isYDPic2: false,
    isYDPic3: false,
    isLoginShowYD: false,
    bigSr:false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //关闭引导页1
  hidePic1: function () {
    this.setData({
      isYDPic1: false,
      isYDPic2: true
    })
  },
  //关闭引导页2
  hidePic2: function () {
    this.setData({
      isYDPic2: false,
      isYDPic3: true
    })
  },
  //关闭引导页3
  hidePic3: function () {
    this.setData({
      isYDPic3: false
    })
  },


  // 跳转到设置提醒页面
  setWarm: function() {
    app.getEventLog(75)

    wx.navigateTo({
      url: '../setWarm/setWarm'
    })
  },
  b1: async function(e) {
    app.getEventLog(98)
    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      if (wx.getStorageSync("myrole").UserRole != "Mather"){
      wx.showToast({
        title: '只有妈妈能修改！',
        icon: 'none',
      })
     }
    }
  },
  b2: async function (e) {
    app.getEventLog(98)
    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '已结束日期无法修改！',
        icon: 'none',
      })
    }
  },
  //产检详情页面跳转传参
  bindViewTap: async function(e) {
    app.getEventLog(78)

    // console.log(e);
    // return;
    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: `../chanDetails/chanDetails?id=${e.currentTarget.dataset.id}&RecordId=${e.currentTarget.dataset.recordid}`
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
   var height= wx.getSystemInfoSync().windowHeight
    console.log("屏幕高度：" + height) //X：724  6:603
    if (height >= 700){
      this.setData({
        bigSr:true
      })
    }else{
      this.setData({
        bigSr: false
      })
    }
    console.log("屏幕高度：" + this.data.bigSr)

    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      this.setData({
        isLoginShowYD: false,
      })
    } else {
      this.setData({
        isLoginShowYD: true,
      })
      if (wx.getStorageSync("cjShowTip") == null || wx.getStorageSync("cjShowTip") == "") {
        wx.setStorageSync('cjShowTip', { userid: wx.getStorageSync("wxauth").userid, showtip: false })
      } else {
        this.setData({
          isYDPic1: false,
          isYDPic2: false,
          isYDPic3: false
        })
      }
    }

    let uro = wx.getStorageSync("myrole").UserRole
    console.log(uro);
    this.setData({
      userRole: uro
    })

    this.getLaborList();
  },

  // 关注公众号成功
  bindload: function() {
    console.log('关注成功')
  },

  // 关注公众号失败
  binderror: function() {
    console.log('关注失败')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.getEventLog(11)
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })

    // 上传报告图标变色
    if (app.globalData.loborchartdetail && app.globalData.loborchartdetail.RecordId){
      var y=this.data.LaborList.filter((a) => { return a.RecordId == app.globalData.loborchartdetail.RecordId})
      if(y.length==1)
        {
        y[0].InspectionReport = app.globalData.loborchartdetail.InspectionReport
        }
      this.setData({ LaborList: this.data.LaborList})
    }
    app.globalData.loborchartdetail = null;

    // 过期上传报告图标变色
    if (app.globalData.timeoverdetail && app.globalData.timeoverdetail.RecordId) {
      var z = this.data.TimeOver.filter((a) => { return a.RecordId == app.globalData.timeoverdetail.RecordId })
      if (z.length == 1) {
        
        console.log(app.globalData.timeoverdetail.InspectionReport)
        z[0].InspectionReport = app.globalData.timeoverdetail.InspectionReport
      }
      this.setData({ TimeOver: this.data.TimeOver})
    }
    app.globalData.timeoverdetail = null;
    
    // 设置提醒铃铛变色
    this.isWarming();
  },
  
  // 获取是否开启提醒
  isWarming: async function() {
    var that = this;
    var hr = await dataApi.LaborChart.GetWarm({
      UserId: wx.getStorageSync("wxauth").userid,
      FamilyId: wx.getStorageSync("familyId").FamilyId,
      PageSize: 1,
      PageIndex: 1,
    });
    if (hr.rows && hr.rows.length > 0) {
      this.setData({
        isWarm: hr.rows[0].IsOpen == 1 ? true : false
      })
    } else {
      this.setData({
        isWarm: false
      })
    }
  },

  // 获取当前的时间
  getNowFormatDate: function() {
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
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  //计算天数差的函数，通用 
  DateDiff: function() { //sDate1和sDate2是2017-9-25格式 
    var aDate, oDate1, oDate2, iDays;
    if (this.data.LaborList.length > 0) {
      let sDate1 = this.data.LaborList[0].InspectionDate;
      let sDate2 = this.getNowFormatDate();
      aDate = sDate1.split("-")
      oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]) //转换为9-25-2017格式 
      aDate = sDate2.split("-")
      oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0])
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
    } else {
      iDays = 0;
    }
    this.setData({
      leaveDays: iDays
    })
  },

  // 修改日期
  bindDateChange: async function(e) {
    if (wx.getStorageSync("myrole").UserRole == "Mather") {
      console.log('修改日期:', e.detail.value)
      console.log(e.currentTarget.dataset)
      var that = this;
      var recordid = e.currentTarget.dataset.recordid
      var hr = await dataApi.LaborChart.DateChange(recordid, {
        InspectionDate: e.detail.value
      });
      if (hr.state && hr.state == 1) {
        for (var f1 in that.data.LaborList) {
          if (that.data.LaborList[f1].RecordId == recordid) {
            var f = that.data.LaborList[f1];
            //console.log(new Date().toLocaleString());
            f.LastUpdateTime = new Date().toLocaleString();
            f.InspectionDate = e.detail.value;
          }
        }
        this.setData({
          LaborList: this.data.LaborList,
        })

        wx.showToast({
          title: "修改成功！", //res.data.msg,
          icon: 'none',
          duration: 2000
        })
        this.DateDiff();
      }else{
        wx.showToast({
          title: hr.msg, //res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: "只有妈妈能修改", //res.data.msg,
        icon: 'none',
        duration: 2000
      })
      return
    }
  },

  //获取体检列表
  getLaborList: async function() {
    var that = this;
    var hr = await dataApi.LaborChart.GetListBySC({
      PageSize: 100,
      PageIndex: this.data.index,
      Q: that.data.userRole,
      SortName: "Week",
      SortOrder: "asc",
      UserId: wx.getStorageSync("wxauth").userid
    });
    //console.log(hr.rows[0].InspectionDate)
    if (hr.rows != null && hr.rows.length > 0) {
      for (var i in hr.rows) {
        if (hr.rows[i].Status === -1) {
          this.setData({
            TimeOver: that.data.TimeOver.concat(hr.rows[i]),
            index: hr.index + 1,
            isChange: true,
          });
        } else {
          this.setData({
            LaborList: that.data.LaborList.concat(hr.rows[i]),
            index: hr.index + 1,

          })
        }
      }
      this.DateDiff();
    }
  },

  // 弹窗
  showDialogBtn: async function() {
    app.getEventLog(77)

    let hr = await authApi.wxApi.wxLoginCheck()
    app.getEventLog(16)
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        showModal: true
      })
    }
  },

  // //下拉刷新
  // onPullDownRefresh: function () {
  //   console.log('下拉刷新');
  //   this.setData({
  //     LaborList: [],
  //     index: 1,
  //   })
  //   this.getLaborList();
  // },
  // //上拉加载
  // onReachBottom: function () {
  //   console.log('上拉加载');
  //   this.getLaborList();
  // },

  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    this.hideModal();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
      app.getPageTimer(11, "", vtime, this.data.time2);
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
      app.getPageTimer(11, "", vtime, this.data.time2);
    }
  },


  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})