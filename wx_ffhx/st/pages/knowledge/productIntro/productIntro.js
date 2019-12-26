import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/knowledge'
const setting = require("../../../utils/setting.js");
const app = getApp();
const util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    time1: "",//进入页面时间
    time2: "",//离开页面时间

    // dataSource: [[{
    //   tit: '主机概述', img: '../../../images/zjgs-1.png', desc: '设备功能',
    //   desclist: ['1. 开 / 关按钮', '2. 环境光线传感器', '3. 延迟升压按钮', '4. SD卡和过滤棉盖板', '5. 静音符号', '6. LCD显示屏', '7. 调节旋钮', '8. 警报指示灯']
    // }],
    // [{
    //   tit: '主机概述', img: '../../../images/zjgs-2.png', desc: '设备功能',
    //   desclist: ['9.   配件盖板', '10. 加湿器接口', '11. 出气口', '12. 电源接口']
    // }],
    // [{
    //   tit: '加湿器概述', img: '../../../images/zjgs-3.png', desc: '设备功能',
    //   desclist: ['1. 湿化器', '2. 进气口', '3. 出气口', '4. 加湿器上盖开盖锁扣', '5. 水盒', '6. 最高水位线']
    // }]]
    dataSource:[]
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    var menuid = options.menuid;

    var that = this;
    var hr = await dataApi.knowledgeApi.getArticlebyMenuDescId({
      MenuDescId: menuid,
      PageSize: 10,
      PageIndex: 1,
      SortName: "CreatedTime",
      SortOrder: "asc"
    });
    console.log(hr.rows)
    if (hr.state == 1) {
      that.setData({
        dataSource: hr.rows  //一级菜单
      })
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
    app.getEventLog("productIntro-page", options.menuid)
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
      app.getPageTimer("productIntro-page", this.data.menuid, vtime, this.data.time2);
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
      app.getPageTimer("productIntro-page", this.data.menuid, vtime, this.data.time2);
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