//获取应用实例
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
const pageSize = setting.setting.pageSize;
Page({
  data: {
    collectList:[],
    url: setting.setting.URL,
    scrollHeight:"",
    pageIndex: 1,
    needLoad:true,//加载更多
    isload: false,//接口数据是否加载完成
    isNeedLogin:false,//是否需要登录
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //跳回首页
  goIndex: function () {
    // wx.navigateBack({ 
    //   delta: 100
    // })
    wx.redirectTo({ url: "../index/index" })
  },
  //点击去逛逛调到菜谱页
  goRecipe:function(){
    app.getEventLog("402", "我的收藏页面点击去逛逛按钮", "", "");
    wx.navigateTo({
      url: '../recipe/recipe'
    })
  },
  //获取收藏列表
  getColleteList: function () {
      setting.GET({ pageIndex: this.data.pageIndex, pageSize: pageSize }, "API/APIData.ashx?_op=CollectQuery", (data) => {
        console.log(data.data);
        console.log(this.data.pageIndex);
        if (this.data.pageIndex == 1) {
          this.setData({
            collectList: data.data
          })
        } else {
          if (data.data.length > 0) {
            for (var i = 0; i < data.data.length; i++) {
              this.data.collectList.push(data.data[i]);
            }
            console.log(this.data.collectList);
            this.setData({
              collectList: this.data.collectList
            })
          }
        }
        this.setData({
          isload: true
        })
        if (data.data.length < pageSize) {
          this.setData({
            needLoad: false
          })
        }
      }, (err) => { console.log(err) }, true);
  },
  //滚动到底部加载
  lower: function (e) {
    //
    if (this.data.needLoad) {
      this.setData({
        pageIndex: this.data.pageIndex + 1,
      })
      this.getColleteList();
    }
  },
  //根据CookBookID跳转到菜谱详情页（是否登录）
  goDetailsByID: function (event) {
    let userid = wx.getStorageSync(setting.setting.useridKey);
    console.log(userid)
    // 判断有没有授权
    if (setting.setting.GetCache(setting.setting.unionidKey) && setting.setting.GetCache(setting.setting.miniopenidKey)) {
      if (!userid || userid == 0) {
        wx.redirectTo({
          url: '../registerCode/registerCode?backurl=' + '../collection/collection'
        })
      } else {
        wx.navigateTo({
          url: '../productdetails/productdetails?ID=' + event.currentTarget.dataset.id
        })
      }
    } else {
      wx.redirectTo({
        url: '../accredit/accredit?backurl=' + '../collection/collection'
      })
    }
  },
  //去登陆
  goLogin:function(){
    app.getEventLog("401", "我的收藏页面点击登录按钮", "", "");
    // 判断有没有授权
    if (setting.setting.GetCache(setting.setting.unionidKey) && setting.setting.GetCache(setting.setting.miniopenidKey)) {
      wx.redirectTo({
        url: '../registerCode/registerCode?backurl=' + '../collection/collection'
      })
    }else{
      wx.redirectTo({
        url: '../accredit/accredit?backurl=' + '../collection/collection'
      })
    }
  },
  onLoad: function () {
    //动态获取滚动区域高度 屏幕总高-头部高-底部高
    var h = wx.getSystemInfoSync().windowHeight - ((wx.getSystemInfoSync().screenWidth / 750) * 200);
    this.setData({
      scrollHeight: h,
      needLoad: true,
      time1: util.formatTime(new Date())
    });

    //记录页面访问次数
    // app.getEventLog("400", "我的收藏页面", "", "");

    let userid = wx.getStorageSync(setting.setting.useridKey);
    if (userid == 0) {
      this.setData({
        isNeedLogin: true
      });
    } else {
      this.setData({
        isNeedLogin: false
      });
    //页面初始化获取收藏列表
    this.getColleteList();
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      time1: util.formatTime(new Date())
    })
    //页面初始化获取收藏列表
    this.getColleteList();
    
    app.getEventLog("400", "我的收藏页面", "", "");
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
      app.getPageTimer("400", "我的收藏页面", "", "", vtime, this.data.time2);
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
      app.getPageTimer("400", "我的收藏页面", "", "", vtime, this.data.time2);
    }
  },
})