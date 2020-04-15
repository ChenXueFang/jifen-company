import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
const util = require("../../../utils/util.js")
const setting = require("../../../utils/setting.js");

import dataApi from '../../../services/pregnancyDiary'
import authApi from '../../../services/dataapi'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    galleryList:[],// [{ imagelist: [{}, {}, {}] },{ imagelist: [{}, {}, {}] }],
    isRSShow: false,
    isChecked1: false,
    picsList:[],
    imglist:[],
    myRole:'',
    isHasAuth:false,
    moRenRole: true,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //生成相册
  toPhotos:async function(){
    app.getEventLog(17)
    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../diaryTips/diaryTips'
      })
    }
  },
  //添加日记
  addDiary: async function(){
    app.getEventLog(80)

    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../adddiary/adddiary'
      })
    }
  },
  //查看详情
  toDetail:function(e){
    app.getEventLog(85)

    var id = e.currentTarget.dataset.noteid
    wx.navigateTo({
      url: '../diaryDetail/diaryDetail?noteid=' + id
    })
  },
  //显示
  showRS:async function () {
    app.getEventLog(84)

    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        isRSShow: true
      })
    }
  },
  //隐藏
  hidRS:function(){
    this.setData({
      isRSShow: false
    })
  },
  // 获取开关按钮的状态
  switchState: async function (e){
    var hr = await dataApi.PregnancyDiary.switchState({
      id: wx.getStorageSync("wxauth").userid
    });
    if (hr.rows && hr.rows.length > 0) {
      if (hr.rows[0].IsOpenNote == true) {
        this.setData({
          isChecked1: true
        })
      } else {
        this.setData({
          isChecked1: false
        })
      }
    }
  },
  //选择是否开放授权
  changeSwitch1:async function(e){
    this.setData({
      isChecked1: e.detail.value
    })
    var uid = wx.getStorageSync("wxauth").userid;
    var hr = await dataApi.PregnancyDiary.GetAuthForFamily(uid, this.data.isChecked1);
    if (hr.state==1) {
      if (this.data.isChecked1==true){
        wx.showToast({
          title: "日记权限已开放！", //res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: "日记权限已关闭！", //res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  //查看列表
  getDiaryList:async function(){
    var that = this;
    
    var hr = await dataApi.PregnancyDiary.GetListBySC({
      UserId: wx.getStorageSync("wxauth").userid,
      PageSize: 100,
      PageIndex: 1,
      SortName: "CreatedTime",
      SortOrder: "desc",
      Q: this.data.myRole  
    });
    
    if (hr.state && hr.state == 1) {
      console.log(hr)

      let dataList = hr.rows; //获取到数据
      dataList.forEach((item) => {
        item.RecordTime = item.RecordTime.substring(0, 10); //要截取时间的字符串
        item.Remark = JSON.parse(item.Remark)
      })
      this.setData({
        galleryList: dataList //数据源
      })
    }
    console.log(this.data.galleryList) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let hrs = await authApi.wxApi.wxLoginCheck()
    if ((hrs.data != undefined && hrs.data.isLogin == false) || hrs.isLogin == false) {
      this.setData({
        moRenRole: true
      })
    } else {
      this.setData({
        moRenRole: false,
        myRole: wx.getStorageSync("myrole").UserRole
      })
    }

    this.getDiaryList();
    this.switchState();
    
    if (this.data.myRole == null || this.data.myRole==""||this.data.myRole != 'Mather'){
      var that = this;
      var hr = await dataApi.PregnancyDiary.GetAuthByUserId({
        UserId: wx.getStorageSync("wxauth").userid
      });
      if(hr.data==null || hr.data==""){
        this.setData({
          isHasAuth: false
        })
      }else{
        if (hr.data) {
          this.setData({
            isHasAuth: hr.data
          })
        }
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
    app.getEventLog(14)
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })

    this.getDiaryList()
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
      app.getPageTimer(14, "", vtime, this.data.time2);
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
      app.getPageTimer(14, "", vtime, this.data.time2);
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