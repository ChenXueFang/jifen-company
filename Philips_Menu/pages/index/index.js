//index.js
//获取应用实例
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
Page({
  data: {
    swiperHight: "",
    swiperList: [],
    url: setting.setting.URL,
    searchKey: "",
    placeholder: "",
    formId:"",
    time1:"",//进入页面时间
    time2:"",//离开页面时间
    form:"",

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 跳转到会员中心
  toMemberCenter: function (e){
    app.getEventLog("108", "点击会员俱乐部小程序", "", "");
    wx.navigateToMiniProgram({
      appId: 'wxef057181a9632e93',
      path: "pages/home/home?s=membermini_ka",
      extraData: {
        // foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
        app.getEventLog("109", "点击会员俱乐部小程序成功", "", "");
      },
      fail(res){
        // 打开失败
        app.getEventLog("110", "点击会员俱乐部小程序失败", "", "");
      }
    })
  },
  //跳转产品页
  goProduct: function (e) {
    app.getEventLog("102", "首页点击产品导航按钮", "", "");
    console.log('点击产品导航formId：', e.detail.formId);
    app.globalData.formId = e.detail.formId;
    wx.navigateTo({
      url: '../product/product'
    })
  },
  //跳转菜谱页
  goRecipe: function (e) {
    app.getEventLog("103", "首页点击菜谱按钮", "", "");
    console.log('点击菜谱formId：', e.detail.formId);
    app.globalData.formId = e.detail.formId;
    wx.navigateTo({
      url: '../recipe/recipe'
    })
  },
  //跳转我的收藏页
  goCollection: function (e) {
    app.getEventLog("104", "首页点击我的收藏按钮", "", "");
    console.log('点击我的收藏formId：', e.detail.formId);
    app.globalData.formId = e.detail.formId;
    wx.navigateTo({
      url: '../collection/collection'
    })
  },

   //根据ID点击轮播图跳转到菜谱详情页(是否登录)
  goDetailsByID: function(event){
    app.getEventLog("105", "首页点击轮播图片", "", event.currentTarget.dataset.id);
    let userid = wx.getStorageSync(setting.setting.useridKey);
    // 判断有没有授权
    if (setting.setting.GetCache(setting.setting.unionidKey) && setting.setting.GetCache(setting.setting.miniopenidKey)) {
      if (!userid || userid == 0) {
        wx.redirectTo({
          url: '../registerCode/registerCode?backurl=' + '../productdetails/productdetails&ID=' + event.currentTarget.dataset.id
        })
      } else {
        wx.navigateTo({
          url: '../productdetails/productdetails?ID=' + event.currentTarget.dataset.id
        })
      }
    } else {
      wx.redirectTo({
        url: '../accredit/accredit?backurl=' + '../productdetails/productdetails&ID=' + event.currentTarget.dataset.id
      })
      console.log('首页跳转' + '../accredit/accredit?backurl=' + '../productdetails/productdetails&ID=' + event.currentTarget.dataset.id)
    }
  },
  //获取头部搜索框内容
  getSearch: function (e) {
    var val = e.detail.value;
    this.setData({
      searchKey: val
    });
  },
  //头部搜索
  searchEat: function () {
    wx.navigateTo({
      url: '../searchresult/searchresult?searchKey=' + this.data.searchKey
    })
  },
  //头部表单提交搜索
  formSubmitSearch: function (e) {
    //记录按钮点击次数
    app.getEventLog("101", "点击搜索按钮", "", "");
    console.log('点击首页搜索formId', e.detail.formId);
    app.globalData.formId = e.detail.formId;
    wx.navigateTo({
      url: '../searchresult/searchresult?searchKey=' + e.detail.value.searchKey
    })
  },
  //获取轮播图列表
  getSwiperList:function(){
    var that = this;
    setting.GET({}, "API/APIData.ashx?_op=CarouselQuery", (data) => {
      console.log("获取轮播图")
      that.setData({
        swiperList: data.data
      })
    }, (err) => { console.log(err) }, false);
  },
  //生命周期函数--监听页面加载 一个页面只会调用一次。
  onLoad: function (options) {
    this.setData({
      placeholder: app.globalData.placeholder,
      time1:util.formatTime(new Date()),
      form: options.form
    })
    //动态获取轮播图高度 屏幕总高-头部高-底部高
    var h = wx.getSystemInfoSync().windowHeight - ((wx.getSystemInfoSync().screenWidth / 750) * (318 + 195));
    this.setData({
      swiperHight: h
    })

    //记录页面访问次数
    // app.getEventLog("100", "首页", "", "");

    //获取轮播图
    this.getSwiperList();

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      time1: util.formatTime(new Date())
    })
    //记录页面访问次数
    if (this.data.form == "OnLaunch"){
      app.getEventLog("107", "首页(OnLaunch调用)", "", "");
    } else if (this.data.form =="OnShow"){
      app.getEventLog("106", "首页(OnShow调用)", "", "");
    }else{
      app.getEventLog("100", "首页", "", "");
    }
  },
  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function () {
    if (this.data.time1 != "" && this.data.time1 != null){
      var vtime = this.data.time1;
      this.setData({
        time1:null,
        time2: util.formatTime(new Date())
      })
      //记录页面停留时间
      app.getPageTimer("100", "首页", "", "", vtime, this.data.time2);
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
       //记录页面停留时间
      app.getPageTimer("100", "首页", "", "", vtime, this.data.time2);
    }
  },
 
})
