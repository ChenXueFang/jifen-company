const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
const pageSize = setting.setting.pageSize;
Page({
  data: {
    searchResultList: [],
    url: setting.setting.URL,
    ImgURL: setting.setting.ImgURL,
    searchKey: "", //input的值
    search: "", //搜索条件
    pageIndex: 1,
    placeholder: "",
    scrollHeight: "",
    needLoad: true,
    isload:false,//接口数据是否加载完成
    time1: "",//进入页面时间
    time2: "",//离开页面时间
    typeid:"",
    subtypeid:"",
  },
  //跳回首页
  goIndex: function () {
    wx.navigateBack({ })
  },
  //获取头部搜索框内容
  getSearch: function (e) {
    var val = e.detail.value;
    this.setData({
      searchKey: val
    });
    //console.log(this.data.searchKey)
  },
  //根据CookBookID跳转到菜谱详情页（是否登录）
  goDetailsByID: function (event) {
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
    }
  },
  //获得搜索结果
  getSearchResult: function () {
    setting.GET({ pageIndex: this.data.pageIndex, pageSize: pageSize, productTypeName: this.data.search }, "API/APIData.ashx?_op=CookBookQuery", (data) => {
      // console.log(data.data);
      // console.log(this.data.pageIndex);
      if (this.data.pageIndex == 1) {
        this.setData({
          searchResultList: data.data
        })
      } else {
        if(data.data.length>0){
          for (var i = 0; i < data.data.length;i++){
            this.data.searchResultList.push(data.data[i]);
          }
          console.log(this.data.searchResultList);
          this.setData({
            searchResultList: this.data.searchResultList
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
    }, (err) => { console.log(err) }, false);
  },
  //头部搜索
  searchEat: function () {
    this.setData({
      pageIndex: 1,
      search: this.data.searchKey,
      needLoad: true,
    })
    this.getSearchResult();
  },
  //头部表单提交搜索
  formSubmitSearch: function (e) {
    app.getEventLog("501", "菜谱列表点击搜索按钮", this.data.typeid, this.data.subtypeid);
    console.log('点击菜谱列表搜索formId', e.detail.formId);
    app.globalData.formId = e.detail.formId;
    this.setData({
      pageIndex: 1,
      search: e.detail.value.searchKey,
      needLoad: true,
    })
    this.getSearchResult();
  },
  //滚动到底部加载
  lower: function (e) {
    // debugger
    if (this.data.needLoad) {
      this.setData({
        pageIndex: this.data.pageIndex + 1,
      })
      this.getSearchResult();
    }
  },
  // //保存用户Unionid
  // saveUserUnion: function () {
  //   setting.POST({}, "API/APIData.ashx?_op=SaveUserUnion", (data) => {
  //   }, (err) => { console.log(err) }, false);
  // },
  // //获取 UserId
  // getUserid: function () {
  //   setting.GET({ unionId: setting.setting.GetCache(setting.setting.unionidKey) }, "API/APIData.ashx?_op=GetOpenAndUserId", (data) => {
  //     if (data.success) {
  //       debugger
  //       wx.setStorageSync(setting.setting.useridKey, data.data.VipUserId);
  //       console.log("userid的值", setting.setting.GetCache(setting.setting.useridKey));
  //       this.saveUserUnion();
  //     }
  //   }, (err) => {
  //   }, false);
  // },
  //onLoad 生命周期函数--监听页面加载 一个页面只会调用一次。
  onLoad: function (options) { 
    // wx.setStorageSync("searchKey", options.searchKey);
    // wx.setStorageSync("s", options.s);
    // wx.setStorageSync("v", options.v);
    // wx.setStorageSync("c", options.c);
    // wx.setStorageSync("typeid", options.typeid);
    // wx.setStorageSync("subtypeid", options.subtypeid);
    var searchKey = options.searchKey;
    var s = options.s;
    var v =options.v;
    var c = options.c;
    var typeid = options.typeid;
    var subtypeid = options.subtypeid;
    // 页面初始化 options为页面跳转所带来的参数
    //动态获取滚动区域高度 屏幕总高-头部高-底部高
    var h = wx.getSystemInfoSync().windowHeight - ((wx.getSystemInfoSync().screenWidth / 750) * 200);
    // debugger
    this.setData({
      scrollHeight: h,
      search: options.searchKey,
      searchKey: options.searchKey,
      placeholder: app.globalData.placeholder,
      needLoad: true,
      time1: util.formatTime(new Date()),
      typeid: options.typeid,
      subtypeid: options.subtypeid,

    })
    // setTimeout(() => {
    this.getSearchResult();
    // }, 10000)

    // 判断有没有授权
    // if (setting.setting.GetCache(setting.setting.unionidKey) && setting.setting.GetCache(setting.setting.miniopenidKey)) {
    //   app.globalData.isshow = false;
    //   this.getUserid();
    // }else{
    //   wx.redirectTo({
    //     url: '/pages/accredit/accredit?searchKey=' + searchKey + "&s=" + s + "&v=" + v + "&c=" + c + "&typeid=" + typeid + "&subtypeid=" + subtypeid
    //   })
    // }

    //记录页面访问次数
    // app.getEventLog("500", "菜谱列表页面", "", "");
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.setData({
      time1: util.formatTime(new Date())
    })
    this.getSearchResult();

    app.getEventLog("500", "菜谱列表页面", this.data.typeid, this.data.subtypeid);
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
      app.getPageTimer("500", "菜谱列表页面", this.data.typeid, this.data.subtypeid, vtime, this.data.time2);
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
      app.getPageTimer("500", "菜谱列表页面", this.data.typeid, this.data.subtypeid, vtime, this.data.time2);
    }
  },
})