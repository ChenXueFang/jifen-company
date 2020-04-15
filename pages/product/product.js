//获取应用实例
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
Page({
  data: {
    productList: [],
    url: setting.setting.URL,
    scrollHeight: "",
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //跳回首页
  goIndex: function () {
    wx.navigateBack({ })
  },
  //去搜索结果页
  goSearchResult: function (event) {
    //第三四字段分别为：TypeID、SubTypeID,为了后面方便统计到具体点击哪个产品次数
    app.getEventLog("201", "产品导航页面点击每个产品按钮（" + event.currentTarget.dataset.name + ")", event.currentTarget.dataset.typeid, event.currentTarget.dataset.subtypeid);
    wx.navigateTo({
      url: '../searchresult/searchresult?searchKey=' + event.currentTarget.dataset.name + "&typeid=" + event.currentTarget.dataset.typeid + "&subtypeid=" + event.currentTarget.dataset.subtypeid
    })
  },
  onLoad: function () {
    //动态获取滚动区域高度 屏幕总高-头部高-底部高
    var h = wx.getSystemInfoSync().windowHeight - ((wx.getSystemInfoSync().screenWidth / 750) * 200);
    this.setData({
      scrollHeight: h,
      time1: util.formatTime(new Date())
    });

    //记录页面访问次数
    // app.getEventLog("200", "产品导航页面", "", "");

    //获取产品和菜谱列表
    app.getTypes(data => {
      //console.log(data);
      //typeId 1 产品  2 菜系 3 菜式
      this.setData({
        productList: data
      })
    }, (err) => { console.log(err) });

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      time1: util.formatTime(new Date())
    })
    app.getEventLog("200", "产品导航页面", "", "");
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
      app.getPageTimer("200", "产品导航页面", "", "", vtime, this.data.time2);
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
      app.getPageTimer("200", "产品导航页面", "", "", vtime, this.data.time2);
    }
  },

})