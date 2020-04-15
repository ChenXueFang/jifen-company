const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
var WxParse = require('../../wxParse/wxParse.js');

Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  data: {
    detailsHeight: "",
    detailsList: [],
    productList: [],
    myEvaluate: 0,
    isFavite: false,//是否收藏
    shares: 0,//分享次数
    shareImg: "",//转发图片
    url: setting.setting.URL,
    ImgURL: setting.setting.ImgURL,
    cookBookId: "",
    html: "",
    showPoster: true,//视频Poster
    showVideo: false,//是否显示视频
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //去首页
  goindex: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  //去产品导航页
  goProduct: function () {
    app.getEventLog("604", "菜谱详细页点击更多飞利浦选择按钮", "", this.data.cookBookId);
    wx.navigateTo({
      url: '../product/product'
    })
  },
  //播放视频
  bindplay: function () {
    app.getEventLog("605", "菜谱详细页面点击视频按钮", "", this.data.cookBookId);
    this.setData({
      showPoster: false,
      showVideo: true
    });
    this.videoContext.play();
  },
  //暂停视频
  bindpause: function () {
    this.videoContext.pause();
  },
  //添加评价
  saveEvaluate: function (event) {
    app.getEventLog("603", "菜谱详细页点击打分按钮(" + event.currentTarget.dataset.index+")", "", this.data.cookBookId);
    var index = event.currentTarget.dataset.index;
    this.setData({
      myEvaluate: index
    });
    setting.GET({ cookBookId: this.data.cookBookId, Score: index }, "API/APIData.ashx?_op=SaveEvaluate", (data) => {
      //console.log(data.data);
    }, (err) => { console.log(err) }, false);
  },
  //添加收藏
  saveCollect: function (e) {
    console.log('点击添加收藏formId', e.detail.formId);
    app.globalData.formId = e.detail.formId;
    setting.GET({ cookBookId: this.data.cookBookId }, "API/APIData.ashx?_op=SaveCollect", (data) => {
      this.setData({
        isFavite: true
      });
    }, (err) => { console.log(err) }, false);
  },
  //取消收藏
  delCollect: function (e) {
    console.log('点击取消收藏formId', e.detail.formId);
    app.globalData.formId = e.detail.formId;
    setting.GET({ cookBookId: this.data.cookBookId }, "API/APIData.ashx?_op=DelCollect", (data) => {
      this.setData({
        isFavite: false
      });
    }, (err) => { console.log(err) }, false);
  },
  //点击分享获取formId
  formSubmitShare:function(e){
    console.log('点击分享formId', e.detail.formId);
    app.globalData.formId = e.detail.formId;
  },
  //设置页面转发
  onShareAppMessage: function (res) {
    var s = "share";
    var v = this.data.cookBookId;
    var c = setting.setting.GetCache(setting.setting.useridKey);
    //记录转发数据
    setting.GET({ cookBookId: this.data.cookBookId, shareContent: "飞利浦菜谱小程序", s: s, v: v, c: c }, "API/APIData.ashx?_op=SaveShare", (data) => {
      console.log("记录转发数据")
    }, (err) => { console.log(err) }, false);

    //定义this指向
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '飞利浦菜谱小程序',
      path: '/pages/productdetails/productdetails?ID=' + that.data.cookBookId,
      imageUrl: that.data.ImgURL + that.data.shareImg,
      success: function (res) {
        // 转发成功
        // setting.GET({ cookBookId: that.data.cookBookId, shareContent: "飞利浦菜谱小程序", s: s, v: v, c: c}, "API/APIData.ashx?_op=SaveShare", (data) => {
        //   console.log("转发成功啦")
        // }, (err) => { console.log(err) }, false);
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败");
      }
    }
  },
  //查看菜谱详情
  recipeDetails: function () {
    setting.GET({ cookbookId: this.data.cookBookId }, "API/APIData.ashx?_op=SingleCookBook", (data) => {
      console.log(data.data);
      this.setData({
        detailsList: data.data,
        productList: data.data.Product,
        myEvaluate: data.data.MyEvaluate,
        isFavite: data.data.IsFavite,
        shares: data.data.Shares,
        shareImg: data.data.ImageUrl,
        html: data.data.Describe
      })
      var that = this;
      WxParse.wxParse('article', 'html', data.data.Describe, that, 0);
    }, (err) => { console.log(err) }, true);
  },
  //获取菜谱详情（判断用户是否登录）
  getDetailsByUser: function () {
    let userid = wx.getStorageSync(setting.setting.useridKey);
    // 判断有没有授权
    if (setting.setting.GetCache(setting.setting.unionidKey) && setting.setting.GetCache(setting.setting.miniopenidKey)) {
      if (!userid || userid == 0) {
        wx.redirectTo({
          url: '../registerCode/registerCode?backurl=' + '../productdetails/productdetails&ID=' + this.data.cookBookId
        })
      } else {
        //查看菜谱详情
        this.recipeDetails();
      }
    } else {
      wx.redirectTo({
        url: '../accredit/accredit?backurl=' + '../productdetails/productdetails&ID=' + this.data.cookBookId
      })
    }
  },
  //等待unionid(解决从分享进来问题)
  waitUnionid: function () {
    let unionid = wx.getStorageSync(setting.setting.unionidKey);
    let userid = wx.getStorageSync(setting.setting.useridKey);
    if (unionid && (userid > 0 || userid === "0")) {
      this.getDetailsByUser();
    } else {
      setTimeout(() => { this.waitUnionid(), 1000 })
    }
  },
  onLoad: function (options) {
    //动态获取中间内容区高度 屏幕总高-头部高-底部高 （6底部预留空白区）
    var h = wx.getSystemInfoSync().windowHeight - ((wx.getSystemInfoSync().screenWidth / 750) * (115 + 195 + 6));
    // console.log(h);
    this.setData({
      detailsHeight: h,
      cookBookId: options.ID,
      time1: util.formatTime(new Date())
    });
    console.log(options.ID);
    this.waitUnionid();

    //记录页面访问次数
    // app.getEventLog("600", "菜谱详细页面", "", this.data.cookBookId);
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.setData({
      time1: util.formatTime(new Date())
    })
    app.getEventLog("600", "菜谱详细页面", "", this.data.cookBookId);
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
      app.getPageTimer("600", "菜谱详细页面", "", this.data.cookBookId, vtime, this.data.time2);
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
      app.getPageTimer("600", "菜谱详细页面", "", this.data.cookBookId, vtime, this.data.time2);
    }
  },
})