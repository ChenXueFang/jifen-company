var util = require('../../utils/util.js');
// var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 日历
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    demo4_days_style: [],
    // dayStyle: [
    //   { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' },
    //   { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' }
    // ],
    // qian: ['1', '2', '3', '4', '5', '6', '7', '8', '16', '17', '18', '19'],
    // lou: ['9', '10', '11', '12', '13', '14', '15' ],
    dian:'签到',
    // 动画效果加分
    showOrHidden:false,
    motto: '+10',
    num:0,

  },
  // 日历插件操作
dian:function(){
  var that = this
  var num = 0
  num++
  console.log(num)
  that.setData({
    showOrHidden: true,
    num:num
  })
  // setInterval(function () {})
  var date = new Date()
  console.log(date)
    var day = date.getDate()
  var list = that.data.demo4_days_style
    list.push({
      month: 'current', day: day, color: 'white', background: '#dfabdf'
    });
    that.setData({
      demo4_days_style:list,
      dian:'您已签到'
    })
// 动画
  var animation = wx.createAnimation({
    duration: 5000,
    timingFunction: 'ease',
    delay: 100
  });
  animation.opacity(0).translate(0, -100).step()
  this.setData({
    ani: animation.export()
  })
},

  dayClick: function (event) {
    var that = this
    console.log(event)
    console.log(that.data.demo4_days_style)
    // list.push({
    //   month: 'current', day: it, color: 'white', background: '#ffb72b'
    // });
   
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //   var that = this
  //   const days_count = new Date(this.data.year, this.data.month, 0).getDate();
  //   var qian = that.data.qian
  //   let demo4_days_style = new Array;
  //   console.log(qian)
  //  for(var a = 0;a<qian.length;a++){
  //    console.log(qian[a])
  //    demo4_days_style.push({
  //      month: 'current', day: qian[a], color: 'white', background: '#ffb72b'
  //    });
  //  }
  //   this.setData({
  //     demo4_days_style
  //   });
  //   var lou = that.data.lou
  //   console.log(that.data.demo4_days_style)
  //   var newlist = that.data.demo4_days_style

  //   for (var i = 0; i < lou.length; i++) {
  //     console.log(lou[i])
  //     newlist.push({
  //       month: 'current', day: lou[i], color: 'white', background: 'pink'
  //     });
  //   }
  //   this.setData({
  //     demo4_days_style:newlist
  //   });

   const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    let demo4_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      demo4_days_style.push({
        month: 'current', day: i, color: 'white', background: '#cdcbce'
      });
    }
     this.setData({
      demo4_days_style
    });

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
      
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
   
    var openid = '分享了'
  
    return {
      title: '百龄健康微商城',
      path: '/rili/rili/?data=' + openid,
      success: function (res) {
        console.log(res)
        console.log("成功-------")
      },
      fail: function (e) {
        console.log(e)
        console.log("失败-------")
      },
      complete: function (e) {
        console.log(e)
        console.log("失败-------")
      },
    }

  },

})