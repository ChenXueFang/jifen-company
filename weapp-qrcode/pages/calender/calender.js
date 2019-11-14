var util = require('../../utils/util.js');
// var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 日历
    year: new Date().getFullYear(), // 年份
    month: new Date().getMonth() + 1, // 月份
    day: new Date().getDate(),
    demo4_days_style: [],
    dian: '签到',
    // 动画效果加分
    // zindex:'',//开始为空，也就是没有
    motto: '+10',
    num: 0,
    show: false,

  },
  // 日历插件操作
  dian: function() {
    var that = this
    var num = 0
    num++
    that.setData({
      // zindex:9999,//点击了z-index就有值
      show: true,
      num: num,
      dian: '您已签到',
    })
    setTimeout(function() {
      var animation = wx.createAnimation({
        duration: 2000, //设置执行多长时间，动画执行5秒
        timingFunction: 'ease',
        delay: 100, //延迟执行动画，一点就开始，值越大，那么反应就越慢，会延迟很久才开始执行动画
      });
      animation.opacity(0).translate(0, -15).step() //这个就是让他向上移动慢慢消失
      that.setData({
        ani: animation.export() //这个就是 wx.createAnimation的写法
      })
    }, 500)
    // 动画

    // 日历时间
    var date = new Date()
    console.log(date)
    var day = date.getDate()
    var list = that.data.demo4_days_style
    list.push({
      month: 'current',
      day: day,
      color: 'white',
      background: '#dfabdf'
    });
    that.setData({
      demo4_days_style: list,

    })

  },
  // 点击日期的时候
  dayClick: function(event) {
    var that = this
    console.log(event.detail.day)
    var it = event.detail.day
    console.log(that.data.demo4_days_style)
    var list = that.data.demo4_days_style
    list.push({
      month: 'current',
      day: it,
      color: 'white',
      background: '#ffb72b'
    });
    this.setData({
      demo4_days_style: list
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this

    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    let demo4_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      demo4_days_style.push({
        month: 'current',
        day: i,
        color: 'white',
        background: '#cdcbce'
      });
    }
    this.setData({
      demo4_days_style
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */

})