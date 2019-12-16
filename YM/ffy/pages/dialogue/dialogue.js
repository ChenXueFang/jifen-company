// pages/dialogue/dialogue.js
const app = getApp()
const util = require("../../utils/util.js")
const setting = require("../../utils/setting.js");
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import authApi from '../../services/dataapi'
var timer;
var isMove;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showbigimg: true,
    page:0,
    isRSShow: true,
    isYDPic1:false,
    isYDPic2:false,
    isCXShow:false,
    myRole: '',

    xs: 0,
    ys: 0,
    x: 0,
    y: 0,
    diff:0,
    

    targetWidth: 400,
    targetHeight: 711,

    index: 0,
    week: 1,
    res: null,
    hidden: true,
    isLogin:false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //聊天详情
  toDetail:async function(){
    app.getEventLog(44)
    wx.navigateTo({
      url: '../dialogueDetail/dialogueDetail'
    })
  },

  //关闭弹窗
  hideRS: function () {
    this.setData({
      isRSShow: false, 
      isYDPic1:true
    })
  },
  //关闭引导页1
  hidePic1: function () {
    this.setData({
      isYDPic1: false,
      isYDPic2:true
    })
  },
  //关闭引导页2
  hidePic2: function () {
    this.setData({
      isYDPic2: false
    })
  },
  //根据用户获取孕周
  selYWeek: function () {
    var that = this;
    setting.POST({
      UserId: wx.getStorageSync("wxauth").userid
    }, "/api/Users/GetGestationalAge", (data) => {
      if (data.rows.length > 0) {
        var aweek=1
        if (data.rows[0].ageWeek>0){
          aweek = data.rows[0].ageWeek
        }
        this.setData({
          week: aweek,
        })
        this.showImg();
        // this.getInfoByYWeek();
      }
    }, (error) => {
      if (error.errMsg) {
      }
    }, false)
  },
 
  start: function (e) {
    this.setData({
      hidden: false,
      x: e.touches[0].x,
      y: e.touches[0].y,
      xs: e.touches[0].x,
      ys: e.touches[0].y,

    })
  },
  move: function (e) {
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
    let step = 2;
    this.data. diff = -(this.data.xs - this.data.x);
    if (Math.abs(this.data.diff) > step) {
      this.isMove=true;
      this.setData({
        xs: this.data.x
      })
      if (this.data.diff > 0) {
        this.data.index = (this.data.index + parseInt(this.data.diff / step)) % 64;
        // console.log("index:"+this.data.index)
      } else {
        this.data.index = (64 + this.data.index + parseInt(this.data.diff / step)) % 64;
      }

      this.showImg();
    }

  },
  end: function (e) {
    console.info('end')
    this.isMove = false;
    this.setData({
      hidden: true
    })
  },
  showImg: function () {
    // console.info('index:' + this.data.index)
    let that = this;

    //let imgurl = `https://ffy.crmclick.com/adnim/images/weekbig/week${that.data.week}.jpg`
    let imgurl = `https://www.mylife.philips.com.cn/ffymadnim/images/weekbig/week${that.data.week}.jpg`
    // debugger
    let ctx = that.data.ctx;
    let drawImg = function (res) {
      that.data.res = res;
      let imgWidth = 400;
      let imgHeight = 711;
      let targetWidth = that.data.targetWidth;
      let targetHeight = that.data.targetHeight;

      let top = that.data.index * imgHeight;
      ctx.drawImage(res.path, 0, top, imgWidth, imgHeight, 0, 0, targetWidth, targetHeight);
      ctx.draw()
    };
    if (that.data.res == null) {
      clearInterval(that.timer);
      wx.getImageInfo({
        src: imgurl,
        success: function (res) {
          that.data.res = res;
          drawImg(res);


          clearInterval(that.timer);
         that.timer = setInterval(function () {
           
           if(that.isMove)
           {
             
            return;
           }

           if (that.data.diff >= 0) {
             that.data.index = (that.data.index + 1) % 64;
            //  console.log("index:" + that.data.index)
           } else {
             that.data.index = (64 + that.data.index -1) % 64;
           }
           
            that.showImg();

          }, 120);

        },
        fail: () => {
          console.info('error:')
        }

      })

    } else {
      drawImg(that.data.res);

    }

  },
  nextWeek: function () {
    app.getEventLog(48)

    let week = (this.data.week + 1) % 41;
    if (week == 0) {
      week = 1;
    }
    this.setData({
      week: week
    })
    this.data.res = null;
    this.showImg()
  },
  prevWeek: function () {
    app.getEventLog(47)

    let week = (this.data.week - 1) % 40;
    if (week == 0) {
      week = 40;
    }
    this.setData({
      week: week
    })
    this.data.res = null;
    this.showImg()
  },

  //点击查看大图
  viewBigPic:function(){
    app.getEventLog(45)

    this.setData({
      showbigimg:false
    })
    const ctx = wx.createCanvasContext('bigCanvas')
    this.data.ctx = ctx;

    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 75)
    this.showImg();
  },
  //点击关闭大图
  closeBigImg:function(){
    app.getEventLog(46)

    this.setData({
      showbigimg: true
    })
    const ctx = wx.createCanvasContext('myCanvas')
    this.data.ctx = ctx;

    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 75)
    this.showImg();

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
   
    const res = wx.getSystemInfoSync()
    this.data.targetHeight = res.screenHeight;
    this.data.targetWidth = res.screenWidth;

  
    if (wx.getStorageSync("showTip") == null || wx.getStorageSync("showTip")=="")
    {
      wx.setStorageSync('showTip', { userid: wx.getStorageSync("wxauth").userid, showtip: false })
    }else{
      this.setData({
        isYDPic1: false,
        isYDPic2: false,
        isRSShow: false
      })
    }
    const ctx = wx.createCanvasContext('myCanvas')
    this.data.ctx = ctx;

    ctx.setFillStyle('#b64e9c')
    ctx.fillRect(10, 10, 150, 400)

    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      this.setData({
        week:1,
        isLogin: false
      })
      this.showImg();
    }else{
      this.setData({
        isLogin: true,
        myRole: wx.getStorageSync("myrole").UserRole,
      })
      this.selYWeek();
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
    app.getEventLog(10)

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
      app.getPageTimer(10, "", vtime, this.data.time2);
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
      app.getPageTimer(10, "", vtime, this.data.time2);
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